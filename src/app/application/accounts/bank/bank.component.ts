/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import {   pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { bank_details, exp_transaction, expense_details, transaction } from './bank-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
declare let $: any;
import {TableElement, TableExportUtil } from '../../../shared';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent  implements OnInit {

  @ViewChild('editAccountModal') editAccountModal!: ElementRef;
  @ViewChild('addAccountModal') addAccountModal!: ElementRef;
  @ViewChild('editExpenseModal') editExpenseModal!: ElementRef;
  @ViewChild('addExpenseModal') addExpenseModal!: ElementRef;

  public customers: Array<bank_details> = [];
  dataSource!: MatTableDataSource<bank_details>;

  public transactions: Array<transaction> = [];
  tran_dataSource!: MatTableDataSource<transaction>;

  public exp_list: Array<expense_details> = [];
  exp_dataSource!: MatTableDataSource<expense_details>;

  public exp_transactions: Array<exp_transaction> = [];
  exp_tran_dataSource!: MatTableDataSource<exp_transaction>;

  transeaction_det:Array<bank_details> =[];
  bankdata        :Array<bank_details> =[];

  expenseData     :Array<expense_details> =[];
  expense_transeaction_det :Array<exp_transaction> =[];

  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;

  public routes = routes;
  modalRef!   : BsModalRef;
  selected    =  [];

  public searchDataValue = '';
  public exp_searchDataValue = '';
  public tran_searchDataValue = '';
  public exp_searchDataValue_tran = '';

  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public currentPage = 1;
  public serialNumberArray: Array<number> = [];
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  public lastIndex_1 = 0;
  public pageSize_1 = 10;
  public totalData_1 = 0;
  public skip_1 = 0;
  public limit_1: number = this.pageSize_1;
  public pageIndex_1 = 0;
  public currentPage_1 = 1;
  public serialNumberArray_1: Array<number> = [];
  public pageNumberArray_1: Array<number> = [];
  public pageSelection_1: Array<pageSelection> = [];
  public totalPages_1 = 0;

  public exp_lastIndex = 0;
  public exp_pageSize = 10;
  public exp_totalData = 0;
  public exp_skip = 0;
  public exp_limit: number = this.exp_pageSize;
  public exp_pageIndex = 0;
  public exp_currentPage = 1;
  public exp_serialNumberArray: Array<number> = [];
  public exp_pageNumberArray: Array<number> = [];
  public exp_pageSelection: Array<pageSelection> = [];
  public exp_totalPages = 0;

  public exp_lastIndex_1 = 0;
  public exp_pageSize_1 = 10;
  public exp_totalData_1 = 0;
  public exp_skip_1 = 0;
  public exp_limit_1: number = this.exp_pageSize_1;
  public exp_pageIndex_1 = 0;
  public exp_currentPage_1 = 1;
  public exp_serialNumberArray_1: Array<number> = [];
  public exp_pageNumberArray_1: Array<number> = [];
  public exp_pageSelection_1: Array<pageSelection> = [];
  public exp_totalPages_1 = 0;
  //** / pagination variables

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  date        !: FormGroup;
  addAccount  !: FormGroup;
  addExpense  !: FormGroup;

  expense_detail_view : any;
  selected_bank_id    : any;
  selected_id         : any;
  detail_view         : any;
  selection           : any;
  displayedColumns    : any;

  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder,private modalService: BsModalService,
    ) {
      this.date = fb.group(
        {
          fromdate       : [null],
          todate         : [null],
        })

    this.addAccount = fb.group(
      {
        'created_by'    : [this.uid],
         account_name   : [null, Validators.compose([Validators.required, Validators.minLength(3)])],
         mode           : [0, Validators.compose([Validators.required, Validators.min(1)])],
         opening_balance: [0],
        'type'          : ['1'],
        'status'        : ['1']
      }
    )

    this.addExpense = fb.group(
      {
        'created_by'    : [this.uid],
         account_name   : [null, Validators.compose([Validators.required, Validators.minLength(3)])],
         mode           :[null, Validators.compose([Validators.required])],
        'status'        : ['1']
      }
    )
  }

  ngOnInit(): void {
     this.getTableData()
  }


async  getTableData()
  {
    this.customers             = [];
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];

    this.exp_serialNumberArray = [];
    this.exp_list              = [];
    this.exp_pageNumberArray   = [];

    if (this.user_type == "super_admin")
      {
     await   this.api.get('get_data.php?table=bank&find=type&value=1&authToken=' + environment.authToken).then((data: any) =>
        {
          const value :  bank_details[] = [];

      if(data != null)
      {
          this.bankdata  = data;
          this.totalData = data.length;

          data.map((res: bank_details, index: number) => {
                 const serialNumber = index + 1;
               if (index >= this.skip && serialNumber <= this.limit) {
                res.id = serialNumber;
                this.customers.push(res);
                this.serialNumberArray.push(serialNumber);

                }
                res.id = serialNumber;
                value.push(res);
           });

           this.calculateTotalPages(this.totalData, this.pageSize);
           this.dataSource = new MatTableDataSource<bank_details>(value);
          }
          else{
            this.toastService.typeWarning('No Data  bank list');
          }
        }).catch(error => {
          this.toastService.typeError('API Faild : loadData  bank list');
        });
      }

      if (this.user_type != "super_admin")
      {
       await   this.api.get('get_data.php?table=bank&find=bank_id&value='+this.user_bank_id+'&authToken=' + environment.authToken).then((data: any) =>
        {
          this.bankdata = data;
          this.totalData = data.length;
          const value_1:  bank_details[] = [];

          data.map((res: bank_details, index: number) => {
               const serialNumber = index + 1;
              if (index >= this.skip && serialNumber <= this.limit) {
                  res.id = serialNumber;
                  this.customers.push(res);
                  this.serialNumberArray.push(serialNumber);
              }
              res.id = serialNumber;
              value_1.push(res);
           });

           this.calculateTotalPages(this.totalData, this.pageSize);
           this.dataSource = new MatTableDataSource<bank_details>(value_1);

        }).catch(error => {
          this.toastService.typeError('API Faild : loadData bank list');
        });
      }

    await  this.api.get('get_data.php?table=expense_account&authToken=' + environment.authToken).then((data: any) =>
      {
         this.expenseData = data;
         this.exp_totalData = data.length;
         const value_2:  expense_details[] = [];
         data.map((res: expense_details, index: number) => {
               const serialNumber = index + 1;
             if (index >= this.exp_skip && serialNumber <= this.exp_limit) {
              res.s_no = serialNumber;
              this.exp_list.push(res);
              this.exp_serialNumberArray.push(serialNumber);

             }
             res.s_no = serialNumber;
             value_2.push(res)
          });
          this.exp_calculateTotalPages(this.exp_totalData, this.exp_pageSize);
          this.exp_dataSource = new MatTableDataSource<expense_details>(value_2);
      }).catch(error => {
        this.toastService.typeError('API Faild : loadData expence');
      });
  }


  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
   // this.customers = this.dataSource.filteredData;
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;

    this.callData();
  }

  public exp_searchData(value: any): void {
    this.exp_dataSource.filter = value.trim().toLowerCase();
   // this.exp_list = this.exp_dataSource.filteredData;
    this.exp_totalData = this.exp_dataSource.filteredData.length;
    this.exp_callData()
  }

  async exp_callData()
  {
    this.exp_list = [];
    await this.exp_dataSource.filteredData.map((res: expense_details, index: number) =>
      {
      const serialNumber = index + 1;

      if (index >= this.exp_skip && serialNumber <= this.exp_limit) {
        res.id = serialNumber;
        this.exp_list.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.exp_calculateTotalPages(this.exp_dataSource.filteredData.length, this.exp_pageSize);
  }

  async callData()
  {
    this.customers = [];
    await this.dataSource.filteredData.map((res: bank_details, index: number) =>
      {
      const serialNumber = index + 1;

      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.customers.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.customers.slice();
    if (!sort.active || sort.direction === '') {
      this.customers = data;
    } else {
      this.customers = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  public exp_sortData(sort: Sort) {
    const data = this.exp_list.slice();
    if (!sort.active || sort.direction === '') {
      this.exp_list = data;
    } else {
      this.exp_list = data.sort((a, b) => {
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


  public exp_getMoreData(event: string): void {
    if (event == 'next') {
      this.exp_currentPage++;
      this.exp_pageIndex = this.exp_currentPage - 1;
      this.exp_limit += this.exp_pageSize;
      this.exp_skip = this.exp_pageSize * this.exp_pageIndex;
      this.exp_callData();
    } else if (event == 'previous') {
      this.exp_currentPage--;
      this.exp_pageIndex = this.exp_currentPage - 1;
      this.exp_limit -= this.exp_pageSize;
      this.exp_skip = this.exp_pageSize * this.exp_pageIndex;
      this.exp_callData();
    }
  }


  public exp_moveToPage(pageNumber: number): void {
    this.exp_currentPage = pageNumber;
    this.exp_skip = this.exp_pageSelection[pageNumber - 1].skip;
    this.exp_limit = this.exp_pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.exp_currentPage) {
      this.exp_pageIndex = pageNumber - 1;
    } else if (pageNumber < this.exp_currentPage) {
      this.exp_pageIndex = pageNumber + 1;
    }
    this.exp_callData();
  }

  public PageSize(value : any): void {

    this.pageSize = parseInt(value)
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.callData();
  }

  public exp_PageSize(value : any): void {

    this.exp_pageSize = parseInt(value)
    this.exp_pageSelection = [];
    this.exp_limit = this.exp_pageSize;
    this.exp_skip = 0;
    this.exp_currentPage = 1;
    this.exp_callData();
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

  private exp_calculateTotalPages(totalData: number, pageSize: number): void {
    this.exp_pageNumberArray = [];

    this.exp_totalPages = totalData / pageSize;
    if (this.exp_totalPages % 1 != 0) {
      this.exp_totalPages = Math.trunc(this.exp_totalPages + 1);
    }
    for (let i = 1; i <= this.exp_totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.exp_pageNumberArray.push(i);
      this.exp_pageSelection.push({ skip: skip, limit: limit });
    }
  }

  open() {
    this.Toggledata = !this.Toggledata;
  }

  onRowClick(row:any)
  {
    this.show = true;
    this.detail_view = row;
    this.selected_bank_id   = row.bank_id;
    this.addAccount.controls['account_name'].setValue(this.detail_view.account_name);
    this.addAccount.controls['mode'].setValue(this.detail_view.mode);
    this.addAccount.controls['opening_balance'].setValue(this.detail_view.opening_balance);

    this.loadTranseaction()
    this.date.reset();
  }

  onClick(row:any)
  {
    this.exp_show = true;
    this.expense_detail_view = row;
    this.selected_id   = row.id;
    this.addExpense.controls['account_name'].setValue(this.expense_detail_view.account_name);

   this.ExpenceloadTranseaction();
    this.date.reset();
  }


  loadTranseaction()
  {

    this.transactions =[];
    this.serialNumberArray_1 = [];
    this.pageNumberArray_1= [];
        this.api.get('get_data.php?table=bank_transactions&find=bank_id&value='+this.selected_bank_id+'&asign_field=tran_id&asign_value=DESC&authToken=' + environment.authToken).then((data: any) =>
        {
          const bank_tran : transaction [] =[]

          if(data != null)
          {
            this.transeaction_det = data;
            this.totalData_1 = data .length;
            data.map((res: transaction, index: number) => {
            const serialNumber = index + 1;
           if (index >= this.skip_1 && serialNumber <= this.limit_1) {
                res.tran_id = serialNumber;
                this.transactions.push(res);
                this.serialNumberArray_1.push(serialNumber);
                }
                res.tran_id = serialNumber;
                bank_tran.push(res)
           });
           this.tran_dataSource = new MatTableDataSource<transaction>(bank_tran);
           this.calculateTotalPages_tran(this.totalData_1, this.pageSize_1);
          }
          else{
            this.toastService.typeWarning('No Transactions')
          }
        }).catch(error => {this.toastService.typeError('API Faild : loadTranseaction');});
}


ExpenceloadTranseaction()
  {
    this.exp_transactions =[];
    this.exp_serialNumberArray_1 = [];
    this.exp_pageNumberArray_1 = [];

    this.api.get('get_data.php?table=expense&find=exp_account&value='+this.selected_id+'&asign_field=exp_id&asign_value=DESC&authToken=' + environment.authToken).then((data: any) =>
    {
          const value : exp_transaction [] = []
          this.expense_transeaction_det = data;
          if(data != null)
          {
                  this.expense_transeaction_det = data;
                  this.exp_totalData_1 = data .length;
                  data.map((res: exp_transaction, index: number) => {
                  const serialNumber = index + 1;
                          if (index >= this.exp_skip_1 && serialNumber <= this.exp_limit_1) {
                                res.exp_id = serialNumber;
                                this.exp_transactions.push(res);
                                this.exp_serialNumberArray_1.push(serialNumber);
                                }
                                res.exp_id = serialNumber;
                                value.push(res)
                          });
                this.exp_tran_dataSource = new MatTableDataSource<exp_transaction>(value);
                this.exp_calculateTotalPages_tran(this.exp_totalData_1, this.exp_pageSize_1);
          }
          else{
            this.toastService.typeWarning('No Transactions')
          }
    }).catch(error => {this.toastService.typeError('API Faild : loadTranseaction');});
  }

public searchData_tran(value: any): void {
  this.tran_dataSource.filter = value.trim().toLowerCase();
  this.totalData_1 = this.tran_dataSource.filteredData.length;

}

async callData_tran()
{
      this.transactions = [];
          await this.tran_dataSource.filteredData.map((res: transaction, index: number) =>
            {
            const serialNumber = index + 1;

            if (index >= this.skip_1 && serialNumber <= this.limit_1) {
              res.tran_id = serialNumber;
              this.transactions.push(res);
              this.serialNumberArray.push(serialNumber);
            }
          });

    this.calculateTotalPages_tran(this.tran_dataSource.filteredData.length, this.pageSize_1);
}

  public exp_searchData_tran(value: any): void {
    this.exp_tran_dataSource.filter = value.trim().toLowerCase();
    this.exp_totalData_1 = this.exp_tran_dataSource.filteredData.length;
  }


async exp_callData_tran()
{
     this.transactions = [];
        await this.exp_tran_dataSource.filteredData.map((res: exp_transaction, index: number) =>
          {
          const serialNumber = index + 1;

          if (index >= this.exp_skip_1 && serialNumber <= this.exp_limit_1) {
            res.exp_id = serialNumber;
            this.exp_transactions.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });

        this.exp_calculateTotalPages_tran( this.exp_tran_dataSource.filteredData.length, this.exp_pageSize_1);
}


public sortData_tran(sort: Sort) {
  const data = this.transactions.slice();
  if (!sort.active || sort.direction === '') {
    this.transactions = data;
  } else {
    this.transactions = data.sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }
}


public exp_sortData_tran(sort: Sort) {
  const data = this.exp_transactions.slice();
  if (!sort.active || sort.direction === '') {
    this.exp_transactions = data;
  } else {
    this.exp_transactions = data.sort((a, b) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }
}

public getMoreData_tran(event: string): void {
  if (event == 'next') {
    this.currentPage_1++;
    this.pageIndex_1 = this.currentPage_1 - 1;
    this.limit_1 += this.pageSize_1;
    this.skip_1 = this.pageSize_1 * this.pageIndex_1;
    this.callData_tran();
  } else if (event == 'previous') {
    this.currentPage_1--;
    this.pageIndex_1 = this.currentPage_1 - 1;
    this.limit_1 -= this.pageSize_1;
    this.skip_1 = this.pageSize_1 * this.pageIndex_1;
    this.callData_tran();
  }
}

public exp_getMoreData_tran(event: string): void {
  if (event == 'next') {
    this.exp_currentPage_1++;
    this.exp_pageIndex_1 = this.exp_currentPage_1 - 1;
    this.exp_limit_1 += this.exp_pageSize_1;
    this.exp_skip_1 = this.exp_pageSize_1 * this.exp_pageSize_1;
    this.exp_callData_tran()
  } else if (event == 'previous') {
    this.exp_currentPage_1--;
    this.exp_pageIndex_1 = this.exp_currentPage_1 - 1;
    this.exp_limit_1 -= this.exp_pageSize_1;
    this.exp_skip_1 = this.exp_pageSize_1 * this.exp_pageIndex_1;
    this.exp_callData_tran();
  }
}

public moveToPage_tran(pageNumber: number): void {
  this.currentPage_1 = pageNumber;
  this.skip_1 = this.pageSelection_1[pageNumber - 1].skip;
  this.limit_1 = this.pageSelection_1[pageNumber - 1].limit;
  if (pageNumber > this.currentPage_1) {
    this.pageIndex = pageNumber - 1;
  } else if (pageNumber < this.currentPage_1) {
    this.pageIndex_1 = pageNumber + 1;
  }
  this.callData_tran();
}

public exp_moveToPage_tran(pageNumber: number): void {
        this.exp_currentPage_1 = pageNumber;
        this.exp_skip_1 = this.exp_pageSelection_1[pageNumber - 1].skip;
        this.exp_limit_1 = this.exp_pageSelection_1[pageNumber - 1].limit;
        if (pageNumber > this.exp_currentPage_1) {
          this.exp_pageIndex_1 = pageNumber - 1;
        } else if (pageNumber < this.exp_currentPage_1) {
          this.exp_pageIndex_1 = pageNumber + 1;
        }
        this.exp_callData_tran();
}

public PageSize_tran(): void {
  this.pageSelection_1 = [];
  this.limit_1 = this.pageSize_1;
  this.skip_1 = 0;
  this.currentPage_1 = 1;
  this.callData_tran();
}

public exp_PageSize_tran(): void {
  this.exp_pageSelection_1 = [];
  this.exp_limit_1= this.exp_pageSize_1;
  this.exp_skip_1 = 0;
  this.exp_currentPage_1= 1;
  this.exp_callData_tran();
}

private calculateTotalPages_tran(totalData: number, pageSize: number): void {
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


private exp_calculateTotalPages_tran(totalData: number, pageSize: number): void {
  this.exp_pageNumberArray_1 = [];

  this.exp_totalPages_1 = totalData / pageSize;
  if (this.exp_totalPages_1 % 1 != 0) {
    this.exp_totalPages_1 = Math.trunc(this.exp_totalPages_1 + 1);
  }
  for (let i = 1; i <= this.exp_totalPages_1; i++) {
    const limit = pageSize * i;
    const skip = limit - pageSize;
    this.exp_pageNumberArray_1.push(i);
    this.exp_pageSelection_1.push({ skip: skip, limit: limit });
  }
}

  set_zero()
  {
    this.getTableData();

    this.show     = false;
    this.exp_show = false;
    this.transactions     = [];
    this.exp_transactions = [];
  }

  async editAccount(editAccount:any)
  {
    if (this.addAccount.valid)
    {
      this.loading=true;
      await this.api.post('post_update_data.php?table=bank&field=bank_id&value='+this.detail_view['bank_id']+'&authToken=' + environment.authToken, editAccount).then((data: any) =>
      {
        if(data.status == "success")
          { this.toastService.typeSuccess('Account Updated Succesfully');
            this.loading=false;

              const modalElement = this.editAccountModal.nativeElement;
              $(modalElement).modal('hide');
              this.addAccount.controls['account_name'].reset();
              this.addAccount.controls['mode'].setValue(0);
              this.addAccount.controls['opening_balance'].setValue(0);
        }
        else
          {this.toastService.typeError(data.status);
            this.loading=false; }
        return true;
      }).catch(error => {this.toastService.typeError('API Faild : edit bank Account ');
      this.loading=false;  });

      await this.api.get('get_data.php?table=bank&find=bank_id&value='+this.detail_view['bank_id']+'&authToken=' + environment.authToken).then((data: any) =>
      {
        this.detail_view = data[0];
      }).catch(error => {
        this.toastService.typeError('API Faild : load edit Account ');
        this.selected = [];
      });

    }
    else{ this.toastService.typeError('Please make sure all fields are filled in correctly');}
  }

  async DisableAccount()
  {
    await this.api.get('single_field_update.php?table=bank&field=bank_id&value='+this.detail_view['bank_id']+'&update=0&up_field=status&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.toastService.typeWarning('Account Disabled Succesfully');
            const id = this.detail_view['bank_id'];

            this.api.get('get_data.php?table=bank&find=bank_id&value='+id+'&authToken=' + environment.authToken).then((data: any) =>
            {
              this.detail_view = data[0];
            }).catch(error => {
              this.toastService.typeError('Unable to reload');
            });
          }
        else
        { this.toastService.typeError(data.status); }
        return true;
      }).catch(error =>
      {  this.toastService.typeError('API Faild : DisableAccount');});
  }

  async EnableAccount()
  {
    await this.api.get('single_field_update.php?table=bank&field=bank_id&value='+this.detail_view['bank_id']+'&update=1&up_field=status&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.toastService.typeSuccess('Account Enabled Succesfully');
            const id = this.detail_view['bank_id'];

            this.api.get('get_data.php?table=bank&find=bank_id&value='+id+'&authToken=' + environment.authToken).then((data: any) =>
            {
              this.detail_view = data[0];
            }).catch(error => {this.toastService.typeError('Unable to reload');});
          }
        else
        { this.toastService.typeError(data.status); }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : EnableAccount');
      });
  }

  download(value:any,data:any)
  {
    const today = new Date();
    const year  = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day   = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const from_date = value.fromdate;
    const to_date   = value.todate;
    if(data =="bank")
    {
     var id   = this.detail_view['bank_id'];
     var name=this.detail_view['account_name'];
    }
    if(data =="expense")
    {
     var id   = this.expense_detail_view['id'];
     var name=this.expense_detail_view['account_name'];
    }
  if(  from_date <= to_date &&  to_date <= formattedDate)
   {
    this.api.post('mp_downloadReport_json.php?mode='+data+'&id='+id+'&from_date=' + from_date + '&to_date=' + to_date + '&authToken=' + environment.authToken, value).then((data: any[]) => {
      if (data != null)
        {
          // const csvData = this.convertToCSV(data);
          // this.downloadCSVFile(csvData, 'data_export.csv');
          // this.date.reset();

          this.exportToExcel(data, ''+name+'_transactions_'+formattedDate+'.xlsx');
          this.date.reset();
        }
        else
        {
          this.toastService.typeWarning('No data');
          this.date.reset();
        }
      })
      .catch(error => {
        this.toastService.typeError('API Failed: loadTransaction');
      });
    }
    else{
      this.toastService.typeError('Choose the Correct Date ');
    }
  }

  exportToExcel(data: any[], filename: string)
  {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const excelBlob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })],
                      {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const url = URL.createObjectURL(excelBlob);

    const downloadLink    = document.createElement('a');
    downloadLink.href     = url;
    downloadLink.download = filename;
    downloadLink.click();
    URL.revokeObjectURL(url);
  }

  EditAccount()
  {
    this.addAccount.controls['account_name'].setValue(this.detail_view.account_name);
    this.addAccount.controls['mode'].setValue(this.detail_view.mode);
    this.addAccount.controls['opening_balance'].setValue(this.detail_view.opening_balance);
  }

  Addaccount()
  {
    this.addAccount.controls['account_name'].setValue(null);
    this.addAccount.controls['mode'].setValue(0);
    this.addAccount.controls['opening_balance'].setValue(0);
  }

  Addexpense()
  {
    this.addExpense.controls['account_name'].setValue(null);
  }

  async newAccount(addAccount :any)
  {
    Object.keys(this.addAccount.controls).forEach(field => {
      this.addAccount.get(field)?.markAsTouched({ onlySelf: true });
    });

    if (this.addAccount.valid)
    {
      this.loading = true;
      await this.api.post('post_insert_data.php?table=bank&authToken=' + environment.authToken, addAccount).then((data: any) =>
      {
        if(data.status == "success")
          { this.toastService.typeSuccess('Account Added Succesfully');
            this.loading = false;
            const modalElement = this.addAccountModal.nativeElement;
            $(modalElement).modal('hide');
            this.getTableData();
            this.addAccount.controls['account_name'].reset();
            this.addAccount.controls['mode'].setValue(0);
            this.addAccount.controls['opening_balance'].setValue(0); }
        else
        { this.toastService.typeError(data.status);
          this.loading = false; }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : newAccount');
          this.loading = false;
      });
    }
    else
    {
      this.toastService.typeError('Please make sure all fields are filled in correctly');
    }
  }

  async newExpense(addExpense:any)
  {

    Object.keys(this.addExpense.controls).forEach(field => {
      this.addExpense.get(field)?.markAsTouched({ onlySelf: true });
    });
    if (this.addExpense.valid)
    {
      this.loading = true;
      await this.api.post('post_insert_data.php?table=expense_account&authToken=' + environment.authToken, addExpense).then((data: any) =>
      {

        if(data.status == "success")
          {
            this.toastService.typeSuccess('Account Added Succesfully');
            this.loading = false;
            const modalElement = this.addExpenseModal.nativeElement;
            $(modalElement).modal('hide');
            this.getTableData();
            this.addExpense.controls['account_name'].reset();
          }
        else
        { this.toastService.typeError(data.status);
          this.loading = false; }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : newAccount');
          this.loading=false;
      });

    }
    else
    {
      this.toastService.typeError('Please make sure all fields are filled in correctly');
    }
  }


  EditExpense()
  {
    this.addExpense.controls['account_name'].setValue(this.expense_detail_view.account_name);
    this.addExpense.controls['mode'].setValue(this.expense_detail_view.account_type);
  }

  async submitAccount_expense(editExpense:any)
  {
    if (this.addExpense.valid)
    {
      this.loading = true;
      await this.api.post('post_update_data.php?table=expense_account&field=id&value='+this.selected_id+'&authToken=' + environment.authToken, editExpense).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.loading = false;
            this.toastService.typeSuccess('Account Updated Succesfully');
            const modalElement = this.editExpenseModal.nativeElement;
            $(modalElement).modal('hide');
            this.addExpense.controls['account_name'].reset();
            this.selected = [];

           this.api.get('get_data.php?table=expense_account&find=id&value='+this.selected_id+'&authToken=' + environment.authToken).then((data: any) =>
            {
              this.expense_detail_view = data[0];
            }).catch(error => {
              this.toastService.typeError('API Faild : load edit expence Account ');

            });
      }
        else
          {this.toastService.typeError(data.status);  this.loading = false; }
        return true;
      }).catch(error =>
      {  this.toastService.typeError('API Faild :  edit expence Account ');  this.loading = false;});


    }
    else
    {  this.toastService.typeError('Please make sure all fields are filled in correctly'); }
  }

  async DisableAccount_expense()
  {
    await this.api.get('single_field_update.php?table=expense_account&field=id&value='+this.selected_id+'&update=0&up_field=status&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.toastService.typeWarning('Account Disabled Succesfully');

            this.getTableData();
            this.api.get('get_data.php?table=expense_account&find=id&value='+this.selected_id+'&authToken=' + environment.authToken).then((data: any) =>
            {
              this.expense_detail_view = data[0];
            }).catch(error => {
              this.toastService.typeError('Unable to reload');
            });
          }
        else
        { this.toastService.typeError(data.status); }

        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : DisableAccount');
      });
  }

  async EnableAccount_expense()
  {
    await this.api.get('single_field_update.php?table=expense_account&field=id&value='+this.selected_id+'&update=1&up_field=status&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.toastService.typeSuccess('Account Enabled Succesfully');

            this.getTableData
            this.api.get('get_data.php?table=expense_account&find=id&value='+this.selected_id+'&authToken=' + environment.authToken).then((data: any) =>
            {
              this.expense_detail_view = data[0];
            }).catch(error => {this.toastService.typeError('Unable to reload');});
          }
        else
        { this.toastService.typeError(data.status); }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : EnableAccount');
      });
  }


  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        Bank_AccountName: x.account_name,
        Balance: x.balance,
      }));

    TableExportUtil.exportToExcel(exportData, 'Bank List');
  }


  // exp_exportExcel() {
  //   // key name with space add in brackets
  //   const exportData: Partial<TableElement>[] =
  //     this.exp_dataSource.filteredData.map((x) => ({
  //       Name: x.account_name,
  //       Department: ,
  //     }));

  //   TableExportUtil.exportToExcel(exportData, 'excel');
  // }
}
