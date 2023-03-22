import { HttpClient, } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public loginForm!: FormGroup;
constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    userEmail:this.formBuilder.control('', Validators.required),
    userPassword:this.formBuilder.control('', Validators.required)
  })

}
loginSubmit(){

  this.http.get<any>("http://localhost:3000/userList")
  .subscribe(
    (res)=>{
    const user = res.find((a:any)=>{
      return a.email === this.loginForm.value.userEmail && a.password === this.loginForm.value.userPassword
    });
    if(user){
      alert("Login Successful!");
      this.loginForm.reset();
      this.router.navigate(['cand'])
    }else{
      alert("User not Found!")
    }
  },err=>{
    alert("Something Went Wrong!")
  
})
}
}
