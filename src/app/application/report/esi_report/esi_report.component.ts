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
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Esi_report } from './esi_report.models';

@Component({
  selector: 'app-esi_report',
  templateUrl: './esi_report.component.html',
  styleUrls: ['./esi_report.component.scss']
})
export class Esi_reportComponent implements OnInit {

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  public lastIndex  = 0;
  public pageSize   = 10;
  public totalData  = 0;
  public skip       = 0;
  public limit: number = this.pageSize;
  public pageIndex  = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource   !: MatTableDataSource<Esi_report>;
  public totalPages  = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
   list        :Array<Esi_report> =[];
   date        !: FormGroup;
   from_date   : any
   to_date     : any
   bill_id     : any
   select_data : any;
   loading     = false
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
    this.api.post('mp_esi_report.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken, null).then((data: any[]) => {

      if (data != null)
        {

                   let total_data = (data as any)['report'];
                   let total      = (data as any)['total'];

                   const totalRow = {
                     Date       :'',
                     Name       : 'Total',
                     Employee   : total.emp_esi,
                     Employer   : total.esi_com ,
                     Total      : total.total_esi,
                     status     : ''
                   };

                   total_data.push(totalRow);
            let value : Esi_report [] = []
            this.totalData    = total_data.length
            total_data.map((res: Esi_report, index: number) => {
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
         this.dataSource = new MatTableDataSource<Esi_report>(value);
       }
       else{
        this.toastService.typeWarning('No Data')
       }
    }).catch(error => { this.toastService.typeError(' Data Load Error')});
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
    this.list = [];
    await this.dataSource.filteredData.map((res: Esi_report, index: number) =>
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

  exportExcel()
  {
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
        "#"               : x.s_no,
        "Date"            : x.Date,
        "Name"            : x.Name,
        "Employee "       : x.Employee,
        "Employer"        : x.Employer,
        "Total"           : x.Total,
        Status            : (x.status === 1 ? "Pending" : (x.status === 2 ? "Paid" : ""))

    }));
    TableExportUtil.exportToExcel(exportData, 'ESI Report');
   }

   inonActivate(row : any)
  {
     this.bill_id = row.bill_id
     this.select_data = row
  }

  paid_update(row : any)
  {

     this.api.post('single_field_update.php?table=esi_ledger&field=id&value='+row.id+'&up_field=status&update=2&authToken='+environment.authToken,null).then((data: any) =>
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
