import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css',
    '../../assets/lib/animate/animate.min.css',
    '../../assets/lib/owlcarousel/assets/owl.carousel.min.css',
    '../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
    '../../assets/css/bootstrap.min.css',
    '../../assets/css/style.css',
  ],
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

