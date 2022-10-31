import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Employee} from "./model/Employee";
import {EmployeeDTO} from "./model/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<EmployeeDTO>(this.baseUrl + "employees")
      .pipe(map(employee => {
        if (employee._embedded?.employeeList !== undefined)
          return  employee?._embedded?.employeeList
        else
          return []
      }))
  }

  addEmployee(employee: Employee): Observable<Employee[]> {
    return this.httpClient.post<EmployeeDTO>(this.baseUrl + 'employees', employee)
      .pipe(map(employee => {
        if (employee._embedded?.employeeList !== undefined)
          return  employee?._embedded?.employeeList
        else
          return []
      }))
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "employees/" + id);
  }
}

