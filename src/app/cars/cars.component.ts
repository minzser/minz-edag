import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Car {
  id: number;
  brand: string;
  type: string;
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  selectedFilter = 'all';
  displayedColumns: string[] = ['id', 'brand', 'type'];
  dataSource: MatTableDataSource<Car>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  cars = [
    {
      id: 1,
      brand: 'Volkswagen',
      type: 'Golf'
    },
    {
      id: 2,
      brand: 'BMW',
      type: 'Golf'
    },
    {
      id: 3,
      brand: 'Mercedes-Benz',
      type: 'GLC'
    },
    {
      id: 4,
      brand: 'Mercedes-Benz',
      type: 'Coupe'
    }
  ];

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.cars);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterBrand(filterValue: any) {
    filterValue = filterValue.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: Car, filterValue): boolean => {
      return (
        data.brand.toLocaleLowerCase().includes(filterValue)
      )
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectionChange(value: string) {
    this.selectedFilter = value;
  }
}