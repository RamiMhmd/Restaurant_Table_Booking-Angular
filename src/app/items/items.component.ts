import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Subscription } from 'rxjs';
import { commonStyles } from '../app.constants'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css', ...commonStyles]
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
