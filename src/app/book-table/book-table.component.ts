import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form related modules
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ItemService } from '../services/item.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { commonStyles } from '../app.constants'
@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css',...commonStyles]
})
export class BookTableComponent implements OnInit {

  items: any[] = [];
  tables: any[] = [];
  private itemSubscription: Subscription | null = null;
  private tableSubscription: Subscription | null = null;
  reservationForm: FormGroup; // Declare FormGroup
  submitted = false; // Flag to track form submission
  minDateTime: string = ""; // Minimum date-time for datetime-local input
  selectedTable: any = null; // Declare a variable to store the selected table


  constructor(private formBuilder: FormBuilder, private itemService: ItemService, private router: Router ) {
    this.reservationForm = this.formBuilder.group({
      name: [localStorage.getItem("userName"), Validators.required],
      email: [localStorage.getItem("email"), [Validators.required, Validators.email]],
      datetime: ['', Validators.required],
      table: [this.selectedTable, Validators.required], // Initialize with selectedTable
      items: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }
    // Set minimum date-time value
    const currentDateTime = new Date().toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    this.minDateTime = currentDateTime;
    this.itemSubscription = this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
    this.tableSubscription = this.itemService.getTables().subscribe(tables => {
      this.tables = tables;
      this.selectedTable = this.tables[0]; // Set default selected value to '1'
      this.reservationForm.patchValue({ table: this.selectedTable }); // Update form control
    });

  }
  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    if (this.tableSubscription) {
      this.tableSubscription.unsubscribe();
    }
  }
  // Convenience getter for easy access to form fields
  get f() { return this.reservationForm.controls; }

  onTableSelect(table: any) {
    this.selectedTable = table; // Set the selected table
    this.reservationForm.patchValue({ table: table }); // Update form control
  }
  datepickerConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'DD/MM/YYYY HH:mm:ss'
  };

  onSubmit() {
    this.submitted = true; // Set submitted flag to true
    // Stop here if form is invalid
    if (this.reservationForm.invalid) {
      return;
    }

    // Pass the form value to the service's setOrder function
  this.itemService.setOrder(this.reservationForm.value)
  .subscribe(response => {
    // Optionally, you can reset the form after successful submission
    this.reservationForm.reset();
    this.submitted = false; // Reset submitted flag
    this.router.navigate(['/my-orders']);
  }, error => {
    console.error("Error placing order:", error);
    // Handle error if necessary
  });
  }
}
