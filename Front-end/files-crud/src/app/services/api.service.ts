// api.service.ts

// Import required Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Injectable decorator, indicating that this service can be injected
@Injectable({
  providedIn: 'root',
})
// ApiService class definition
export class ApiService {
  // Define the API URL
  private apiUrl = 'http://localhost:3000/api/items';

  // Inject the HttpClient module in the constructor
  constructor(private http: HttpClient) {}

  // Method to get all items
  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to get an item by ID
  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Method to create a new item with file upload
  createItem(item: FormData): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  // Method to update an existing item with file upload
  updateItem(id: string, item: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, item);
  }

  // Method to delete an item by ID
  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
