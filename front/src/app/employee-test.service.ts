import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Employee} from "./model/Employee";
import {EmployeeDTO} from "./model/EmployeeDTO";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EmployeeTestService {

  private baseUrl = "http://localhost:8081/";

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();


  constructor(private httpClient: HttpClient) {
    this.updateEmployeeList();
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
        tap(() => this.employeeListChanged())
      )
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "employees/" + id).pipe(
      tap(() => this.employeeListChanged())
    );
  }

  private employeeListChanged(): void {
    if (this.employeesSubject.observed) {
      this.updateEmployeeList();
    }
  }

  private updateEmployeeList(): void {
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
}

