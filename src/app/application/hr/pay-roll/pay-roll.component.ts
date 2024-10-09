/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToasterService, routes } from 'src/app/core/core.index';
import { DetailView, attendance, payroll, salary_amount } from './pay-roll-models';
import { pageSelection } from 'src/app/core/models/models';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
declare let $: any;

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrls: ['./pay-roll.component.scss']
})
export class PayRollComponent implements OnInit {


  public payroll_list : Array<payroll> = [];
  dataSource!: MatTableDataSource<payroll>;

  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;

  public routes = routes;
  modalRef      !: BsModalRef;
  selected      =  [];

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


  public List : Array<attendance> = [];
  dataSource_att!: MatTableDataSource<attendance>;

  public searchDataValue_emp = '';

  public lastIndex_emp = 0;
  public pageSize_emp = 10;
  public totalData_emp = 0;
  public skip_emp = 0;
  public limit_emp: number = this.pageSize;
  public pageIndex_emp = 0;
  public currentPage_emp = 1;
  public serialNumberArray_emp: Array<number> = [];
  public pageNumberArray_emp: Array<number> = [];
  public pageSelection_emp: Array<pageSelection> = [];
  public totalPages_emp = 0;

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');


  public searchDataValue_sal = '';

  public lastIndex_sal = 0;
  public pageSize_sal = 10;
  public totalData_sal = 0;
  public skip_sal = 0;
  public limit_sal: number = this.pageSize;
  public pageIndex_sal = 0;
  public currentPage_sal = 1;
  public serialNumberArray_sal: Array<number> = [];
  public pageNumberArray_sal: Array<number> = [];
  public pageSelection_sal: Array<pageSelection> = [];
  public totalPages_sal = 0;


  public List_sal : Array<salary_amount> = [];
  dataSource_sal!: MatTableDataSource<salary_amount>;



  detail_view         : any;
  employee            = [];
  salary_details      : any;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  ip_sal_show         : boolean = true;
  salary_credit       = false;
  status              = false;
  show_table          = false;

  public form_salary    : FormGroup;
  public salary_load    : FormGroup;
  public salary_gen     : FormGroup;
  public payroll_days   : FormGroup;
  public payroll_amount : FormGroup;

  public ip_salary    : AbstractControl;
  public ip_bank_id   : AbstractControl;
  public ip_utr       : AbstractControl;
  public ip_reff      : AbstractControl;
  public ip_tran_mode : AbstractControl;
  public ip_tran_date : AbstractControl;
  public from_date    : AbstractControl;
  public to_date      : AbstractControl;
  public category     : AbstractControl;
  public total_hr     : AbstractControl;



  today               = new Date();
  todaysDate          = '';
  show_page           = 0;
  show_Load           = 0;

  LoadSalaryData      : any;
  SalaryList          : any;
  BankList            : any;
  SalaryAck           : any;
  employee_type       : any;
  plUseValue          : any;
  advance_date        : any;
  salary_dtails       : any;
  amount              : any;
  salary_amount       : any;
  salary_id           : any;
  salary_group        : any;
  temp                : any;
  open_popup          : any;
  pay_roll_data       : any;
  clUseValue          : any;
  total_days          : any;
  total_workeddays    : any;
  cl_days             : any;
  pl_days             : any;
  sl_days             : any;
  ot_days             : any;
  salary_data         : any;
  salary_Amount       : any;
  salary_advance      : any;
  salary_paid_amount  : any;
  ot_hours            : any;
  ot_per_hours        : any;
  ot_paid_amount      : any;
  total_amount        : any;
  fixed_salary        : any;
  fixed_payable_salary: any;
  basic_da            : any;
  hra                 : any;
  allowance           : any;
  epf_deduction       : any;
  esi_deduction       : any;
  petrol_food_expenses: any;
  incentive_others    : any;
  total_deduction     : any;
  net_salary          : any;
  salary_paid         : any;
  gross_salary        : any;
  final_data          : any;
  salary_detail       : any;
  payment             : any;
  company_total_expence    : any;
  epf_employer_contribution: any;
  esi_employer_contribution: any;
  row_id              : any;

  @ViewChild("salary_calc",) salary_calc !:ElementRef;

  @ViewChild("employee_salary",{static:true}) employee_salary !:ElementRef;

  @ViewChild("employee_salary_days",{static:true}) employee_salary_days !:ElementRef;
  emp_id: any;
  salary_atten_list: any;

