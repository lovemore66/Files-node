import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css'],
})
export class ItemCreateComponent implements OnInit {
  newItem: any = {
    name: '',
    description: '',
    image: null,
  };

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {}

  createItem(): void {
    const formData = new FormData();
    formData.append('name', this.newItem.name);
    formData.append('description', this.newItem.description);
    formData.append('image', this.newItem.image);

    this.apiService.createItem(formData).subscribe(() => {
      console.log('Item created successfully');

    });
  }
  handleFileInput(event: any): void {
    this.newItem.image = event.target.files[0];
  }
}
