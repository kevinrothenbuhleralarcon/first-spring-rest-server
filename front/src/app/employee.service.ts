import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Employee} from "./model/Employee";
import {HttpClient} from "@angular/common/http";
import {EmployeeDTO} from "./model/EmployeeDTO";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "http://localhost:8081/";

  private _employeeListUpdatedSubject$ = new BehaviorSubject<string>('init')
  employeesListUpdated$ = this._employeeListUpdatedSubject$.asObservable();


  constructor(private httpClient: HttpClient) {}

  getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<EmployeeDTO>(this.baseUrl + "employees")
      .pipe(
        map(employee => {
          if (employee._embedded?.employeeList !== undefined)
            return employee?._embedded?.employeeList
          else
            return []
        })
      );
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
        tap(() => this._employeeListUpdatedSubject$.next('employee.add'))
      );
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "employees/" + id).pipe(
      tap(() => this._employeeListUpdatedSubject$.next('employee.delete'))
    );
  }
}
