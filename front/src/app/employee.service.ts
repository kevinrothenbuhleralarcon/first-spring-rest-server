import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Employee} from "./model/Employee";
import {EmployeeDTO} from "./model/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8080/";
  private child: Child;

  constructor(private httpClient: HttpClient) {
    this.child = new Child();
    this.child.form = "coucou";
    this.child.logForm();
    this.child.logForm();
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

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "employees/" + id);
  }
}


export class Parent {
  public form: String = "";

  logForm() {
    this.form = "parent"
    console.log(this.form)
  }
}

export class Child extends Parent {
  override logForm() {
    console.log(this.form)
    super.logForm();
  }
}

