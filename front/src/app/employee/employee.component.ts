import {Component, OnInit} from "@angular/core";
import {Observable, share, shareReplay, switchMap, tap} from "rxjs";
import {Employee} from "../model/Employee";
import {EmployeeService} from "../employee.service";


@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees$!: Observable<Employee[]>;
  newEmployee = new Employee();

  // constructor(private employeeService: EmployeeTestService) {}
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.employeesListUpdated$.pipe(
      switchMap(() => this.employeeService.getEmployeeList()),
      tap(() => console.log('test')),
      share(),
    )
  }

  addEmployee() {
    if (this.validateEmployee()) {
      this.employeeService.addEmployee(this.newEmployee).subscribe(() => this.newEmployee = new Employee());
    }
  }

  remove(id: number) {
    this.employeeService.deleteEmployee(id).subscribe();
  }

  private validateEmployee(): boolean {
    return !(this.newEmployee.firstName === "" || this.newEmployee.lastName === "" || this.newEmployee.role === "");
  }
}
