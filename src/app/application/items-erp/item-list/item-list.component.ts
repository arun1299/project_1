/* eslint-disable no-inner-declarations */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, OnInit, ViewChild ,} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import {  pageSelection } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemCategory } from './item-list-models';
declare let $: any;

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent  {

  @ViewChild('add_item') add_item!: ElementRef;
  @ViewChild('edit_item')  edit_item!: ElementRef;
  public routes = routes;
   view_details  = false;
   public Toggledata  = false;

   public item_list : Array<ItemCategory> = [];
   dataSource          !: MatTableDataSource<ItemCategory>;
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

  detail_view        = [];
  selected           = [];
  category_filter    = [];

  select_id          : any;
  update_categogy_id : any;
  new_category_id    : any;
  uom_list           : any;
  tax_list           : any;
  category           : any;
  loading :  boolean = false;
  public uid                = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  EditItem = new FormGroup
  ({
    name           : new FormControl('', [Validators.required, Validators.minLength(3)]),
    hsnsac         : new FormControl('', [Validators.required, Validators.minLength(3)]),
    item_cat       : new FormControl(null),
    uom            : new FormControl('', [Validators.required]),
    tax            : new FormControl('', [Validators.required]),
    purchase       : new FormControl(null),
    sale           : new FormControl(null),
    price          : new FormControl('', [Validators.required]),
    location       : new FormControl(null),
    description    : new FormControl(null),
    status         : new FormControl('')
  });

  NewItem = new FormGroup
  ({
    created_by      : new FormControl(this.uid),
    name            : new FormControl('', [Validators.required, Validators.minLength(3)]),
    item_cat        : new FormControl(''),
    hsnsac          : new FormControl('', [Validators.required, Validators.minLength(4)]),
    uom             : new FormControl('NOS'),
    purchase        : new FormControl(1),
    sale            : new FormControl(1),
    price           : new FormControl('', [Validators.required]),
    tax_percent     : new FormControl('18'),
    location        : new FormControl(null),
    description     : new FormControl(null),
    status          : new FormControl(1)
  });

  constructor(public api: ApiService, public toastService: ToasterService,)
  { }

ngOnInit(): void {
  this.getTableData();
  this.load_item();
}

total_list !: MatTableDataSource<ItemCategory>;
getTableData()
{
  this.item_list             = [];
  this.serialNumberArray     = [];
  this.pageNumberArray       = [];

  this.api.get('mp_item_list.php?&authToken=' + environment.authToken).then((data: any) => {
    if (data != null) {
      this.totalData = data.length;
      const value: ItemCategory[] = [];

      data.map((res: ItemCategory, index: number) => {
        const serialNumber = index + 1;

        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.item_list.push(res);
          this.serialNumberArray.push(serialNumber);
        }
        res.id = serialNumber;

        value.push(res);
      });

      this.calculateTotalPages(this.totalData, this.pageSize);
      this.dataSource = new MatTableDataSource<ItemCategory>(this.item_list);
      this.total_list = new MatTableDataSource<ItemCategory>(value);

    } else {
      this.toastService.typeWarning('No Data list');
    }
  }).catch(error => {
    this.toastService.typeError('API Failed: loadData list');
  });

}

async searchData(value: any) {
  this.total_list.filter = value.trim().toLowerCase();
  this.totalData = this.item_list.length;
  this.item_list = [];
  this.callData();
}

async callData()
{
  this.item_list = [];
  await this.total_list.filteredData.map((res: ItemCategory, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.id = serialNumber;
      this.item_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });
  this.calculateTotalPages(this.total_list.filteredData.length, this.pageSize);
}

