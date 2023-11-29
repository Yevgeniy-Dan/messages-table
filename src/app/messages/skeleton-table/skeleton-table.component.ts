import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-skeleton-table',
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss'],
})
export class SkeletonTableComponent {
  displayedColumns = ['name', 'message', 'createdAt'];
  skeletonDataSource = new MatTableDataSource<any>();

  constructor() {
    this.skeletonDataSource.data = Array(10).fill({});
  }
}
