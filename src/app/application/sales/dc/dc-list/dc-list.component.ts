/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { TableElement, TableExportUtil } from 'src/app/shared';

import { Router } from '@angular/router';
import {dc_detail } from './dc-models';
declare let $: any;

@Component({
  selector: 'app-dc-list',
  templateUrl: './dc-list.component.html',
  styleUrls: ['./dc-list.component.scss']
})
export class DcListComponent implements OnInit {

  @ViewChild('add_dc') add_dc  !: ElementRef;

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

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
  public totalPages = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
  public routes = routes;
  loading  =false;
  transactions       :Array<dc_detail> =[];
  dc_list            :Array<dc_detail> =[];
  dataSource        !: MatTableDataSource<dc_detail>;
  invoice            : any;
  SelectCategory     : any;
  type               : any;
  ItemList           : any;

  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder, public router:Router)
  {
    this.router    = router;


    this.SelectCategory = fb.group({
      invoicetype:[null, Validators.compose([Validators.required])],
     })
  }

  ngOnInit(): void {

     this.load_paymentTransactiond()
 }

 load_paymentTransactiond()
  {
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];
    this.dc_list   = [];
     this.api.get('mp_customer_dc.php?&authToken=' + environment.authToken).then((data: any) =>
    {
      const value :  dc_detail[] = [];
      this.transactions = data;
      this.totalData    =data.length
      data.map((res: dc_detail, index: number) => {
        const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       res.id = serialNumber;
       this.dc_list.push(res);
       this.serialNumberArray.push(serialNumber);
       }
       res.id = serialNumber;
       value.push(res)
      });
      this.dataSource = new MatTableDataSource<dc_detail>(value);
      this.calculateTotalPages(this.totalData, this.pageSize);
    }).catch(error => { this.toastService.typeError('DC Data Load Error')});
  }

  onRowClick(row:any)
  {
       this.show =true
       localStorage.setItem('view_bill', row.serial_no);
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
{
  this.dc_list = [];

  await this.dataSource.filteredData.map((res: dc_detail, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.id = serialNumber;
      this.dc_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }

  });

  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}

  public sortData(sort: Sort) {
    const data = this.dc_list.slice();
    if (!sort.active || sort.direction === '') {
      this.dc_list = data;
    } else {
      this.dc_list = data.sort((a, b) => {
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
    this.pageSize = parseInt (value)
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

  AddSubmit(data:any)
  {

    this.type = data.invoicetype;
    localStorage.setItem('inv_type',this.type);
    this.loading = true;
    if(this.type != null)
    {
      this.addDc();
      this.api.get('get_data.php?table=item&find=sales&value=1&authToken=' + environment.authToken).then((data: any) =>
        {
          this.ItemList = data;
        }).catch(error => { this.toastService.typeError('Something went wrong in LoadItemDetails'); });
    }
    else{
      this.toastService.typeError('Select any Type');
    }

     this.loading = false;
  }

  addDc()
  {
    this.router.navigate(['/sales', 'delivery_challan', 'add_dc']);
    // const modalElement = this.add_invoice.nativeElement;
    // $(modalElement).modal('hide');
  }

  open() {
    this.Toggledata = !this.Toggledata;
  }

  setzero()
  {
    this.show = false;
    this.load_paymentTransactiond();
  }

  exportExcel()
  {
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
        "#"               : x.id,
        "Date"            : x.dc_date,
        "DC Number"  : x.dc_number,
        "Reference Number": x.reference_number,
        "Customer Name"   : x.customer_name,
        "Due Date "       : x.dc_due_date,
        "Bill Amount"     : x.total,
    }));
   TableExportUtil.exportToExcel(exportData, 'Dc  List');
  }

  selecttype()
  {
    const modalElement = this.add_dc.nativeElement;
    $(modalElement).modal('show');
  }
}
