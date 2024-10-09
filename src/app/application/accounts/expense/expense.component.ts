
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { ApiService } from "../../../core/services/api/api.service";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {formatDate } from '@angular/common';
import { all_account, cash_account, company_account, gst_account, user_account } from '../transaction/transaction_models';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { MatTableDataSource } from '@angular/material/table';
import { expense_list } from './expense-models';
import { Sort } from '@angular/material/sort';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit
{
  public user_bank_id = localStorage.getItem('bank_id');
  public user_type    = localStorage.getItem('type');
  public uid          = localStorage.getItem('uid');

  today               = new Date();
  todaysDate          = '';

  invoice_list        : any;
  bill_list           : any;
  all_account         : Array<all_account>     = [];
  user_account        : Array<user_account>    = [];
  company_account     : Array<company_account> = [];
  cash_account        : Array<cash_account>    = [];
  gst_account         : Array<gst_account>     = [];
  employee_account    !:[]
  addExpen           !: FormGroup;
  balance             : any;
  bankData            : any;
  bankData_length     : any;
  exp_acc_info        : any;
  gst_percent         : any;
  cal_amount          : any;
  cal_tax             : any;
  cal_percent         : any;
  tax_per             : any;
  onloadBalance       : any;
  vendor_list         : any;
  customer_list       : any;
  project_list        : any;
  public routes = routes;
  balance_disp        = 0;
  loading             = false;
  show_page           = false;


  public expense_list: Array<expense_list> = [];
  dataSource!: MatTableDataSource<expense_list>;

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

  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  constructor
  (
    public fb           : FormBuilder,
    public toastrService: ToasterService,
    private api         : ApiService
  )
  {
    this.todaysDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.addExpen = fb.group(
      {
        'created_by': [this.uid],
        exp_date    : [this.todaysDate, Validators.compose([Validators.required])],
        exp_type    : [1],
        exp_account : [1, Validators.compose([Validators.required, Validators.min(1)])],
        gst_code    : [null],
        paid_through: [0, Validators.compose([Validators.required, Validators.min(1)])],
        exp_mode    : [1, Validators.compose([Validators.required, Validators.min(1)])],
        amount      : [null, Validators.compose([Validators.required])],
        tax_rate    : [null, Validators.compose([Validators.required])],
        tax_percent : [0, Validators.compose([Validators.required])],
        inv_number  : [null],
        exp_name    : [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        vendor      : [null],
        customer    : [null],
        project     : [null],
        reference   : [null],
      }
    )
  }

  ngOnInit()
  {
    this.loadData();
    this.getTableData();
  }


  getTableData()
  {
    this.expense_list          = [];
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];

      this.api.get('mp_expense_list.php?authToken=' + environment.authToken).then((data: any) =>
        {
          let value :  expense_list[] = [];
      if(data != null)
      {
          this.totalData = data.length;
             data.map((res: expense_list, index: number) => {
                  const serialNumber = index + 1;
               if (index >= this.skip && serialNumber <= this.limit) {
                res.id = serialNumber;
                this.expense_list.push(res);
                this.serialNumberArray.push(serialNumber);
                }
                res.id = serialNumber;
                value.push(res)
           });

            this.calculateTotalPages(this.totalData, this.pageSize);
            this.dataSource = new MatTableDataSource<expense_list>(value);
          }
          else{
            this.toastrService.typeWarning('No Data  Expense list');
          }
        }).catch(error => {
          this.toastrService.typeError('API Faild : loadData  Expense list');
        });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
  }

  async callData()
    {
      this.expense_list = [];
      await this.dataSource.filteredData.map((res: expense_list, index: number) =>
          {
            const serialNumber = index + 1;

            if (index >= this.skip && serialNumber <= this.limit) {
              res.id = serialNumber;
              this.expense_list.push(res);
              this.serialNumberArray.push(serialNumber);
            }
        });

      this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
    }

  public sortData(sort: Sort) {
    const data = this.expense_list.slice();
    if (!sort.active || sort.direction === '') {
      this.expense_list = data;
    } else {
      this.expense_list = data.sort((a, b) => {
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

  async balanceLoad()
  {
    const bank = this.addExpen.controls['paid_through'].value;
    this.balance_disp = 1;
    await this.api.get('get_data.php?table=bank&find=bank_id&value='+bank+'&authToken=' + environment.authToken).then((get_data: any) =>
      {
        this.onloadBalance = get_data[0].balance;
      }).catch(error => { this.toastrService.typeError('API Faild : balanceLoad'); });
  }


  async loadData()
  {
    await this.api.get('get_data.php?table=bank&find=status&value=1&authToken=' + environment.authToken).then((data: any) =>
    {
      const value = data ;
      this.feedData(value) ;
    }).catch(error =>
      {   this.toastrService.typeError('API Faild : loadData bank'); });

    await this.api.get('get_data.php?table=expense_account&find=status&value=1&authToken=' + environment.authToken).then((exp_acc: any) =>
    {
      this.exp_acc_info = exp_acc;
    }).catch(error => {this.toastrService.typeError('API Faild : loadData expense '); });

    await this.api.get('get_data.php?table=tax&authToken=' + environment.authToken).then((gst_per: any) =>
    {
      this.gst_percent = gst_per;
    }).catch(error => {this.toastrService.typeError('API Faild : loadData tax'); });

    await this.api.get('get_data.php?table=invoice&find=status&value=1&asign_field=invoice_id&asign_value=DESC&authToken=' + environment.authToken).then((inv_list: any) =>
    {
      this.invoice_list = inv_list;
    }).catch(error => {this.toastrService.typeError('API Faild : loadData Invoice'); });

    await this.api.get('get_data.php?table=bill&find=status&value=1&asign_field=bill_id&asign_value=DESC&authToken=' + environment.authToken).then((bill_list: any) =>
    {
      this.bill_list = bill_list;
    }).catch(error => {this.toastrService.typeError('API Faild : loadData Bill'); });

    await this.api.get('get_data.php?table=projects&find=status&value=1&authToken=' + environment.authToken).then((pro_list: any) =>
    {
      this.project_list = pro_list;
    }).catch(error => {this.toastrService.typeError('API Faild : loadData projects'); });
  }

  tax_calculate()
  {
    this.tax_per      = this.addExpen.controls['tax_percent'].value;
    this.cal_amount   = this.addExpen.controls['amount'].value;
    this.cal_percent  = 100;
    this.cal_tax      = (this.cal_amount / this.cal_percent) * this.tax_per;
    this.addExpen.controls['tax_rate'].setValue(this.cal_tax);
  }

  feedData(data:any)
  {
    this.bankData = data;
    this.bankData_length = data.length;
    let i = 0 ; let j = 0 ; let k = 0; let l = 0; let m = 0; let n=0; let p=0
    for (i = 0; i<this.bankData_length; i++)
      {
        const type = this.bankData[i].type;
        const mode = this.bankData[i].mode;
        const bankid = this.bankData[i].bank_id;

        if (type === 1 && mode === 1 )
        {
          this.company_account[j] = this.bankData[i];
          j++;
        }
        else{null}
        if (type === 1 && mode === 2)
        {
          this.cash_account[k] = this.bankData[i];
          k++;
        }
        else{null}
        if (type === 1 && mode === 3)
        {
          this.all_account[l] = this.bankData[i];
          l++;
        }
        else{null}
        if (bankid === this.user_bank_id)
        {
          this.user_account[m] = this.bankData[i];
          m++;
        }
        else{null}
        if (type === 2 && mode === 1)
        {
          this.gst_account[n] = this.bankData[i];
          n++;
        }
        else{null}

      }
  }
  async AddNewExpen(data:any)
  {
    Object.keys(this.addExpen.controls).forEach(field =>
      {
        const control = this.addExpen.get(field)?.markAsTouched({ onlySelf: true });
      });
    if (this.addExpen.valid)
    {
      this.loading=true;
      await this.api.get('get_data.php?table=bank&find=bank_id&value='+data.paid_through+'&authToken=' + environment.authToken).then((get_data: any) =>
      {
        this.balance = get_data[0].balance;
      }).catch(error => { this.toastrService.typeError('Unable to load bank balance contact super admin'); });

      const total_amount = data.amount + data.tax_rate;

      if(total_amount <= this.balance)
      {
        await this.api.post('mp_expense.php?authToken=' + environment.authToken, data).then((data: any) =>
        {

          if(data.status == "success")
            {
              this.loading=false;
              this.toastrService.typeSuccess('Expense Added Succesfully');
              this.getTableData()
              this.addExpen.controls['gst_code'].reset();
              this.addExpen.controls['amount'].reset();
              this.addExpen.controls['tax_rate'].reset();
              this.addExpen.controls['tax_percent'].reset();
              this.addExpen.controls['inv_number'].reset();
              this.addExpen.controls['exp_name'].reset();
              this.addExpen.controls['tax_percent'].reset(0);
              this.addExpen.controls['vendor'].reset();
              this.addExpen.controls['customer'].reset();
              this.addExpen.controls['project'].reset();
              this.addExpen.controls['reference'].reset();

        this.balanceLoad();
        this.loadData();
        this.balance_disp = 0;
            }
          else
            { this.toastrService.typeError(data.status);
              this.loading=false;}
            return true;
        }).catch(error => {this.toastrService.typeError('API Faild : Expense Add Process');});
      }
      else
      {
        this.toastrService.typeError("You don't have sufficient balance in source account");
      }
    }
    else
    {
      this.toastrService.typeError('Please make sure all fields are filled in correctly');
    }
  }

  onSelect_bill(event: any)
  {

    let value= this.bill_list.find((t: { bill_id: any; })=>t.bill_id == event);

    if(value != undefined)
      this.addExpen.controls['inv_number'].setValue(value.bill_number);
    this.addExpen.controls['vendor'].setValue(null);
    this.addExpen.controls['project'].setValue(null);
    if(value == undefined)
      this.addExpen.controls['inv_number'].setValue(null);
  }

  onSelect_inv(event:any) {

    let value = this.invoice_list.find((t: { invoice_id: any }) => t.invoice_id == event);

    if (value!= undefined) {
      this.addExpen.controls['inv_number'].setValue(value.invoice_number);
      this.addExpen.controls['customer'].setValue(null);
      this.addExpen.controls['project'].setValue(null);
    } else {
      this.addExpen.controls['inv_number'].setValue(null);
    }
  }

  onSelect_pro(event:any)
  {

    let value= this.project_list.find((t: { project_id: any; })=>t.project_id == event);

    if(value != undefined)
    {
        this.addExpen.controls['inv_number'].setValue(value.name);
        this.addExpen.controls['customer'].setValue(null);
        this.addExpen.controls['vendor'].setValue(null);
    }
    if(value == undefined)
    {
       this.addExpen.controls['inv_number'].setValue(null);
    }
  }


  PageAction()
  {
      this.show_page = true
  }

  onActivate(value : any)
  {
    // console.log(value)
  }

  setzero()
  {
    this.show_page = false
  }
  exportExcel()
  {
      const exportData: Partial<TableElement>[] =
        this.dataSource.filteredData.map((x) => ({
          "Transaction Date" : x.transaction_date,
          "Transaction Against": x.bill != null? x.bill:(x.invoice != null? x.invoice:(x.project != null?x.project :x.referense)),
          "Mode"             : x.transaction_mode,
          "Amount"           : x.amount,
          "Service"          : x.exp_type == 1 ?"Goods" : "Service",
          "Tax"              : x.tax_amount,
          "Expense Account"  : x.expence_account,
          "Paid Account"     : x.paid_account,
          "Expense"          : x.name_of_expense,
          "Notes"            : x.notes
        }));

      TableExportUtil.exportToExcel(exportData, 'Expense List');
  }
}
