/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TrackByFunction, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, routes } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { attendance } from './attendance-models';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/core/models/models';
import { Sort } from '@angular/material/sort';
declare let $: any;


@Component({
  selector: 'app-attendance',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './attendance.component.html',
  styleUrls    : ['./attendance.component.scss'],
  providers    : [DatePipe]
})
export class AttendanceComponent  implements OnInit {

  @Input () list!: any[];
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  employee               : any;
  modaladdatt            : any;
  modaleditatt           : any;
  Today_Date             : any;
  select_date_value      : any;
  edit_att_value         : any;
  edit_att_value_id      : any;
  employee_list          : any;
  days                   : any;
  com_off_data           : any;
  length                 : any;

  checkedList            : any[];
  currentSelected       !: unknown;
  selected               = [];
  add_options            = [];
  att_list      :Array<attendance> = [];
  public List   :Array<attendance> = [];
  dataSource    !: MatTableDataSource<attendance>;
  att_post               = [];
  att_window             = 0;

  public routes          = routes;
  public uid             = localStorage.getItem('uid');
  public user_type       = localStorage.getItem('type');
  public router          : Router;
  public form_date       !: FormGroup;
  public form_att        !: FormGroup;
  public form_att_edit   !: FormGroup;
  public date_form       !: FormGroup;
  public com_off         !: FormGroup;
  public emp_id          !: number;
  public date_val        : any;

  public att_val_hr      : any;
  public att_val_ot      : any;
  public att_val_pl      : any;
  public att_val_sl      : any;
  public att_val_cl      : any;

  public att_edit_val_ot : any;
  public att_edit_val_hr : any;
  public att_edit_val_pl : any;
  public att_edit_val_sl : any;
  public att_edit_val_cl : any;


  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;


  modalRef!   : BsModalRef;
  public searchDataValue = '';

  select_date :any;

  public lastIndex   = 0;
  public pageSize    = 10;
  public totalData   = 0;
  public skip        = 0;
  public limit       : number = this.pageSize;
  public pageIndex   = 0;
  public currentPage = 1;
  public serialNumberArray: Array<number> = [];
  public pageNumberArray  : Array<number> = [];
  public pageSelection    : Array<pageSelection> = [];
  public totalPages  = 0;

  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  @ViewChild('add_att') add_att  !: ElementRef;
  @ViewChild('edit_att') edit_att!: ElementRef;
  @ViewChild('addcom_off') addcom_off!: ElementRef;
  @ViewChild('add_pl') add_pl!: ElementRef;

    edit_att_value_hr: any;
    edit_att_value_ot: any;
    edit_att_value_pl: any;
    edit_att_value_sl: any;
    edit_att_value_cl: any;
    showDropDown     : any;

  trackByFn!: TrackByFunction<any>;

