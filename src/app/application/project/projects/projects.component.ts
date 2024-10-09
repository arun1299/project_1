
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { project, item } from './projects-models';
import { routes } from 'src/app/core/helpers/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/core/models/models';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Sort} from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { SelectionType } from '@swimlane/ngx-datatable';
declare let $: any;


interface man_power {
  s_no        : number;
  id          : number;
  project     : string;
  emp_id      : number;
  emp_name    : string;
  working_time: number;
  amount      : number;
  date        : number;
}

interface material {
  s_no        : number;
  id          : number;
  item_id     : number
  material_name : string;
  qty         : number
  amount      : number
  total       : number
}


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  @ViewChild('edit_electronics') edit_electronics  !: ElementRef;
  @ViewChild('project_type') project_type  !: ElementRef;
  @ViewChild('add_electronics') add_electronics  !: ElementRef;
  @ViewChild('add_software') add_software  !: ElementRef;
  @ViewChild('edit_software') edit_software  !: ElementRef;
  @ViewChild("delete_item", { static: true }) delete_item   !: ElementRef;

  public project_list : Array<project> = [];
  dataSource!: MatTableDataSource<project>;

  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;

  manpower_show: boolean = false
  edit_timline : boolean = false
  add_timeline : boolean = false
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

  public searchDataValue_1 = '';
  public work_time_list : Array<man_power> = [];
  dataSource_1!: MatTableDataSource<man_power>;
  public lastIndex_1 = 0;
  public pageSize_1 = 5;
  public totalData_1 = 0;
  public skip_1 = 0;
  public limit_1: number = this.pageSize_1;
  public pageIndex_1 = 0;
  public currentPage_1 = 1;
  public serialNumberArray_1: Array<number> = [];
  public pageNumberArray_1: Array<number> = [];
  public pageSelection_1: Array<pageSelection> = [];
  public totalPages_1 = 0;

  public searchDataValue_mat = '';
  public material_list : Array<material> = [];
  dataSource_mat!: MatTableDataSource<material>;
  public lastIndex_mat = 0;
  public pageSize_mat = 5;
  public totalData_mat = 0;
  public skip_mat = 0;
  public limit_mat: number = this.pageSize_1;
  public pageIndex_mat = 0;
  public currentPage_mat = 1;
  public serialNumberArray_mat: Array<number> = [];
  public pageNumberArray_mat: Array<number> = [];
  public pageSelection_mat: Array<pageSelection> = [];
  public totalPages_mat = 0;

  public show_1        = false;


  public uid = localStorage.getItem('uid');
  public user_type = localStorage.getItem('type');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  SelectionType     = SelectionType;
  today             = new Date();
  todaysDate        = '';
  todaysTime        = '';

  batchCode        !: string;
  currentDate      !: string;
  currentTime      !: string;

  electrical_form  = false;
  project_detail   = false;
  select           = false;
  batchError       = false;
  edit_electrical_form = false;

  myControl        = new FormControl();
  myform           !: FormGroup;
  electronics      !: FormGroup;
  Edit_electronics !: FormGroup;
  electrical       !: FormGroup;
  Edit_electrical  !: FormGroup;
  software         !: FormGroup;
  Edit_software    !: FormGroup;
  myForm           !: FormGroup;

  item_list        :any
  item_DeleteId    :any;
  item_index       :any;
  customer_list    :any;
  selectedOption   :any;
  optionHovered    :any;
  detail_view      :any;
  electrical_items :any;
  view_type        :any;
  project_id       :any;
  details_id       :any;
  type             :any;
  select_data      :any;

  details         : any
  row_id          : any
  employee_list   : any
  add_time       !: FormGroup;
  edit_time      !: FormGroup;
  filteredOptions!: Observable<item[]>;

  @ViewChild('add_att') add_att!: ElementRef;
  @ViewChild('edit_att') edit_att!: ElementRef;
  @ViewChild('project_timeline') project_timeline!: ElementRef;
  @ViewChild("material_list_view") material_list_view   !: ElementRef;
 constructor(public api : ApiService, public toastrService:ToasterService,public fb : FormBuilder,private cdr: ChangeDetectorRef)
 {

    this.selectedOption = null;
    this.myForm = this.fb.group({
      myControl: [null],
      });

   this.electronics = fb.group({
    'created_by'     : new FormControl(this.uid),
     category        : [null],
     customer_id     : [null, Validators.compose([Validators.required])],
     project_name    :  [null, Validators.compose([Validators.required])],
     project_estimation : [null, Validators.compose([Validators.required])],
     follow_by        : [null,Validators.compose([Validators.required])],
     start_date      :  new FormControl(null, [Validators.required]),
     etd             :  new FormControl(null, [Validators.required]),
     project_type    :  new FormControl(null, [Validators.required]),
     quantity        : [null,Validators.compose([Validators.required])],
     pcb_design_by   : [null,Validators.compose([Validators.required])],
     programe_required:[null,Validators.compose([Validators.required])],
     notes           : [null]
   })

   this.Edit_electronics = fb.group({
     category         : [null],
     customer_id      : [null, Validators.compose([Validators.required])],
     project_name     :  [null, Validators.compose([Validators.required])],
     project_estimation :  [null, Validators.compose([Validators.required])],
     follow_by         :  [null, Validators.compose([Validators.required])],
     start_date       :  new FormControl(null, [Validators.required]),
     etd              :  new FormControl(null, [Validators.required]),
     project_type     :  new FormControl(null, [Validators.required]),
     quantity         :  [null, Validators.compose([Validators.required])],
     pcb_design_by    :  [null, Validators.compose([Validators.required])],
     programe_required: [null, Validators.compose([Validators.required])],
     notes            :  [null]
   })

   this.electrical = fb.group({
    'created_by'     : new FormControl(this.uid),
     customer_id     : [null, Validators.compose([Validators.required])],
     category        : [null],
     follow_by        : [null,Validators.compose([Validators.required])],
     project_name    :  [null, Validators.compose([Validators.required])],
     project_type    : [null, Validators.compose([Validators.required])],
     estimate_date   : new FormControl(null, [Validators.required]),
     estimate_number : new FormControl(null, [Validators.required]),
     po_date         : new FormControl(null, [Validators.required]),
     po_number       : new FormControl(null, [Validators.required]),
     invoice_date    : new FormControl(null, [Validators.required]),
     invoice_number  : new FormControl(null, [Validators.required]),
     etd             : new FormControl(null, [Validators.required]),
     project_selling_cost : [null, Validators.compose([Validators.required])],
     notes           : [null],
     items : this.fb.array([])
   })


   this.Edit_electrical = fb.group({
     customer_id     : [null, Validators.compose([Validators.required])],
     category        : [null],
     follow_by        : [null,Validators.compose([Validators.required])],
     project_name    :  [null, Validators.compose([Validators.required])],
     project_type    :  [null, Validators.compose([Validators.required])],
     estimate_date   : new FormControl(null, [Validators.required]),
     estimate_number : new FormControl(null, [Validators.required]),
     po_date         : new FormControl(null, [Validators.required]),
     po_number       : new FormControl(null, [Validators.required]),
     invoice_date    : new FormControl(null, [Validators.required]),
     invoice_number  : new FormControl(null, [Validators.required]),
     etd             : new FormControl(null, [Validators.required]),
     project_selling_cost :  [null, Validators.compose([Validators.required])],
     notes           : [null],
     items : this.fb.array([])
   })

   this.software = fb.group({
    'created_by'     : new FormControl(this.uid),
    customer_id     : [null, Validators.compose([Validators.required])],
    project_name    : [null, Validators.compose([Validators.required])],
    category        : [null],
    follow_by        : [null,Validators.compose([Validators.required])],
    type            : [null, Validators.compose([Validators.required])],
    platform        : [null, Validators.compose([Validators.required])],
    backend         : [null, Validators.compose([Validators.required])],
    db              : [null, Validators.compose([Validators.required])],
    description     : [null, Validators.compose([Validators.required])],
    cost_estimation : [null, Validators.compose([Validators.required])],
    po_date         : [null, Validators.compose([Validators.required])],
    po_number       : [null, Validators.compose([Validators.required])],
   })


   this.Edit_software = fb.group({
    customer_id     : [null, Validators.compose([Validators.required])],
    project_name    : [null, Validators.compose([Validators.required])],
    category        : [null],
    follow_by        : [null,Validators.compose([Validators.required])],
    type            : [null, Validators.compose([Validators.required])],
    platform        : [null, Validators.compose([Validators.required])],
    backend         : [null, Validators.compose([Validators.required])],
    db              : [null, Validators.compose([Validators.required])],
    description     : [null, Validators.compose([Validators.required])],
    cost_estimation : [null, Validators.compose([Validators.required])],
    po_date         : [null, Validators.compose([Validators.required])],
    po_number       : [null, Validators.compose([Validators.required])],
   })

   this.add_time = fb.group({
    created_by : [this.uid],
    project_id  : [null],
    emp_id      : ['', Validators.compose([Validators.required,])],
    time_att    : ['', Validators.compose([Validators.required,])],
    date_att    : ['', Validators.compose([Validators.required,])],
    status      : [1]
  })

  this.edit_time = fb.group({
    emp_id      : ['', Validators.compose([Validators.required,])],
    time_att    : ['', Validators.compose([Validators.required,])],
    date_att    : ['', Validators.compose([Validators.required,])],

  })
    this.todaysDate = formatDate(this.today, 'ddMMyy', 'en-US', '+0530');
    this.todaysTime = formatDate(this.today, 'hh:mm', 'en-US', '+0530');

  }
  ngOnInit()
  {
       this.Loadselectdata();
       this.table_data();
       this.Employeedata()
  }

  async Employeedata()
  {
        await this.api.get('get_data.php?table=employee&authToken=' + environment.authToken).then((data: any) =>
        {
            this.employee_list = data;

        }).catch(error => { this.toastrService.typeError('Something went wrong in customer list'); });
   }

  async Loadselectdata()
  {
        await this.api.get('get_data.php?table=customers&authToken=' + environment.authToken).then((data: any) =>
        {
            this.customer_list = data;

        }).catch(error => { this.toastrService.typeError('Something went wrong in customer list'); });
  }


  onChange(data:any)
  {
          this.select = true;
          const selectedValue = this.myControl.value;
          var item =this.customer_list.find((x: { company_name: any; }) => x.company_name === selectedValue);

          this.electronics.controls['customer_id'].setValue(item?.customer_id);
          this.electrical.controls['customer_id'].setValue(item?.customer_id);
          this.software.controls['customer_id'].setValue(item?.customer_id);
  }

  async table_data()
  {
          this.project_list      = [];
          this.pageNumberArray   = [];
          this.serialNumberArray = [];
        if(this.user_type != "super_admin")
        {
          await this.api.get('mp_project_list.php?table=project&follow_by='+this.uid+'&authToken=' + environment.authToken).then((data: any) =>
          {

            if(data != null)
            {
                    let value : project []= []
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

     if(this.user_type == "super_admin")
      {
        await this.api.get('mp_project_list.php?table=project&authToken=' + environment.authToken).then((data: any) =>
        {

          if(data != null)
          {
                  let value : project []= []
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

  batch(value:any)
  {
        this.batchCode   = this.todaysDate+'/'+ value;
  }

  clearError()
  {
        this.batchError = false;
  }

  setzero()
  {
        this.table_data()
        this.project_detail = false;
        this.manpower_show = false
  }

  onActivate(row:any)
  {
        this.project_id  = row.project_id;
        this.details_id  = row.details;
        this.select_data = row
        this.details_load();
      //  this.table_data_1()
  }

  timeline()
  {
    this.table_data_1()
    this.manpower_show = true;
    const modalElement = this.project_timeline.nativeElement;
    $(modalElement).modal('show');
  }

  details_load()
  {
          this.api.get('mp_project_list.php?project_id='+this.project_id+'&authToken=' + environment.authToken).then((data: any) =>
          {
            this.project_detail = true;
            this.detail_view = data[0];
            this.view_type= data[0].category;
            this.electrical_items = data[0].electrical_items;
          }).catch(error => {this.toastrService.typeError('Something went wrong');});
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

  project_add()
  {
          const modalElement = this.project_type.nativeElement;
          $(modalElement).modal('show');
  }

  selecttype(value:any)
  {
          this.type = value;
          this.electronics.controls['category'].setValue(value);
          this.electrical.controls['category'].setValue(value);
          this.software.controls['category'].setValue(value);
  }

  typesubmit()
  {
            if(this.type == 1)
            {
              const modalElement = this.add_electronics.nativeElement;
            $(modalElement).modal('show');
            }
            if(this.type == 2)
            {
              this.electrical_form= true;
              this.show = true ;
              this.initProduct();
            }

            if(this.type == 3)
            {
              const modalElement = this.add_software.nativeElement;
              $(modalElement).modal('show');
            }
            const modalElement = this.project_type.nativeElement;
            $(modalElement).modal('hide');
  }

  Submit_electronics(electronics:any)
  {

            Object.keys(this.electronics.controls).forEach(field => {
              this.electronics.get(field)?.markAsTouched({ onlySelf: true });
            });

            if(this.electronics.valid)
            {
                this.api.post('mp_electronics_create.php?authToken='+environment.authToken, this.electronics.value).then((data: any) =>
                          {
                            if(data.status == "success")
                            {
                              this.loading = false;
                              this.toastrService.typeSuccess('Project Created Succesfully');

                              this.electronics.controls['project_name'].reset();
                              this.electronics.controls['project_estimation'].reset();
                              this.electronics.controls['follow_by'].reset();
                              this.electronics.controls['start_date'].reset();
                              this.electronics.controls['etd'].reset();
                              this.electronics.controls['project_type'].reset();
                              this.electronics.controls['quantity'].reset();
                              this.electronics.controls['pcb_design_by'].reset();
                              this.electronics.controls['notes'].reset();

                              const modalElement = this.add_electronics.nativeElement;
                              $(modalElement).modal('hide');
                              this.myControl.reset();
                              this.ngOnInit();
                            }
                            else { this.toastrService.typeError('Something went wrong');
                            this.loading = false;}
                            return true;
                          }).catch(error =>
                          {
                              this.toastrService.typeError('Something went wrong');
                              this.loading = false;
                          });
            }
            else{
              this.toastrService.typeError('Please Fill the Required Fields');
            }
  }

  cancel()
  {
            this.edit_electrical_form= false;
            this.show = false ;
            this.project_detail = true;
  }

  initProduct()
  {
            let items = this.electrical.get('items') as FormArray;
            items.push(this.fb.group({
              name        : new FormControl('',Validators.required),
              hp          : new FormControl(''),
              phase       : new FormControl('', Validators.required),
              quantity    : new FormControl('', Validators.required),
              contactor   : new FormControl('', Validators.required),
              olr         : new FormControl('', Validators.required),
              mcb         : new FormControl('', Validators.required),
              timer       : new FormControl('', Validators.required),
            }))
  }


  edit_initProduct()
  {
            let items = this.Edit_electrical.get('items') as FormArray;
            items.push(this.fb.group({
              type        :"new",
              id          : new FormControl(''),
              name        : new FormControl('',Validators.required),
              hp          : new FormControl(''),
              phase       : new FormControl('', Validators.required),
              quantity    : new FormControl('', Validators.required),
              contactor   : new FormControl('', Validators.required),
              olr         : new FormControl('', Validators.required),
              mcb         : new FormControl('', Validators.required),
              timer       : new FormControl('', Validators.required),
            }))
  }

  onDeleteRow(rowIndex: number)
  {
            let items = this.electrical.get('items') as FormArray;
            if (items.length > 1) {
              items.removeAt(rowIndex)
            } else {
              items.reset()
            }
  }


  edit_onDeleteRow(rowIndex: number)
  {
            this.item_index = rowIndex;
            let edit_items = this.Edit_electrical.get('items') as FormArray;
            const delete_data = edit_items.at(rowIndex).value;
            if(delete_data.id !== '')
              {
                this.item_DeleteId = delete_data.id
                const modalElement = this.delete_item.nativeElement;
                $(modalElement).modal('show');
              }
              else
              {
                  edit_items.removeAt(rowIndex)
              }
  }

  get items(): FormArray {
          return this.electrical.get('items') as FormArray;
  }
  get edit_items(): FormArray {
          return this.Edit_electrical.get('items') as FormArray;
  }

  item_delete()
  {
          let editproduct=this.Edit_electrical.get('items') as FormArray;

          this.api.get('delete_data.php?table=electrical_pro_item&field=id&id='+this.item_DeleteId+'&authToken='+environment.authToken).then((data: any) =>
          {
            if (editproduct.length > 1)
              {
                  editproduct.removeAt(this.item_index)
                  this.toastrService.typeSuccess(' Item Deleted Successfull');
                  const modalElement = this.delete_item.nativeElement;
                  $(modalElement).modal('hide');
              }
            else
              {
                editproduct.reset()
              }
          }).catch(error =>
          {
              this.toastrService.typeError('Something went wrong');
          });
  }

  onSubmit(data:any)
  {
            Object.keys(this.electrical.controls).forEach(field => {
              this.electrical.get(field)?.markAsTouched({ onlySelf: true });
            });

            this.api.post('mp_electrical_project_create.php?authToken='+environment.authToken, this.electrical.value).then((data: any) =>
            {
              if(data.status == "success")
              {
                this.loading = false;
                this.toastrService.typeSuccess('Project Created Succesfully');
                this.electrical.controls['customer_id'].reset();
                this.electrical.controls['project_name'].reset();
                this.electrical.controls['project_type'].reset();
                this.electrical.controls['capacity'].reset();
                this.electrical.controls['estimate_date'].reset();
                this.electrical.controls['estimate_number'].reset();
                this.electrical.controls['po_date'].reset();
                this.electrical.controls['po_number'].reset();
                this.electrical.controls['invoice_date'].reset();
                this.electrical.controls['invoice_number'].reset();
                this.electrical.controls['etd'].reset();
                this.electrical.controls['project_selling_cost'].reset();
                this.electrical.controls['notes'].reset();
                this.electrical_form = false ;
                this.show = false;
                this.project_detail = false;
                this.myControl.setValue(' ');
                this.ngOnInit();
              }
              else { this.toastrService.typeError('Something went wrong');
              this.loading = false;}

              return true;
            }).catch(error =>
            {
                this.toastrService.typeError('Something went wrong');
                this.loading = false;
            });
  }

  ReturnToList()
  {
            this.electrical_form = false;
            this.show = false;
            const formArray         = this.electrical.get('items') as FormArray;
            const formArrayLength   = formArray.length;
            const formArrayControls = formArray.controls;
            for (let i = formArrayControls.length-1; i >= 1; i--)
            {
              const control = formArrayControls[i];
              formArray.removeAt(i);
            }
  }

  Submit_software(data:any)
  {
            Object.keys(this.software.controls).forEach(field => {
              this.software.get(field)?.markAsTouched({ onlySelf: true });
            });
            this.api.post('mp_software_project_create.php?authToken='+environment.authToken, this.software.value).then((data: any) =>
            {

              if(data.status == "success")
              {
                this.loading = false;
                this.toastrService.typeSuccess('Project Created Succesfully');

                this.software.controls['customer_id'].reset();
                this.software.controls['project_name'].reset();
                this.software.controls['type'].reset();
                this.software.controls['platform'].reset();
                this.software.controls['backend'].reset();
                this.software.controls['db'].reset();
                this.software.controls['cost_estimation'].reset();
                this.software.controls['description'].reset();
                this.software.controls['po_date'].reset();
                this.software.controls['po_number'].reset();

                const modalElement = this.add_software.nativeElement;
              $(modalElement).modal('hide');

                this.show = false;
                this.project_detail = false;
                this.myControl.setValue(' ');
                this.ngOnInit();

              }
              else { this.toastrService.typeError('Something went wrong');
              this.loading = false;}

              return true;
            }).catch(error =>
            {
                this.toastrService.typeError('Something went wrong');
                this.loading = false;
            });
  }


  edit()
  {
            if(this.view_type == 1)
            {

                  this.Edit_electronics.controls['customer_id'].setValue(this.detail_view.customer_id);
                  this.Edit_electronics.controls['project_name'].setValue(this.detail_view.name);
                  this.Edit_electronics.controls['project_estimation'].setValue(this.detail_view.estimation);
                  this.Edit_electronics.controls['follow_by'].setValue(this.detail_view.follow_by);
                  this.Edit_electronics.controls['start_date'].setValue(this.detail_view.start_date);
                  this.Edit_electronics.controls['etd'].setValue(this.detail_view.etd);
                  this.Edit_electronics.controls['project_type'].setValue(this.detail_view.type);
                  this.Edit_electronics.controls['quantity'].setValue(this.detail_view.qty);
                  this.Edit_electronics.controls['pcb_design_by'].setValue(this.detail_view.design_by);
                  this.Edit_electronics.controls['programe_required'].setValue(this.detail_view.programer_required);
                  this.Edit_electronics.controls['notes'].setValue(this.detail_view.notes);

                  setTimeout(() => {
                    this.selectedOption = this.detail_view.customer_name;
                    this.cdr.detectChanges();
                    }, 200);
                  const modalElement = this.edit_electronics.nativeElement;
                $(modalElement).modal('show');
            }
            if(this.view_type == 2)
            {

                this.Edit_electrical.controls['project_name'].setValue(this.detail_view.name);
                this.Edit_electrical.controls['project_type'].setValue(this.detail_view.type);
                this.Edit_electrical.controls['customer_id'].setValue(this.detail_view.customer_id);
                this.Edit_electrical.controls['follow_by'].setValue(this.detail_view.follow_by);
                this.Edit_electrical.controls['estimate_date'].setValue(this.detail_view.estimate_date);
                this.Edit_electrical.controls['estimate_number'].setValue(this.detail_view.estimate_number);
                this.Edit_electrical.controls['po_date'].setValue(this.detail_view.po_date);
                this.Edit_electrical.controls['po_number'].setValue(this.detail_view.po_number);
                this.Edit_electrical.controls['invoice_date'].setValue(this.detail_view.invoice_date);
                this.Edit_electrical.controls['invoice_number'].setValue(this.detail_view.invoice_number);
                this.Edit_electrical.controls['etd'].setValue(this.detail_view.etd);
                this.Edit_electrical.controls['project_selling_cost'].setValue(this.detail_view.selling_cost);
                this.Edit_electrical.controls['notes'].setValue(this.detail_view.notes);

                setTimeout(() => {
                  this.selectedOption = this.detail_view.customer_name;
                  this.cdr.detectChanges();
                }, 200);

              const product1 = this.Edit_electrical.get('items') as FormArray;
              product1.clear();
              this.detail_view.electrical_items.forEach((item:any,j:any) => {
                product1.push(this.fb.group({
                  type        : "edit",
                  id          : [item.id],
                  name        : [item.name],
                  hp          : [item.hp],
                  phase       : [item.phase],
                  quantity    : [item.qty],
                  contactor   : [item.contactor],
                  olr         : [item.olr],
                  mcb         : [item.mcb],
                  timer       : [item.timer]
                }));
              });

              this.edit_electrical_form= true;
              this.show = true ;
              this.project_detail = false;
            }

            if(this.view_type == 3)
            {

                this.Edit_software.controls['customer_id'].setValue(this.detail_view.customer_id);
                this.Edit_software.controls['project_name'].setValue(this.detail_view.name);
                this.Edit_software.controls['type'].setValue(this.detail_view.type);
                this.Edit_software.controls['follow_by'].setValue(this.detail_view.follow_by);
                this.Edit_software.controls['platform'].setValue(this.detail_view.platform);
                this.Edit_software.controls['backend'].setValue(this.detail_view.backend);
                this.Edit_software.controls['db'].setValue(this.detail_view.db);
                this.Edit_software.controls['cost_estimation'].setValue(this.detail_view.estimation);
                this.Edit_software.controls['description'].setValue(this.detail_view.description);
                this.Edit_software.controls['po_date'].setValue(this.detail_view.po_date);
                this.Edit_software.controls['po_number'].setValue(this.detail_view.po_number);


                setTimeout(() => {
                  this.selectedOption = this.detail_view.customer_name;
                  this.cdr.detectChanges();
                }, 200);

              const modalElement = this.edit_software.nativeElement;
              $(modalElement).modal('show');
            }
  }


  Edit_electronic(value :any)
  {

              Object.keys(this.Edit_electronics.controls).forEach(field => {
                this.Edit_electronics.get(field)?.markAsTouched({ onlySelf: true });
              });

              this.api.post('mp_electronics_pro_edit.php?project_id='+this.project_id+'&detail_id='+this.details_id+'&authToken='+environment.authToken, this.Edit_electronics.value).then((data: any) =>
              {

                if(data.status == "success")
                {
                  this.loading = false;
                  this.toastrService.typeSuccess('Project Updated Succesfully');

                  this.Edit_electronics.controls['customer_id'].setValue('');
                  this.Edit_electronics.controls['project_name'].setValue('');
                  this.Edit_electronics.controls['project_estimation'].setValue('');
                  this.Edit_electronics.controls['follow_by'].setValue('');
                  this.Edit_electronics.controls['start_date'].setValue('');
                  this.Edit_electronics.controls['etd'].setValue('');
                  this.Edit_electronics.controls['project_type'].setValue('');
                  this.Edit_electronics.controls['quantity'].setValue('');
                  this.Edit_electronics.controls['pcb_design_by'].setValue('');
                  this.Edit_electronics.controls['programe_required'].setValue('');
                  this.Edit_electronics.controls['notes'].setValue('');

                    this.selectedOption = '';
                    this.cdr.detectChanges();
                  const modalElement = this.edit_electronics.nativeElement;
                  $(modalElement).modal('hide');

                  this.ngOnInit();
                  this.details_load();

                }
                else { this.toastrService.typeError('Something went wrong');
                this.loading = false;}

                return true;
              }).catch(error =>
              {
                  this.toastrService.typeError('Something went wrong');
                  this.loading = false;
              });
  }

  edit_Submit(value:any)
  {


              Object.keys(this.Edit_electrical.controls).forEach(field => {
                this.Edit_electrical.get(field)?.markAsTouched({ onlySelf: true });
              });

              this.api.post('mp_electrical_project_edit.php?project_id='+this.project_id+'&details_id='+this.details_id+'&authToken='+environment.authToken, this.Edit_electrical.value).then((data: any) =>
              {

                if(data.status == "success")
                {
                  this.loading = false;
                  this.toastrService.typeSuccess('Project Updated Succesfully');

                  this.Edit_electrical.controls['project_name'].setValue('');
                  this.Edit_electrical.controls['project_type'].setValue('');
                  this.Edit_electrical.controls['estimate_date'].setValue('');
                  this.Edit_electrical.controls['estimate_number'].setValue('');
                  this.Edit_electrical.controls['po_date'].setValue('');
                  this.Edit_electrical.controls['po_number'].setValue('');
                  this.Edit_electrical.controls['invoice_date'].setValue('');
                  this.Edit_electrical.controls['invoice_number'].setValue('');
                  this.Edit_electrical.controls['etd'].setValue('');
                  this.Edit_electrical.controls['project_selling_cost'].setValue('');
                  this.Edit_electrical.controls['notes'].setValue('');

                  setTimeout(() => {

                    this.cdr.detectChanges();
                  }, 200);

                  this.edit_electrical_form= false;
                  this.show = false ;
                  this.project_detail = true;

                  this.ngOnInit();
                  this.details_load();

                }
                else { this.toastrService.typeError('Something went wrong');
                this.loading = false;}

                return true;
              }).catch(error =>
              {
                  this.toastrService.typeError('Something went wrong');
                  this.loading = false;
              });
  }

  Edit_software_project(data:any)
  {

              Object.keys(this.Edit_software.controls).forEach(field => {
                this.Edit_software.get(field)?.markAsTouched({ onlySelf: true });
              });

              this.api.post('mp_software_project_edit.php?project_id='+this.project_id+'&details_id='+this.details_id+'&authToken='+environment.authToken, this.Edit_software.value).then((data: any) =>
              {
                if(data.status == "success")
                {
                  this.loading = false;
                  this.toastrService.typeSuccess('Project Updated Succesfully');

                  this.Edit_software.controls['customer_id'].setValue('');
                  this.Edit_software.controls['project_name'].setValue('');
                  this.Edit_software.controls['type'].setValue('');
                  this.Edit_software.controls['follow_by'].setValue('');
                  this.Edit_software.controls['platform'].setValue('');
                  this.Edit_software.controls['backend'].setValue('');
                  this.Edit_software.controls['db'].setValue('');
                  this.Edit_software.controls['cost_estimation'].setValue('');
                  this.Edit_software.controls['description'].setValue('');
                  this.Edit_software.controls['po_date'].setValue('');
                  this.Edit_software.controls['po_number'].setValue('');

                  const modalElement = this.edit_software.nativeElement;
                  $(modalElement).modal('hide');

                  this.ngOnInit();
                  this.details_load();

                  this.myControl.setValue(' ');
                }
                else { this.toastrService.typeError('Something went wrong');
                this.loading = false;}

                return true;
              }).catch(error =>
              {
                  this.toastrService.typeError('Something went wrong');
                  this.loading = false;
              });

   }


   async DisableAccount()
  {
              await this.api.get('single_field_update.php?table=project&field=project_id&value='+this.detail_view['project_id']+'&update=2&up_field=status&authToken=' + environment.authToken).then((data: any) =>
                {
                  if(data.status == "success")
                    {
                      this.toastrService.typeWarning('Account Disabled Succesfully');
                      const id = this.detail_view['project_id'];

                      this.details_load();
                    }
                  else
                  { this.toastrService.typeError(data.status); }
                  return true;
                }).catch(error =>
                {  this.toastrService.typeError('API Faild : DisableAccount');});
  }

  async EnableAccount()
  {
              await this.api.get('single_field_update.php?table=project&field=project_id&value='+this.detail_view['project_id']+'&update=1&up_field=status&authToken=' + environment.authToken).then((data: any) =>
                {
                  if(data.status == "success")
                    {
                      this.toastrService.typeSuccess('Account Enabled Succesfully');
                      const id = this.detail_view['project_id'];
                      this.details_load();

                    }
                  else
                  { this.toastrService.typeError(data.status); }
                  return true;
                }).catch(error =>
                {
                    this.toastrService.typeError('API Faild : EnableAccount');
                });
  }



  onActivate_time(row : any)
  {
            if(this.detail_view.status === 1)
            {
                    this.row_id = row.id
                    this.edit_time.controls['date_att'].setValue(row.date)
                    this.edit_time.controls['time_att'].setValue(row.working_time)
                    this.edit_time.controls['emp_id'].setValue(row.emp_id)
                    // const modalElement = this.edit_att.nativeElement;
                    // $(modalElement).modal('show');
                    this.manpower_show = false
                    this.edit_timline = true
            }
  }

  Add_new()
  {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 10);
            this.add_time.controls['date_att'].setValue(formattedDate);
            this.add_time.controls['project_id'].setValue(this.project_id)
            this.manpower_show = false
            this.add_timeline = true

  }


 async onSubmit_att(value : any)
  {

              if(this.add_time.valid)
              {
                await this.api.post('post_insert_data.php?table=project_worked_time&authToken='+environment.authToken,this.add_time.value).then((data_rt: any) =>
                  {

                    if(data_rt.status == "success")
                      {
                          this.toastrService.typeSuccess(' Added Succesfully');
                          this.table_data_1()
                          this.details_load()
                          this.add_time.controls['date_att'].setValue(null);
                          this.add_time.controls['time_att'].setValue(0);
                          this.add_time.controls['project_id'].setValue(null);
                          this.add_time.controls['emp_id'].setValue(null);
                          this.manpower_show = true
                          this.add_timeline = false
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

      if(data != null)
      {

              const value : man_power [] = []
              this.totalData_1 = data.length;
              data.map((res: man_power, index: number) => {
                     const serialNumber = index + 1;

                     const filteredItems = this.employee_list.filter((name: { emp_id: number; }) => name.emp_id === res.emp_id );

                     res.emp_name = filteredItems[0].name
                     let money = ((filteredItems[0].salary/25)/8) * res.working_time
                     res.amount = money

                   if (index >= this.skip_1 && serialNumber <= this.limit_1) {
                    res.s_no = serialNumber;
                    this.work_time_list.push(res);
                    this.serialNumberArray_1.push(serialNumber);
                    }

                    res.s_no = serialNumber;
                    value.push(res);
               });

               this.calculateTotalPages_1(this.totalData_1, this.pageSize_1);
               this.dataSource_1 = new MatTableDataSource<man_power>(value);
          }
          else
          {
                this.toastrService.typeWarning('No Data in this project ');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData Project list'); });

  }

  async searchData_1(value: any) {
            this.dataSource_1.filter = value.trim().toLowerCase();
            this.totalData_1 = this.dataSource_1.filteredData.length;
            this.callData_1()
  }

  async callData_2()
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
                  this.limit_1 += this.pageSize_1;
                  this.skip_1 = this.pageSize_1 * this.pageIndex_1;
                  this.callData_1();
                } else if (event == 'previous') {
                  this.currentPage_1--;
                  this.pageIndex_1 = this.currentPage_1 - 1;
                  this.limit_1 -= this.pageSize_1;
                  this.skip_1 = this.pageSize_1 * this.pageIndex_1;
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
                    this.details_load()
                    this.edit_time.controls['date_att'].setValue(null);
                    this.edit_time.controls['time_att'].setValue(0);
                    this.edit_timline = false
                    this.manpower_show = true
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

  exportExcel_1()
  {
        const exportData: Partial<TableElement>[] =
        this.dataSource_1.filteredData.map((x) => ({
          '#' : x.s_no,
          "Employee Name"  : x.emp_name,
          'Date '          : x.date,
          'Hours'          : x.working_time,
        }));
      TableExportUtil.exportToExcel(exportData, 'Project List');
  }



  async outwarditem()
  {
        await this.api.get('get_data.php?table=item&authToken=' + environment.authToken).then((data: any) =>
        {
            this.item_list = data;
        }).catch(error => { this.toastrService.typeError('Something went wrong in item list load'); });
   }

  async material_view()
   {
      await   this.outwarditem()
      await  this.table_data_mat()
         const modalElement = this.material_list_view.nativeElement;
          $(modalElement).modal('show');
   }
   async table_data_mat()
   {
     this.material_list      = [];
     this.pageNumberArray_mat   = [];
     this.serialNumberArray_mat = [];

     await this.api.get('get_data.php?table=outward_item&find=project_id&value='+this.project_id+'&authToken=' + environment.authToken).then((data: any) =>
     {

       if(data != null)
       {

               const value : material [] = []
               this.totalData_mat = data.length;
               data.map((res: material, index: number) => {
                      const serialNumber = index + 1;

                      const filteredItems = this.item_list.filter((name: { item_id: number; }) => name.item_id === res.item_id );

                      res.material_name = filteredItems[0].name

                      if (index >= this.skip_mat && serialNumber <= this.limit_mat) {
                      res.s_no = serialNumber;
                      this.material_list.push(res);
                      this.serialNumberArray_mat.push(serialNumber);
                      }

                     res.s_no = serialNumber;
                     value.push(res);
                });

                this.calculateTotalPages_mat(this.totalData_mat, this.pageSize_mat);
                this.dataSource_mat = new MatTableDataSource<material>(value);
           }
           else
           {
                 this.toastrService.typeWarning('No Data in this project ');
           }

       }).catch(error => { this.toastrService.typeError('API Faild : loadData Project list'); });

   }

   async searchData_mat(value: any) {
         this.dataSource_mat.filter = value.trim().toLowerCase();
         this.totalData_mat = this.dataSource_mat.filteredData.length;
         this.callData_mat()
   }


   async callData_mat()
   {
             this.material_list = [];
             await this.dataSource_mat.filteredData.map((res: material, index: number) =>
               {
               const serialNumber = index + 1;

               if (index >= this.skip_mat && serialNumber <= this.limit_mat) {
                 res.id = serialNumber;
                 this.material_list.push(res);
                 this.serialNumberArray_mat.push(serialNumber);
               }
             });

             this.calculateTotalPages_mat(this.dataSource_mat.filteredData.length, this.pageSize_mat);
   }

   public sortData_mat(sort: Sort) {
         const data = this.material_list.slice();
         if (!sort.active || sort.direction === '') {
           this.material_list = data;
               }
               else
               {
                 this.material_list = data.sort((a, b) => {
                   const aValue = (a as any)[sort.active];
                   const bValue = (b as any)[sort.active];
                   return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
                 });
               }
     }

   public getMoreData_mat(event: string): void {
              if (event == 'next') {
                this.currentPage_mat++;
                this.pageIndex_mat = this.currentPage_mat - 1;
                this.limit_mat += this.pageSize_mat;
                this.skip_mat = this.pageSize_mat * this.pageIndex_mat;
                this.callData_mat();
              } else if (event == 'previous') {
                this.currentPage_mat--;
                this.pageIndex_mat = this.currentPage_mat - 1;
                this.limit_mat -= this.pageSize_mat;
                this.skip_mat = this.pageSize_mat * this.pageIndex_mat;
                this.callData_mat();
              }
   }

   public moveToPage_mat(pageNumber: number): void {
             this.currentPage_mat = pageNumber;
             this.skip_mat = this.pageSelection_mat[pageNumber - 1].skip;
             this.limit_mat = this.pageSelection_mat[pageNumber - 1].limit;
             if (pageNumber > this.currentPage_mat) {
               this.pageIndex_mat = pageNumber - 1;
             } else if (pageNumber < this.currentPage_mat) {
               this.pageIndex_mat = pageNumber + 1;
             }
             this.callData_mat();
   }

   public PageSize_mat(value :any): void {
             this.pageSize_mat = parseInt(value)
             this.pageSelection_mat = [];
             this.limit_mat = this.pageSize_mat;
             this.skip_mat = 0;
             this.currentPage_mat = 1;
             this.callData_mat();
   }

   private calculateTotalPages_mat(totalData: number, pageSize: number): void {
             this.pageNumberArray_mat = [];

             this.totalPages_mat = totalData / pageSize;
             if (this.totalPages_mat % 1 != 0) {
               this.totalPages_mat = Math.trunc(this.totalPages_mat + 1);
             }
             for (let i = 1; i <= this.totalPages_mat; i++) {
               const limit = pageSize * i;
               const skip = limit - pageSize;
               this.pageNumberArray_mat.push(i);
               this.pageSelection_mat.push({ skip: skip, limit: limit });
             }
   }

  exportExcel_material()
  {
            const exportData: Partial<TableElement>[] =
            this.dataSource_mat.filteredData.map((x) => ({
              '#'              : x.s_no,
              "Item Name"      : x.material_name,
              'QUnatity '      : x.qty,
              'Amount'         : x.total,
            }));
          TableExportUtil.exportToExcel(exportData, this.detail_view.name+' Material List');
  }
}
