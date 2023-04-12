import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  restaurantId: number;
  formSubmitted = false;
  selectedFile: File = null;
  newItem: any;
  upload = false;

  itemName: FormControl;
  itemPrice: FormControl;
  description: FormControl;

  addItemForm: FormGroup;


  constructor(private route: ActivatedRoute, private itemService: ItemService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    console.log(this.selectedFile);

    this.route.paramMap.subscribe(params =>
      {
        this.restaurantId = +params.get("id");
      });


    this.itemName = new FormControl('');
    this.itemPrice = new FormControl('');
    this.description = new FormControl('');
    
    this.addItemForm = new FormGroup({
      'itemName': this.itemName,
      'itemPrice': this.itemPrice,
      'description': this.description,
    });
  }

  onSubmit()
  {
    this.restaurantService.addItemByRestaurantId(this.restaurantId, this.addItemForm.value).subscribe(data => {
      console.log(data);
      this.newItem = data; //return the current added item
      this.onUpload(); //add the image
    },
    error => console.log(error));

    
    this.formSubmitted = true;
  }

  onFileChanged(event)
  {
    this.selectedFile = event.target.files[0];
    this.upload = true;
  }

  onUpload()
  {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('itemImage', this.selectedFile, this.selectedFile.name);
    this.itemService.addItemImage(this.newItem.itemId, uploadImageData).subscribe(data =>
      {
        console.log(data);
      });
    
  }

}