  constructor( public api: ApiService, private datePipe: DatePipe, public toastService: ToasterService, fb:FormBuilder, router:Router)
  {
    // eslint-disable-next-line prefer-const
    let date = new Date();
    const d    = date.getDate();
    const m    = date.getMonth();
    const y    = date.getFullYear();

    this.checkedList = [];
    this.Today_Date  = this.datePipe.transform(date, 'yyyy-MM-dd', 'en_US');

    this.router    = router;
    this.Today_Date = this.datePipe.transform(date, 'yyyy-MM-dd', 'en_US');
    this.form_date = fb.group
    (
      {
        date_val  : [this.Today_Date, Validators.compose([Validators.required,])]
      }
    );

    this.date_val  = this.form_date.controls['date_val'];
    this.form_att = fb.group
    (
      {
        'att_val_hr'  : ['', Validators.compose([Validators.required,])],
        'att_val_ot'  : [0],
        'att_val_pl'  : [0],
        'att_val_sl'  : [0],
        'att_val_cl'  : [0]
      }
    );
    this.att_val_hr          = this.form_att.controls['att_val_hr'];
    this.att_val_ot          = this.form_att.controls['att_val_ot'];
    this.att_val_pl          = this.form_att.controls['att_val_pl'];
    this.att_val_sl          = this.form_att.controls['att_val_sl'];
    this.att_val_cl          = this.form_att.controls['att_val_cl'];

    this.form_att_edit = fb.group
    (
      {
        'att_edit_val_hr'   : ['', Validators.compose([Validators.required,])],
        'att_edit_val_ot'   : [null],
        'att_edit_val_pl'   : [null],
        'att_edit_val_sl'   : [null],
        'att_edit_val_cl'   : [null]
      }
    );
    this.att_edit_val_hr    = this.form_att_edit.controls['att_edit_val_hr'];
    this.att_edit_val_ot    = this.form_att_edit.controls['att_edit_val_ot'];
    this.att_edit_val_pl    = this.form_att_edit.controls['att_edit_val_pl'];
    this.att_edit_val_sl    = this.form_att_edit.controls['att_edit_val_sl'];
    this.att_edit_val_cl    = this.form_att_edit.controls['att_edit_val_cl'];

    this.com_off  = fb.group
    ({
      total_days : [null],
      emp_list   : fb.array([])
    })
  };

  ngOnInit(): void
  {
    this.api.get('get_data.php?table=employee&authToken='+environment.authToken).then((data: any) =>
    {
      this.employee_list = data;
    }).catch(error => {this.toastService.typeError('Something went wrong');
    this.loading=false;});
  }

  onSubmit_date(data :any)
  {

    this.List             = [];
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];

