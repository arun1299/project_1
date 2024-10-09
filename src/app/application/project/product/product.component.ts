/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import { ApiService } from 'src/app/core/services/api/api.service';
import { pageSelection } from 'src/app/shared/sharedIndex';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { environment } from 'src/environments/environment.prod';
import { BsModalRef } from 'ngx-bootstrap/modal';
declare let $: any;

interface project {
  s_no        : number;
  id          : number;
  category    : number;
  details     : number;
  name        : string;
  status      : number;
}

interface man_power {
  s_no        : number;
  id          : number;
  project     : string;
  emp_id      : number;
  emp_name    : string;
  working_time: number;
  date        : number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public routes = routes;
  public searchDataValue = '';

  public project_list : Array<project> = [];
  dataSource!: MatTableDataSource<project>;
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
  public show        = false;

  public searchDataValue_1 = '';
  modalRef!   : BsModalRef;

  public work_time_list : Array<man_power> = [];
  dataSource_1!: MatTableDataSource<man_power>;
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
  public show_1        = false;
  public loading  = false

  project_id : any
  details    : any
  row_id     : any
  employee_list : any
  add_time  !: FormGroup;
  edit_time  !: FormGroup;
  public uid = localStorage.getItem('uid')

  @ViewChild('add_att') add_att!: ElementRef;
  @ViewChild('edit_att') edit_att!: ElementRef;

  constructor(public toastrService :ToasterService,public api : ApiService,public formbuilder : FormBuilder) {

      this.add_time = formbuilder.group({
        created_by : [this.uid],
        project_id  : [null],
        emp_id      : ['', Validators.compose([Validators.required,])],
        time_att    : ['', Validators.compose([Validators.required,])],
        date_att    : ['', Validators.compose([Validators.required,])],
        status      : [1]
      })

      this.edit_time = formbuilder.group({
        emp_id      : ['', Validators.compose([Validators.required,])],
        time_att    : ['', Validators.compose([Validators.required,])],
        date_att    : ['', Validators.compose([Validators.required,])],

      })

   }

  ngOnInit() {
    this.table_data()
    this.Employeedata()
  }

  async Employeedata()
  {
    await this.api.get('get_data.php?table=employee&authToken=' + environment.authToken).then((data: any) =>
    {
        this.employee_list = data;

    }).catch(error => { this.toastrService.typeError('Something went wrong in customer list'); });
  }

