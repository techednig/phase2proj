// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cand',
  templateUrl: './cand.component.html',
  styleUrls: ['./cand.component.css']
})

export class CandComponent implements OnInit {
  title = 'Candidate Management Area';
  //NOTE: if there is a mixmatch in property name below, the CSS of the page will be garbled
  displayedColumns: string[] = ['id','fName', 'lName', 'category', 'gender', 'score', 'examDate', 'comment', 'action' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api : ApiService){

  }
ngOnInit(): void {
  this.getAllCandidate();
}
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === "save"){
        this.getAllCandidate();
      }
    })
  }

  getAllCandidate(){
    this.api.getCandidate()
    .subscribe({
      next: (res) =>{
        // console.log(res); // This is used to check that data is called from DB b4 binding to table datasource below
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

              },
             error:(err)=>{
              alert("Error while Fetching the Records")
             } 
    })
  }
  editCandidate(row:any[]){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==="update"){
        this.getAllCandidate();
      }
    })
  }
  deleteCandidate(id:number){
    this.api.deleteCandidate(id).subscribe({
      next:(res)=>{
        alert("Candidate Deleted Successfully")
        this.getAllCandidate();
      },
      error:()=>{
        alert("Error While Deleting Record");
      }
    })
  
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

