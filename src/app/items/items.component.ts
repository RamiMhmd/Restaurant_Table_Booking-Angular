import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css',
    '../../assets/lib/animate/animate.min.css',
    '../../assets/lib/owlcarousel/assets/owl.carousel.min.css',
    '../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css',
    '../../assets/css/bootstrap.min.css',
    '../../assets/css/style.css',
  ]
})
export class ItemsComponent implements OnInit, OnDestroy {

  items: any[] = [];
  private itemSubscription: Subscription | null = null;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemSubscription = this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
  }
}
