/* eslint-disable prefer-const */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-useless-escape */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import {   pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService,BsModalRef } from 'ngx-bootstrap/modal';
declare let $: any;
import {TableElement, TableExportUtil } from '../../../shared';
import { Employee_List, salary_list, user_type_list } from './employee-models';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {


  @ViewChild('upload_fileModal') upload_fileModal!: ElementRef;
  @ViewChild('view_fileModal')  view_fileModal!: ElementRef;

  public employees : Array<Employee_List> = [];
  dataSource!: MatTableDataSource<Employee_List>;

  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;
  public detail      = false;

  public routes = routes;
  modalRef!   : BsModalRef;
  selected    =  [];

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


  public salary_list : Array<salary_list> = [];
  dataSource_sal!: MatTableDataSource<salary_list>;
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

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  date                   !: FormGroup;
  addAccount             !: FormGroup;
  addExpense             !: FormGroup;

  expense_detail_view     : any;
  selected_bank_id        : any;
  selected_id             : any;
  detail_view             : any;
  selection               : any;
  displayedColumns        : any;
  image_update            : any;

  editing                   = {};
  rows                      = [];
  temp                      = [];
  sal_selected              = [];
  price                     = '1000000';
  statement                 = [];
  employee                  = [];
  salary_group              = [];
  user_type_list           :Array<user_type_list> = [];
  SalGrpEdit                = [];
  createBank                = [];
  remove_button             = false;
  salary_details            : any;
  employee_details          : any;
  SalGrp_Edit               : any;
  SalGrp_Add                : any;
  fileURL                   : any;
  Upl_emp_file              : any;
  View_emp_doc              : any;
  emp_file_view             : any;
  Upl_emp_img               : any;
  emp_img                   : any;
  emp_id                    : any;
  updateEmployee            : any;
  empl_type_list            : any;
  img_path                  : any;
  emp_image                 : any;
  salary_transaction        : any;


  public file               : any;
  public image              : any;
  public editEmpDetails     !: FormGroup;
  public createBank_FG      !: FormGroup;
  public uploadDoc          !: FormGroup;
  public form               !: FormGroup;
  public sal_edit           !: FormGroup;
  public sal_add            !: FormGroup;

  view                      = false;
  submitted                 = false;
  collapsed                 = true;
  stateShow                 = true;
  emploee_show              = false;
  status                    = true;
  dropdown                  = true;
  view_details              = false;
  transaction_view          = false;



  myForm = new FormGroup
  ({
    type: new FormControl(''),
    name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
    file: new FormControl('', Validators.compose([Validators.required])),
    fileSource: new FormControl('', [Validators.required])
  });

  addEmployee = new FormGroup
  ({
      'created_by'    : new FormControl(this.uid),
      empPrefix       : new FormControl('Mr'),
      empName         : new FormControl('', [Validators.required, Validators.minLength(3)]),
      fatherPrefix    : new FormControl('Mr'),
      father_guardianName : new FormControl(null),
      designation     : new FormControl(null),
      panNo           : new FormControl('', Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")])),
      aadharNo        : new FormControl('', Validators.compose([Validators.required ,Validators.pattern("^[2-9]{1}[0-9]{11}$")])),
      bloodGroup      : new FormControl('A+', [Validators.required]),
      mobileNo        : new FormControl('',Validators.compose([Validators.required])),
      dob             : new FormControl(null),
      maritalStatus   : new FormControl(null),
      nationality     : new FormControl('Indian'),
      qualification   : new FormControl(null),
      emailId         : new FormControl('',Validators.compose([ Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])),
      password        : new FormControl(''),
      empRole         : new FormControl('', [Validators.required]),
      empType         : new FormControl('', [Validators.required]),
      bankAccountNo   : new FormControl(null),
      bankName        : new FormControl(null),
      ifsc            : new FormControl('',Validators.compose([Validators.pattern("^[A-Z]{4}[0][A-Z0-9]{6}$")])),
      branch          : new FormControl(null),
      doj             : new FormControl(null),
      esiNo           : new FormControl(null),
      pfNo            : new FormControl(null),
      salary          : new FormControl(null),
      ot              : new FormControl(null),
      bank_access     : new FormControl('1'),
      bank_id         : new FormControl(null),
      userStatus      : new FormControl('1'),
      portalAccess    : new FormControl(''),
      status          : new FormControl('1'),
      permenantAddress: new FormControl('', [Validators.required]),
      jobLocation     : new FormControl('Chennai'),
      lastWorkingDay  : new FormControl(null),
      salaryGroup     :  new FormControl(null),
      AddressForCommunication         : new FormControl('', [Validators.required]),
      emergency_Con_Person            : new FormControl('', [Validators.required]),
      emergency_Con_PersonNo          : new FormControl('',Validators.compose([Validators.required])),
      emergency_Con_PersonRelationship: new FormControl('', [Validators.required]),

    })

  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder,private modalService: BsModalService,private formBuilder: FormBuilder
     ) {
      this.createBank_FG = fb.group
      ({
          'created_by'        : [this.uid],
          account_name        : [null],
          mode                : [3],
          opening_balance     : [0],
          type                : [1],
          status              : [1]
        });


        this.editEmpDetails = fb.group
        ({
            'created_by'            : [this.uid],
            emp_father_prefix       : [null],
            emp_prefix              : [null],
            emp_id                  : [null],
            emp_name                : [null, Validators.compose([Validators.required])],
            emp_doj                 : [null, Validators.compose([Validators.required])],
            emp_designation         : [null, Validators.compose([Validators.required])],
            emp_pan                 : ['', Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")])],
            emp_aadhar              : [null, Validators.compose([Validators.required])],
            emp_status              : [null, Validators.compose([Validators.required])],
            emp_bank_account_no     : [null, Validators.compose([Validators.required])],
            emp_bank_name           : [null, Validators.compose([Validators.required])],
            emp_ifsc                : [null, Validators.compose([Validators.required])],
            emp_branch              : [null, Validators.compose([Validators.required])],
            emp_basic_salary        : [null, Validators.compose([Validators.required])],
            emp_portal_access       : [null, Validators.compose([Validators.required])],
            emp_father_guardianName : [null],
            emp_maritalStatus       : [null],
            emp_mobileNo            : [null],
            emp_dob                 : [null],
            emp_emailId             : [null],
            emp_password            : [null],
            emp_empRole             : [null],
            emp_empType             : [null],
            emp_esiNo               : [null],
            emp_pfNo                : [null],
            emp_bank_access         : [null],
            emp_permenantAddress    : [null],
            emp_AddressForCommunication:[null],
            emp_jobLocation         : [null],
            emp_lastWorkingDay      : [null],
            emp_emergency_Con_Person  : [null],
            emp_emergency_Con_PersonNo: [null],
            emp_emergency_Con_PersonRelationship: [null],
            emp_salarygroup         : [null],
            emp_ot                  : [null],
            emp_qualification       : [null],
            emp_bloodgroup          : [null],
            emp_pl                  : [null],
            emp_cl                  : [null],
            emp_nationality         : [null]
          })

  }

  ngOnInit() {

    this.getTableData();

     this.api.get('get_data.php?table=user_type&authToken=' + environment.authToken).then((data: any) => {
      this.user_type_list = data;
    }).catch(error => { this.toastService.typeError('API Faild : loadData User type'); });

    this.api.get('get_data.php?table=employee_type&authToken=' + environment.authToken).then((data: any) => {
      this.empl_type_list = data;
    }).catch(error => { this.toastService.typeError('API Faild : loadData Employee type'); });
  }

 async getTableData()
  {
    this.employees             = [];
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];

    if (this.user_type == "super_admin")
      {
    await    this.api.get('get_data.php?table=employee&authToken=' + environment.authToken).then((data: any) =>
        {

          let value :  Employee_List[] = [];
      if(data != null)
      {
          this.totalData = data.length;
          data.map((res: Employee_List, index: number) => {
                 const serialNumber = index + 1;
               if (index >= this.skip && serialNumber <= this.limit) {
                res.id = serialNumber;
                this.employees.push(res);
                this.serialNumberArray.push(serialNumber);
              }
              res.id = serialNumber;
              value.push(res);
        });
        this.calculateTotalPages(this.totalData, this.pageSize);
        this.dataSource = new MatTableDataSource<Employee_List>(value);

          }
          else{
            this.toastService.typeWarning('No Data  employee list');
          }
        }).catch(error => {
          this.toastService.typeError('API Faild : loadData  employee list');
        });
      }

  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData();
  }

  async callData()
  {
    this.employees = [];
    await this.dataSource.filteredData.map((res: Employee_List, index: number) =>
      {
      const serialNumber = index + 1;

      if (index >= this.skip && serialNumber <= this.limit) {
        res.id = serialNumber;
        this.employees.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction === '') {
      this.employees = data;
    } else {
      this.employees = data.sort((a, b) => {
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

    this.detail_view = row;
    this.emp_id      = row.emp_id;
    this.employeeLoad(row.emp_id);
    this.viewDocData(this.emp_id);

    this.salary_list           = [];
    this.pageNumberArray_sal   = [];
    this.serialNumberArray_sal = [];

    this.api.get('get_data.php?table=salary&find=emp_id&value=' + this.emp_id + '&authToken=' + environment.authToken).then((data: any) =>
    {

      if(data != null)
      {
            this.salary_details = data;
          for(let i=0;i<this.salary_details.length;i++)
          {
              this.api.get('get_data.php?table=pay_roll&find=attendance_id&value=' + this.salary_details[i].id + '&authToken=' + environment.authToken).then((data_rt: any) =>
              {

                if(data_rt != null)
                {
                  this.salary_details[i]['salary_paid'] =  data_rt[0]['salary_paid'];
                  this.salary_details[i]['payroll_id']  =  data_rt[0]['id'];
                }
              }).catch(error => { this.toastService.typeError('API Faild :  PayRoll '); });
          }
          let value :  salary_list[] = [];
          this.totalData_sal = this.salary_details.length;
          this.salary_details.map((res: salary_list, index: number) => {
                 const serialNumber = index + 1;
               if (index >= this.skip_sal && serialNumber <= this.limit_sal) {
                res.id = serialNumber;
                this.salary_list.push(res);
                this.serialNumberArray_sal.push(serialNumber);

                }
                res.id = serialNumber;
                value.push(res)
           });
           this.calculateTotalPages_sal(this.totalData_sal, this.pageSize_sal);
           this.dataSource_sal = new MatTableDataSource<salary_list>(value);
      }
      else{
        this.salary_details = null;
      }
    }).catch(error => { this.toastService.typeError('API Faild : salary '); });
  }

  public searchData_sal(value: any): void {
    this.dataSource_sal.filter = value.trim().toLowerCase();
    this.totalData_sal = this.dataSource_sal.filteredData.length;
    this.callData_salary();
  }

  async callData_salary()
  {
    this.salary_list = [];
    await this.dataSource_sal.filteredData.map((res: salary_list, index: number) =>
      {
        const serialNumber = index + 1;

        if (index >= this.skip_sal && serialNumber <= this.limit_sal) {
          res.id = serialNumber;
          this.salary_list.push(res);
          this.serialNumberArray.push(serialNumber);
        }
    });
    this.calculateTotalPages(this.dataSource_sal.filteredData.length, this.pageSize);
  }

  edit_view()
  {
    this.show = true;
  }

  onClick(row:any)
  {
    this.exp_show = true;
    this.expense_detail_view = row;
    this.selected_id   = row.id;
    this.addExpense.controls['account_name'].setValue(this.expense_detail_view.account_name);
    this.date.reset();


  }



  public sortData_sal(sort: Sort) {
    const data = this.salary_list.slice();
    if (!sort.active || sort.direction === '') {
      this.salary_list = data;
    } else {
      this.salary_list = data.sort((a, b) => {
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
      this.callData_salary();
    } else if (event == 'previous') {
      this.currentPage_sal--;
      this.pageIndex_sal = this.currentPage_sal - 1;
      this.limit_sal -= this.pageSize_sal;
      this.skip_sal = this.pageSize_sal * this.pageIndex_sal;
      this.callData_salary();
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
    this.callData_salary();
  }

  public PageSize_sal(): void {
    this.pageSelection_sal = [];
    this.limit_sal = this.pageSize_sal;
    this.skip_sal = 0;
    this.currentPage_sal = 1;
    this.callData_salary();
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

  set_zero()
  {
    this.getTableData();

    this.show     = false;
    this.exp_show = false;
    this.view     = false;
  }

  EditAccount()
  {
    this.addAccount.controls['account_name'].setValue(this.detail_view.account_name);
    this.addAccount.controls['mode'].setValue(this.detail_view.mode);
    this.addAccount.controls['opening_balance'].setValue(this.detail_view.opening_balance);
  }

  Addaccount()
  {
    this.addAccount.controls['account_name'].setValue(null);
    this.addAccount.controls['mode'].setValue(0);
    this.addAccount.controls['opening_balance'].setValue(0);
  }

  Addexpense()
  {
    this.addExpense.controls['account_name'].setValue(null);
  }

  async newAccount(addAccount :any)
  {
    Object.keys(this.addAccount.controls).forEach(field => {
      this.addAccount.get(field)?.markAsTouched({ onlySelf: true });
    });

    if (this.addAccount.valid)
    {
      this.loading = true;
      await this.api.post('post_insert_data.php?table=bank&authToken=' + environment.authToken, addAccount).then((data: any) =>
      {
        if(data.status == "success")
          { this.toastService.typeSuccess('Account Added Succesfully');
            this.loading = false;
            // const modalElement = this.addAccountModal.nativeElement;
            // $(modalElement).modal('hide');
            this.getTableData();

            this.addAccount.controls['account_name'].reset();
            this.addAccount.controls['mode'].setValue(0);
            this.addAccount.controls['opening_balance'].setValue(0); }
        else
        { this.toastService.typeError(data.status);
          this.loading = false; }
        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : newAccount');
          this.loading = false;
      });

    }
    else
    {
      this.toastService.typeError('Please make sure all fields are filled in correctly');
    }
  }

  exportExcel() {
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        EmployeeName: x.name,
        Date_of_Joining: x.doj,
        Designation :x.designation,
        Salary :x.salary,
      }));

    TableExportUtil.exportToExcel(exportData, 'Employee List');
  }

  async onSubmit(employee:any)
  {
    Object.keys(this.addEmployee.controls).forEach(field => {
      this.addEmployee.get(field)?.markAsTouched({ onlySelf: true });
    });
      if(this.addEmployee.valid)
      {
        this.loading = true;
      // if(employee['bank_access'] === true)
      // {
        this.createBank_FG.controls['account_name'].setValue(employee['empName']);
        await this.api.post('post_insert_data.php?table=bank&authToken=' + environment.authToken, this.createBank_FG.value).then((data: any) =>
        {
          if (data.status == "success")
          {
            employee['bank_id'] = data.last_id;
            this.addEmployee.controls['bank_id'].setValue(data.last_id);
            this.call_api(employee);
            this.getTableData();

            this.loading=false;
          }
          else { this.toastService.typeError(data.status);
            this.loading=false;}
          return true;
        }).catch(error => {
          this.toastService.typeError('API Faild : Employee bank Creation');
          this.loading=false;
        });
      }
      // }
      // else
      // {
      //   employee['bank_id'] = 0;
      //   this.addEmployee.controls['bank_id'].setValue(0);
      //   this.call_api(employee);
      // }
  }

  async call_api(data:any)
  {
    if(this.addEmployee.valid)
    {
        this.loading=false;
        await this.api.post('post_insert_data.php?table=employee&authToken=' + environment.authToken, data).then((data: any) => {
          if (data.status == "success")
          {
            this.toastService.typeSuccess('Employee Added Succesfully');
            this.addEmployee.reset();
            this.loading=false;
            this.getTableData();
            this.view = false;

          }
          else { this.toastService.typeError(data.status);
            this.loading=false;}
          return true;
        }).catch(error => {
          this.toastService.typeError('API Faild :Employee Added');
          this.loading=false;
        });
    }
    else
    {
      this.toastService.typeError('Please Fill All Details');
    }
  }

  Addemployee()
  {
    this.view = true;
  }

  cancel()
  {
    this.view = false;
    this.addEmployee .reset();
    this.show=false;
    this.editEmpDetails.reset();
    this.view_details = false;
    this.detail = false;
  }

  view_emp()
  {
    this.view_details = true;
  }

  async employeeLoad(emp_id:any)
  {
    await this.api.get('mp_employee_view.php?id='+ emp_id +'&authToken=' + environment.authToken).then((data: any) =>
     {
      if(data != null)
      {
      this.employee_details     = data[0];
       this.emp_image           = data[0].image;
      this.image_update  = null;

      this.img_path  = environment.baseURL+"download_file.php?path=upload/employee_images/"+this.emp_image+"&authToken="+ environment.authToken;

      this.editEmpDetails.controls['emp_prefix'].setValue(this.employee_details.emp_prefix);
      this.editEmpDetails.controls['emp_father_prefix'].setValue(this.employee_details.father_prefix);
      this.editEmpDetails.controls['emp_id'].setValue(this.employee_details.emp_id);
      this.editEmpDetails.controls['emp_name'].setValue(this.employee_details.name);
      this.editEmpDetails.controls['emp_doj'].setValue(this.employee_details.doj);
      this.editEmpDetails.controls['emp_designation'].setValue(this.employee_details.designation);
      this.editEmpDetails.controls['emp_pan'].setValue(this.employee_details.pan);
      this.editEmpDetails.controls['emp_aadhar'].setValue(this.employee_details.aadhar);
      this.editEmpDetails.controls['emp_status'].setValue(this.employee_details.status);

      this.editEmpDetails.controls['emp_bank_account_no'].setValue(this.employee_details.sal_bank_acc);
      this.editEmpDetails.controls['emp_bank_name'].setValue(this.employee_details.sal_bank_name);
      this.editEmpDetails.controls['emp_ifsc'].setValue(this.employee_details.sal_bank_ifsc);
      this.editEmpDetails.controls['emp_branch'].setValue(this.employee_details.sal_bank_branch);
      this.editEmpDetails.controls['emp_basic_salary'].setValue(this.employee_details.salary);
      this.editEmpDetails.controls['emp_portal_access'].setValue(this.employee_details.portal_access);
      this.editEmpDetails.controls['emp_father_guardianName'].setValue(this.employee_details.father_guardian_name);

      this.editEmpDetails.controls['emp_maritalStatus'].setValue(this.employee_details.marital_status);
      this.editEmpDetails.controls['emp_mobileNo'].setValue(this.employee_details.mobile_no);
      this.editEmpDetails.controls['emp_dob'].setValue(this.employee_details.dob);
      this.editEmpDetails.controls['emp_emailId'].setValue(this.employee_details.email_id);
      this.editEmpDetails.controls['emp_password'].setValue(this.employee_details.password);
      this.editEmpDetails.controls['emp_empRole'].setValue(this.employee_details.user_type);
      this.editEmpDetails.controls['emp_empType'].setValue(this.employee_details.emp_type);

      this.editEmpDetails.controls['emp_esiNo'].setValue(this.employee_details.esi_no);
      this.editEmpDetails.controls['emp_pfNo'].setValue(this.employee_details.pf_no);
      this.editEmpDetails.controls['emp_bank_access'].setValue(this.employee_details.bank_access);
      this.editEmpDetails.controls['emp_permenantAddress'].setValue(this.employee_details.permenent_address);
      this.editEmpDetails.controls['emp_AddressForCommunication'].setValue(this.employee_details.communication_address);
      this.editEmpDetails.controls['emp_jobLocation'].setValue(this.employee_details.job_location);
      this.editEmpDetails.controls['emp_lastWorkingDay'].setValue(this.employee_details.last_working_day);
      this.editEmpDetails.controls['emp_emergency_Con_Person'].setValue(this.employee_details.contact_person);

      this.editEmpDetails.controls['emp_emergency_Con_PersonNo'].setValue(this.employee_details.contact_personNo);
      this.editEmpDetails.controls['emp_emergency_Con_PersonRelationship'].setValue(this.employee_details.contact_person_relationship);
      this.editEmpDetails.controls['emp_salarygroup'].setValue(this.employee_details.salarygroup);
      this.editEmpDetails.controls['emp_ot'].setValue(this.employee_details.ot);
      this.editEmpDetails.controls['emp_qualification'].setValue(this.employee_details.edu_qualification);

      this.editEmpDetails.controls['emp_bloodgroup'].setValue(this.employee_details.blood_group);
      this.editEmpDetails.controls['emp_pl'].setValue(this.employee_details.pl_leave);
      this.editEmpDetails.controls['emp_cl'].setValue(this.employee_details.com_off);
      this.editEmpDetails.controls['emp_nationality'].setValue(this.employee_details.nationality);
      }
      else
      {
         this.employee_details  = null;
      }
    }).catch(error => { this.toastService.typeError('API Faild : employeeLoad'); });
  }

  update(updateEmp:any)
 {
  this.updateEmployee = updateEmp;
    this.emp_id = updateEmp.emp_id

      this.loading=true;
         this.api.post('post_update_data.php?authToken=' + environment.authToken + '&table=employee&field=emp_id&value=' + this.emp_id, this.updateEmployee).then((data: any) =>
        {
          if (data.status == "success")
          {
            this.toastService.typeSuccess('Employee Details Updated Succesfully');
            this.getTableData()
            this.loading  = false;
            this.show     = false;
            this.view     = false;

          }
          else {this.toastService.typeError(data.status);
            this.loading=false;}
          return true;
        }).catch(error => {
          this.toastService.typeError('API Faild : Update Employee');
          this.loading=false;
        });
    }

    onFileSelected(event:any)
    {
      this.image_update = event.target.files[0];
    }

    img_submit()
    {
        const formData = new FormData();
        formData.append('file',this.image_update);
        this.loading=true;
        this.api.post('upload_file.php?mode=update&user_id='+ this.emp_id+'&location=upload/employee_images/&table=employee&authToken='+environment.authToken ,formData).then((data: any) =>
          {
            if(data.status == "success")
            {
              this.toastService.typeSuccess('Image Updated Succesfully');

              this.loading=false;
              this.image_update = null;
              this.employeeLoad(this.emp_id);
            }
            else { this.toastService.typeError(data.status);
              this.loading=false;
              this.image_update = null;
            }
            return true;
          }).catch(error =>
          {
              this.toastService.typeError('API Faild : Image Update');
              this.loading=false;
          });
    }

    removeFile()
    {
      this.image_update = null;
    }

    remove_File()
    {
      const fileControl = this.myForm.get('file');
      if (fileControl) {
        fileControl.reset();
        this.file = "";
      }
    }

  async  active()
    {
      await this.api.get('single_field_update.php?table=employee&field=emp_id&value='+this.emp_id+'&update=1&up_field=status&authToken=' + environment.authToken).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.toastService.typeSuccess('Account Enabled Succesfully');
            this.getTableData();
          }
        else
        { this.toastService.typeError(data.status); }
        return true;
      }).catch(error =>
      {  this.toastService.typeError('API Faild : DisableAccount');});
    }

  async  inactive()
  {
    await this.api.get('single_field_update.php?table=employee&field=emp_id&value='+this.emp_id+'&update=0&up_field=status&authToken=' + environment.authToken).then((data: any) =>
    {
      if(data.status == "success")
        {
          this.toastService.typeWarning('Account Disabled Succesfully');
          this.getTableData();
        }
      else
      { this.toastService.typeError(data.status); }
      return true;
    }).catch(error =>
    {  this.toastService.typeError('API Faild : DisableAccount');});
  }

  downloadMyFile(data : any)
  {
    this.fileURL = environment.baseURL+"download_file.php?path=upload/employee_files/"+data+"&authToken="+ environment.authToken;
    window.open(this.fileURL, '_blank');
  }

  async deleteFile(data :any)
  {
    await this.api.get('delete_data.php?authToken='+environment.authToken+'&table=employee_file&field=id&id='+data.id).then((data_rt: any) =>
    {
      if (data_rt.status == "success")
      {
         this.toastService.typeSuccess('Document Deleted Succesfully');
         this.viewDocData(data.emp_id);
         }
      else { this.toastService.typeError(data_rt.status); }

    }).catch(error => {this.toastService.typeError('API Faild : deleteFile');});
  }


  viewDocData(empid :any)
  {
    this.api.get('get_data.php?table=employee_file&find=emp_id&value=' +empid +'&authToken=' + environment.authToken).then((data: any) => {
      this.emp_file_view = data;
    }).catch(error => { this.toastService.typeError('API Faild : viewDocData'); });
  }

  get f()
  {
    return this.myForm.controls;
  }

  async submit(data:any)
  {
          const formData = new FormData();

      const fileControl = this.myForm.get('fileSource');
      if (fileControl?.value != null)
       {
          if (typeof fileControl.value === 'string' || isBlob(fileControl.value)) {
            formData.append('file', fileControl.value);
             this.remove_button = true;
          } else {
            console.error('Invalid file source:', fileControl.value);
          }
      } else {
        console.error('Invalid file source:', fileControl?.value);
      }

      function isBlob(value: any): value is Blob {
        return typeof Blob !== 'undefined' && value instanceof Blob;
      }

        this.loading=true;
        if(this.myForm.valid)
        {
        await  this.api.post('upload_file.php?user_id='+ this.emp_id+'&location=upload/employee_files/&table=employee_file&type='+data.type+'&file_name='+data.name+'&uid='+this.uid+'&authToken='+environment.authToken ,formData).then((data: any) =>
          {
            if(data.status == "success") {
              this.toastService.typeSuccess('Document Uploaded Succesfully');
                this.loading = false;
                this.viewDocData(this.emp_id);
                const modalElement = this.upload_fileModal.nativeElement;
                      $(modalElement).modal('hide');
                      this.myForm.reset();
                  }
                    else { this.toastService.typeError(data.status);
                      this.loading=false; }
                    return true;
                  }).catch(error =>
          {
              this.toastService.typeError('API Faild : Document Uploade');
                  this.loading=false;
          });
        }
        else
        {
        this.toastService.typeError('Fill the All Details');
        this.loading = false;
     }
  }

  fileChange(input:any)
  {
      const reader = new FileReader();
      if (input.files.length)
      {
          this.file = input.files[0].name;
      }
  }

  onFileChange(event:any)
  {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
      const fileSourceValue = this.myForm.get('fileSource')?.value;
    }
  }
  onselect(row:any)
  {
    let id = row.payroll_id;
    this.api.get('get_data.php?table=salary_payment&find=payroll_id&value=' + id + '&authToken=' + environment.authToken).then((data: any) =>
      {
          this.salary_transaction = data;
      }).catch(error => { this.toastService.typeError('API Faild : salary transactions'); });

   this.transaction_view = true;
   this.view_details = false;
   this.detail       = true;

   }

   set_zero_1()
   {
    this.transaction_view = false;
    this.view_details = true;
    this.detail   = false;
   }

   public sortData_tran(sort: Sort) {
    const data = this.salary_transaction.slice();
    if (!sort.active || sort.direction === '') {
      this.salary_transaction = data;
    } else {
      this.salary_transaction = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  setzero_tran()
  {
    this.transaction_view = false;
    this.view_details  = true;
  }
}



