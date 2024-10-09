/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component ,ElementRef, ViewChild} from '@angular/core';
import { FormBuilder,  } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { bill_detail } from './acceptence_models';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-acceptence',
  templateUrl: './acceptence.component.html',
  styleUrls: ['./acceptence.component.scss']
})
export class AcceptenceComponent {
  @ViewChild('add_invoice') add_invoice  !: ElementRef;

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
  public totalPages = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
  public routes   = routes;
  loading         = false;
  transactions    :Array<bill_detail> =[];
  bill_list       :Array<bill_detail> =[];
  dataSource     !: MatTableDataSource<bill_detail>;
  bill            : any;
  SelectCategory  : any;
  type            : any;
  ItemList        : any;

  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder, public router:Router)
  {
    this.router    = router;
  }

  ngOnInit(): void {
     this.load_paymentTransactiond()
 }

 async load_paymentTransactiond()
  {
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];
    this.bill_list   = [];
    await this.api.get('mp_vendor_bill.php?&authToken=' + environment.authToken).then((data: any) =>
    {

      function levelFilter(data : any) {
        if (!data) { return false; }
         return data.status  === 1 ;
        }
       let get_data = data.filter(levelFilter);
       let value :  bill_detail[] = [];
      this.transactions = get_data;
      this.totalData    = get_data.length
      get_data.map((res: bill_detail, index: number) => {
        const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       res.id = serialNumber;
       this.bill_list.push(res);
       this.serialNumberArray.push(serialNumber);
      }
       res.id = serialNumber;
       value.push(res);
      });
      this.calculateTotalPages(this.totalData, this.pageSize);
      this.dataSource = new MatTableDataSource<bill_detail>(value);
    }).catch(error => { this.toastService.typeError('Payment Data Load Error')});
  }

  onRowClick(row:any)
  {
       this.show =true
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
  {
    this.bill_list = [];
    await this.dataSource.filteredData.map((res: bill_detail, index: number) =>
      {
      const serialNumber = index + 1;

      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.bill_list.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.bill_list.slice();
    if (!sort.active || sort.direction === '') {
      this.bill_list = data;
    } else {
      this.bill_list = data.sort((a, b) => {
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
        "Date"            : x.bill_date,
        "Bill Number"     : x.bill_number,
        "Vendor Name"     : x.vendor_name,
        "Vendor Gst"      : x.vendor_gst,
        "Due Date "       : x.bill_due_date,
        "Bill Amount"     : x.total,
        "Tax Amount"      : x.total_tax,
    }));
   TableExportUtil.exportToExcel(exportData, 'Acceptence Bill List');
  }

  selecttype()
  {
    const modalElement = this.add_invoice.nativeElement;
    $(modalElement).modal('show');
  }

  file(value :any)
  {

      this.api.post('single_field_update.php?table=bill&field=bill_id&value='+value.bill_id+'&up_field=status&update=2&authToken='+environment.authToken,null).then((data: any) =>
        {

          if(data.status == "success")
            {
              this.toastService.typeSuccess('Filed Successfully');
              this.loading = false;
              this.load_paymentTransactiond();
            }
            else {
                this.toastService.typeError('Something went wrong : Bill Filed');
                this.loading = false;
              }
              }).catch(error =>
              {
                this.toastService.typeError('API Faild : Bill Filed');
                this.loading = false;
              });
  }
}
