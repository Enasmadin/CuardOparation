import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../inteface/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getalltasks(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>("http://task.soft-zone.net/api/Employees/getAllEmployees");
  }
  createEmplyee(model:Employee):Observable<Employee[]>{
    return this.http.post<Employee[]>("http://task.soft-zone.net/api/Employees/addEmployee",model)
  }

  delteempolybyid(id: number):Observable<Employee[]>{
    
    return this.http.get<Employee[]>("http://task.soft-zone.net/api/Employees/deleteEmpByID/"+ id)

  }
  getemployeebyid(id:number):Observable<Employee[]>{
    return this.http.get<Employee[]>("http://task.soft-zone.net/api/Employees/getEmpByID/"+ id)
  }
  updatemployeebyid(modal:Employee):Observable<Employee[]>{
    return this.http.post<Employee[]>("http://task.soft-zone.net/api/Employees/editEmployee", modal)
  }
}
