import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';




@Component({
  selector: 'app-add-empolyee',
  templateUrl: './add-empolyee.component.html',
  styleUrls: ['./add-empolyee.component.scss']
})
export class AddEmpolyeeComponent implements OnInit  {
  
   newEmployee!:FormGroup;
   isLoading = false;
   constructor( private fb:FormBuilder , public dialog: MatDialogRef<AddEmpolyeeComponent> , public matDialog:MatDialog,private service:EmployeeService) { }

  ngOnInit(): void {
    this.createNewEmpolyee();
   
  }

 
  createNewEmpolyee(){
    this.newEmployee=this.fb.group({
      empName:['', Validators.required],
    
      empEmail:['', [Validators.required,Validators.pattern('^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      empAddress:['',Validators.required],
      empPhone:['',[Validators.required,Validators.pattern(/^(011|012|010)\d{8}$/)]]
    })
  }
  createEmpolyee(){
    this.isLoading = true;
   let model = this.newEmployee.value
   
   this.service.createEmplyee(model).subscribe(res=>{
    this.isLoading = false;
    this.dialog.close(true);
   },
   error => {
    this.isLoading = false;
   }
   )}

  }
   
  
 
 

