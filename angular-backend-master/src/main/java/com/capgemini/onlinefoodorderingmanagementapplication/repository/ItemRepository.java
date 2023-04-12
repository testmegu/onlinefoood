package com.capgemini.onlinefoodorderingmanagementapplication.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capgemini.onlinefoodorderingmanagementapplication.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
	
	List<Item> findByRestaurant_RestaurantId(Long restaurantId);
	Optional<Item> findByItemIdAndRestaurant_RestaurantId(Long itemId, Long restaurantId);

}
