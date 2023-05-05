
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
  itemId:any;
  selection = new SelectionModel<Employee>(true, []);
  lengthtnewdatasource:number= 0;
  
  page: number = 1;
  count: number = 0;
  tableSize: number = 0;
  tableSizes: any = [0];
  public p = 1;
  public total = 10;
  start:any;
  last:any;

  
 

  constructor(public dialog: MatDialog,private spinner: NgxSpinnerService, private service:EmployeeService,private modalService: NgbModal ) {}
  ngOnInit(): void {
    this.getAllEmployee();
 
    


  }
  public pageChange(event: number): void {
    this.p = event;
        console.log(this.p);
   
  }

listCount(count:any) {
  this.start = count;
  this.start = this.start * 10 - 9;
  this.last = count * 10;
  if (this.last > this.lengthtnewdatasource) {
    this.last = this.lengthtnewdatasource;
   
  }

 
}

  // onPage(event: any) {}
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllEmployee();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllEmployee();
  }


// GET ALL EMPLOYYE 
  getAllEmployee(){
    this.spinner.show()
   this.service.getalltasks().subscribe((res:Employee[])=>{
    this.lengthtnewdatasource = res.length
    this.spinner.hide();
    this.last;
    this.start;
    this.listCount(this.p);
   
   
   
   
    if(res.length > 0)
    {
      this.dataSource= new MatTableDataSource<Employee>(res)
      this.message = '';
      this.newdatasource=this.dataSource.data
      this.dataSource.sort=this.sort;
      this.emplyeefound= true;
      this.start;
      this.last;
    }
    else{
      this.message = 'No employees found';
      this.dataSource= new MatTableDataSource<Employee>(res);
      this.emplyeefound=false
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
    this.getAllEmployee(); 
   
  }, (reason) => {
    this.getAllEmployee(); 
   
  });
}
deleteDataselect(){
  this.selectemployee.forEach((item:any) => {
    console.log(item.empId);
    this.service.delteempolybyid(item.empId).subscribe((res:any)=>{
    
      this.getAllEmployee(); 
      

    },error=>{

    })
   

  });
}
/// add employee //
addEmployee(){
  this.getAllEmployee();
  let dialogRef = this.dialog.open(AddEmpolyeeComponent, {
    width: '320px',
   
  });

  dialogRef.afterClosed().subscribe(result => {

    if(result){
       this.getAllEmployee();
       this.last;
       this.start;
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
findIDSpecfic(item:any){
 
  this.itemId = item.empId 
  
}

deleteData() {
   
  this.service.delteempolybyid(this.itemId).subscribe((res:any)=>{
    
    this.getAllEmployee(); 
   

  },error=>{

  })
  this.getAllEmployee(); 

 }

}
