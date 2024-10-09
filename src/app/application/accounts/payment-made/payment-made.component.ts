/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component ,ElementRef,OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { payment_transaction } from './payment-made-models';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { formatDate } from '@angular/common';

declare let $: any;
FormBuilder
@Component({
  selector: 'app-payment-made',
  templateUrl: './payment-made.component.html',
  styleUrls: ['./payment-made.component.scss']
})

export class PaymentMadeComponent implements OnInit {

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  all_account              : Array<number> = [];
  user_account             : Array<number> = [];
  company_account          : Array<number> = [];
  cash_account             : Array<number> = [];
  gst_account              : Array<number> = [];

  bankData            : any;
  bankData_length     : any;
  loading             !: boolean;

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

  today               = new Date();
  todaysDate          = '';
   prefix            : any
   receipt_serial_no : any;
   vendor_list       : any;
   vendor_advance    !: FormGroup;
  transactions       :Array<payment_transaction> =[];
  payment_transaction:Array<payment_transaction> =[];
  dataSource         !: MatTableDataSource<payment_transaction>;

  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  @ViewChild("Add_advance", { static : true }) Add_advance   !: ElementRef;


  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder,)
  {
    this.today = new Date();
    this.todaysDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530'); // hh:mm:ss a

    this.vendor_advance =fb.group({
      'created_by': [this.uid],
      receipt_no  : [null],
      tran_mode   : [null, Validators.compose([Validators.required])],
      from_bank   : [1, Validators.compose([Validators.required])],
      to_bank     : [null, Validators.compose([Validators.required])],
      amount      : [null,Validators.compose([Validators.required])],
      tran_date   : [this.todaysDate],
      reference   : ["Advance amount", Validators.compose([Validators.required, Validators.minLength(3)])],
      description : [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    })

  }


  ngOnInit(): void {
     this.load_paymentTransactiond()

     this.api.get('get_data.php?table=vendor&authToken='+environment.authToken).then((data: any) =>
      {
        this.vendor_list = data;

      }).catch(error => { });


      this.api.get('get_data.php?table=bank&authToken='+environment.authToken).then((data: any) =>
      {
         this.feedData(data);
      }).catch(error => { });
 }

 load_paymentTransactiond()
  {
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];
    this.payment_transaction   = [];
     this.api.get('mp_payment_made.php?&authToken=' + environment.authToken).then((data) =>
    {
      let value : payment_transaction [] = [];

      this.transactions = data;
      this.totalData    =data.length
      data.map((res: payment_transaction, index: number) => {
        const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       res.id = serialNumber;
       this.payment_transaction.push(res);
       this.serialNumberArray.push(serialNumber);


       }
       res.id = serialNumber;
       value.push(res)
       this.calculateTotalPages(this.totalData, this.pageSize);
       this.dataSource = new MatTableDataSource<payment_transaction>(value);
  });
    }).catch(error => { this.toastService.typeError('Payment Data Load Error')});
  }

  onRowClick(row:any)
  {

       this.show =true
       localStorage.setItem('select_id', row.tran_id);
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

async callData()
{
  this.payment_transaction = [];
    await this.dataSource.filteredData.map((res: payment_transaction, index: number) =>
      {
        const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.payment_transaction.push(res);
        this.serialNumberArray.push(serialNumber);
      }

  });
  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}
  public sortData(sort: Sort) {
    const data = this.payment_transaction.slice();
    if (!sort.active || sort.direction === '') {
      this.payment_transaction = data;
    } else {
      this.payment_transaction = data.sort((a, b) => {
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
    this.pageSize  = parseInt(value)
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

        VendorName: x.vendor_name,
        Bill: x.bill_number,
        Mode: x.tran_type,
        PaymentMade: x.credit,
        Balance: x.balance,
        Description: x.tran_details,
        Command: x.notes,
        Po : x.po_number
    }));

   TableExportUtil.exportToExcel(exportData, 'Payment Made List');
  }


  async advance()
  {

    await this.api.get('get_data.php?table=prefix&authToken=' + environment.authToken).then((data) =>
      {
        this.prefix = data[0].payment_receipt;
      }).catch(error => { this.toastService.typeError('API Faild : AddNewTrans')});

      await this.api.get('get_data.php?table=payment_made&asign_field=tran_id&asign_value=DESC&authToken=' + environment.authToken).then((data) =>
      {
        if(data != null)
        {
           this.receipt_serial_no = data[0].serial_no+1;
        }
        else
        {
           this.receipt_serial_no = 1;
        }
      }).catch(error => { this.toastService.typeError('API Faild : AddNewTrans')});

       await this.api.get('get_data.php?table=bank&authToken=' + environment.authToken).then((data) =>
      {
        this.feedData(data) ;

      }).catch(error => { });

      let serial_no = this.prefix+this.receipt_serial_no;
      this.vendor_advance.controls['receipt_no'].setValue(serial_no);

      const modalElement = this.Add_advance.nativeElement;
      $(modalElement).modal('show');
  }


  feedData(data:any)
  {
    this.bankData        = data;
    this.bankData_length = data.length;

    let j = 0 ; let k = 0; let l = 0; let m = 0; let n=0;
    for (let i = 0; i<this.bankData_length; i++)
      {

        if (this.bankData[i].type == 1 && this.bankData[i].mode == 1 && this.bankData[i].status == 1 )
        {
          this.company_account[j] = this.bankData[i];

          j++;
        }
        if (this.bankData[i].type == 1 && this.bankData[i].mode == 2 && this.bankData[i].status == 1 )
        {
          this.cash_account[k] = this.bankData[i];
          k++;
        }
        if (this.bankData[i].type == 1 && this.bankData[i].mode == 3 && this.bankData[i].status == 1 )
        {
          this.all_account[l] = this.bankData[i];
          l++;
        }
        if (this.bankData[i].bank_id == this.user_bank_id && this.bankData[i].status == 1 )
        {
          this.user_account[m] = this.bankData[i];
          m++;
        }
        if (this.bankData[i].type == 2 && this.bankData[i].mode == 1 && this.bankData[i].status == 1 )
        {
          this.gst_account[n] = this.bankData[i];
          n++;
        }
      }

  }


  advance_submit(data:any)
  {
    Object.keys(this.vendor_advance.controls).forEach(field => {
      this.vendor_advance.get(field)?.markAsTouched({ onlySelf: true });
    });

      if (this.vendor_advance.valid)
      {
        this.loading = true;
         this.api.post('mp_vendor_advance.php?authToken=' + environment.authToken, this.vendor_advance.value).then((data: any) =>
        {

          if(data.status == "success")
            {
              this.loading = false;
              this.toastService.typeSuccess('Advance Transaction Succesfully');

              this.vendor_advance.controls['tran_mode'].reset(0);
              this.vendor_advance.controls['from_bank'].reset();
              this.vendor_advance.controls['to_bank'].setValue(1);
              this.vendor_advance.controls['reference'].reset();
              this.vendor_advance.controls['description'].reset();
              this.vendor_advance.controls['amount'].setValue(0);
              const modalElement = this.Add_advance.nativeElement;
              $(modalElement).modal('hide');

              this.load_paymentTransactiond();
            }
          else
          {
            this.toastService.typeError(data.status);
            this.loading = false;
          }
          return true;
        }).catch(error =>
        {
            this.toastService.typeError('API Faild : Advance Transaction failed');
            this.loading = false;
        });
      }
      else{
        this.toastService.typeError('Fill the Required Details');
      }
  }

}
