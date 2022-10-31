import { Component } from '@angular/core';
import {EmployeeService} from "./employee.service";
import {first, Observable, startWith, Subject, switchMap} from "rxjs";
import {Employee} from "./model/Employee";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {

  }
}
