import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { commonStyles } from '../app.constants'
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css',...commonStyles],
  providers: [DatePipe]
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  userName = localStorage.getItem('userName');
  items: any[] = [];
  private itemSubscription: Subscription | null = null;

  constructor(private orderService: OrderService) { }
  onPrint(divName: string) {
    window.print();
  }
  ngOnInit(): void {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      this.itemSubscription = this.orderService.getOrdersByEmail(userEmail).subscribe(orders => {
        this.items = orders;
      });
    }

  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
  }
}

