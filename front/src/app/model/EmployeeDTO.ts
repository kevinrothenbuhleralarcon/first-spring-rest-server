import {Employee} from "./Employee";

export class EmployeeDTO {
  _embedded: EmployeeEmbedded | undefined;
  _links: string = "";
}

export class EmployeeEmbedded {
  employeeList: Employee[] = [];
}
