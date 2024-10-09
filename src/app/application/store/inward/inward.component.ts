/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection } from 'src/app/core/models/models';
import { InwardModels, item } from './inward-models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
declare let $: any;

@Component({
  selector: 'app-inward',
  templateUrl: './inward.component.html',
  styleUrls: ['./inward.component.scss']
})
export class InwardComponent  {

  @ViewChild('add_inward') add_inward  !: ElementRef;
  public inward_list : Array<InwardModels> = [];
  dataSource!: MatTableDataSource<InwardModels>;

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
  inward_items !: FormGroup;
  InwardEntry !: FormGroup;
  item_list !:any;
  qty : any
  detail_view :any = null;
  public uid = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  today       = new Date();
  todaysDate  = '';
  todaysTime  = '';
  todays_Date = '';
  batchError  = false;
  batchCode  !: string;
  currentDate!: string;
  currentTime!: string;

  myControl = new FormControl();
  optionHovered: any;
  filteredOptions  !: Observable<item[]>;
 constructor(public api : ApiService, public toastrService:ToasterService,public fb : FormBuilder)
 {

  this.InwardEntry = fb.group
  ({
      'inward_by'     : new FormControl(this.uid),
      batch           : new FormControl(null, [Validators.required]),
      inward_at       : new FormControl(null, [Validators.required]),
      inward_qty      : new FormControl(null, [Validators.required]),
      notes           : new FormControl(null),
    })

   this.inward_items = fb.group({
    'inward_by'      : new FormControl(this.uid),
     item_id         : [null, Validators.compose([Validators.required])],
     notes           : [null],
     batch           : [null],
     rate            : [null],
     inward_at       : new FormControl(null, [Validators.required]),
     inward_qty      : new FormControl(null, [Validators.required]),
     amount          : [null],
   })

   this.todaysDate = formatDate(this.today, 'ddMMyy', 'en-US', '+0530');
    this.todaysTime = formatDate(this.today, 'hh:mm', 'en-US', '+0530');
    this.todays_Date = formatDate(this.today, 'yyyy-MM-dd HH:mm:ss', 'en-US', '+0530');

  }
  ngOnInit()
  {
       this.Loadselectdata();
       this.table_data();
  }

