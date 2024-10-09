/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { pageSelection } from 'src/app/shared/sharedIndex';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { Attendance_reportmodels } from './attendance_report.models';

@Component({
  selector: 'app-attendance_report',
  templateUrl: './attendance_report.component.html',
  styleUrls: ['./attendance_report.component.scss']
})
export class Attendance_reportComponent implements OnInit {

  date!: FormGroup;
  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');

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
  dataSource   !: MatTableDataSource<Attendance_reportmodels>;
  public totalPages = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
   list          :Array<Attendance_reportmodels> =[];
   from_date       : any;
   to_date         : any;
   employee_list   : any;
   employee_id     : any;
   total_attedance : any;
   worked_hours    : any = 0;
   ot_hours        : any = 0;
   pl_hours        : any = 0;
   sl_hours        : any = 0;
   cl_hours        : any = 0;
   worked_days     : any = 0;
   ot_days         : any = 0;
   pl_days         : any = 0;
   sl_days         : any = 0;
   cl_days         : any = 0;
   name            : any;
 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {

   this.date = fb.group({
     emp_id  : [null,Validators.compose([Validators.required])],
     fromdate: [null,Validators.compose([Validators.required])],
     todate  : [null,Validators.compose([Validators.required])],
   });

 }

 ngOnInit() {
          this.api.get('get_data.php?table=employee&find=status&value=1&authToken=' + environment.authToken).then((data: any) =>
            {
               this.employee_list = data;
            }).catch(error => {this.toastService.typeError('API Faild : employee list');});
   }


 download(value:any)
 {

   this.from_date  = value.fromdate
   this.to_date    = value.todate
   this.employee_id =  value.emp_id
   if(this.employee_id != 0)
    {
      let name = this.employee_list.find((t: {emp_id:any})=>t.emp_id == value.emp_id);
      this.name = name.name
    }
    else{
      this.name = "All Employee "
    }
   this.get_tabledata();
 }

 async get_tabledata()
 {
   this.serialNumberArray     = [];
   this.pageNumberArray       = [];
   this.list   = [];

   this.api.get('mp_attendance_report.php?emp_id='+this.employee_id+'&from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken).then((data: any) => {

    if (data != null)
      {

            let total_data = (data as any)['report'];
            let total_attedance =  (data as any)['total'];
            this.total_attedance =  (data as any)['total'];
            this.worked_days   = total_attedance.worked_days
            this.worked_hours  = total_attedance.worked_hours
            this.ot_days       = total_attedance.ot_days
            this.ot_hours      = total_attedance.ot_hours
            this.pl_hours      = total_attedance.pl_hours
            this.pl_days       = total_attedance.pl_days
            this.sl_days       = total_attedance.sl_days
            this.sl_hours      = total_attedance.sl_hours
            this.cl_days       = total_attedance.cl_days
            this.cl_hours      = total_attedance.cl_hours

           let value :  Attendance_reportmodels []= []
           this.totalData    = total_data.length
           total_data.map((res: Attendance_reportmodels, index: number) => {
           const serialNumber = index + 1;
           if (index >= this.skip && serialNumber <= this.limit) {
           res.s_no = serialNumber;
           this.list.push(res);
           this.serialNumberArray.push(serialNumber);

           }
           res.s_no = serialNumber;
           value.push(res)
      });
          this.calculateTotalPages(this.totalData, this.pageSize);
           this.dataSource = new MatTableDataSource<Attendance_reportmodels>(value);
    }
    else{
      this.toastService.typeError('No Data')
    }
   }).catch(error => { this.toastService.typeError(' Data Load Error')});
 }

 onRowClick(row:any)
 {
     // this.show =true

 }

 public searchData(value: any): void {
   this.dataSource.filter = value.trim().toLowerCase();
   this.totalData = this.dataSource.filteredData.length;
   this.callData()
 }

 async callData()
    {
      this.list = [];
      await this.dataSource.filteredData.map((res: Attendance_reportmodels, index: number) =>
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
   const exportData: Partial<TableElement>[] =
   this.dataSource.filteredData.map((x) => ({
       "#"               : x.s_no,
       "Date"            : x.Date,
       "Employee_Name"   : x.Employee_Name,
       "Hours"           : x.Hours,
       "OT "             : x.ot,
       "PL"              : x.pl,
       "SL"              : x.sl,
       "CL"              : x.ot,
       "Notes"           : x.Notes,

   }));
   TableExportUtil.exportToExcel(exportData, this.name+' Attendance  Report');
  }


}
