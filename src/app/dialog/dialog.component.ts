import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //
import { ApiService } from '../services/api.service'; // for pushing and pulling data from Jason DB
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; //to Initialize closing of Dialog after saving input
// MAT_DIALOG_DATA above is used to inject data from app.component into the edit dialogue form




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  // Creates an array of items to populate mat-select in UI
  genderList = ["Male", "Female", "Others",];
  actionBtn: string = "Save";

  addcandidateForm!: FormGroup;
  // FormBuilder, ApiService and MatDialogRef are injected here
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {
    //Use formBuilder.group to validate UI form
    this.addcandidateForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      category: ['', Validators.required],
      gender: ['', Validators.required],
      score: ['', Validators.required],
      examDate: ['', Validators.required],
      comment: ['', Validators.required],

    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.addcandidateForm.controls['fName'].setValue(this.editData.fName);
      this.addcandidateForm.controls['lName'].setValue(this.editData.lName);
      this.addcandidateForm.controls['category'].setValue(this.editData.category);
      this.addcandidateForm.controls['gender'].setValue(this.editData.genderList);
      this.addcandidateForm.controls['score'].setValue(this.editData.score);
      this.addcandidateForm.controls['examDate'].setValue(this.editData.examDate);
      this.addcandidateForm.controls['comment'].setValue(this.editData.comment);

    }
  }

  // This command adds new product to the JSON DB if the form is validated
  addCandidate() {
    if (!this.editData) {
      if (this.addcandidateForm.valid) {
        this.api.postCandidate(this.addcandidateForm.value)
          .subscribe({
            next: (res) => {
              alert("New Candidate added Successfully");
              this.addcandidateForm.reset(); //This clears the entry on the form
              this.dialogRef.close("save"); //This asks the form to close on succesful http post
            },// The "save" word being passed will be used to enable auto refresh the table after saving a record
            
            
            error: () => {
              alert("Error while adding the New Candidate")
            }
          })
        }
        
      } else {
        this.updateCandidate()
      }
    }
    updateCandidate() {
      this.api.putCandidate(this.addcandidateForm.value, this.editData.id )
      .subscribe({
        next: (res)=>{
          alert("Candidate Updated Successfully");
          this.addcandidateForm.reset();
          this.dialogRef.close("update");
          // The "update" word being passed will be used to enable auto refresh after Updating a record
        },
        error:()=>{
          alert("Error While Updating the Record");
        }
      })
  }
}