    this.select_date_value = data.date_val;
    if(this.form_date.valid)
    {
      if(this.Today_Date < this.select_date_value)
      {
        this.toastService.typeError('Future date cannot be called !');
        this.att_window = 0;
      }
      else
      {
        this.loading=true;
        this.api.get('mp_attendance.php?date='+data.date_val+'&authToken='+environment.authToken).then((data: any) =>
        {

          const value : attendance []=[]

          this.att_list   = data;
          this.att_window = 1;
          this.loading=false;
          if(data != null)
          {
              this.totalData = data.length;
              data.map((res: attendance, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.id = serialNumber;
                    this.List.push(res);
                    this.serialNumberArray.push(serialNumber);
                    }
                    res.id = serialNumber;
                    value.push(res)
               });
               this.calculateTotalPages(this.totalData, this.pageSize);
               this.dataSource = new MatTableDataSource<attendance>(value);
          }
          else
          {
                this.toastService.typeWarning('No Data  attendance list');
          }

        }).catch(error => {this.toastService.typeError('Something went wrong');
        this.loading=false;});

      }
    }
    else
     {this.toastService.typeError('Select date');
      this.loading=false;};
  }


  getTableData()
  {
    this.List               = [];
    this.serialNumberArray  = [];
    this.pageNumberArray    = [];
    const value : attendance []=[]
        this.api.get('mp_attendance.php?date='+this.select_date_value+'&authToken='+environment.authToken).then((data: any) =>
        {
            if(data != null)
            {
              this.totalData = data.length;
              data.map((res: attendance, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.id = serialNumber;
                    this.List.push(res);
                    this.serialNumberArray.push(serialNumber);
                    }
                    res.id = serialNumber;
                    value.push(res)
               });
               this.calculateTotalPages(this.totalData, this.pageSize);
               this.dataSource = new MatTableDataSource<attendance>(value);
            }
            else{
              this.toastService.typeWarning('No Data  attendance list');
            }
        }).catch(error => {
          this.toastService.typeError('API Faild : loadData  attendance list');
        });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
  {
    this.List = [];
    await this.dataSource.filteredData.map((res: attendance, index: number) =>
      {
      const serialNumber = index + 1;

      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.List.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    
    this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.List.slice();
     if (!sort.active || sort.direction === '') {
       this.List = data;
          }
          else
           {
            this.List = data.sort((a, b) => {
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

  onRowClick(row:any)
  {

       this.emp_id = row.emp_id;
            // $('#add_att').modal('show');

            if(row.att_hr == "Not Found" && row.att_ot == "Not Found")
            {
              const modalElement = this.add_att.nativeElement;
            $(modalElement).modal('show');
            }
            else
            {
              if (this.user_type == "super_admin")
              {
                this.call_edit();
              }
              else
              {
                this.toastService.typeError('Already Attendance Added!');
              }
            }
  }



  async call_edit()
  {
    let status;
    await this.api.get('get_data.php?table=attendance&find=emp_id&value='+this.emp_id+'&find1=for_date&value1='+this.select_date_value+'&authToken='+environment.authToken).then((data: any) =>
      {
        this.edit_att_value_id = data[0].id;
        status = data[0].status;

        this.form_att_edit.controls['att_edit_val_hr'].setValue(data[0].hours);
        this.form_att_edit.controls['att_edit_val_ot'].setValue(data[0].ot);
        this.form_att_edit.controls['att_edit_val_pl'].setValue(data[0].pl);
        this.form_att_edit.controls['att_edit_val_sl'].setValue(data[0].sl);
        this.form_att_edit.controls['att_edit_val_cl'].setValue(data[0].cl);

        this.att_window = 1;
      }).catch(error => {this.toastService.typeError('Something went wrong');});
      if (status === 0)
      {
        const modalElement = this.edit_att.nativeElement;
            $(modalElement).modal('show');
      }
      else
      {
        this.toastService.typeError('Sorry, Salary Generated for this Attendance');
      }
  }

  add_com_off()
  {
   this.days='';
   this.clearCheckboxes();
   this.currentSelected = { checked: false, emp_id: '' };
   this.shareCheckedlist();
   this.shareIndividualStatus();

   const modalElement = this.addcom_off.nativeElement;
   $(modalElement).modal('show');
  }

  clearCheckboxes() {
    this.employee_list.forEach((employee: { checked: boolean; })  => {
      employee.checked = false;
    });
    this.checkedList = [];
  }

  shareCheckedlist(){
      this.shareCheckedList.emit(this.checkedList);
   }

  shareIndividualStatus(){
     this.shareIndividualCheckedList.emit(this.currentSelected);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types

  getSelectedValue(status:boolean,value:string){
    if(status)
    {
      this.checkedList.push(value);
    }
    else
    {
        var index = this.checkedList.indexOf(value);
        this.checkedList.splice(index,1);
    }
    this.currentSelected = {checked : status,name:value};
    this.shareCheckedlist();
    this.shareIndividualStatus();
  }

  add_paid_leave()
  {
     this.days='';
     this.clearCheckboxes();
     this.currentSelected = { checked: false, emp_id: '' };
     this.shareCheckedlist();
     this.shareIndividualStatus();
     const modalElement = this.add_pl.nativeElement;
     $(modalElement).modal('show');
  }

  async onSubmit(data :any)
  {
    data.created_by = this.uid;
    data.emp_id     = this.emp_id;
    data.date_val   = this.select_date_value;

      Object.keys(this.form_att.controls).forEach(field => {
        this.form_att.get(field)?.markAsTouched({ onlySelf: true });
      });
  if(this.form_att.valid)
   {
      this.loading    = true;
      await this.api.post('post_insert_data.php?table=attendance&authToken='+environment.authToken,data).then((data_rt: any) =>
      {
        if(data_rt.status == "success") { this.toastService.typeSuccess('Attendance Added Succesfully');
          this.loading=false;}
        else { this.toastService.typeError('Something went wrong ');
        this.loading=false;}
        this.onSubmit_date(data);
        this.form_att.controls['att_val_hr'].setValue(null);
        this.form_att.controls['att_val_ot'].setValue(0);
        this.form_att.controls['att_val_pl'].setValue(0);
        this.form_att.controls['att_val_sl'].setValue(0);
        this.form_att.controls['att_val_cl'].setValue(0);
        const modalElement = this.add_att.nativeElement;
        $(modalElement).modal('hide');
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('Something went wrong ');
          this.loading=false;
      });
   }
   else{
    this.toastService.typeError('Fill the Attendance ');
   }
  }


  async onUpdate(data :any)
  {
    data.created_by = this.uid;
    data.emp_id     = this.employee;
    data.date_val   = this.select_date_value;
      this.loading    =true;
      await this.api.post('post_update_data.php?table=attendance&field=id&value='+this.edit_att_value_id+'&authToken='+environment.authToken,data).then((data_rt: any) =>
      {
        if(data_rt.status == "success") { this.toastService.typeSuccess('Attendance Updated Succesfully');
          this.loading=false;}
        else { this.toastService.typeError('Something went wrong');
        this.loading=false;}
        this.onSubmit_date(data);
        this.form_att_edit.controls['att_edit_val_hr'].reset();
        this.form_att_edit.controls['att_edit_val_ot'].reset();
        this.form_att_edit.controls['att_edit_val_pl'].reset();
        this.form_att_edit.controls['att_edit_val_sl'].reset();
        this.form_att_edit.controls['att_edit_val_cl'].reset();
        const modalElement = this.edit_att.nativeElement;
        $(modalElement).modal('hide');

        return true;
      }).catch(error =>
      {
          this.toastService.typeError('Something went wrong');
          this.loading=false;
      });
   }

   update()
   {
    if(this.days != ''  && this.checkedList.length != 0)
    {
      this.length = 0;
      const promises = this.checkedList.map(empId =>
        this.api.post(`mp_employee_com_off_update.php?table=employee&field=emp_id&value=${empId}&up_field=com_off&update=${this.days}&authToken=${environment.authToken}`, null));

      Promise.all(promises)
       .then(results => {

        results.forEach(data_rt => {
          if (data_rt.status === 'success') {
            this.length++;
          } else {
            this.toastService.typeError('Something went wrong');
          }
        });

        if (this.checkedList.length === this.length)
        {
          this.toastService.typeSuccess('Com Off Added Successfully');
          this.clearCheckboxes();
          this.currentSelected = { checked: false, emp_id: '' };
          this.shareCheckedlist();
          this.shareIndividualStatus();
          this.days = '';
          const modalElement = this.addcom_off.nativeElement;
          $(modalElement).modal('hide');
        }
        else
        {
          this.toastService.typeWarning('Com Off Not Assigned to All');
        }
      }).catch(error => {
        this.toastService.typeError('Something went wrong');
        this.loading = false;
      });
    }
    else{
      this.toastService.typeWarning('Enter the days and Select the Employee List');
    }
   }


   update_pl()
   {
       if(this.days != ''  && this.checkedList.length != 0)
         {
           this.length = 0;

           const promises = this.checkedList.map(empId =>
           this.api.post(`mp_employee_pl_update.php?table=employee&field=emp_id&value=${empId}&up_field=pl_leave&update=${this.days}&authToken=${environment.authToken}`, null));

           Promise.all(promises)
           .then(results => {

             results.forEach(data_rt => {

               if (data_rt.status === 'success') {
                 this.length++;
               } else {
                 this.toastService.typeError('Something went wrong');
               }
             });

             if (this.checkedList.length === this.length)
             {
               this.toastService.typeSuccess('Paid Leave Added Successfully');
               this.clearCheckboxes();
               this.currentSelected = { checked: false, emp_id: '' };
               this.shareCheckedlist();
               this.shareIndividualStatus();
               this.days = '';
               const modalElement = this.add_pl.nativeElement;
              $(modalElement).modal('hide');
             }
             else
             {
               this.toastService.typeWarning('Paid Laeve Not Assigned to All');
             }
           }).catch(error => {
             this.toastService.typeError('Something went wrong');
             this.loading = false;
           });
         }
         else{
           this.toastService.typeWarning('Enter the days and Select the Employee List');
         }
    }

  }




