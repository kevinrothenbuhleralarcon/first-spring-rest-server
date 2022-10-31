package com.example.firstrestserver.repositories;

import com.example.firstrestserver.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
