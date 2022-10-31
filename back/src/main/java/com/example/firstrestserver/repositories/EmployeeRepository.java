package com.example.firstrestserver.repositories;

import com.example.firstrestserver.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
