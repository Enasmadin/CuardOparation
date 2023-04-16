
import { AfterViewInit, Component, Inject, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

import {  MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmpolyeeComponent } from '../add-empolyee/add-empolyee.component';
import { UpdateCopmponentComponent } from '../update-copmponent/update-copmponent.component';
import { Employee } from 'src/app/inteface/employee';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-index-employee',
  templateUrl: './index-employee.component.html',
  styleUrls: ['./index-employee.component.scss']
})
export class IndexEmployeeComponent {
  dataSource:any;
  newdatasource:any;
  displayedColumns: string[] = ['select','empName' , 'empEmail' ,'empAddress','empPhone', 'actions'];
  @ViewChild(MatSort)
  sort!: MatSort;
  message?: string;
  selectemployee:any;
  emplyeefound:boolean=false;
  resultsLength = 0;
  selection = new SelectionModel<Employee>(true, []);

  constructor(public dialog: MatDialog,private spinner: NgxSpinnerService, private service:EmployeeService,private modalService: NgbModal ) {}
  ngOnInit(): void {
    this.getAllEmployee()
  }


// GET ALL EMPLOYYE 
  getAllEmployee(){
    this.spinner.show()
   this.service.getalltasks().subscribe((res:Employee[])=>{

    this.spinner.hide()
    if(res.length > 0)
    {
      this.dataSource= new MatTableDataSource<Employee>(res)
      console.log(this.dataSource.data);
      this.newdatasource=this.dataSource.data
      this.dataSource.sort=this.sort;
      this.emplyeefound= true
    }
    else{
      this.message = 'No employees found';
    }
    
    
  },error=>{ 
    this.spinner.hide()
   })}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    this.selectemployee= this.selection.selected;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach((row:any) => this.selection.select(row));
    }
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    
// modal delte collection //

open(content:any) {
   
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' } ).result.then((result) => {
   
  }, (reason) => {
   
  });
}
deleteDataselect(){
  this.selectemployee.forEach((item:any) => {
    console.log(item.empId);
    this.service.delteempolybyid(item.empId).subscribe((res:any)=>{
    
      this.getAllEmployee(); 
      

    },error=>{

    })
    this.getAllEmployee(); 

  });
}
/// add employee //
addEmployee(){
  let dialogRef = this.dialog.open(AddEmpolyeeComponent, {
    width: '320px',
   
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.getAllEmployee();
    }
  });
}
/// updata employee 

upDateEmployee(item:any){
  let dialogRef = this.dialog.open(UpdateCopmponentComponent, {
         width: '400px',
         data:item
       
     });
     
  dialogRef.afterClosed().subscribe(result => {
    if(result){
   this.getAllEmployee();
    }
   });

}
// delte specfic employee 

deleteData(item:any) {
   
  this.service.delteempolybyid(item.empId).subscribe((res:any)=>{
    
    this.getAllEmployee(); 
   

  },error=>{

  })
  this.getAllEmployee(); 
}



 

}
