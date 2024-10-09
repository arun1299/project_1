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
import { Unit_models } from './unit_models';
import { Sort } from '@angular/material/sort';
declare let $: any;

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

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
  dataSource   !: MatTableDataSource<Unit_models>;
  public totalPages   = 0;
  public Toggledata   = false;
  public      show    = false;
  public loading      = false;

  public searchDataValue =''
   list          : Array<Unit_models> =[];
   from_date          : any
   to_date            : any
   id                 : any
   unit      !: FormGroup
   edit_unit !: FormGroup

   @ViewChild("Edit_unit", { static: true }) Edit_unit!: ElementRef;
   @ViewChild("add_unit", { static: true }) add_unit!: ElementRef;
 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {
   this.unit = fb.group({
     created_by   :[this.uid],
     name         :[null,Validators.compose([Validators.required])],
   })

   this.edit_unit = fb.group({
     name         :[null],
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
   this.api.get('get_data.php?table=unit&authToken='+environment.authToken).then((data: any) =>
     {
     if (data != null)
       {
           let total_data = data;
           let value :  Unit_models [] =[]
           this.totalData    = total_data.length
           total_data.map((res: Unit_models, index: number) => {
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
      this.dataSource = new MatTableDataSource<Unit_models>(value);
    }
   }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }


 onRowClick(row:any)
 {

     //  this.show =true
     this.edit_unit.controls['name'].setValue(row.name);
     const modalElement = this.Edit_unit.nativeElement;
     $(modalElement).modal('show');
      this.id = row.id
 }


 submit_unit(value:any)
 {
   if (this.edit_unit.valid)
   {
     this.loading=true;
     this.api.post('post_update_data.php?table=unit&field=id&value=' + this.id + '&authToken=' + environment.authToken, this.edit_unit.value).then((data: any) => {
       if (data.status == "success")
       {
         this.loading=false;
         this.toastService.typeSuccess('Unit Updated Succesfully');
         const modalElement = this.Edit_unit.nativeElement;
         $(modalElement).modal('hide');
         this.get_tabledata()
         this.unit.reset();
       }
       else { this.toastService.typeError(data.status);
             this.loading=false; }
     }).catch(error => { this.toastService.typeError('unit Updated Failed!!');
                       this.loading=false;});
   }
   else
   {
     this.toastService.typeError('Please Fill All Details');
   }
 }

 submit_newunit(value :any)
 {
     Object.keys(this.unit.controls).forEach(field => {
       this.unit.get(field)?.markAsTouched({ onlySelf: true });
     });

   if (this.unit.valid)
   {
     this.loading=true;
     this.api.post('post_insert_data.php?table=unit&authToken=' + environment.authToken, value).then((data: any) => {
       if (data.status == "success")
       {
         this.loading=false;
         this.toastService.typeSuccess('Unit Added Succesfully');
         this.get_tabledata()
         this.unit.reset();
         const modalElement = this.add_unit.nativeElement;
         $(modalElement).modal('hide');
       }
       else { this.toastService.typeError(data.status);
             this.loading=false; }

     }).catch(error => { this.toastService.typeError(' unit Added Failed!!');
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
   await this.dataSource.filteredData.map((res: Unit_models, index: number) =>
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