  constructor( public api: ApiService, public toastrService: ToasterService, fb:FormBuilder)
  {
    const today = new Date();
    let date = today.toISOString().split('T')[0];
    this.todaysDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.form_salary = fb.group
    (
      {
        ip_salary   : [null],
        ip_bank_id  : ['', Validators.compose([Validators.required])],
        ip_utr      : ['',Validators.compose([Validators.required])],
        ip_reff     : [null],
        ip_tran_mode: ['',Validators.compose([Validators.required])],
        ip_tran_date: [date,Validators.compose([Validators.required])],
      }
    );
    this.ip_salary    = this.form_salary.controls['ip_salary'];
    this.ip_bank_id   = this.form_salary.controls['ip_bank_id'];
    this.ip_utr       = this.form_salary.controls['ip_utr'];
    this.ip_reff      = this.form_salary.controls['ip_reff'];
    this.ip_tran_mode = this.form_salary.controls['ip_tran_mode'];
    this.ip_tran_date = this.form_salary.controls['ip_tran_date'];
    this.salary_load  = fb.group
    (
      {
        'from_date' : ['', Validators.compose([Validators.required])],
        'to_date'   : ['', Validators.compose([Validators.required])],
        'category'  : ['', Validators.compose([Validators.required])],
      }
    );
    this.from_date  = this.salary_load.controls['from_date'];
    this.to_date    = this.salary_load.controls['to_date'];
    this.category   = this.salary_load.controls['category'];

    this.salary_gen = fb.group
    (
      {
        total_hr    : [null]
      }
    );
    this.total_hr   = this.salary_gen.controls['total_hr'];

    this.payroll_amount = fb.group
    ({
      created_by            :[this.uid],
      emp_id                :[null],
      attendance_id         :[null],
      salary_amount         :[null],
      salary_advance        :[null],
      paid_amount           :[null],
      ot_hours              :[null],
      ot_per_hour           :[null],
      ot_paid_amount        :[null],
      total_amount          :[null],
      fixed_salary          :[null],
      fixed_payable_amount  :[null],
      basic_da              :[null],
      hra                   :[null],
      allowance             :[null],
      epf_employee          :[null],
      esi_employee          :[null],
      total_deduction       :[null],
      pertrol_food          :[null],
      incentive_others      :[null],
      net_salary            :[null],
      salary_paid           :[null],
      gross_salary          :[null],
      epf_employer          :[null],
      esi_employer          :[null],
      company_total_expence :[null]
    })

    this.payroll_days = fb.group
    (
      {

        from_date         : [null],
        to_date           : [null],
        no_of_days        : [null],
        no_of_workingdays : [null],
        no_of_cl          : [null],
        no_of_pl          : [null],
        no_of_sl          : [null],
        no_of_ot          : [null],
        pl_available      : [null],
        pl_use            : [null],
        pl_balance        : [null],
        c_off_available   : [null],
        c_off_use         : [null],
        c_off_balance     : [null],
        lop               : [null],
        salary_paid_day   : [null],
        att_row           : [null]
      }
    );
  }

  ngOnInit(): void {

  this.api.get('get_data.php?table=employee&authToken=' + environment.authToken).then((data: any) =>
    {
      this.employee = data;
    }).catch(error => { this.toastrService.typeError('API Faild : loadData employee details'); });
    this.loadData();
    this.table_data();
  }

  async loadData()
  {
    await this.api.get('get_data.php?table=bank&find=status&value=1&find1=type&value1=1&authToken=' + environment.authToken).then((data: any) =>
    {
      this.BankList = data;
    }).catch(error => { });

    await this.api.get('get_data.php?table=employee_type&authToken=' + environment.authToken).then((data: any) =>
    {
      this.salary_group = data;
    }).catch(error => { this.toastrService.typeError('API Faild : loadData salary group'); });
  }

  async onActivate(event :any)
  {
      if(this.user_type === "super_admin")
      {
        this.payroll_amount.controls['emp_id'].setValue(event.emp_id);
        this.payroll_amount.controls['attendance_id'].setValue(event.id);

        this.payment_data(event.id);
        this.load_salary(event.emp_id);
        this.emp_id = event.emp_id;
        this.selected = event
      }
      else
      {
        this.selected = [];
      }
  }

  submit_payroll_days(value:any)
  {
    this.loading = true;
    this.api.post('mp_salary_days_create.php?emp_id='+this.pay_roll_data.emp_id+'&value='+this.pay_roll_data.id+'&authToken='+environment.authToken,value).then((data_rt: any) =>
    {
      if(data_rt.status == "success")
      {
        this.toastrService.typeSuccess('Salary Details Updates Successfully');
        this.loading=false;
        this.selected=[];
        this.loadData();
      }
      else { this.toastrService.typeError(data_rt.status);
        this.loading=false;}
        this.loadData();
        this.show = true;
    }).catch(error =>
    {
        this.toastrService.typeError('API Faild : salaryUpdate');
        this.loading=false;
    });
  }


