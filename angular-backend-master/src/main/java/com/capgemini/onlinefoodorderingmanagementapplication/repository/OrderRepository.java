package com.capgemini.onlinefoodorderingmanagementapplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgemini.onlinefoodorderingmanagementapplication.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String>{

}
