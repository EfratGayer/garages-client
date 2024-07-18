import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { GarageService } from '../services/garage.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Garage } from '../models/garage.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Garages';
  garages: Garage[] = [];
  governmentGarages: Garage[] = [];
  selectedGarages = new FormControl([]);

  errors: string[] = [];

  displayedColumns: (keyof Garage)[] = [
    '_id',
    'originalId',
    'mispar_mosah',
    'shem_mosah',
    'cod_sug_mosah',
    'sug_mosah',
    'ktovet',
    'yishuv',
    'telephone',
    'mikud',
    'cod_miktzoa',
    'miktzoa',
    'menahel_miktzoa',
    'rasham_havarot',
    'TESTIME',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  private garageSubscription?: Subscription;
  private governmentGarageSubscription?: Subscription;
  private addSubscription?: Subscription;

  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    this.garageSubscription = this.garageService
      .getAppGarages()
      .subscribe((data: Garage[]) => {
        this.garages = data;
      });

    this.governmentGarageSubscription = this.garageService
      .getGovernmentGarages()
      .subscribe((data: Garage[]) => {
        this.governmentGarages = data;
      });
  }

  addGarages() {
    this.errors = [];
    const selected: Garage[] = this.selectedGarages?.value || [];
    this.errors = this.garageService.validateGarages(selected);
    if (this.errors.length === 0)
      this.addSubscription = this.garageService
        .addGarages(selected)
        .subscribe((data) => {
          this.garages = [...this.garages, ...data];
          this.selectedGarages.reset();
        });
  }

  ngOnDestroy(): void {
    this.garageSubscription?.unsubscribe();
    this.governmentGarageSubscription?.unsubscribe();
    this.addSubscription?.unsubscribe();
  }
}
