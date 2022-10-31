import {Component} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {BehaviorSubject, first, Observable, switchMap} from "rxjs";
import {Employee} from "../model/Employee";

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  employeesSubject$ = new BehaviorSubject(null);
  employees$: Observable<Employee[]>;
  newEmployee = new Employee();

  constructor(private employeeService: EmployeeService) {
    this.employees$ = this.employeesSubject$.asObservable().pipe(
      switchMap(() => this.employeeService.getEmployees())
    );
  }

  addEmployee() {
    if (this.validateEmployee()) {
      this.employeeService.addEmployee(this.newEmployee).pipe(first()).subscribe(() =>  {
        this.newEmployee = new Employee();
        this.employeesSubject$.next(null);
      });
    }
  }

  remove(id: number) {
    this.employeeService.deleteEmployee(id).pipe(first()).subscribe(() => this.employeesSubject$.next(null));
  }

  private validateEmployee(): boolean {
    return !(this.newEmployee.firstName === "" || this.newEmployee.lastName === "" || this.newEmployee.role === "");
  }

}