  async Loadselectdata()
  {
    await this.api.get('get_data.php?table=item&authToken=' + environment.authToken).then((data: any) =>
    {
        this.item_list = data;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)) );
    }).catch(error => { this.toastrService.typeError('Something went wrong in Item list'); });
  }
  private _filter(value: string): item[] {
    const filterValue = value.toLowerCase();
    return this.item_list.filter((item: item | null) => {
      if (item && item.name) {
        return item.name.toLowerCase().includes(filterValue);
      }
      return false;
    });

  }
  select = false;

  onChange(data:any)
  {
    this.select = true;
    const selectedValue = this.myControl.value;
    var item =this.item_list.find((x: { name: any; }) => x.name === selectedValue);
    this.inward_items.controls['item_id'].setValue(item?.item_id);
   this.itemselect(item?.item_id);
   this.batch(item?.item_id)
  }

  itemselect(value:any)
  {
    const item = this.item_list.find((item: { item_id: any; }) => item.item_id == value);
    const price = item.price
    this.inward_items.controls['amount'].setValue(parseFloat(price).toFixed(2));
  }
  async table_data()
  {

    this.inward_list       = [];
    this.pageNumberArray   = [];
    this.serialNumberArray = [];

    await this.api.get('mp_bill_item_list.php?format=inward&authToken='+environment.authToken).then((data: any) =>
    {
      if(data != null)
      {
              const value: InwardModels [] = []
              this.totalData = data.length;
              data.map((res: InwardModels, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.id = serialNumber;
                    this.inward_list.push(res);
                    this.serialNumberArray.push(serialNumber);

                    }
                    res.id = serialNumber;
                    value.push(res);
               });
               this.calculateTotalPages(this.totalData, this.pageSize);
               this.dataSource = new MatTableDataSource<InwardModels>(value);
          }
          else
          {
                this.toastrService.typeWarning('No Data Bill Item list');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData Bill Item list'); });

  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
  {
    this.inward_list = [];
    await this.dataSource.filteredData.map((res: InwardModels, index: number) =>
      {
        const serialNumber = index + 1;

        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.inward_list.push(res);
          this.serialNumberArray.push(serialNumber);
        }
    });
    this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
  }

  public sortData(sort: Sort) {
    const data = this.inward_list.slice();
     if (!sort.active || sort.direction === '') {
       this.inward_list = data;
          }
          else
           {
            this.inward_list = data.sort((a, b) => {
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

  batch(value:any)
  {
    this.batchCode   = this.todaysDate+'/'+ value;

    this.inward_items.controls['batch'].setValue(this.batchCode);
  }

  clearError()
  {
    this.batchError = false;
  }

  inward_add()
  {
    const currentDate = new Date().toISOString().slice(0, 10);                                 // Get current date in YYYY-MM-DD format
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5); // Get current time in HH:mm format
    const currentDateTime = `${currentDate}T${currentTime}`;


    this.inward_items.controls['inward_at'].setValue(currentDateTime)
    const modalElement = this.add_inward.nativeElement;
    $(modalElement).modal('show');
  }



  onActivate(row:any)
  {
    this.detail_view = row;
    this.qty         = row.qty;
    this.batchCode   = this.todaysDate+'/'+this.detail_view['item_list_id'];

     this.InwardEntry.controls['batch'].setValue(this.batchCode);
     this.InwardEntry.controls['inward_at'].setValue(this.todays_Date);
     this.InwardEntry.controls['inward_qty'].setValue(row.qty);
  }

  set_zero()
  {
      this.detail_view = null
  }
  exportExcel()
  {
   // const exportData: Partial<TableElement>[] =
    // this.dataSource.filteredData.map((x) => ({
    //     "#"               : x.s_no,
    //     "Name"            : x.item_name,
    //     "Item Description": x.item_description,
    //     "HSN"             : x.hsn,
    //     "Lot Quantity"    : x.inward_qty,
    //     "Stock On Hand"   : x.stock,
    //     "Unit Used"       : x.used

    // }));

   //TableExportUtil.exportToExcel(exportData, 'Stock List');
  }

  async AddSubmit(value:any)
  {
    Object.keys(this.InwardEntry.controls).forEach(field => {
      this.InwardEntry.get(field)?.markAsTouched({ onlySelf: true });
    });

    if(this.InwardEntry.valid)
      {
        this.loading = true;
        let batch    = this.InwardEntry.value['batch'];
        await this.api.get('get_data.php?table=stock_list&find=batch&value='+batch+'&authToken='+environment.authToken).then((data: any) =>
        {
          if(data === null)
          {
            value.item_id = this.detail_view['item_list_id'];
            value.amount  =  this.detail_view['amount'];
            let id = this.detail_view['bill_item_id'];
            this.api.post('mp_stock_inward.php?bill_item_id='+id+'&authToken='+environment.authToken, value).then((data: any) =>
              {

                if(data.status == "success")
                {
                  this.loading = false;
                  this.toastrService.typeSuccess('Inward Added Succesfully');
                  this.InwardEntry.controls['batch'].reset();
                  this.InwardEntry.controls['inward_at'].reset();
                  this.InwardEntry.controls['inward_qty'].reset();
                  this.InwardEntry.controls['notes'].reset();
                  this.ngOnInit();
                  this.detail_view = null
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
          else if (data != null)
          {
            this.batchError = true;
            this.toastrService.typeError('Batch Number Already Exist');
            this.loading = false;
          }
        }).catch(error => {this.toastrService.typeError('Something went wrong');});
      }
      else{
        this.toastrService.typeError('Please Fill all data!');
        this.loading = false;
      }
  }

  async InwardSubmit(value:any)
  {
      Object.keys(this.inward_items.controls).forEach(field => {
        this.inward_items.get(field)?.markAsTouched({ onlySelf: true });
      });

      if(this.inward_items.valid)
      {
        this.loading = true;
        let batch    = this.inward_items.value['batch'];
        await this.api.get('get_data.php?table=stock_list&find=batch&value='+batch+'&authToken='+environment.authToken).then((data: any) =>
        {
          if(data === null)
          {

            this.api.post('mp_stock_inward.php?authToken='+environment.authToken, value).then((data: any) =>
              {

                if(data.status == "success")
                {
                  this.loading = false;
                  this.toastrService.typeSuccess('Inward Added Succesfully');

                  this.inward_items.controls['amount'].reset();
                  this.inward_items.controls['item_id'].reset();
                  this.inward_items.controls['rate'].reset();
                  this.inward_items.controls['inward_at'].reset();
                  this.inward_items.controls['inward_qty'].reset();
                  this.inward_items.controls['notes'].reset();
                  this.inward_items.controls['batch'].reset();
                  const modalElement = this.add_inward.nativeElement;
                  $(modalElement).modal('hide');
                  this.myControl.setValue('');
                  this.selected = [];
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
          else if (data != null)
          {
            this.batchError = true;
            this.toastrService.typeError('Batch Number Already Exist');
            this.loading = false;
          }
        }).catch(error => {this.toastrService.typeError('Something went wrong');});
      }
      else
      {
        this.toastrService.typeError('Please Fill all data!');
        this.loading = false;
      }
  }
}
