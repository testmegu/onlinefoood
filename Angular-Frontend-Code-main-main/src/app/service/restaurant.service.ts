import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private baseUrl = 'http://localhost:8083/canteen/api/v1/restaurants';

  constructor(private http: HttpClient) { }

  addrestaurant(restaurant: Object): Observable<Object>
  {
    return this.http.post(`${this.baseUrl}`, restaurant);
  }

  getAllRestaurants(): Observable<any>
  {
    return this.http.get(`${this.baseUrl}`);
  }

  getRestaurant(id: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addItemByRestaurantId(restaurantId: number, item: any)
  {
    return this.http.post(`${this.baseUrl}/${restaurantId}/menu`, item);
  }

  getMenuByRestaurantId(restaurantId: number): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${restaurantId}/menu`);
  }

  deleteItemByItemIdAndRestaurantId(itemId: number, restaurantId: number)
  {
    return this.http.delete(`${this.baseUrl}/${restaurantId}/menu/${itemId}`, { responseType: 'text' });
  }

  getRestaurantByUsernameAndEmail(username: string, email: string): Observable<any>
  {
    return this.http.get(`${this.baseUrl}/${username}/${email}`);
  }

  updateRestaurant(id: number, value: any): Observable<any>
  {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}
