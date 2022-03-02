import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

 
@Component({
  selector: 'table-selection-example',
  styleUrls: ['table-selection-example.css'],
  templateUrl: 'table-selection-example.html',
})
export class TableSelectionExample {
  displayedColumns = ['select', 'position', 'name', 'weight', 'symbol'];
  data = Object.assign(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Element>(this.data);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    console.log(this.data);
  }

   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      let index: number = this.data.findIndex((d) => d === item);
      console.log(this.data.findIndex((d) => d === item));
      this.dataSource.data.splice(index, 1);

      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

   masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
];
