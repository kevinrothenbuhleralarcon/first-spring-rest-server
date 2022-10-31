import { Component } from '@angular/core';
import {EmployeeService} from "./employee.service";
import {Observable, startWith, Subject, switchMap} from "rxjs";
import {Employee} from "./model/Employee";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  employeesSubject$ = new Subject();
  // employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    // this.employees$ = this.employeesSubject$.asObservable().pipe(
    //   startWith(null),
    //   switchMap(() => this.employeeService.getEmployees())
    // );
  }

  remove(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.employeesSubject$.next(null));
  }
}
