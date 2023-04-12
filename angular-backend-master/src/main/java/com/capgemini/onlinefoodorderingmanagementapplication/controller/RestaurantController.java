package com.capgemini.onlinefoodorderingmanagementapplication.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.onlinefoodorderingmanagementapplication.exception.ResourceNotFoundException;
import com.capgemini.onlinefoodorderingmanagementapplication.model.Customer;
import com.capgemini.onlinefoodorderingmanagementapplication.model.Restaurant;
import com.capgemini.onlinefoodorderingmanagementapplication.repository.RestaurantRepository;

@CrossOrigin(origins = "*")
@RestController 
@RequestMapping("/api/v1")
public class RestaurantController {
	
	@Autowired
	RestaurantRepository restaurantRepository;
	
	@PostMapping("/restaurants")
	public Restaurant createRestaurant(@Valid @RequestBody Restaurant restaurant)
	{
		return restaurantRepository.save(restaurant);
	}
	
	@GetMapping("/restaurants")
	public List<Restaurant> getAllRestaurants()
	{
		return restaurantRepository.findAll();
	}

	//Get vendor by id
	@GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable(value = "id") Long restaurantId)
        throws ResourceNotFoundException {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
          .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found for this id :: " + restaurantId));
        return ResponseEntity.ok().body(restaurant);
	}
	
	//Get vendor by username and email
	@GetMapping("/restaurants/{username}/{email}")
	public ResponseEntity<Restaurant> getRestaurantByUsernameAndEmail(@PathVariable(value = "username") String username,
			@PathVariable(value = "email") String email) throws ResourceNotFoundException {
		Restaurant restaurant = restaurantRepository.findByUsernameAndEmail(username, email)
	          .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found " ));
	        return ResponseEntity.ok().body(restaurant);
		}
	
	//update vendor
	@PutMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable(value = "id") Long restaurantId,
         @Valid @RequestBody Restaurant restaurantDetails) throws ResourceNotFoundException {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
        .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found for this id :: " + restaurantId));

        restaurant.setEmail(restaurantDetails.getEmail());
        restaurant.setLastName(restaurantDetails.getLastName());
        restaurant.setFirstName(restaurantDetails.getFirstName());
        restaurant.setUsername(restaurantDetails.getUsername());
        restaurant.setPassword(restaurantDetails.getPassword());
        restaurant.setFoodSpecialization(restaurantDetails.getFoodSpecialization());
        
        final Restaurant updatedRestaurant = restaurantRepository.save(restaurant);
        return ResponseEntity.ok(updatedRestaurant);
    }
	
}
