/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { pageSelection } from 'src/app/shared/sharedIndex';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { bill_details, bill_transaction } from './bill_report.models';

@Component({
  selector: 'app-bill_report',
  templateUrl: './bill_report.component.html',
  styleUrls: ['./bill_report.component.scss']
})
export class Bill_reportComponent implements OnInit {

  date!: FormGroup;
  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  public lastIndex     = 0;
  public pageSize      = 10;
  public totalData     = 0;
  public skip          = 0;
  public limit: number = this.pageSize;
  public pageIndex     = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage   = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource   !: MatTableDataSource<bill_details>;
  public totalPages    = 0;
  public Toggledata    = false;
  public      show     = false;
  public searchDataValue =''
   list          :Array<bill_details> =[];

   public lastIndex_1  = 0;
  public pageSize_1    = 10;
  public totalData_1   = 0;
  public skip_1        = 0;
  public limit_1 : number = this.pageSize;
  public pageIndex_1   = 0;
  public serialNumberArray_1 : Array<number> = [];
  public currentPage_1 = 1;
  public pageNumberArray_1 : Array<number> = [];
  public pageSelection_1 : Array<pageSelection> = [];
  dataSource_1   !: MatTableDataSource<bill_transaction>;
  public totalPages_1  = 0;
  public Toggledata_1  = false;
  public      show_1   = false;
  public searchDataValue_1 =''
   list_1          :Array<bill_transaction> =[];

   from_date   : any
   to_date     : any
   bill_id     : any
   select_data : any;
 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {

   this.date = fb.group({
     fromdate: [null,Validators.compose([Validators.required])],
     todate  : [null,Validators.compose([Validators.required])],
   });

 }

 ngOnInit() {
 }

 download(value:any)
 {

   this.from_date  = value.fromdate
   this.to_date    = value.todate
   this.get_tabledata();
 }
 async get_tabledata()
 {
   this.serialNumberArray     = [];
   this.pageNumberArray       = [];
   this.list   = [];
   await this.api.post('mp_bill_report.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&type=bill_details&authToken=' + environment.authToken, null)
   .then((data: any[]) => {

         if (data != null)
          {
             let total_data = (data as any)['report'];
             let totalSales = 0;
             let totalBalance = 0;
             total_data.forEach((data: { Bill_Amount: any; Balance_Amount: any; }) => {
                 totalSales += data.Bill_Amount;
                totalBalance += data.Balance_Amount;
              });

              totalSales     = parseFloat(totalSales.toFixed(2));
              totalBalance   = parseFloat(totalBalance.toFixed(2));

              const totalRow = {
                Status: '',
                Bill_Date: '',
               Customer_Name: '',
               Due_Date: '',
               Bill:'',
               Vendor_Name:'Total',
               Bill_Amount:totalSales,
               Balance_Amount:totalBalance,
            };

              total_data.push(totalRow);
              let value :  bill_details []= []
              this.totalData    = total_data.length
              total_data.map((res: bill_details, index: number) => {
              const serialNumber = index + 1;
              if (index >= this.skip && serialNumber <= this.limit) {
              res.s_no = serialNumber;
              this.list.push(res);
              this.serialNumberArray.push(serialNumber);

                }
                res.s_no = serialNumber;
                value.push(res)
                });
            this.calculateTotalPages(this.totalData, this.pageSize);
           this.dataSource = new MatTableDataSource<bill_details>(value);
         }
         else{
          this.toastService.typeWarning('No Data')
         }
   }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }



 onRowClick(row:any)
 {
  if(row.Vendor_Name != 'Total')
    {
      this.show =true
      this.bill_id = row.bill_id
      this.select_data = row
      this.getTransaction();
    }
 }


 getTransaction()
  {
    this.serialNumberArray_1     = [];
    this.pageNumberArray_1       = [];
    this.list_1   = [];
   this.api.get('get_data.php?table=payment_made&find=bill_id&value='+this.bill_id+'&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data != null)
        {

               let total_data = data ;
               let value :  bill_transaction []= []
              this.totalData_1    = total_data.length
              total_data.map((res: bill_transaction, index: number) => {
              const serialNumber = index + 1;
              if (index >= this.skip_1 && serialNumber <= this.limit_1) {
              res.s_no = serialNumber;
              this.list_1.push(res);
              this.serialNumberArray_1.push(serialNumber);

               }
               res.s_no = serialNumber;
               value.push(res)
             });
             this.calculateTotalPages_1(this.totalData_1, this.pageSize_1);
             this.dataSource_1 = new MatTableDataSource<bill_transaction>(value);
         }
         else
            {

              this.toastService.typeWarning('No Data');
            }
          }).catch(error => { this.toastService.typeError('Something went wrong');
          });

  }

 public searchData(value: any): void {
   this.dataSource.filter = value.trim().toLowerCase();
   this.totalData = this.dataSource.filteredData.length;
   this.callData()
 }

