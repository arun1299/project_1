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
import { Expense_models } from './expense_report.models';


@Component({
  selector: 'app-expense_report',
  templateUrl: './expense_report.component.html',
  styleUrls: ['./expense_report.component.scss']
})
export class Expense_reportComponent implements OnInit {
  date!: FormGroup;
  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource   !: MatTableDataSource<Expense_models>;
  public totalPages = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
   list          :Array<Expense_models> =[];
   from_date       : any;
   to_date         : any;
   expense_list    : any;
   exp_id          : any;
   total_attedance : any;
   worked_hours    : any = 0;
   ot_hours        : any = 0;
   pl_hours        : any = 0;
   sl_hours        : any = 0;
   cl_hours        : any = 0;
   worked_days     : any = 0;
   ot_days         : any = 0;
   pl_days         : any = 0;
   sl_days         : any = 0;
   cl_days         : any = 0;
   name            : any;

 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {

   this.date = fb.group({
     id  : [null,Validators.compose([Validators.required])],
     fromdate: [null,Validators.compose([Validators.required])],
     todate  : [null,Validators.compose([Validators.required])],
   });

 }

 ngOnInit() {
          this.api.get('get_data.php?table=expense_account&find=status&value=1&authToken=' + environment.authToken).then((data: any) =>
            {
               this.expense_list = data;
            }).catch(error => {this.toastService.typeError('API Faild : loadTranseaction');});
   }

 download(value:any)
 {
   this.from_date  = value.fromdate
   this.to_date    = value.todate
   this.exp_id     =  value.id

   let name = this.expense_list.find((t: {id:any})=>t.id == value.id);
   this.name = name.account_name
   this.get_tabledata();
 }
 async get_tabledata()
 {
   this.serialNumberArray     = [];
   this.pageNumberArray       = [];
   this.list   = [];

   this.api.get('mp_expense_report.php?value='+this.exp_id+'&from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken).then((data: any) => {

    if (data != null)
      {
            let total_data = (data as any)['report'];

           let value : Expense_models [] = []
           this.totalData    = total_data.length
           total_data.map((res: Expense_models, index: number) => {
           const serialNumber = index + 1;
           if (index >= this.skip && serialNumber <= this.limit) {
           res.s_no = serialNumber;
           this.list.push(res);
           this.serialNumberArray.push(serialNumber);
          }
          res.s_no = serialNumber;
          value.push(res);
       });
       this.calculateTotalPages(this.totalData, this.pageSize);
       this.dataSource = new MatTableDataSource<Expense_models>(value);
    }
    else{
      this.toastService.typeWarning('No Data')
    }
   }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }

 onRowClick(row:any)
 {

 }

 public searchData(value: any): void {
   this.dataSource.filter = value.trim().toLowerCase();
   this.totalData = this.dataSource.filteredData.length;
   this.callData();
 }

 async callData()
  {
    this.list = [];
    await this.dataSource.filteredData.map((res: Expense_models, index: number) =>
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

 public PageSize(value : any): void {
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

 exportExcel()
 {
   const exportData: Partial<TableElement>[] =
   this.dataSource.filteredData.map((x) => ({
       "#"               : x.s_no,
       "Date"            : x.Transaction_Date,
       "Mode"            : x.exp_mode === 1 ? "Wire" : (x.exp_mode === 2 ? "Case":"Cheque"),
       "Amount"          : x.Amount,
       "Exp Type "       : x.exp_type ===1 ? "Goods":"Service",
       "Tax Amount"      : x.Tax_Amount,
       "Expence Account" : x.Expence_Account,
       "Notes"           : x.Notes,
   }));
   TableExportUtil.exportToExcel(exportData, this.name+' Account Report');
  }

}
