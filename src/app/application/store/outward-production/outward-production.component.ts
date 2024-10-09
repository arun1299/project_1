
/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { ChangeDetectorRef, Component, ElementRef, ViewChild, } from '@angular/core';
import { outward_project, outward_stock } from './outward-production-models';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';

declare let $: any;

@Component({
  selector: 'app-outward-production',
  templateUrl: './outward-production.component.html',
  styleUrls: ['./outward-production.component.scss']
})
export class OutwardProductionComponent  {

  @ViewChild('add_item') add_item  !: ElementRef;
  @ViewChild('update') update  !: ElementRef;

  public outward_list : Array<outward_project> = [];
  dataSource!: MatTableDataSource<outward_project>;

  public outward_item_list : Array<outward_stock> = [];
  dataSource_item!: MatTableDataSource<outward_stock>;

  public exp_show    = false;
  public show        = false;
  public loading     = false;
  public Toggledata  = false;

  public routes = routes;

  modalRef      !: BsModalRef;
  selected      =  [];
  itemQty       = null;

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


  public searchDataValue_item = '';

  public lastIndex_item     = 0;
  public pageSize_item      = 10;
  public totalData_item     = 0;
  public skip_item          = 0;
  public limit_item: number = this.pageSize;
  public pageIndex_item     = 0;
  public currentPage_item   = 1;
  public serialNumberArray_item: Array<number> = [];
  public pageNumberArray_item  : Array<number> = [];
  public pageSelection_item    : Array<pageSelection> = [];
  public totalPages_item    = 0;

  public uid = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  item_list :any;
  details   :any;
  batchList :any = null;
  batchQty  :any = null;
  QtyError = false;

  Outward = new FormGroup
    ({
      'created_by'  : new FormControl(this.uid),
      'project_id'  : new FormControl(null),
      'batch_id'    : new FormControl(null),
      item_id       : new FormControl(null, [Validators.required]),
      outward_at    : new FormControl('', [Validators.required]),
      quantity      : new FormControl(null, [Validators.required]),
      notes         : new FormControl(null),
      'status'      : new FormControl('1')
    })

    UpdateStatus = new FormGroup
    ({
      date_time       : new FormControl('', [Validators.required]),
      'status'        : new FormControl('2')
    })

  constructor(public api : ApiService, public toastrService:ToasterService,public fb : FormBuilder,private cdr: ChangeDetectorRef)
 {}

 ngOnInit()
 {
     this.table_data ();

 }


  loaditems()
  {

    this.api.get('mp_item_list.php?&authToken='+environment.authToken).then((data: any) =>
    {
      this.item_list = data;
    }).catch(error => {this.toastrService.typeError('Something went wrong ');});
  }

  loaditems_elc(value : any)
  {
    this.api.get('mp_item_list.php?&authToken='+environment.authToken).then((data: any) =>
      {
         const filteredItems = data.filter((item: { item_type: number; }) => item.item_type === value);
         this.item_list = filteredItems;
      }).catch(error => {this.toastrService.typeError('Something went wrong ');});
  }

 async table_data()
 {
   this.outward_list      = [];
   this.pageNumberArray   = [];
   this.serialNumberArray = [];

   await this.api.get('get_data.php?table=project&find=status&value=1&authToken=' + environment.authToken).then((data: any) =>
   {

     if(data != null)
     {
             const filteredItems = data.filter((data: { category: number; }) => data.category === 2 || data.category === 1);

              let value : outward_project [] = []
             this.totalData = data.length;
             filteredItems.map((res: outward_project, index: number) => {
                    const serialNumber = index + 1;
                  if (index >= this.skip && serialNumber <= this.limit) {
                      res.s_no = serialNumber;
                      this.outward_list.push(res);
                      this.serialNumberArray.push(serialNumber);

                   }
                   res.s_no = serialNumber;
                   value.push(res);
              });
              this.calculateTotalPages(this.totalData, this.pageSize);
              this.dataSource = new MatTableDataSource<outward_project>(value);
         }
         else
         {
               this.toastrService.typeWarning('No Data  bank list');
         }

        }).catch(error => { this.toastrService.typeError('API Faild : loadData salary list'); });
    }

  public searchData(value: any): void {
      this.dataSource.filter = value.trim().toLowerCase();
      this.totalData = this.dataSource.filteredData.length;
      this.callData()
    }

    async callData()
    {
      this.outward_list = [];
      await this.dataSource.filteredData.map((res: outward_project, index: number) =>
        {
          const serialNumber = index + 1;

          if (index >= this.skip && serialNumber <= this.limit) {
            res.s_no = serialNumber;
            this.outward_list.push(res);
            this.serialNumberArray.push(serialNumber);
          }
      });
      this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
    }

