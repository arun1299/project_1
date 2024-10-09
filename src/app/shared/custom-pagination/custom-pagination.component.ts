
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import {
  pageSelection,
  pageSize,
  pageSizeCal,
  PaginationService,
} from './pagination.service';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss'],
})
export class CustomPaginationComponent {
  public pageSize = 10;
  public tableData: Array<string> = [];
  public data : any;
  // pagination variables
  public lastIndex = 0;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  //** / pagination variables

  constructor(private pagination: PaginationService,) {
    this.tableData = [];
    this.pagination.calculatePageSize.subscribe((res: pageSizeCal) => {
       this.data = res.totalData
      this.calculateTotalPages(
        res.totalData,
        res.pageSize,
        res.tableData,
        res.serialNumberArray
      );
      this.pageSize = res.pageSize;
    });
    this.pagination.changePagesize.subscribe((res: pageSize) => {
      this.changePageSize(res.pageSize);
    });
    //console.log(res.totalData)
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      // this.getTableData();
      this.pagination.tablePageSize.next({
        skip: this.skip,
        limit: this.limit,
        pageSize: this.pageSize,
      });
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      // this.getTableData();
      this.pagination.tablePageSize.next({
        skip: this.skip,
        limit: this.limit,
        pageSize: this.pageSize,
      });
    }
    console.log()
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,
    });
  }

  public changePageSize(pageSize: number): void {
    console.log("page size",pageSize)
    this.pageSelection = [];
    this.limit = pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
    this.pagination.tablePageSize.next({
      skip: this.skip,
      limit: this.limit,
      pageSize: this.pageSize,

    });


    this.pagination.calculatePageSize.subscribe((res: pageSizeCal) => {
      this.calculateTotalPages(
        res.totalData,
        res.pageSize,
        res.tableData,
        res.serialNumberArray
      );
      this.pageSize = res.pageSize;
    });

  }

  public calculateTotalPages(
    totalData: number,
    pageSize: number,
    tableData: Array<string>,
    serialNumberArray: Array<number>
  ): void {
    console.log(tableData)
    this.tableData = tableData;
    this.pageNumberArray = [];
    this.serialNumberArray = serialNumberArray;
    this.totalData = totalData;
    this.totalPages = totalData / pageSize;
    console.log("total Data ",this.totalData)
    console.log("page size",pageSize)
    console.log("total ",this.totalPages)
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
