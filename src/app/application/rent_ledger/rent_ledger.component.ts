/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService, routes } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-rent_ledger',
  templateUrl: './rent_ledger.component.html',
  styleUrls: ['./rent_ledger.component.scss']
})
export class Rent_ledgerComponent implements OnInit {
  @ViewChild("Edit", { static: true }) Edit!: ElementRef;
  @ViewChild("add", { static: true }) add!: ElementRef;

  public searchDataValue = '';

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
  edit_rent          !: FormGroup;
  new_rent           !: FormGroup;
  item_list          !:any;
  qty                 : any
  detail_view         :any = null;
  public uid = localStorage.getItem('uid');
  rent_data           : any
  select_name         : any
  select_id           : any
  edit_id             : any
  total_rent          : any;
  total_salary        : any;
  total_eb            : any;
  total_net           : any;
  total_loan          : any;
  total_manitenance   : any;
  total_fees          : any;
  total_amount        : any;
  Account_list        : any
  loading  = false
   show = false
   public routes = routes;
   public router      : Router;

  constructor(public api :ApiService, public toastrService : ToasterService, public fb :FormBuilder,router : Router,) {

    this.router    = router;

    this.edit_rent = this.fb.group(
      {
        category      : [null],
        account_name  : [null],
        periodic_date : [null],
        from_account  : [null],
        amount        : [null],
        status        : [null]
      })

      this.new_rent = this.fb.group(
        {
          category      : ['', Validators.compose([Validators.required])],
          account_name  : ['', Validators.compose([Validators.required])],
          periodic_date : ['', Validators.compose([Validators.required])],
          from_account  : ['', Validators.compose([Validators.required])],
          amount        : ['', Validators.compose([Validators.required])],
          status        : [1]
        })
  }

  ngOnInit() {

     this.loaddata()
  }

 async loaddata()
  {

      this.total_rent        = 0;
      this.total_salary      = 0;
      this.total_eb          = 0;
      this.total_net         = 0;
      this.total_loan        = 0;
      this.total_manitenance = 0;
      this.total_fees        = 0;
      this.total_amount      = 0;

   await this.api.get('get_data.php?table=rent_ledger&find=status&value=1&authToken='+environment.authToken).then((data: any) =>
      {
        for(let i=0;i<data.length;i++)
          {
            if(data[i].category === 1)
              {
                this.total_rent += data[i].amount;
              }
            if(data[i].category === 2)
              {
                this.total_salary += data[i].amount;
              }
            if(data[i].category === 3)
              {
                this.total_eb += data[i].amount;
              }
            if(data[i].category === 4)
              {
                this.total_net += data[i].amount;
              }
            if(data[i].category === 5)
              {
                this.total_loan += data[i].amount;
              }
            if(data[i].category === 6)
              {
                this.total_manitenance += data[i].amount;
              }
            if(data[i].category === 7)
              {
                this.total_fees += data[i].amount;
              }
              this.total_amount += data[i].amount
          }
        }).catch(error =>
          { this.toastrService.typeError('Something went wrong'); });

      this.Account_list = [
        {id   :1,name :"Rent" ,amount :this.total_rent},
        {id   :2,name :"Salary",amount:this.total_salary},
        {id   :3,name :"EB Bill",amount:this.total_eb},
        {id   :4,name :"Net Bill",amount:this.total_net},
        {id   :5,name :"Loan Account",amount:this.total_loan},
        {id   :6,name :"Maintenance Fees",amount:this.total_manitenance},
        {id   :7,name :"Fees",amount:this.total_fees},

      ]
  }

  select_data : any
  onActivate(list:any)
  {
    this.select_data = list
    this.select_id   = list.id
     this.select_name = list.name

     if(this.select_name != "Total")
      {
          this.api.get('get_data.php?table=rent_ledger&find=category&value='+list.id+'&authToken='+environment.authToken).then((data: any) =>
            {

              this.rent_data = data
            if(data != null)
              {
                  for(let i =0;i<data.length;i++)
                    {
                      let date = data[i].periodic_date
                      const now = new Date();
                      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
                      nextMonth.setDate(date);
                      nextMonth.setHours(0, 0, 0, 0);

                      const year = nextMonth.getFullYear();
                      const month = (nextMonth.getMonth() + 1).toString().padStart(2, '0');
                      const day = nextMonth.getDate().toString().padStart(2, '0');

                      this.rent_data[i]['date'] = `${year}-${month}-${day}`
                    }
                    this.show = true
              }
              }).catch(error =>
                {    this.toastrService.typeError('Something went wrong');   });
         }
         else{
          this.show = false
          this.rent_data = null
         }
  }


  onRow(list:any)
  {
    localStorage.setItem('loan_id',list.id)
    this.edit_id = list.id
    this.edit_rent.controls['category'].setValue(list.category)
    this.edit_rent.controls['account_name'].setValue(list.account_name)
    this.edit_rent.controls['periodic_date'].setValue(list.periodic_date)
    this.edit_rent.controls['from_account'].setValue(list.from_account)
    this.edit_rent.controls['amount'].setValue(list.amount)
    this.edit_rent.controls['status'].setValue(list.status)
     if(list.category != 5)
      {
        const modalElement = this.Edit.nativeElement;
        $(modalElement).modal('show');
      }
  }
  edit_view()
  {
    const modalElement = this.Edit.nativeElement;
    $(modalElement).modal('show');
  }
  add_data()
  {
    const modalElement = this.add.nativeElement;
    $(modalElement).modal('show');
  }


  submit(value : any)
  {
     this.loading = true;
     this.api.post('post_update_data.php?table=rent_ledger&field=id&value=' + this.edit_id + '&authToken=' + environment.authToken, value).then((data_rt: any) => {

      if (data_rt.status == "success")
        {
         this.loading = false;
         this.toastrService.typeSuccess('Rent Updated Succesfully');
         const modalElement = this.Edit.nativeElement;
         $(modalElement).modal('hide');
         this.loaddata()
         this.onActivate(this.select_data)
         }
      }).catch(error => { this.toastrService.typeError('Something went wrong'); });
  }

  public sortData(sort: Sort) {
    const data = this.Account_list.slice();
    if (!sort.active || sort.direction === '') {
      this.Account_list = data;
    } else {
      this.Account_list = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  submit_new(value : any)
  {

     this.loading = true;
     this.api.post('post_insert_data.php?table=rent_ledger&authToken=' + environment.authToken, value).then((data_rt: any) => {

      if (data_rt.status == "success")
        {
         this.loading = false;
         this.toastrService.typeSuccess('New Rent Added Succesfully');
         const modalElement = this.add.nativeElement;
         $(modalElement).modal('hide');
         this.loaddata()
         this.api.get('get_data.php?table=rent_ledger&find=category&value='+this.select_id+'&authToken='+environment.authToken).then((data: any) =>
          {
            this.rent_data = data
            }).catch(error =>
              {
                this.loading = false;
                this.toastrService.typeError('Something went wrong');
              });
        }
      }).catch(error => { this.toastrService.typeError('Something went wrong'); });
  }

  tran_view()
  {

  }
}
