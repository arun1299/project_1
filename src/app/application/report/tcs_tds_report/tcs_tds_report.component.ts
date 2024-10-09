/* eslint-disable no-inner-declarations */
/* eslint-disable no-empty */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { pageSelection } from 'src/app/shared/sharedIndex';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { gst_details } from './tds_tcs_report.models';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-tcs_tds_report',
  templateUrl: './tcs_tds_report.component.html',
  styleUrls: ['./tcs_tds_report.component.scss']
})
export class Tcs_tds_reportComponent implements OnInit {

  selectionType: SelectionType = SelectionType.checkbox;
  date!: FormGroup;
  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  public lastIndex = 0;
  public pageSize  = 10;
  public totalData = 0;
  public skip      = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource   !: MatTableDataSource<gst_details>;
  public totalPages  = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
   list           :Array<gst_details> =[];

  public lastIndex_1  = 0;
  public pageSize_1   = 10;
  public totalData_1  = 0;
  public skip_1       = 0;
  public limit_1   : number = this.pageSize;
  public pageIndex_1  = 0;
  public serialNumberArray_1 : Array<number> = [];
  public currentPage_1 = 1;
  public pageNumberArray_1 : Array<number> = [];
  public pageSelection_1 : Array<pageSelection> = [];

  public totalPages_1  = 0;
  public Toggledata_1  = false;
  public      show_1   = false;
  public loading       = false;
  public searchDataValue_1 =''

  input_tds       : any;
  output_tds      : any;
  input_tcs       : any;
  output_tcs      : any;
  from_date       : any;
  to_date         : any;
  bill_id         : any;
  select_data     : any;
  tax_field       : any;
  feild_value     : any;
  check_box_value : any;

   @ViewChild(DatatableComponent) table !: DatatableComponent;
   @ViewChild('headerCheckbox', { static: false }) headerCheckbox !: ElementRef;

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

      this.input_tcs   = 0;
      this.input_tds   = 0;
      this.output_tcs  = 0;
      this.output_tds  = 0;
      this.loading     = true;

   await this.api.post('mp_tds_tcs_report.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken, null)
   .then((data: any[]) => {

           this.loading = false
         if (data != null)
          {

            function levelFilter(value: { tds_percentage: number; tcs_percentage: number; }) {
              if (!value) { return false; }
               return (value.tds_percentage >0 || value.tcs_percentage >0);
              }
              let total_data = (data as any)['list'].filter(levelFilter);

             this.input_tcs   = (data as any)['input_tcs'];
             this.input_tds   = (data as any)['input_tds'];
             this.output_tcs  = (data as any)['output_tcs'];
             this.output_tds  = (data as any)['output_tds'];

             let value : gst_details []=[]
              this.totalData    = total_data.length
              total_data.map((res:gst_details , index: number) => {
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
            this.dataSource = new MatTableDataSource<gst_details>(value);
        }
    }).catch(error => { this.toastService.typeError(' Data Load Error')
                        this.loading = false
                       });
 }

 onRowClick(row:any)
 {

 }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
  {
    this.list = [];
    await this.dataSource.filteredData.map((res: gst_details, index: number) =>
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

 public PageSize(value:any): void {
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
              "Date"            : x.date,
              "Invoice No"      : x.invoice_no,
              "Bill No"         : x.bill_no,
              "Po No"           : x.po_no,
              "Tds Percentage"  : x.tds_percentage,
              "Tcs Percentage"  : x.tcs_percentage,
              "Tcs Amount"      : x.tcs_amount,
              "Status"          : x.status === 1 ? "Pending" : "Paid"
           }));
         TableExportUtil.exportToExcel(exportData, 'TDS & TCS Report');
 }

 setzero()
 {
   this.show = false;
 }

 select()
 {

 }
 onCheckboxChange(item: any)
 {

 }

  inonActivate(row : any)
  {

     this.show =true
     this.bill_id = row.bill_id
     this.select_data = row
  }

  paid_update(row : any)
  {

     this.api.post('single_field_update.php?table=tds_ledger&field=id&value='+row.id+'&up_field=status&update=2&authToken='+environment.authToken,null).then((data: any) =>
      {

        if(data.status == "success")
          {
            this.toastService.typeSuccess('Paid Successfully');
            this.loading = false;
            this.get_tabledata()
          }
          else { this.toastService.typeError('Something went wrong : paid');
              this.loading = false; }
            }).catch(error =>
            {
            this.toastService.typeError('API Faild : paid');
            this.loading = false;
            });
  }
}
