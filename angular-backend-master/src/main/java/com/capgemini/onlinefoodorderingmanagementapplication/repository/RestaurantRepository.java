package com.capgemini.onlinefoodorderingmanagementapplication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgemini.onlinefoodorderingmanagementapplication.model.Restaurant;


@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	Optional<Restaurant> findByUsernameAndEmail(String username, String email);

}
