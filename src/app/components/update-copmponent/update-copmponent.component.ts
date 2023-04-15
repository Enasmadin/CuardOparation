import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-copmponent',
  templateUrl: './update-copmponent.component.html',
  styleUrls: ['./update-copmponent.component.scss']
})
export class UpdateCopmponentComponent implements OnInit {
  constructor(public matDialog:MatDialog,private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private service:EmployeeService,public dialog: MatDialogRef<UpdateCopmponentComponent>,private spinner: NgxSpinnerService){}
  newEmployee!:FormGroup;
   isLoading = false;
 
  ngOnInit(): void {
    this.createNewEmpolyee();
   
   
   }
   createNewEmpolyee(){
    this.newEmployee=this.fb.group({
      empId:[this.data.empId||'', Validators.required],
      empName:[this.data.empName||'', Validators.required],
      empEmail:[this.data.empEmail||'', [Validators.required,Validators.email]],
      empAddress:[this.data.empAddress|| '',Validators.required],
      empPhone:[this.data.empPhone||'',[Validators.required,Validators.pattern(/^(011|012|010)\d{8}$/)]]
    })
  }

 
  updateEmployee(){

    this.isLoading = true;
    let model = this.newEmployee.value;
    console.log(model)
    
    this.service.updatemployeebyid(model).subscribe((res:any)=>{
      
     this.isLoading = false;
     this.dialog.close(true);
    },
    error => {
     this.isLoading = false;
     console.log(this.isLoading)
    }
    )
    


  }

}
