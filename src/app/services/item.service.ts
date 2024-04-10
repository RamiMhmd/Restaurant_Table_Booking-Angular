import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITEMS, TABLES, ORDERS } from '../app.constants'; // Assuming ORDERS is defined in app.constants

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  
  getItems(): Observable<any[]> {
    return of(ITEMS);
  }

  getTables(): Observable<any[]> {
    return of(TABLES);
  }

  setOrder(orderData: any): Observable<any> {

    // Generate a unique ID for the order 
    const orderId = ORDERS.length + 1;
    // Calculate total price of items
    let totalPrice = 0;
   
      totalPrice += (orderData.items.price * orderData.table.no_of_people);
    
    // Create the order object
    const order = {
      id: orderId,
      name: orderData.name,
      email: orderData.email,
      date_time: orderData.datetime,
      table: orderData.table.name, // Assuming the table object has a 'name' property
      table_imgUrl: orderData.table.imgUrl, // Assuming the table object has an 'imgUrl' property
      no_of_people: orderData.table.no_of_people, // Assuming the table object has a 'no_of_people' property
      total: totalPrice, 
      items: orderData.items
    };

    ORDERS.push(order);
    localStorage.setItem('orders', JSON.stringify(ORDERS));
    return of({ success: true });
  }
}
