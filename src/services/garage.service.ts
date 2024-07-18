import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Garage } from '../models/garage.model';

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGovernmentGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/garages`) || [];
  }

  getAppGarages(): Observable<Garage[]> {
    return this.http.get<Garage[]>(`${this.apiUrl}/garages-db`) || [];
  }

  addGarages(garages: any[]): Observable<any> {
    return this.http.post<Garage[]>(`${this.apiUrl}/garages-db`, { garages });
  }

  validateGarages(garages: Garage[]): string[] {
    let allErrors: string[] = [];
    garages.forEach((garage, index) => {
      const errors = this.validateGarage(garage, index);
      if (errors.length > 0) {
        allErrors = [...allErrors, ...errors];
      }
    });
    return allErrors;
  }

  private validateGarage(garage: Garage, index: number): string[] {
    const errors: string[] = [];

    if (!garage._id) {
      errors.push(`Item ${index}: Id is required.`);
    }
    if (!garage.mispar_mosah) {
      errors.push(`Item ${index}: Missing mispar_mosah.`);
    }
    if (garage.mispar_mosah && garage.mispar_mosah < 0) {
      errors.push(`Item ${index}: mispar_mosah must be a positive number.`);
    }

    if (!garage.shem_mosah) {
      errors.push(`Item ${index}: Missing shem_mosah.`);
    }

    if (garage.cod_sug_mosah && garage.cod_sug_mosah < 0) {
      errors.push(`Item ${index}: cod_sug_mosah must be a positive number.`);
    }

    if (garage.telephone && !/^0[0-9-]{8,10}$/.test(garage.telephone)) {
      errors.push(`Item ${index}: Telephone is not correct.`);
    }

    if (garage.mikud && garage.mikud < 0) {
      errors.push(`Item ${index}: mikud must be a positive number.`);
    }

    if (garage.cod_miktzoa && garage.cod_miktzoa < 0) {
      errors.push(`Item ${index}: cod_miktzoa must be a positive number.`);
    }

    if (garage.rasham_havarot && garage.rasham_havarot < 0) {
      errors.push(`Item ${index}: rasham_havarot must be a positive number.`);
    }

    return errors;
  }
}
