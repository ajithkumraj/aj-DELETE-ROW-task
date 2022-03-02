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
  Age: number;
  Place: string;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Ajith',  Age:  23, Place: 'karur' },
  { position: 2, name: 'Venom', Age: 24, Place: 'erode' },
  { position: 3, name: 'Kishore', Age:25, Place: 'coimbatore' },
  { position: 4, name: 'Suriya', Age: 26, Place: 'tirupur' },
  { position: 5, name: 'Ravi', Age: 27, Place: 'namakkal' },
  { position: 6, name: 'Risha', Age: 28, Place: 'salem' },
];
