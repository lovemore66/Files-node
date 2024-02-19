import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css'],
})
export class ItemEditComponent implements OnInit {
  updatedItem: any = {
    name: '',
    description: '',
    image: null,
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    const itemId: any = this.route.snapshot.paramMap.get('id');
    this.apiService.getItemById(itemId).subscribe((data) => {
      this.updatedItem = data;
    });
  }
  updateItem(): void {
    const formData = new FormData();
    formData.append('name', this.updatedItem.name);
    formData.append('description', this.updatedItem.description);
    formData.append('image', this.updatedItem.image);

    this.apiService.updateItem(this.updatedItem._id, formData).subscribe(() => {
      console.log('Item updated successfully');
    });
  }
  handleFileInput(event: any): void {
    this.updatedItem.image = event.target.files[0];
  }
}
