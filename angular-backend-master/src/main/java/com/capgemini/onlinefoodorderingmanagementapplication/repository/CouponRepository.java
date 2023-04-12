package com.capgemini.onlinefoodorderingmanagementapplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgemini.onlinefoodorderingmanagementapplication.model.Coupon;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long>{
	
	//select * from coupon where customerid = ?
	List<Coupon> findByCustomer_CustomerId(Long custId);

}