  public sortData(sort: Sort) {
    const data = this.outward_list.slice();
    if (!sort.active || sort.direction === '') {
      this.outward_list = data;
          }
          else
          {
            this.outward_list = data.sort((a, b) => {
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

  async table_data_item()
 {
   this.outward_item_list      = [];
   this.pageNumberArray_item   = [];
   this.serialNumberArray_item = [];

   let id = this.details['project_id'];
    await this.api.get('mp_outward_list.php?project_id='+id+'&authToken='+environment.authToken).then((data: any) =>
    {
     if(data != null)
     {
             let value :outward_stock [] =[]
             this.totalData_item = data.length;
             data.map((res: outward_stock, index: number) => {
                    const serialNumber = index + 1;
                  if (index >= this.skip_item && serialNumber <= this.limit_item) {
                   res.s_no = serialNumber;
                   this.outward_item_list.push(res);
                   this.serialNumberArray_item.push(serialNumber);
                   }
                   res.s_no = serialNumber;
                   value.push(res)
              });

              this.calculateTotalPages_item(this.totalData_item, this.pageSize_item);
              this.dataSource_item = new MatTableDataSource<outward_stock>(value);
     }
     else
       {
               this.toastrService.typeWarning('No Data  project list');
        }

     }).catch(error => { this.toastrService.typeError('API Faild : loadData project list'); });

    }

    public searchData_item(value: any): void {
      this.dataSource_item.filter = value.trim().toLowerCase();
      this.outward_item_list = this.dataSource_item.filteredData;
      this.callData_item()
    }

    async callData_item()
    {
      this.outward_item_list = [];
      await this.dataSource_item.filteredData.map((res: outward_stock, index: number) =>
        {
          const serialNumber = index + 1;

          if (index >= this.skip_item && serialNumber <= this.limit_item) {
            res.s_no = serialNumber;
            this.outward_item_list.push(res);
            this.serialNumberArray_item.push(serialNumber);
          }
      });
      this.calculateTotalPages(this.dataSource_item.filteredData.length, this.pageSize);
    }

  public sortData_item(sort: Sort) {
    const data = this.outward_item_list.slice();
    if (!sort.active || sort.direction === '') {
      this.outward_item_list = data;
          }
          else
          {
            this.outward_item_list = data.sort((a, b) => {
              const aValue = (a as any)[sort.active];
              const bValue = (b as any)[sort.active];
              return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
            });
          }
    }

  public getMoreData_item(event: string): void {
    if (event == 'next') {
      this.currentPage_item++;
      this.pageIndex_item = this.currentPage_item - 1;
      this.limit_item += this.pageSize_item;
      this.skip_item = this.pageSize_item * this.pageIndex_item;
      this.callData_item();
    } else if (event == 'previous') {
      this.currentPage_item--;
      this.pageIndex_item = this.currentPage_item - 1;
      this.limit_item -= this.pageSize_item;
      this.skip_item = this.pageSize_item * this.pageIndex_item;
      this.callData_item();
    }
  }

  public moveToPage_item(pageNumber: number): void {
    this.currentPage_item = pageNumber;
    this.skip_item = this.pageSelection_item[pageNumber - 1].skip;
    this.limit_item = this.pageSelection_item[pageNumber - 1].limit;
    if (pageNumber > this.currentPage_item) {
      this.pageIndex_item = pageNumber - 1;
    } else if (pageNumber < this.currentPage_item) {
      this.pageIndex_item = pageNumber + 1;
    }
    this.callData_item();
  }

  public PageSize_item(): void {
    this.pageSelection_item = [];
    this.limit_item = this.pageSize_item;
    this.skip_item = 0;
    this.currentPage_item = 1;
    this.callData_item();
  }

  private calculateTotalPages_item(totalData: number, pageSize: number): void {
    this.pageNumberArray_item = [];

    this.totalPages_item = totalData / pageSize;
    if (this.totalPages_item % 1 != 0) {
      this.totalPages_item = Math.trunc(this.totalPages_item + 1);
    }
    for (let i = 1; i <= this.totalPages_item; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray_item.push(i);
      this.pageSelection_item.push({ skip: skip, limit: limit });
    }
  }

  onActivate(row:any)
  {
    this.show = true;
    this.details = row;
    this.table_data_item();
    if(row.category == 2)
    {
      this.loaditems_elc (row.category);
    }
    else{
      this.loaditems()
    }
  }
  exportExcel()
  {
  //   const exportData: Partial<TableElement>[] =
  //   this.dataSource.filteredData.map((x) => ({
  //      '#' : x.s_no,
  //      "project"  : x.name,
  //      "category" : x.category === 1 ? "electronics" :x.category === 2 ? "electrical" :x.category === 3 ? "software": undefined,
  //   }));
  // TableExportUtil.exportToExcel(exportData, 'Project List');
  }

  onActivate_item(project :any)
  {}

  set_zero()
  {
    this.show = false;
  }

  AddOutwardButton()
  {

    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + offset);
    const formattedDate = istTime.toISOString().slice(0, 16).replace("T", "T");

    this.Outward.controls['outward_at'].setValue(formattedDate);
    this.Outward.controls['project_id'].setValue(this.details.project_id)
    const modalElement = this.add_item.nativeElement;
    $(modalElement).modal('show');
  }

  OpenStatusUpdate()
  {
    const now = new Date();
    const offset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istTime = new Date(now.getTime() + offset);
    const formattedDate = istTime.toISOString().slice(0, 16).replace("T", "T");

    this.UpdateStatus.controls['date_time'].setValue(formattedDate)
    const modalElement = this.update.nativeElement;
    $(modalElement).modal('show');
  }

  OutwardSubmit(value:any)
  {

   Object.keys(this.Outward.controls).forEach(field => {
      this.Outward.get(field)?.markAsTouched({ onlySelf: true });
    });
    if(value.quantity <= this.batchQty)
    {
     this.loading=true;
      this.api.post('mp_outward_entry.php?authToken='+environment.authToken, this.Outward.value).then((data: any) =>
      {
        if(data.status == "success")
        {
          this.loading=false;
          this.toastrService.typeSuccess('Inward Added Succesfully');
          this.Outward.controls['item_id'].reset();
          this.Outward.controls['outward_at'].reset();
          this.Outward.controls['batch_id'].reset();
          this.Outward.controls['quantity'].reset();
          this.Outward.controls['notes'].reset();
      //    this.Outward.reset();
          this.batchList = null;
          this.batchQty  = null;
          const modalElement = this.add_item.nativeElement;
          $(modalElement).modal('hide');
          this.table_data_item();

          setTimeout(() => {}, 500);
        }
        else { this.toastrService.typeError('Something went wrong');
        this.loading = false; }
        return true;
      }).catch(error =>
      {
          this.toastrService.typeError('Something went wrong ');
          this.loading = false;
      });
    }
    else
    {
      this.QtyError = true;
    }
  }



  Loaditem(data:any)
  {

    this.api.get('get_data.php?table=stock_list&find=item_list_id&value='+data+'&find1=status&value1=1&authToken='+environment.authToken).then((data: any) =>
      {
        this.batchList = data;

      }).catch(error => {this.toastrService.typeError('Something went wrong ');});
  }


  LoadQty(data:any)
  {
    this.api.get('get_data.php?table=stock_list&find=stock_id&value='+data+'&authToken='+environment.authToken).then((data: any) =>
      {
        this.batchQty = data[0].stock;
        this.Outward.controls['quantity'].setValue(this.batchQty);
      }).catch(error => {this.toastrService.typeError('Something went wrong ');});
  }


  ClearError()
  {
    this.QtyError = false;
  }

  async LoadOutward()
  {
    let id = this.details['project_id'];
    await this.api.get('mp_outward_list.php?production_id='+id+'&authToken='+environment.authToken).then((data: any) =>
      {
        this.outward_item_list = data;
      }).catch(error => {this.toastrService.typeError('Something went wrong ');});

  }


  async Complete(value :any)
  {
    Object.keys(this.UpdateStatus.controls).forEach(field => {
      this.UpdateStatus.get(field)?.markAsTouched({ onlySelf: true });
    });
    if(this.UpdateStatus.valid)
    {
        let id = this.details['project_id'];
        this.loading=true;
        await this.api.post('post_update_data.php?table=project&field=project_id&value='+id+'&authToken='+environment.authToken,value).then((data: any) =>
        {

          if(data.status == "success")
          {
            this.loading=false;
            this.toastrService.typeSuccess('Product Completed Succesfully');
            this.table_data();
            const modalElement = this.update.nativeElement;
            $(modalElement).modal('hide');
          }
          else { this.toastrService.typeError('Something went wrong : onUpdate');
          this.loading = false;}
          return true;
        }).catch(error =>
        {
            this.toastrService.typeError('API Faild : onUpdate');
            this.loading = false;
        });
   }
   else
   {
    this.toastrService.typeWarning('Please Fill The Details');
   }
  }
}
