import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/cats.service';

export interface Cat {
  name: string;
}

@Component({
  selector: 'app-cattwo',
  templateUrl: './cattwo.component.html',
  styleUrls: ['./cattwo.component.scss']
})
export class CattwoComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<Cat>;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(private userService: UserService) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([{name: ''}]);
    this.getCatsData();
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

  getCatsData() {
    this.userService.getCats().subscribe((response) => {
      let data: Cat[] = [];

      for(let i = 0; i < response.length; i++) {
        data[i] = {
          'name': response[i]
        }
      }
      
      this.dataSource.data = data;
    });
  }

  openImage(){
    this.userService.getCatText().subscribe((response) => {
      let url = 'https://cataas.com/cat/says/' + response.data[0]
      window.open(url, "_blank");
    });
  }

}