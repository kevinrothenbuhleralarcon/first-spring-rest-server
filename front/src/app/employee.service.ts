import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {Employee} from "./model/Employee";
import {EmployeeDTO} from "./model/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/";

  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor(private httpClient: HttpClient) {
    this.updateEmployee()
  }

  employees(): Observable<Employee[]> {
    return this.employeesSubject;
  }

  private updateEmployee(): void {
    this.httpClient.get<EmployeeDTO>(this.baseUrl + "employees")
      .pipe(
        map(employee => {
          if (employee._embedded?.employeeList !== undefined)
            return employee?._embedded?.employeeList
          else
            return []
        })
      ).subscribe((employees) => this.employeesSubject.next(employees));
  }

  addEmployee(employee: Employee): Observable<Employee[]> {
    return this.httpClient.post<EmployeeDTO>(this.baseUrl + 'employees', employee)
      .pipe(
        map(employee => {
          if (employee._embedded?.employeeList !== undefined)
            return employee?._embedded?.employeeList
          else
            return []
        }),
        tap(() => this.updateEmployee())
      )
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "employees/" + id).pipe(
      tap(() => this.updateEmployee())
    );
  }
}