  async table_data()
  {
    this.project_list      = [];
    this.pageNumberArray   = [];
    this.serialNumberArray = [];

    await this.api.get('get_data.php?table=project&authToken=' + environment.authToken).then((data: any) =>
    {
      if(data != null)
      {
              const value : project [] =[]
              this.totalData = data.length;
              data.map((res: project, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.s_no = serialNumber;
                    this.project_list.push(res);
                    this.serialNumberArray.push(serialNumber);

                    }
                    res.s_no = serialNumber;
                    value.push(res);
               });

               this.calculateTotalPages(this.totalData, this.pageSize);
               this.dataSource = new MatTableDataSource<project>(value);
          }
          else
          {
                this.toastrService.typeWarning('No Data project list');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData Projecr list'); });

  }

  public searchData(value: any): void {
        this.dataSource.filter = value.trim().toLowerCase();
        this.totalData = this.dataSource.filteredData.length;
        this.callData()
  }

  async callData()
  {
        this.project_list = [];
        await this.dataSource.filteredData.map((res: project, index: number) =>
          {
          const serialNumber = index + 1;

          if (index >= this.skip && serialNumber <= this.limit) {
            res.id = serialNumber;
            this.project_list.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
        const data = this.project_list.slice();
        if (!sort.active || sort.direction === '') {
          this.project_list = data;
              }
              else
              {
                this.project_list = data.sort((a, b) => {
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

  public PageSize(value :any): void {
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


  onActivate(row:any)
  {
              this.project_id  = row.project_id;
              this.details  = row.details;

              this.table_data_1()
              this.show = true
  }

  onActivate_time(row : any)
  {

              this.row_id = row.id
              this.edit_time.controls['date_att'].setValue(row.date)
              this.edit_time.controls['time_att'].setValue(row.working_time)
              this.edit_time.controls['emp_id'].setValue(row.emp_id)
              const modalElement = this.edit_att.nativeElement;
              $(modalElement).modal('show');
  }


  Add_new()
  {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10);
    console.log(formattedDate)

    this.add_time.controls['date_att'].setValue(formattedDate);
              this.add_time.controls['project_id'].setValue(this.project_id)

              const modalElement = this.add_att.nativeElement;
              $(modalElement).modal('show');
  }


 async onSubmit(value : any)
  {

              if(this.add_time.valid)
              {
                await this.api.post('post_insert_data.php?table=project_worked_time&authToken='+environment.authToken,this.add_time.value).then((data_rt: any) =>
                  {

                    if(data_rt.status == "success")
                      {
                          this.toastrService.typeSuccess(' Added Succesfully');
                          this.table_data_1()
                          this.add_time.controls['date_att'].setValue(null);
                          this.add_time.controls['time_att'].setValue(0);
                          this.add_time.controls['project_id'].setValue(null);
                          this.add_time.controls['emp_id'].setValue(null);
                          const modalElement = this.add_att.nativeElement;
                          $(modalElement).modal('hide');
                          this.loading=false;
                        }
                    else { this.toastrService.typeError('Something went wrong ');
                    this.loading=false;}

                  }).catch(error =>
                  {
                      this.toastrService.typeError('Something went wrong ');
                      this.loading=false;
                  });
              }
              else{
                this.toastrService.typeError('Fill the all data ');
                this.loading=false;
              }
  }



  async table_data_1()
  {
    this.work_time_list      = [];
    this.pageNumberArray_1   = [];
    this.serialNumberArray_1 = [];

    await this.api.get('get_data.php?table=project_worked_time&find=project_id&value='+this.project_id+'&asign_field=id&asign_value=DESC&authToken=' + environment.authToken).then((data: any) =>
    {
      console.log(data)
      if(data != null)
      {

              const value : man_power [] = []
              this.totalData_1 = data.length;
              data.map((res: man_power, index: number) => {
                     const serialNumber = index + 1;

                     const filteredItems = this.employee_list.filter((name: { emp_id: number; }) => name.emp_id === res.emp_id );
                     console.log(filteredItems)
                     res.emp_name = filteredItems[0].name

                   if (index >= this.skip_1 && serialNumber <= this.limit_1) {
                    res.s_no = serialNumber;
                    this.work_time_list.push(res);
                    this.serialNumberArray_1.push(serialNumber);
                    }
                    res.s_no = serialNumber;
                    value.push(res);
               });
                console.log(value)
               this.calculateTotalPages_1(this.totalData_1, this.pageSize_1);
               this.dataSource_1 = new MatTableDataSource<man_power>(value);
          }
          else
          {
                this.toastrService.typeWarning('No Data in this project ');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData Project list'); });

  }

  public searchData_1(value: any): void {
        this.dataSource_1.filter = value.trim().toLowerCase();
        this.totalData_1 = this.dataSource.filteredData.length;
        this.callData_1()
  }

  async callData_1()
  {
        this.work_time_list = [];
        await this.dataSource_1.filteredData.map((res: man_power, index: number) =>
          {
          const serialNumber = index + 1;

          if (index >= this.skip_1 && serialNumber <= this.limit_1) {
            res.id = serialNumber;
            this.work_time_list.push(res);
            this.serialNumberArray_1.push(serialNumber);
          }
        });
        this.calculateTotalPages_1(this.dataSource_1.filteredData.length, this.pageSize_1);
  }

  public sortData_1(sort: Sort) {
        const data = this.work_time_list.slice();
        if (!sort.active || sort.direction === '') {
          this.work_time_list = data;
              }
              else
              {
                this.work_time_list = data.sort((a, b) => {
                  const aValue = (a as any)[sort.active];
                  const bValue = (b as any)[sort.active];
                  return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
                });
              }
    }

  public getMoreData_1(event: string): void {
            if (event == 'next') {
              this.currentPage_1++;
              this.pageIndex_1 = this.currentPage_1 - 1;
              this.limit_1 += this.pageIndex_1;
              this.skip_1 = this.pageIndex_1 * this.pageIndex_1;
              this.callData_1();
            } else if (event == 'previous') {
              this.currentPage_1--;
              this.pageIndex_1 = this.currentPage_1 - 1;
              this.limit_1 -= this.pageIndex_1;
              this.skip_1 = this.pageIndex_1 * this.pageIndex_1;
              this.callData_1();
            }
  }

  public moveToPage_1(pageNumber: number): void {
            this.currentPage_1 = pageNumber;
            this.skip_1 = this.pageSelection_1[pageNumber - 1].skip;
            this.limit_1 = this.pageSelection_1[pageNumber - 1].limit;
            if (pageNumber > this.currentPage_1) {
              this.pageIndex_1 = pageNumber - 1;
            } else if (pageNumber < this.currentPage_1) {
              this.pageIndex_1 = pageNumber + 1;
            }
            this.callData_1();
  }

  public PageSize_1(value :any): void {
            this.pageSize_1 = parseInt(value)
            this.pageSelection_1 = [];
            this.limit_1 = this.pageSize_1;
            this.skip_1 = 0;
            this.currentPage_1 = 1;
            this.callData_1();
  }

  private calculateTotalPages_1(totalData: number, pageSize: number): void {
            this.pageNumberArray_1 = [];

            this.totalPages = totalData / pageSize;
            if (this.totalPages % 1 != 0) {
              this.totalPages = Math.trunc(this.totalPages + 1);
            }
            for (let i = 1; i <= this.totalPages; i++) {
              const limit = pageSize * i;
              const skip = limit - pageSize;
              this.pageNumberArray_1.push(i);
              this.pageSelection_1.push({ skip: skip, limit: limit });
            }
  }

 async update(value : any)
  {
        if(this.edit_time.valid)
        {
          await this.api.post('post_update_data.php?table=project_worked_time&field=id&value='+this.row_id+'&authToken='+environment.authToken,this.edit_time.value).then((data_rt: any) =>
            {

              if(data_rt.status == "success")
                {
                    this.toastrService.typeSuccess(' Updated Succesfully');
                    this.table_data_1()
                    this.edit_time.controls['date_att'].setValue(null);
                    this.edit_time.controls['time_att'].setValue(0);

                    const modalElement = this.edit_att.nativeElement;
                    $(modalElement).modal('hide');
                    this.loading=false;
                  }
              else { this.toastrService.typeError('Something went wrong ');
              this.loading=false;}

            }).catch(error =>
            {
                this.toastrService.typeError('Something went wrong ');
                this.loading=false;
            });
        }
        else{
          this.toastrService.typeError('Fill the all data ');
          this.loading=false;
        }
  }

  set_zero()
  {
    this.show = false
  }

  exportExcel_1()
  {
        const exportData: Partial<TableElement>[] =
        this.dataSource.filteredData.map((x) => ({
          '#' : x.s_no,
          "project"  : x.name,
          "category" : x.category === 1 ? "electronics" :x.category === 2 ? "electrical" :x.category === 3 ? "software": undefined,
        }));
      TableExportUtil.exportToExcel(exportData, 'Project List');
  }

  exportExcel()
  {
        const exportData: Partial<TableElement>[] =
        this.dataSource.filteredData.map((x) => ({
          '#' : x.s_no,
          "project"  : x.name,
          "category" : x.category === 1 ? "electronics" :x.category === 2 ? "electrical" :x.category === 3 ? "software": undefined,
        }));
      TableExportUtil.exportToExcel(exportData, 'Project List');
  }
}
