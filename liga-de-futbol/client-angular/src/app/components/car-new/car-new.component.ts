import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CarService}   from '../../services/car.service';
import { Car } from '../../models/car';

import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css'],
  providers: [UserService, CarService]
})
export class CarNewComponent implements OnInit {
  public page_title:string;
  public identity;
  public token;
  public car: Car;
  public status_car:string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _carService: CarService
  ) { 
      this.page_title = 'Crear nuevo Coche';
      this.identity = this._userService.getIdentity();
      this.token    = this._userService.getToken();
  }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
      if(this.identity == null ){
          this._router.navigate(["/login"]);
      }else{
          // Crear objeto coche
          this.car = new Car(1,'','',1,'',null,null);
      }
  }

  onSubmit(form){
    this._carService.create(this.token, this.car).subscribe(
        response => {
            this.car = response.car;
            this.status_car = 'success';
            this._router.navigate(['/home']);
        },
        error => {
            this.status_car = 'error';
        }
    );
  }

}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
 
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];


