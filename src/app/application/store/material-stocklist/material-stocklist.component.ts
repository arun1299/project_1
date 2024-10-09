/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, ViewChild,  } from '@angular/core';
import { Material_stockModels, item } from './material_stock-models';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/core/helpers/routes/routes';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/core/models/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { TableElement } from 'src/app/shared/TableElement';
import { Observable, map, startWith } from 'rxjs';
declare let $: any;

@Component({
  selector: 'app-material-stocklist',
  templateUrl: './material-stocklist.component.html',
  styleUrls: ['./material-stocklist.component.scss']
})
export class MaterialStocklistComponent {

  @ViewChild('add_inward') add_inward  !: ElementRef;
  @ViewChild('purchase') purchase  !: ElementRef;

  public inward_list : Array<Material_stockModels> = [];
  dataSource!: MatTableDataSource<Material_stockModels>;
  filteredOptions  !: Observable<item[]>;
  public user_type = localStorage.getItem('type');
  public uid       = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

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
  StockAmd     !:FormGroup;
  po           !:FormGroup;
  item_list !:any;


  today      = new Date();
  todaysDate = '';
  todaysTime = '';
  batchError  = false;
  batchCode  !: string;
  detail_view: any;
  TotalAmount: any;
  myControl = new FormControl();
  optionHovered: any;
 constructor(public api : ApiService, public toastrService:ToasterService,public fb : FormBuilder)
 {


  this.StockAmd = new FormGroup
  ({
    'created_by'  : new FormControl(this.uid),
    'old_stock'   : new FormControl(null),
    new_stock     : new FormControl(null, [Validators.required, Validators.min(1)]),
    reason        : new FormControl(null, [Validators.required, Validators.minLength(3)]),
  })

   this.inward_items = fb.group({
    'inward_by'      : new FormControl(this.uid),
     item_id         : [null, Validators.compose([Validators.required])],
     notes           : [null],
     rate            : [null],
     inward_at       : new FormControl(null, [Validators.required]),
     inward_qty      : new FormControl(null, [Validators.required]),
     amount          : [null],
   })

   this.po = new FormGroup
    ({
      'created_by'  : new FormControl(this.uid),
      quantity      : new FormControl(null, [Validators.required]),
      description   : new FormControl(null),
      item          : new FormControl(0, [Validators.required]),
      'type'        : new FormControl('store'),
      project_id    : new FormControl(null)
    })

   this.todaysDate = formatDate(this.today, 'ddMMyy', 'en-US', '+0530');
    this.todaysTime = formatDate(this.today, 'hh:mm', 'en-US', '+0530');
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

           this.myControl
           this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)) );

    }).catch(error => { this.toastrService.typeError('Something went wrong in Item'); });
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
  async table_data()
  {

    this.inward_list       = [];
    this.pageNumberArray   = [];
    this.serialNumberArray = [];

    await this.api.get('mp_stock_list.php?format=status&authToken=' + environment.authToken).then((data: any) =>
    {

      if(data != null)
      {
              this.totalData = data.length;
              data.map((res: Material_stockModels, index: number) => {
                     const serialNumber = index + 1;
                   if (index >= this.skip && serialNumber <= this.limit) {
                    res.s_no = serialNumber;
                    this.inward_list.push(res);
                    this.serialNumberArray.push(serialNumber);
                    this.calculateTotalPages(this.totalData, this.pageSize);
                    this.dataSource = new MatTableDataSource<Material_stockModels>(this.inward_list);
                    }
               });
          }
          else
          {
                this.toastrService.typeWarning('No Data  Stock list');
          }

      }).catch(error => { this.toastrService.typeError('API Faild : loadData Stock list'); });

  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
  }

  async callData()
  {
    this.inward_list = [];
    await this.dataSource.filteredData.map((res: Material_stockModels, index: number) =>
      {
        const serialNumber = index + 1;

        if (index >= this.skip && serialNumber <= this.limit) {
          res.s_no = serialNumber;
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
   // this.inward_items.controls['batch'].setValue(this.batchCode);
  }

  clearError()
  {
    this.batchError = false;
  }

  create_pur_request()
  {
    const modalElement = this.purchase.nativeElement;
    $(modalElement).modal('show');
  }
  set_zero()
  {
   this.show=false;
  }

  onActivate(row:any)
  {
       this.detail_view = row;
        this.TotalAmount = this.detail_view.stock*this.detail_view.amount;
        this.show = true;
  }

  exportExcel()
  {
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
        "#"               : x.s_no,
        "Name"            : x.item_name,
        "Item Description": x.item_description,
        "HSN"             : x.hsn,
        "Lot Quantity"    : x.inward_qty,
        "Stock On Hand"   : x.stock,
        "Unit Used"       : x.used

    }));

   TableExportUtil.exportToExcel(exportData, 'Stock List');
  }

  stockamend()
  {
    this.StockAmd.controls['old_stock'].setValue(this.detail_view['stock']);
    this.StockAmd.controls['new_stock'].setValue(this.detail_view['stock']);

    const modalElement = this.add_inward.nativeElement;
    $(modalElement).modal('show');
  }

  async SubmitAmendment(value:any)
  {

    let id = this.detail_view['stock_id'];
    if(this.StockAmd.valid)
    {
        this.loading=true;
        await this.api.post('mp_stock_amendment.php?stock_id='+id+'&authToken=' + environment.authToken, value).then((data_rt: any) =>
        {
          if (data_rt.status == "success")
          {
            this.loading=false;
            this.toastrService.typeSuccess('Stock Updated Succesfully');
            const modalElement = this.add_inward.nativeElement;
              $(modalElement).modal('hide');
            this.StockAmd.controls['new_stock'].setValue(null);
            this.StockAmd.controls['reason'].setValue(null);
            this.table_data();
            }
          else { this.toastrService.typeError(data_rt.status);
            this.loading = false;}
          return true;
        }).catch(error => {this.toastrService.typeError('API Faild : SubmitAmendment');
        this.loading = false;});
  }
  else{
    this.toastrService.typeError('Fill the Details');
  }
  }


  Submit(value:any)
  {
      Object.keys(this.po.controls).forEach(field => {
        this.po.get(field)?.markAsTouched({ onlySelf: true });
      });
      if(this.po.valid)
      {
        this.api.post('post_insert_data.php?table=purchase_request&authToken='+environment.authToken,value).then((data: any) =>
        {

          if(data.status == "success")
          {
            this.loading = false;
            this.toastrService.typeSuccess('Purchase Created Succesfully');
            const modalElement = this.purchase.nativeElement;
            $(modalElement).modal('hide');

            this.Loadselectdata();
            this.myControl.reset();
            this.po.controls['item'].reset(0);
            this.po.controls['description'].reset();
            this.po.controls['quantity'].reset();
            this.po.controls['project_id'].reset();
          }
          else { this.toastrService.typeError('Something went wrong : PO Create');
          this.loading = false;}
          return true;
        }).catch(error =>
        {
            this.toastrService.typeError('API Faild : PO Create');
            this.loading = false;
        });
      }
 }

 select = false;

 onChange(data:any)
 {
   this.select = true;
   const selectedValue = this.myControl.value;
   var item =this.item_list.find((x: { name: any; }) => x.name === selectedValue);
   this.po.controls['item'].setValue(item?.item_id);

 }
}