public sortData(sort: Sort) {
  const data = this.item_list.slice();
  if (!sort.active || sort.direction === '') {
    this.item_list = data;
  } else {
    this.item_list = data.sort((a, b) => {
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
  this.pageSize =  parseInt(value)
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

 exportExcel() {
  const exportData: Partial<TableElement>[] =
  this.item_list.map((x) => ({
       '#' : x.id,
       ItemName:x.item_name,
       Category : x.item_cat,
       Type : x.item_type,
       HSN  :x.hsnsac,
       Price:x.price,
       UOM  :x.uom,
       Tax_Percent :x.tax_percent,
       Location : x.location,
       Description :x.description,
       Purchase :x.purchase,
       Sales :x.sales,
    }));

  TableExportUtil.exportToExcel(exportData, 'Item List');
 }

  open() {
   this.Toggledata = !this.Toggledata;
 }

  onRowClick(row:any)
    {

      this.detail_view = row;
      this.select_id   = row.item_id;
      this.EditItem.controls['name'].setValue(row.item_name);
      this.EditItem.controls['item_cat'].setValue(row.item_cat_id);
      this.EditItem.controls['hsnsac'].setValue(row.hsnsac);
      this.EditItem.controls['uom'].setValue(row.uom);
      this.EditItem.controls['purchase'].setValue(row.purchase);
      this.EditItem.controls['sale'].setValue(row.sales);
      this.EditItem.controls['location'].setValue(row.location);
      this.EditItem.controls['price'].setValue(row.price);
      this.EditItem.controls['tax'].setValue(row.tax_percent);
      this.EditItem.controls['description'].setValue(row.description);
      this.EditItem.controls['status'].setValue(row.status);
    }

    edit_view()
    {
      const modalElement = this.edit_item.nativeElement;
      $(modalElement).modal('show');
    }


    Add_category()
    {
      const modalElement = this.add_item.nativeElement;
      $(modalElement).modal('show');
    }


    async EditSubmit(data:any)
    {

      this.loading=true;
      await this.api.post('post_update_data.php?table=item&field=item_id&value=' + this.select_id + '&authToken=' + environment.authToken, data).then((data_rt: any) =>
      {
        if (data_rt.status == "success")
        {
          this.toastService.typeSuccess('Item Updated Succesfully');
          this.loading=false;
        }
        else { this.toastService.typeError(data_rt.status);
          this.loading = false; }
          const modalElement = this.edit_item.nativeElement;
          $(modalElement).modal('hide');
          this.getTableData();
        return true;
      }).catch(error => {this.toastService.typeError('API Faild : Item Updated');
      this.loading = false;});
    }



  async NewSubmit(data:any)
  {
    this.NewItem.controls['created_by'].setValue(this.uid);

      Object.keys(this.NewItem.controls).forEach(field => {
        this.NewItem.get(field)?.markAsTouched({ onlySelf: true });
      });
    if (this.NewItem.valid)
    {
      let checking : any
      this.loading = true;
      function normalizeString(str : any) {
        return str.replace(/\s+/g, '').toLowerCase();
      }

      await this.api.get('get_data.php?table=item&authToken=' + environment.authToken).then((data: any) =>

        {
          checking = data.some((item: { name: any; }) =>  normalizeString(item.name) ===  normalizeString(this.NewItem.value.name) );
        
        }).catch(error =>
          {
              this.toastService.typeError('API Faild : Item checking failed');
              this.loading = false;
          });

       if(!checking)
       {
          this.NewItem.controls['created_by'].setValue(this.uid);
          await this.api.post('post_insert_data.php?table=item&authToken=' + environment.authToken, this.NewItem.value).then((data: any) =>
          {
            if(data.status == "success")
              {
                this.loading = false;
                this.toastService.typeSuccess('Item Added Succesfully');
                this.NewItem.controls['created_by'].setValue(this.uid);
                this.NewItem.controls['name'].reset();
                this.NewItem.controls['item_cat'].reset();
                this.NewItem.controls['purchase'].setValue(0);
                this.NewItem.controls['sale'].setValue(0);
                this.NewItem.controls['hsnsac'].reset();
                this.NewItem.controls['uom'].setValue('NOS');
                this.NewItem.controls['tax_percent'].setValue('18');
                this.NewItem.controls['location'].reset();
                this.NewItem.controls['description'].reset();
                this.NewItem.controls['price'].reset();
                this.NewItem.controls['status'].setValue(1);
                this.getTableData();
                const modalElement = this.add_item.nativeElement;
                $(modalElement).modal('hide');
              }
            else
            {
              this.toastService.typeError(data.status);
              this.loading = false;
            }
            return true;
          }).catch(error =>
          {
              this.toastService.typeError('API Faild : Item Added failed');
              this.loading = false;
          });
        }
        else{
          this.toastService.typeError(' Item Name was already Exist');
          this.loading = false
        }
      }
  }

  async load_item()
  {
    await this.api.get('get_data.php?table=unit&authToken='+environment.authToken).then((data: any) =>
    {
      this.uom_list    = data;
    }).catch(error => {this.toastService.typeError('API Faild : load item unit');});

    await this.api.get('get_data.php?table=tax&authToken='+environment.authToken).then((data: any) =>
    {
      this.tax_list    = data;
    }).catch(error => {this.toastService.typeError('API Faild : load item tax');});

    await this.api.get('get_data.php?table=item_category&authToken='+environment.authToken).then((data: any) =>
    {
      this.category    = data;
    }).catch(error => {this.toastService.typeError('API Faild : load item category');});
  }
}