 async table_data()
  {

    this.payroll_list      = [];
    this.pageNumberArray   = [];
    this.serialNumberArray = [];

    await this.api.get('get_data.php?table=salary&find=status&value=1&asign_field=id&asign_value=DESC&authToken=' + environment.authToken).then((data: any) =>
    {
      this.SalaryList = data;
      let value :  payroll[] = [];
      if(data != null)
      {
          for(let i=0;i<data.length;i++)
          {
            const name = this.employee.find((t: {emp_id:any})=>t.emp_id == this.SalaryList[i].emp_id);
            data[i]['name'] = (name as any).name
          }
              this.totalData = data.length;
              data.map((res: payroll, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.s_no = serialNumber;
                    this.payroll_list.push(res);
                    this.serialNumberArray.push(serialNumber);

                    }
                    res.s_no = serialNumber;
                    value.push(res);
               });
                    this.calculateTotalPages(this.totalData, this.pageSize);
                    this.dataSource = new MatTableDataSource<payroll>(value);
          }
          else
          {
                this.toastrService.typeWarning('No Data  salary list');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData salary list'); });

  }

  async searchData(value: any) {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
   await this.callData()
  }

  async callData()
{
  this.payroll_list = [];
  await this.dataSource.filteredData.map((res: payroll, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.s_no = serialNumber;
      this.payroll_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });
  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}

  public sortData(sort: Sort) {
    const data = this.payroll_list.slice();
     if (!sort.active || sort.direction === '') {
       this.payroll_list = data;
          }
          else
           {
            this.payroll_list = data.sort((a, b) => {
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

  open() {
    this.Toggledata = !this.Toggledata;
  }

  onRowClick(row:any)
  {
       this.emp_id = row.emp_id;
     // $('#add_att').modal('show');
  }

  onRowClick_emp(row:any)
  {
    this.emp_id = row.emp_id;

    this.salary_details = row;

    this.api.get('get_data.php?table=employee&find=emp_id&value='+row.emp_id+'&find1=status&value1=1&authToken=' + environment.authToken).then((data: any) =>
     {

       this.salary_details['pl_available']      = data[0].pl_leave;
       this.salary_details['com_off_available'] = data[0].com_off;

       this.pay_roll_data = this.salary_details;

       this.plUseValue       = this.salary_details['pl']/8;
       this.clUseValue       = 0;
       this.total_days       = 0;
       this.total_workeddays = this.salary_details['hr']/8;
       this.cl_days          = this.salary_details['cl']/8;
       this.pl_days          = this.salary_details['pl']/8;
       this.sl_days          = this.salary_details['sl']/8;
       this.ot_days          = this.salary_details['ot'];

       this.payroll_days.controls['from_date'].setValue(this.salary_details['from_date']);
       this.payroll_days.controls['to_date'].setValue(this.salary_details['to_date']);
       this.payroll_days.controls['no_of_workingdays'].setValue(this.total_workeddays);
       this.payroll_days.controls['no_of_cl'].setValue(parseInt(this.cl_days));
       this.payroll_days.controls['no_of_pl'].setValue(parseInt(this.pl_days));
       this.payroll_days.controls['no_of_sl'].setValue(parseInt(this.sl_days));
       this.payroll_days.controls['no_of_ot'].setValue(parseInt(this.ot_days));
       this.payroll_days.controls['pl_available'].setValue(this.salary_details['pl_available'] );
       this.payroll_days.controls['pl_use'].setValue(this.pl_days);
       this.payroll_days.controls['pl_balance'].setValue(data.pl_balance);
       this.payroll_days.controls['c_off_available'].setValue(data[0].com_off);
       this.payroll_days.controls['c_off_use'].setValue(this.clUseValue);
       this.payroll_days.controls['att_row'].setValue(this.salary_details['att_row']);

       this.onInputChange_cl()
       this.onInputChange()
     }).catch(error =>
       {
         this.toastrService.typeError('API Faild : GenerateSalary');
         this.loading=false;
       });

       const modalElement = this.salary_calc.nativeElement;
       $(modalElement).modal('show');
   }


   onInputChange_cl()
   {

    let cl_use = this.clUseValue;

          if(this.pay_roll_data.com_off_available > 0 )
            {
              var cl_available = this.pay_roll_data.com_off_available - cl_use;
              var value3 = parseFloat(this.clUseValue);
            }
            else{
              cl_available = 0;
              value3 = 0;
            }

            if(this.pay_roll_data.pl_available > 0 )
              {
                var value2 = parseFloat(this.plUseValue);
              }
              else
              {
                 value2=0;
              }
              if(cl_available >= 0)
                {
                 this.payroll_days.controls['c_off_balance'].setValue( cl_available);
                }
                else{
                  this.payroll_days.controls['c_off_balance'].setValue(0);
                }
          let value1 = parseFloat(this.pl_days) + parseFloat(this.cl_days) + parseFloat(this.sl_days);



          if (!isNaN(value2) && !isNaN(value3))
          {
            let result = this.plUseValue + this.clUseValue;
            let LOP = value1 - result;
            let salary_paid_day =  this.total_workeddays + value2 + value3;
            if(this.total_days >= salary_paid_day && this.pay_roll_data.com_off_available >= cl_use)
              {
                this.payroll_days.controls['lop'].setValue(LOP);
                this.payroll_days.controls['salary_paid_day'].setValue(salary_paid_day);
              }
          }

          else
          {
              this.payroll_days.controls['lop'].setValue('');
              this.payroll_days.controls['salary_paid_day'].setValue('');
          }
   }


   onInputChange() {

    if(this.plUseValue <= 1)
    {
          let pl_use = this.plUseValue;
          var intValue = parseInt(this.plUseValue, 10);
          let pl_available = this.pay_roll_data.pl_available - pl_use;
          this.payroll_days.controls['pl_balance'].setValue( pl_available);

          let value1 = parseInt(this.pl_days,10) + parseInt (this.cl_days,10) + parseInt(this.sl_days,10);
          let value2 = parseInt(this.plUseValue, 10);
          let value3 = parseInt(this.clUseValue, 10);

          if (!isNaN(value1) && !isNaN(value2))
          {
              let result = value2 + value3;
              let LOP = value1 - result;

            let salary_paid_day = parseInt(this.total_days,10)-LOP

            this.payroll_days.controls['lop'].setValue(LOP);
            this.payroll_days.controls['salary_paid_day'].setValue(salary_paid_day);
          }
          else
          {
              this.payroll_days.controls['lop'].setValue('');
              this.payroll_days.controls['salary_paid_day'].setValue('');
          }
        }
        else{
          this.toastrService.typeError('pl value is greater than 1')
        }
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        EmployeeName: x.name,
        FromDate :x.from_date,
        ToDate   :x.to_date

      }));

    TableExportUtil.exportToExcel(exportData, 'PayRoll List');
  }

  PageAction(action :any)
  {
    if(action == "show")
    {
      this.show_page = 1;
    }
    if(action == "hide")
    {
      this.show_page = 0;
    }
  }


  async SalaryLoad(details: any)
  {
    this.List                  = [];
    this.pageNumberArray_emp   = [];
    this.serialNumberArray_emp = [];
     this.salary_atten_list = details
      Object.keys(this.salary_load.controls).forEach(field => {
        this.salary_load.get(field)?.markAsTouched({ onlySelf: true });
      });

    if(this.salary_load.valid)
    {
      this.show_Load = 1;
      this.loading=true;
      await this.api.get('mp_salary_load.php?category='+details.category+'&from_date='+details.from_date+'&to_date='+details.to_date+'&authToken='+environment.authToken).then((data_rt: any) =>
      {
        this.loading=false;
        if(data_rt.status== "no data")
        {
          this.List  = [];
          this.toastrService.typeWarning('No Data');
        }
        else{

         if(data_rt != null)
      {

              this.totalData_emp = data_rt.length;
              data_rt.map((res: attendance, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip_emp && serialNumber <= this.limit_emp) {
                    res.id = serialNumber;
                    this.List.push(res);
                    this.serialNumberArray_emp.push(serialNumber);
                    this.calculateTotalPages_emp(this.totalData_emp, this.pageSize_emp);
                    this.dataSource_att = new MatTableDataSource<attendance>(this.List);
                    }
               });
          }
          else
          {
                this.toastrService.typeWarning('No Data salary list');
          }
        }
        return true;
      }).catch(error =>
      {
          this.toastrService.typeError('API Faild : SalaryLoad');
          this.loading=false;
      });
   }
   else{
      this.toastrService.typeError('Select the Details');
   }
  }
  public searchData_emp(value: any): void {
    this.dataSource_att.filter = value.trim().toLowerCase();
    this.List = this.dataSource_att.filteredData;
  }

  public sortData_emp(sort: Sort) {
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

  public getMoreData_emp(event: string): void {
    if (event == 'next') {
      this.currentPage_emp++;
      this.pageIndex_emp = this.currentPage_emp - 1;
      this.limit_emp += this.pageSize_emp;
      this.skip_emp = this.pageSize_emp * this.pageIndex_emp;
      this.SalaryLoad(this.salary_atten_list);
    } else if (event == 'previous') {
      this.currentPage_emp--;
      this.pageIndex_emp = this.currentPage_emp - 1;
      this.limit_emp -= this.pageSize_emp;
      this.skip_emp = this.pageSize_emp * this.pageIndex_emp;
      this.SalaryLoad(this.salary_atten_list);
    }
  }

  public moveToPage_emp(pageNumber: number): void {
    this.currentPage_emp = pageNumber;
    this.skip_emp = this.pageSelection_emp[pageNumber - 1].skip;
    this.limit_emp = this.pageSelection_emp[pageNumber - 1].limit;
    if (pageNumber > this.currentPage_emp) {
      this.pageIndex_emp = pageNumber - 1;
    } else if (pageNumber < this.currentPage_emp) {
      this.pageIndex_emp = pageNumber + 1;
    }
    this.SalaryLoad(this.salary_atten_list);
  }

  public PageSize_emp(): void {
    this.pageSelection_emp = [];
    this.limit_emp = this.pageSize_emp;
    this.skip_emp = 0;
    this.currentPage_emp = 1;
    this.SalaryLoad(this.salary_atten_list);
  }

  private calculateTotalPages_emp(totalData: number, pageSize: number): void {
    this.pageNumberArray_emp = [];

    this.totalPages_emp = totalData / pageSize;
    if (this.totalPages_emp % 1 != 0) {
      this.totalPages_emp = Math.trunc(this.totalPages_emp + 1);
    }
    for (let i = 1; i <= this.totalPages_emp; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray_emp.push(i);
      this.pageSelection_emp.push({ skip: skip, limit: limit });
    }
  }

  open_emp() {
    this.Toggledata = !this.Toggledata;
  }

  set_zero()
  {
    this.selected = [];
    this.show_page = 0;
    this.show = false;
    this.salary_credit = false;
    this.show_table = false;
  }

  onSubmit(value :any)
 {

  let today = new Date();
  let year  = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, '0');
  let day   = String(today.getDate()).padStart(2, '0');

  let formattedDate   = `${year}-${month}-${day}`;
   value.tran_date    = formattedDate;
   value.advance_date = this.advance_date;
   value.created_by   = this.uid;

      this.loading = true;
      this.api.post('mp_salary_esi_epf_create.php?table=pay_roll&authToken=' + environment.authToken, value).then((data: any) => {
        if (data.status == "success")
        {
          this.loading = false;
          this.toastrService.typeSuccess('Salary Generated Succesfully');
          this.payment_data(value.attendance_id)
        }
        else{
          this.loading = false;
        }
        }).catch(error => { this.toastrService.typeError('API Faild : Salary Generated Failed');  this.loading = false;});
 }


 payment_data(id :any)
 {

   this.api.get('get_data.php?table=pay_roll&find=attendance_id&value='+id+'&find1=status&value1=1&authToken=' + environment.authToken).then((data: any) =>
   {

     if(data != null)
     {
       this.payment = data[0];
       this.status = true;
     }
     else
     {
       this.payment = null;
       this.status = false;
     }
   }).catch(error =>
     {
         this.toastrService.typeError('API Faild : SalaryLoad');
         this.loading=false;
     });
 }


 salary_amount_calculation()
{
  if(this.salary_advance != '' || this.salary_advance != null)
  {
    let salary_paid_amount = ((parseInt(this.salary_Amount)/parseInt(this.final_data.no_of_days)) * this.final_data.salary_paid_days) - parseInt(this.salary_advance);

    let total_amount       = salary_paid_amount + parseInt(this.ot_paid_amount)

    let net_salary         = parseInt(this.fixed_payable_salary) + parseInt(this.petrol_food_expenses) + parseInt(this.incentive_others)- parseInt(this.total_deduction)  ;

    let salary_paid        = net_salary - parseInt(this.salary_advance)+ parseInt(this.ot_paid_amount);

    let gross_salary       = net_salary + parseInt(this.total_deduction) ;

    this.salary_paid_amount = salary_paid_amount.toFixed(2);
    this.salary_paid        = salary_paid.toFixed(2);
    this.gross_salary       = gross_salary.toFixed(2);
    this.total_amount       = total_amount.toFixed(2);
    this.net_salary         = net_salary.toFixed(2);
  }
}

ot_amount_calculation()
{
  //this.ot_paid_amount = (this.ot_hours * this.ot_per_hours).toFixed(2);
}

async load_salary(id:any)
{
  await  this.api.get('mp_payroll_salary_amount.php?value='+id+'&authToken='+ environment.authToken).then((data: any) =>
  {

    this.advance_date              = data.from_date+' to '+data.to_date;

    this.final_data                = data;
    this.salary_Amount             = data.salary_amount.toFixed(2);
    this.salary_advance            = data.salary_advance.toFixed(2);
    this.salary_paid_amount        = data.salary_paid_amount.toFixed(2);
    this.ot_hours                  = data.ot_hours;
    this.ot_per_hours              = data.ot_per_hours;
    this.ot_paid_amount            = data.ot_paid_amount.toFixed(2);
    this.total_amount              = data.total_amount.toFixed(2);
    this.fixed_salary              = data.fixed_salary.toFixed(2);
    this.fixed_payable_salary      = data.fixed_payable_salary.toFixed(2);
    this.basic_da                  = data.basic_da.toFixed(2);
    this.hra                       = data.hra.toFixed(2);
    this.allowance                 = data.allowance.toFixed(2);
    this.epf_deduction             = data.epf_deduction.toFixed(2);
    this.esi_deduction             = data.esi_deduction.toFixed(2);
    this.petrol_food_expenses      = data.petrol_food_expenses.toFixed(2);
    this.incentive_others          = data.incentive_others.toFixed(2);
    this.total_deduction           = data.total_deduction.toFixed(2);
    this.net_salary                = data.net_salary.toFixed(2);
    this.salary_paid               = data.salary_paid.toFixed(2);
    this.gross_salary              = data.gross_salary.toFixed(2);
    this.epf_employer_contribution = data.epf_employer_contribution.toFixed(2);
    this.esi_employer_contribution = data.esi_employer_contribution.toFixed(2);
    this.company_total_expence     = data.company_total_expence.toFixed(2);
    setTimeout(async () => {
      this.show_table = true;
    }, 500);

  }).catch(error => { this.toastrService.typeError('API Faild : loadData employee details'); });
}


onsalary(event:any)
{
  if(event.type == "click")
  {
      this.api.get('mp_payroll_salary_amount.php?value='+event.row.emp_id+'&authToken='+ environment.authToken).then((data: any) =>
        {

          this.salary_Amount       = data.salary_amount;
          this.salary_advance      = data.salary_advance;
          this.salary_paid_amount  = data.salary_paid_amount;
          this.ot_hours            = data.ot_hours;
          this.ot_per_hours        = data.ot_per_hours;
          this.ot_paid_amount      = data.ot_paid_amount;
          this.total_amount        = data.total_amount;
          this.fixed_salary        = data.fixed_salary;
          this.fixed_payable_salary= data.fixed_payable_salary;
          this.basic_da            = data.basic_da;
          this.hra                 = data.hra;
          this.allowance           = data.allowance;
          this.epf_deduction       = data.epf_deduction;
          this.esi_deduction       = data.esi_deduction;
          this.petrol_food_expenses= data.petrol_food_expenses;
          this.incentive_others    = data.incentive_others;
          this.total_deduction     = data.total_deduction;
          this.net_salary          = data.net_salary;
          this.salary_paid         = data.salary_paid;
          this.gross_salary        = data.gross_salary;
          this.epf_employer_contribution = data.epf_employer_contribution;
          this.esi_employer_contribution = data.esi_employer_contribution;
          this.company_total_expence     = data.company_total_expence;

          this.show_table = false;
          this.show       = true;
        }).catch(error => { this.toastrService.typeError('API Faild : loadData employee details'); });
  }
}


make_transaction(value:any)
{

  this.List_sal = [] ;
  this.pageNumberArray_sal   = [];
  this.serialNumberArray_sal = [];

  this.salary_dtails = value

  this.api.get('mp_salary_transaction_data.php?emp_id='+value.emp_id+'&salary_id='+value.attendance_id+'&authToken='+ environment.authToken).then((data: any) =>
        {
          this.detail_view= data[0];
          this.row_id = data[0].row_id;
          this.salary_id  = data[0].salary_id;
          this.api.get('get_data.php?table=salary_payment&find=payroll_id&value='+data[0].row_id+'&authToken=' + environment.authToken).then((data: any) =>
              {
                if(data != null)
                {
                  this.salary_detail = data;
                  this.salaryCalculate();
                  this.totalData_sal = data.length;
                  data.map((res: salary_amount, index: number) => {
                         const serialNumber = index + 1;
                       if (index >= this.skip_sal && serialNumber <= this.limit_sal) {
                        res.id = serialNumber;
                        this.List_sal.push(res);
                        this.serialNumberArray_sal.push(serialNumber);
                        this.calculateTotalPages_sal(this.totalData_sal, this.pageSize_sal);
                        this.dataSource_sal = new MatTableDataSource<salary_amount>(this.List_sal);
                        }
                   });
                }
                else{
                  this.salary_detail = null
                  this.form_salary.controls['ip_salary'].setValue(value.salary_paid)
                  this.amount = value.salary_paid;
                }

              }).catch(error => { this.toastrService.typeError('API Faild : Salary Generated Failed'); });
        }).catch(error => { this.toastrService.typeError('API Faild : Salary Generated Failed'); });

        setTimeout(async () => {
          this.salary_credit = true;
          this.show_table    = false;
        }, 500);
}

salaryCalculate()
{
  let salary =this.payment.salary_paid
  let length = this.salary_detail.length;
   var total = 0;
    if(length > 0)
      {
          for(let i=0; i<length ;i++)
          {
            total=total+this.salary_detail[i].amount;
          }
      }
  this.amount = (salary-total).toFixed(2) ;
  this.form_salary.controls['ip_salary'].setValue(this.amount);
}

onAction(event:any)
  {
    if(event.type === "click")
    {
      this.salary_details = event.row;

     this.api.get('get_data.php?table=employee&find=emp_id&value='+event.row.emp_id+'&find1=status&value1=1&authToken=' + environment.authToken).then((data: any) =>
      {

        this.salary_details['pl_available']      = data[0].pl_leave;
        this.salary_details['com_off_available'] = data[0].com_off;

        this.pay_roll_data = this.salary_details;

        this.plUseValue       = this.salary_details['pl']/8;
        this.clUseValue       = 0;
        this.total_days       = 0;
        this.total_workeddays = this.salary_details['hr']/8;
        this.cl_days          = this.salary_details['cl']/8;
        this.pl_days          = this.salary_details['pl']/8;
        this.sl_days          = this.salary_details['sl']/8;
        this.ot_days          = this.salary_details['ot'];

        this.payroll_days.controls['from_date'].setValue(this.salary_details['from_date']);
        this.payroll_days.controls['to_date'].setValue(this.salary_details['to_date']);
        this.payroll_days.controls['no_of_workingdays'].setValue(this.total_workeddays);
        this.payroll_days.controls['no_of_cl'].setValue(parseInt(this.cl_days));
        this.payroll_days.controls['no_of_pl'].setValue(parseInt(this.pl_days));
        this.payroll_days.controls['no_of_sl'].setValue(parseInt(this.sl_days));
        this.payroll_days.controls['no_of_ot'].setValue(parseInt(this.ot_days));
        this.payroll_days.controls['pl_available'].setValue(this.salary_details['pl_available'] );
        this.payroll_days.controls['pl_use'].setValue(this.pl_days);
        this.payroll_days.controls['pl_balance'].setValue(data.pl_balance);
        this.payroll_days.controls['c_off_available'].setValue(data[0].com_off);
        this.payroll_days.controls['c_off_use'].setValue(this.clUseValue);
        this.payroll_days.controls['att_row'].setValue(this.salary_details['att_row']);

        this.onInputChange_cl()
        this.onInputChange()
      }).catch(error =>
        {
          this.toastrService.typeError('API Faild : GenerateSalary');
          this.loading=false;
        });
      //this.OpenSalaryAck();
    }
  }

  load_transaction(id:any)
  {
    this.List_sal = [] ;
    this.pageNumberArray_sal   = [];
    this.serialNumberArray_sal = [];

    this.api.get('get_data.php?table=salary_payment&find=payroll_id&value='+id+'&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data != null)
        {
          this.salary_detail = data
          this.salaryCalculate();

          this.totalData_sal = data.length;
          data.map((res: salary_amount, index: number) => {
                 const serialNumber = index + 1;
               if (index >= this.skip_sal && serialNumber <= this.limit_sal) {
                res.id = serialNumber;
                this.List_sal.push(res);
                this.serialNumberArray_sal.push(serialNumber);
                this.calculateTotalPages_sal(this.totalData_sal, this.pageSize_sal);
                this.dataSource_sal = new MatTableDataSource<salary_amount>(this.List_sal);
                }
           });
        }
        else
        {
          this.form_salary.controls['ip_salary'].setValue(this.salary_dtails.salary_paid)
          this.amount = this.salary_dtails.salary_paid;
          this.totalData_sal = 0;
        }

      }).catch(error => { this.toastrService.typeError('API Faild : Salary Generated Failed'); });
  }

  async salaryUpdate(data :any)
  {
      Object.keys(this.form_salary.controls).forEach(field => {
        this.form_salary.get(field)?.markAsTouched({ onlySelf: true });
      });

      if(this.form_salary.valid)
      {
    if(this.amount >= data.ip_salary)
    {
    data.created_by = this.uid;
    data.emp_id     = this.emp_id;
    data.row_id     = this.row_id;
    data.value      = data.att_edit_val;
    data.salary_id  = this.salary_id;
      if(this.amount>data.ip_salary)
      {
        data.status = 1;
      }
      if(this.amount == data.ip_salary)
      {
        data.status = 2;
      }
         this.loading=true;
    await this.api.post('mp_salary_update.php?authToken='+environment.authToken,data).then((data_rt: any) =>
    {
    if(data_rt.status == "success")
      {
        this.toastrService.typeSuccess('Salary Details Updates Successfully');
        this.loading=false;

       this.load_transaction(this.row_id);
       this.form_salary.reset();
       this.salary_credit = true;
       this.show_page     = 0;
       this.selected      = [];
      }

    else { this.toastrService.typeError(data_rt.status);
        this.loading=false;}
       this.loadData();
       this.selected = [];
       return true;
    }).catch(error =>
    {
        this.toastrService.typeError('API Faild : salaryUpdate');
        this.loading=false;
    });
   }
   else
   {
    this.toastrService.typeWarning('Salary Value is greater');
   }
  }
  else {
    this.toastrService.typeWarning('Fill All Details');
   }
  }

  public searchData_sal(value: any): void {
    this.dataSource_sal.filter = value.trim().toLowerCase();
    this.List_sal = this.dataSource_sal.filteredData;
  }

  public sortData_sal(sort: Sort) {
    const data = this.List_sal.slice();
     if (!sort.active || sort.direction === '') {
       this.List_sal = data;
          }
          else
           {
            this.List_sal = data.sort((a, b) => {
              const aValue = (a as any)[sort.active];
              const bValue = (b as any)[sort.active];
              return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
            });
           }
    }

  public getMoreData_sal(event: string): void {
    if (event == 'next') {
      this.currentPage_sal++;
      this.pageIndex_sal = this.currentPage_sal - 1;
      this.limit_sal += this.pageSize_sal;
      this.skip_sal = this.pageSize_sal * this.pageIndex_sal;
      this.load_transaction(this.row_id);
    } else if (event == 'previous') {
      this.currentPage_sal--;
      this.pageIndex_sal = this.currentPage_sal - 1;
      this.limit_sal -= this.pageSize_sal;
      this.skip_sal = this.pageSize_sal * this.pageIndex_sal;
      this.load_transaction(this.row_id);
    }
  }

  public moveToPage_sal(pageNumber: number): void {
    this.currentPage_sal = pageNumber;
    this.skip_sal = this.pageSelection_sal[pageNumber - 1].skip;
    this.limit_sal = this.pageSelection_sal[pageNumber - 1].limit;
    if (pageNumber > this.currentPage_sal) {
      this.pageIndex_sal = pageNumber - 1;
    } else if (pageNumber < this.currentPage_sal) {
      this.pageIndex_sal = pageNumber + 1;
    }
    this.load_transaction(this.row_id);
  }

  public PageSize_sal(value:any): void {
    this.pageSize = value
    this.pageSelection_sal = [];
    this.limit_sal = this.pageSize_sal;
    this.skip_sal = 0;
    this.currentPage_sal = 1;
    this.SalaryLoad(this.salary_atten_list);
  }

  private calculateTotalPages_sal(totalData: number, pageSize: number): void {
    this.pageNumberArray_sal = [];

    this.totalPages_sal = totalData / pageSize;
    if (this.totalPages_sal % 1 != 0) {
      this.totalPages_sal = Math.trunc(this.totalPages_sal + 1);
    }
    for (let i = 1; i <= this.totalPages_sal; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray_sal.push(i);
      this.pageSelection_sal.push({ skip: skip, limit: limit });
    }
  }

  open_sal() {
    this.Toggledata = !this.Toggledata;
  }
  onActivate_sal(row:any)
  {

  }
}
