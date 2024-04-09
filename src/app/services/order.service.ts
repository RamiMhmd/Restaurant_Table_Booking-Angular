import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrdersByEmail(email: string): Observable<any[]> {
    const ORDERS = localStorage.getItem("orders") || "[]";

    const filteredOrders = JSON.parse(ORDERS).filter((order: any) => order.email === email);
    return of(filteredOrders);
  }
}
