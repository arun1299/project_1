/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { environment } from 'src/environments/environment';

import { Sort } from '@angular/material/sort';
import { Payment_termModels } from './payment_term.models';
declare let $: any;

@Component({
  selector: 'app-payment_terms',
  templateUrl: './payment_terms.component.html',
  styleUrls: ['./payment_terms.component.scss']
})
export class Payment_termsComponent implements OnInit {

  public Toggledata  = false;
  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

  public lastIndex    = 0;
  public pageSize     = 10;
  public totalData    = 0;
  public skip         = 0;
  public limit: number = this.pageSize;
  public pageIndex    = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage  = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataSource   !: MatTableDataSource<Payment_termModels>;
  public totalPages   = 0;

  public      show    = false;
  public searchDataValue =''
   list          :Array<Payment_termModels> =[];
   from_date          : any
   to_date            : any
   loading            = false
   id                 : any
   payment_term      !: FormGroup
   edit_payment      !: FormGroup

   @ViewChild("Edit_terms", { static: true }) Edit_terms!: ElementRef;
   @ViewChild("add_terms", { static: true }) add_terms!: ElementRef;
 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {
  this.payment_term = fb.group({
    created_by   :[this.uid],
    terms        :[null,Validators.compose([Validators.required])],
    terms_value  :[null,Validators.compose([Validators.required])],
    title        :[null],
    description  :[null,Validators.compose([Validators.required])],
    value        :[null],
    status       :[1]
  })

  this.edit_payment = fb.group({
    terms        :[null,Validators.compose([Validators.required])],
    terms_value  :[null,Validators.compose([Validators.required])],
    title        :[null],
    description  :[null],
    value        :[null],
    status       :[null]
  })

 }

 ngOnInit() {
   this.get_tabledata()
 }

 async get_tabledata()
 {
   this.serialNumberArray     = [];
   this.pageNumberArray       = [];
   this.list   = [];
   this.api.get('get_data.php?table=payment_terms&authToken='+environment.authToken).then((data: any) =>
     {
     if (data != null)
       {
                  let total_data = data;
           let value : Payment_termModels [] = []
           this.totalData    = total_data.length
           total_data.map((res: Payment_termModels, index: number) => {
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
      this.dataSource = new MatTableDataSource<Payment_termModels>(value);
    }
   }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }

 onRowClick(row:any)
 {

     this.id = row.id;
     this.edit_payment.controls['title'].setValue(row.title);
     this.edit_payment.controls['terms'].setValue(row.terms);
     this.edit_payment.controls['terms_value'].setValue(row.terms_value);
     this.edit_payment.controls['description'].setValue(row.description);
     this.edit_payment.controls['value'].setValue(row.value);
     this.edit_payment.controls['status'].setValue(row.status);

     const modalElement = this.Edit_terms.nativeElement;
     $(modalElement).modal('show');

 }


 editSubmit_payment(data : any)
    {
      if (this.edit_payment.valid)
      {
        this.loading=true;
        this.api.post('post_update_data.php?table=payment_terms&field=id&value=' + this.id + '&authToken=' + environment.authToken, data).then((data: any) => {
          if (data.status == "success")
          {
            this.loading=false;
            this.toastService.typeSuccess('Payment Term Updated Succesfully');
            const modalElement = this.Edit_terms.nativeElement;
            $(modalElement).modal('hide');
            this.get_tabledata()
            this.edit_payment.reset();
          }
          else { this.toastService.typeError(data.status);
                this.loading=false; }

        }).catch(error => { this.toastService.typeError('Payment Term Updated Failed!!');
                          this.loading=false;});
      }
      else
      {
        this.toastService.typeError('Please Fill All Details');
      }
    }

    new_payment(data : any)
    {

      Object.keys(this.payment_term.controls).forEach(field => {
        this.payment_term.get(field)?.markAsTouched({ onlySelf: true });
      });

      if (this.payment_term.valid)
      {
        this.loading=true;
        this.api.post('post_insert_data.php?table=payment_terms&authToken=' + environment.authToken, data).then((data: any) => {
          if (data.status == "success")
          {
            this.loading=false;
            this.toastService.typeSuccess('Payment Term Added Succesfully');
            const modalElement = this.add_terms.nativeElement;
            $(modalElement).modal('hide');
            this.get_tabledata()
            this.payment_term.reset();
          }
          else { this.toastService.typeError(data.status);
                this.loading=false; }

        }).catch(error => { this.toastService.typeError('Payment Term Added Failed!!');
                          this.loading=false;});
      }
      else
      {
        this.toastService.typeError('Please Fill All Details');
      }
    }


 public searchData(value: any): void {
   this.dataSource.filter = value.trim().toLowerCase();
   this.totalData = this.dataSource.filteredData.length;
   this.callData()
 }

 async callData()
 {
   this.list = [];
   await this.dataSource.filteredData.map((res: Payment_termModels, index: number) =>
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

  }



}
