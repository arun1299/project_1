import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { DataService, routes, ToasterService } from 'src/app/core/core.index';
import { allBlogs, apiResultFormat, pageSelection } from 'src/app/core/models/models';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss'],
})
export class AllBlogsComponent implements OnInit {
  blogs: Array<allBlogs>= [];
  dataSource!: MatTableDataSource<allBlogs>;
  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 6;
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

  constructor(
    public router: Router,
    private data: DataService,
    private toast: ToasterService
  ) {}
  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.blogs = [];
    this.serialNumberArray = [];

    this.data.getBlogs().subscribe((data: apiResultFormat) => {
      this.totalData = data.totalData;
      data.data.map((res: allBlogs, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.blogs.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<allBlogs>(this.blogs);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
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
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
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

  cancel(): void {
    this.toast.typeError('Your Imaginary file is safe :)', 'Canceled');
  }
  confirm(): void {
    this.toast.typeSuccess('Your Imaginary file is removed :)', 'Completed');
  }
}
