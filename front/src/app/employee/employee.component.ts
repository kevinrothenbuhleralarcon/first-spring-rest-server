import {Component} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {first, Observable, startWith, Subject, switchMap} from "rxjs";
import {Employee} from "../model/Employee";

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeesSubject$ = new Subject();
  employees$: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    this.employees$ = this.employeesSubject$.asObservable().pipe(
      startWith(null),
      switchMap(() => this.employeeService.getEmployees())
    );
  }

  addEmployee() {
    const employee = new Employee();
    employee.firstName = "Kevin";
    employee.lastName = "Rothenbühler-Alarcon";
    employee.role = "Developer";

    this.employeeService.addEmployee(employee).pipe(first()).subscribe(() => this.employeesSubject$.next(null));
  }

  remove(id: number) {
    this.employeeService.deleteEmployee(id).pipe(first()).subscribe(() => this.employeesSubject$.next(null));
  }

}
