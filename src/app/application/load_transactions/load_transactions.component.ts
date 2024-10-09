/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {  loan_transaction } from './load_transaction.models';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-load_transactions',
  templateUrl: './load_transactions.component.html',
  styleUrls: ['./load_transactions.component.scss']
})
export class Load_transactionsComponent implements OnInit {
  @ViewChild('add') add!: ElementRef;
  @ViewChild('edit')  edit!: ElementRef;
  public routes = routes;
   view_details  = false;
   public Toggledata  = false;

   public item_list : Array<loan_transaction> = [];
   dataSource          !: MatTableDataSource<loan_transaction>;
   public searchDataValue = '';

  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit = this.pageSize;
  public pageIndex = 0;
  public currentPage = 1;
  public serialNumberArray: Array<number> = [];
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  detail_view        = [];
  selected           = [];
  category_filter    = [];

  select_id          : any;
  update_categogy_id : any;
  new_category_id    : any;
  uom_list           : any;
  tax_list           : any;
  category           : any;
  loading :  boolean = false;
  public uid         = localStorage.getItem('uid');
  public bank_id     = localStorage.getItem('loan_id');
  EditItem = new FormGroup
  ({
    bank_id             : new FormControl(this.bank_id),
    amount              : new FormControl('', [Validators.required]),
    intrest             : new FormControl('', [Validators.required]),
    intrest_percentage  : new FormControl(null),
    principal_amount    : new FormControl('', [Validators.required]),
    emi                 : new FormControl('',[Validators.required]),

  });

  NewItem = new FormGroup
  ({
    created_by          : new FormControl(this.uid),
    bank_id             : new FormControl(this.bank_id),
    amount              : new FormControl('', [Validators.required]),
    intrest             : new FormControl('', [Validators.required]),
    intrest_percentage  : new FormControl('', [Validators.required]),
    principal_amount    : new FormControl('', [Validators.required]),
    emi                 : new FormControl('', [Validators.required]),
    status              : new FormControl('1', [Validators.required])
  });

  constructor(public api: ApiService, public toastService: ToasterService,public router:Router)
  { }

ngOnInit(): void {
  this.getTableData();

}

async getTableData()
{
  this.item_list             = [];
  this.serialNumberArray     = [];
  this.pageNumberArray       = [];

  await this.api.get('get_data.php?table=loan_transaction_data&find=bank_acco&value='+this.bank_id+'&authToken='+environment.authToken).then((data: any) =>
      {

        let value :  loan_transaction[] = [];
        if(data != null)
        {
            this.totalData = data.length;
            data.map((res: loan_transaction, index: number) => {
                  const serialNumber = index + 1;
                if (index >= this.skip && serialNumber <= this.limit) {
                    res.s_no = serialNumber;
                      this.item_list.push(res);
                      this.serialNumberArray.push(serialNumber);

                  }
                  res.s_no = serialNumber;
                  value.push(res);
            });
            this.calculateTotalPages(this.totalData, this.pageSize);
            this.dataSource = new MatTableDataSource<loan_transaction>(value);
         }
        else{
          this.toastService.typeWarning('No Data list');
        }
      }).catch(error => {
        this.toastService.typeError('API Faild : loadData list');
      });
}

public searchData(value: any): void {
  this.dataSource.filter = value.trim().toLowerCase();
  this.totalData = this.dataSource.filteredData.length;
  this.item_list = [];
  this.callData();
}

async callData()
{
  this.item_list = [];
  await this.dataSource.filteredData.map((res: loan_transaction, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.s_no = serialNumber;
      this.item_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });
  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}

public sortData(sort: Sort) {
  const data = this.item_list.slice();
  if (!sort.active || sort.direction === '') {
    this.item_list = data;
  } else {
    this.item_list = data.sort((a, b) => {
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

 public PageSizeCall(value : any): void {
  this.pageSize = parseInt(value);
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

 exportExcel() {
  const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
       '#' : x.id,

    }));

  TableExportUtil.exportToExcel(exportData, 'Item List');
 }

  open() {
   this.Toggledata = !this.Toggledata;
 }

 async onRowClick(row:any)
    {
      this.detail_view = row;
      this.select_id   = row.id;
      this.EditItem.controls['amount'].setValue(row.amount);
      this.EditItem.controls['intrest'].setValue(row.	intrest);
      this.EditItem.controls['intrest_percentage'].setValue(row.intrest_percentage);
      this.EditItem.controls['principal_amount'].setValue(row.princ_amou);
      this.EditItem.controls['emi'].setValue(row.emi);
    }

    paid(item : any)
    {
      this.api.post('single_field_update.php?table=loan_transaction_data&field=id&value='+item.id+'&up_field=status&update=2&authToken='+environment.authToken,null).then((data: any) =>
        {

          if(data.status == "success")
            {
              this.toastService.typeSuccess('Paid Successfully');
              this.loading = false;
              this.getTableData()
            }
            else {
                this.toastService.typeError('Something went wrong : Paid Filed');
                this.loading = false;
              }
              }).catch(error =>
              {
                this.toastService.typeError('API Faild : Paid Filed');
                this.loading = false;
              });
    }
    edit_view()
    {
      const modalElement = this.edit.nativeElement;
      $(modalElement).modal('show');
    }

    Add_tran()
    {
      const modalElement = this.add.nativeElement;
      $(modalElement).modal('show');
    }

    async EditSubmit(data:any)
    {
      this.loading=true;
      await this.api.post('post_update_data.php?table=loan_transaction_data&field=id&value=' + this.select_id + '&authToken=' + environment.authToken, data).then((data_rt: any) =>
      {

        if (data_rt.status == "success")
        {
          this.toastService.typeSuccess('Updated Succesfully');
          this.loading=false;
          this.getTableData()
        }
        else { this.toastService.typeError(data_rt.status);
          this.loading = false; }
          const modalElement = this.edit.nativeElement;
          $(modalElement).modal('hide');
          this.getTableData();
        return true;
      }).catch(error => {this.toastService.typeError('API Faild : Updated');
      this.loading = false;});
    }


  async AddSubmit(data:any)
  {
    this.NewItem.controls['created_by'].setValue(this.uid);

      Object.keys(this.NewItem.controls).forEach(field => {
        this.NewItem.get(field)?.markAsTouched({ onlySelf: true });
      });
    if (this.NewItem.valid)
    {
      this.loading = true;
      this.NewItem.controls['created_by'].setValue(this.uid);
      await this.api.post('post_insert_data.php?table=loan_transaction_data&authToken=' + environment.authToken, this.NewItem.value).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.loading = false;
            this.toastService.typeSuccess('Added Succesfully');
            this.NewItem.controls['created_by'].setValue(this.uid);
            this.NewItem.controls['amount'].setValue(null);
            this.NewItem.controls['intrest'].setValue(null);
            this.NewItem.controls['intrest_percentage'].setValue(null);
            this.NewItem.controls['principal_amount'].setValue(null);
            this.NewItem.controls['emi'].setValue(null);
            this.getTableData();
            const modalElement = this.add.nativeElement;
            $(modalElement).modal('hide');
          }
        else
        {
          this.toastService.typeError(data.status);
          this.loading = false;
        }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild :Added failed');
          this.loading = false;
      });
    }
  }

  setzero()
  {
    this.router.navigate(['/rent_ledger', ]);
  }
}
