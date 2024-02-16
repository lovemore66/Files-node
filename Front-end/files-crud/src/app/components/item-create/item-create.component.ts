// item-create.component.ts

// Import required Angular modules and the ApiService
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

// Decorator and component definition
@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
})
export class ItemCreateComponent implements OnInit {
  // Define an object to store new item data including file
  newItem: any = {
    name: '',
    description: '',
    image: null,
  };

  // Inject the ApiService in the constructor
  constructor(private apiService: ApiService) {}

  // Lifecycle hook, called when the component is initialized
  ngOnInit(): void {}

  // Method to create a new item with file upload
  createItem(): void {
    const formData = new FormData();
    formData.append('name', this.newItem.name);
    formData.append('description', this.newItem.description);
    formData.append('image', this.newItem.image);

    this.apiService.createItem(formData).subscribe(() => {
      console.log('Item created successfully');
      // Optionally, navigate to the item list or reset the form
    });
  }

  // Method to handle file input change
  handleFileInput(event: any): void {
    this.newItem.image = event.target.files[0];
  }
}
