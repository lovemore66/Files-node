// item-edit.component.ts

// Import required Angular modules and the ApiService
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

// Decorator and component definition
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  // Define an object to store updated item data including file
  updatedItem: any = {
    name: '',
    description: '',
    image: null,
  };

  // Inject the ApiService and ActivatedRoute in the constructor
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  // Lifecycle hook, called when the component is initialized
  ngOnInit(): void {
    // Get item ID from route parameters
    const itemId: any = this.route.snapshot.paramMap.get('id');

    // Call the service method to get item details and subscribe to the observable
    this.apiService.getItemById(itemId).subscribe((data) => {
      this.updatedItem = data;
    });
  }

  // Method to update an existing item with file upload
  updateItem(): void {
    const formData = new FormData();
    formData.append('name', this.updatedItem.name);
    formData.append('description', this.updatedItem.description);
    formData.append('image', this.updatedItem.image);

    this.apiService.updateItem(this.updatedItem._id, formData).subscribe(() => {
      console.log('Item updated successfully');
      // Optionally, navigate to the item list or reset the form
    });
  }

  // Method to handle file input change
  handleFileInput(event: any): void {
    this.updatedItem.image = event.target.files[0];
  }
}