 async callData()
    {
      this.list = [];
      await this.dataSource.filteredData.map((res: bill_details, index: number) =>
        {
          const serialNumber = index + 1;

          if (index >= this.skip && serialNumber <= this.limit) {
            res.s_no = serialNumber;
            this.list.push(res);
            this.serialNumberArray.push(serialNumber);
          }
      });

      this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
    }

 public sortData(sort: Sort) {
   const data = this.list.slice();
   if (!sort.active || sort.direction === '') {
     this.list = data;
   } else {
     this.list = data.sort((a, b) => {
       const aValue = (a as any)[sort.active];
       const bValue = (b as any)[sort.active];
       return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
     });
   }
 }

 public getMoreData(event: string): void {
   if (event == 'next') {
     this.currentPage++;
     this.pageIndex = this.currentPage - 1;
     this.limit += this.pageSize;
     this.skip = this.pageSize * this.pageIndex;
     this.callData();
   } else if (event == 'previous') {
     this.currentPage--;
     this.pageIndex = this.currentPage - 1;
     this.limit -= this.pageSize;
     this.skip = this.pageSize * this.pageIndex;
     this.callData();
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
   this.callData();
 }

 public PageSize( value: any): void {
   this.pageSize = parseInt(value)
   this.pageSelection = [];
   this.limit = this.pageSize;
   this.skip = 0;
   this.currentPage = 1;
   this.callData();
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

 public searchData_1(value: any): void {
  this.dataSource_1.filter = value.trim().toLowerCase();
  this.totalData_1 = this.dataSource_1.filteredData.length;
  this.callData_1()
}


async callData_1()
{
  this.list_1 = [];
  await this.dataSource_1.filteredData.map((res: bill_transaction, index: number) =>
    {
      const serialNumber = index + 1;

      if (index >= this.skip_1 && serialNumber <= this.limit_1) {
        res.s_no = serialNumber;
        this.list_1.push(res);
        this.serialNumberArray_1.push(serialNumber);
      }
  });

  this.calculateTotalPages_1(this.dataSource_1.filteredData.length, this.pageSize_1);
}
public sortData_1(sort: Sort) {
  const data = this.list_1.slice();
  if (!sort.active || sort.direction === '') {
    this.list_1 = data;
  } else {
    this.list_1 = data.sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }
}

public getMoreData_1(event: string): void {
  if (event == 'next') {
    this.currentPage_1++;
    this.pageIndex_1 = this.currentPage_1 - 1;
    this.limit_1 += this.pageSize_1;
    this.skip_1 = this.pageSize_1 * this.pageIndex_1;
    this.callData_1();
  } else if (event == 'previous') {
    this.currentPage_1--;
    this.pageIndex_1 = this.currentPage_1 - 1;
    this.limit_1 -= this.pageSize_1;
    this.skip_1 = this.pageSize_1 * this.pageIndex_1;
    this.callData_1();
  }
}

public moveToPage_1(pageNumber: number): void {
  this.currentPage_1 = pageNumber;
  this.skip_1 = this.pageSelection_1[pageNumber - 1].skip;
  this.limit_1 = this.pageSelection_1[pageNumber - 1].limit;
  if (pageNumber > this.currentPage_1) {
    this.pageIndex_1 = pageNumber - 1;
  } else if (pageNumber < this.currentPage_1) {
    this.pageIndex_1 = pageNumber + 1;
  }
  this.callData_1();
}

public PageSize_1(): void {
  this.pageSelection_1 = [];
  this.limit_1 = this.pageSize_1;
  this.skip_1 = 0;
  this.currentPage_1 = 1;
  this.callData_1();
}

private calculateTotalPages_1(totalData: number, pageSize: number): void {
  this.pageNumberArray_1 = [];

  this.totalPages_1 = totalData / pageSize;
  if (this.totalPages_1 % 1 != 0) {
    this.totalPages_1 = Math.trunc(this.totalPages_1 + 1);
  }
  for (let i = 1; i <= this.totalPages_1; i++) {
    const limit = pageSize * i;
    const skip = limit - pageSize;
    this.pageNumberArray_1.push(i);
    this.pageSelection_1.push({ skip: skip, limit: limit });
  }
}

 exportExcel()
 {
          const exportData: Partial<TableElement>[] =
          this.dataSource.filteredData.map((x) => ({
              "#"               : x.s_no,
              "Status"          : x.Status,
              "Bill Date"       : x.Bill_Date,
              "Due Date"        : x.Due_Date,
              "Bill"            : x.Bill,
              "Vendor Name"     : x.Vendor_Name,
              "Bill Amount"     : x.Bill_Amount,
              "Balance Amount"  : x.Balance_Amount
           }));
         TableExportUtil.exportToExcel(exportData, 'Bill Report');
 }

 exportExcel_1()
 {

 }

 setzero()
 {
   this.show = false;
 }
}
