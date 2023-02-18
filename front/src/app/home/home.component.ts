import { Component, OnInit } from '@angular/core';
import {Employee} from "../model/Employee";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newEmployee = new Employee();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
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
