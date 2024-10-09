/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { environment } from 'src/environments/environment';
import { DataService } from './../../../core/services/data/data.service';
import { Sort } from '@angular/material/sort';
declare let $: any;

interface Branch {
  s_no          : number
  branch_name   : string
  gstr_number   : string
  address_line1 : string
  address_line2 : string
  city          : string
  state_id      : string
  pin_code      : number
  mobile        : number
  email         : string
  web_site      : string
  set_as_default: number
}

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

   public uid                = localStorage.getItem('uid');
   public user_type          = localStorage.getItem('type');
   public user_bank_id       = localStorage.getItem('bank_id');

   public lastIndex    = 0;
   public pageSize     = 10;
   public totalData    = 0;
   public skip         = 0;
   public limit        : number = this.pageSize;
   public pageIndex    = 0;
   public serialNumberArray: Array<number> = [];
   public currentPage  = 1;
   public pageNumberArray: Array<number> = [];
   public pageSelection: Array<pageSelection> = [];
   dataSource          !: MatTableDataSource<Branch>;
   public totalPages   = 0;
   public Toggledata   = false;
   public      show    = false;
   public  loading     = false
   public searchDataValue =''
   list         : Array<Branch> = []
   add       !: FormGroup
   edit      !: FormGroup
   id         : any
   state_list : any

   @ViewChild("Edit_address", { static: true }) Edit_address!: ElementRef;
   @ViewChild("add_address", { static: true }) add_address!: ElementRef;
   constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService,public data : DataService,private cdr: ChangeDetectorRef)
    {

      this.add = fb.group({
        created_by     :[this.uid],
        branch_name    :[null,Validators.compose([Validators.required])],
        addressline1   :[null,Validators.compose([Validators.required])],
        addressline2   :[null,Validators.compose([Validators.required])],
        city           :[null,Validators.compose([Validators.required])],
        state_id       :[null,Validators.compose([Validators.required])],
        pincode        :[null,Validators.compose([Validators.required])],
        mobile         :[null,Validators.compose([Validators.required])],
        email          :[null,Validators.compose([Validators.required])],
        web_site       :[null,Validators.compose([Validators.required])],
        set_as_default :[null,Validators.compose([Validators.required])],
      })

      this.edit = fb.group({
        branch_name    :[null,Validators.compose([Validators.required])],
        addressline1   :[null,Validators.compose([Validators.required])],
        addressline2   :[null,Validators.compose([Validators.required])],
        city           :[null,Validators.compose([Validators.required])],
        state_id       :[null,Validators.compose([Validators.required])],
        pincode        :[null,Validators.compose([Validators.required])],
        mobile         :[null,Validators.compose([Validators.required])],
        email          :[null,Validators.compose([Validators.required])],
        web_site       :[null,Validators.compose([Validators.required])],
        set_as_default :[null,Validators.compose([Validators.required])],
      })
    }
  ngOnInit() {
        this.get_tabledata()

        this.api.get('get_data.php?table=state_code&authToken='+environment.authToken).then((data: any) =>
          {
              this.state_list = data
          }).catch(error => { this.toastService.typeError(' Data Load Error')});
  }

  async get_tabledata()
 {
          this.serialNumberArray     = [];
          this.pageNumberArray       = [];
          this.list   = [];
          this.api.get('get_data.php?table=branches&authToken='+environment.authToken).then((data: any) =>
            {
                  if (data != null)
                    {
                                let total_data = data;
                                let value : Branch [] = []
                                this.totalData    = total_data.length
                                total_data.map((res: Branch, index: number) => {
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
              this.dataSource = new MatTableDataSource<Branch>(value);
            }
          }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }

 onRowClick(row:any)
 {

          this.id = row.id;
          this.edit.controls['branch_name'].setValue(row.branch_name);
          this.edit.controls['addressline1'].setValue(row.address_line1);
          this.edit.controls['addressline2'].setValue(row.address_line2);
          this.edit.controls['city'].setValue(row.city);
          this.edit.controls['state_id'].setValue(row.state_id);
          this.edit.controls['pincode'].setValue(row.pin_code);
          this.edit.controls['mobile'].setValue(row.mobile);
          this.edit.controls['email'].setValue(row.email);
          this.edit.controls['web_site'].setValue(row.web_site);
          this.edit.controls['set_as_default'].setValue(row.set_as_default);

          const modalElement = this.Edit_address.nativeElement;
          $(modalElement).modal('show');

 }


 edit_submit(data : any)
    {
          if (this.edit.valid)
          {
                this.loading=true;
                this.api.post('post_update_data.php?table=branches&field=id&value=' + this.id + '&authToken=' + environment.authToken, data).then((data: any) => {

                  if (data.status == "success")
                  {
                    this.loading=false;
                    this.toastService.typeSuccess('Updated Succesfully');
                    const modalElement = this.Edit_address.nativeElement;
                    $(modalElement).modal('hide');
                    this.get_tabledata()
                    this.edit.reset();
                  }
                  else { this.toastService.typeError(data.status);
                        this.loading=false; }

                }).catch(error => { this.toastService.typeError('Updated Failed!!');
                              this.loading=false;});
          }
          else
          {
            this.toastService.typeError('Please Fill All Details');
          }
    }

    submit(data : any)
    {

      Object.keys(this.add.controls).forEach(field => {
        this.add.get(field)?.markAsTouched({ onlySelf: true });
      });

          if (this.add.valid)
          {
              this.loading=true;
              this.api.post('post_insert_data.php?table=branches&authToken=' + environment.authToken, data).then((data: any) => {

                    if (data.status == "success")
                    {
                      this.loading=false;
                      this.toastService.typeSuccess('Added Succesfully');
                      const modalElement = this.add_address.nativeElement;
                      $(modalElement).modal('hide');
                      this.get_tabledata()
                      this.add.reset();
                    }
                    else { this.toastService.typeError(data.status);
                          this.loading=false; }

              }).catch(error => { this.toastService.typeError(' Added Failed!!');
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
          await this.dataSource.filteredData.map((res: Branch, index: number) =>
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
