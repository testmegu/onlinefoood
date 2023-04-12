package com.capgemini.onlinefoodorderingmanagementapplication.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.capgemini.onlinefoodorderingmanagementapplication.exception.ResourceNotFoundException;
import com.capgemini.onlinefoodorderingmanagementapplication.model.Item;
import com.capgemini.onlinefoodorderingmanagementapplication.repository.ItemRepository;
import com.capgemini.onlinefoodorderingmanagementapplication.repository.RestaurantRepository;



@CrossOrigin(origins = "*")
@RestController 
@RequestMapping("/api/v1")
public class ItemController {
	
	@Autowired
	private ItemRepository itemRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	//get menu for corresponding vendor
	@GetMapping("/restaurants/{restaurantId}/menu")
	public List<Item> getMenuByRestaurantId(@PathVariable(value = "restaurantId") Long restaurantId)
	{
		return itemRepository.findByRestaurant_RestaurantId(restaurantId);
	}
	
	//Get all items to create a menu
	@GetMapping("/menu")
	public List<Item> getMenu()
	{
		return itemRepository.findAll();
	}
	
	//Add a new item for corresponding vendor
	@PostMapping("/restaurants/{restaurantId}/menu")
	public Item saveItemByRestaurantId(@PathVariable(value = "restaurantId") Long restaurantId,
			@Valid @RequestBody Item item) throws ResourceNotFoundException
	{
		return restaurantRepository.findById(restaurantId).map(restaurant ->{
			item.setRestaurant(restaurant);
			return itemRepository.save(item);
		}).orElseThrow(() -> new ResourceNotFoundException("restaurant not found"));
	}
	
	//Add a new item in menu
	@PostMapping("/menu")
	public Item createItem(@Valid @RequestBody Item item)
	{
		
		return itemRepository.save(item);
	}
	
	
	@GetMapping("/menu/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable(value = "itemId") Long itemId)
        throws ResourceNotFoundException {
        Item item = itemRepository.findById(itemId)
          .orElseThrow(() -> new ResourceNotFoundException("Item not found for this id :: " + itemId));
        return ResponseEntity.ok().body(item);
    }
	
	
	@PutMapping("/menu/{itemId}")
    public ResponseEntity<Item> updateItem(@PathVariable(value = "itemId") Long itemId,
         @Valid @RequestBody Item itemDetails) throws ResourceNotFoundException
	{
        Item item = itemRepository.findById(itemId)
        .orElseThrow(() -> new ResourceNotFoundException("Item not found for this id :: " + itemId));

        item.setItemName(itemDetails.getItemName());
        item.setItemPrice(itemDetails.getItemPrice());
        item.setDescription(itemDetails.getDescription());  
        
        final Item updatedItem = itemRepository.save(item);
        return ResponseEntity.ok(updatedItem);
    }
	
	//Delete an item according to itemId and vendorId
	@DeleteMapping("/restaurants/{restaurantId}/menu/{itemId}")
	public ResponseEntity<?> deleteItem(@PathVariable(value = "restaurantId") Long restaurantId, 
			@PathVariable(value = "itemId") Long itemId)
	throws ResourceNotFoundException
	{
		return itemRepository.findByItemIdAndRestaurant_RestaurantId(itemId, restaurantId).map(item -> {
			itemRepository.delete(item);
		return ResponseEntity.ok().build();
		}).orElseThrow(()->new ResourceNotFoundException("item not found"));
	}
	
	
}
