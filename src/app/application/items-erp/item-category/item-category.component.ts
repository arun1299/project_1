/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, OnInit, ViewChild ,} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import {  pageSelection } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
import { ItemCategory } from './item-category-model';
import { Sort } from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
declare let $: any;

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {
  @ViewChild('add_item') add_item!: ElementRef;
  @ViewChild('edit_item')  edit_item!: ElementRef;
  public routes = routes;
   view_details  = false;
   public Toggledata  = false;

   public category_list : Array<ItemCategory> = [];
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

  loading :  boolean = false;
  public uid         = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  EditCategory = new FormGroup
  ({
    name              : new FormControl('', [Validators.required, Validators.minLength(3)]),
    type              : new FormControl('', [Validators.required]),
    status            : new FormControl(null)
  });

  AddCategory = new FormGroup
  ({
    'created_by'      : new FormControl(this.uid),
    name              : new FormControl('', [Validators.required, Validators.minLength(3)]),
    type              : new FormControl('', [Validators.required]),
    status            : new FormControl(1)
  });

  constructor(public api: ApiService, public toastService: ToasterService,)
  { }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData()
  {
    this.category_list         = [];
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];

    this.api.get('get_data.php?table=item_category&authToken=' + environment.authToken).then((data: any) =>
      {
      if(data != null)
      {
        const value: ItemCategory[] = [];
        this.totalData = data.length;
        data.map((res: ItemCategory, index: number) => {
               const serialNumber = index + 1;
             if (index >= this.skip && serialNumber <= this.limit) {
              res.id = serialNumber;
              this.category_list.push(res);
              this.serialNumberArray.push(serialNumber);
              this.calculateTotalPages(this.totalData, this.pageSize);

              }
              res.id = serialNumber;
              value.push(res);

         });
         this.dataSource = new MatTableDataSource<ItemCategory>(value);
        }
        else{
          this.toastService.typeWarning('No Data item list');
        }
      }).catch(error => {
        this.toastService.typeError('API Faild : loadData  item list');
      });
  }

 async searchData(value: any) {
  this.dataSource.filter = value.trim().toLowerCase();
  this.category_list = this.dataSource.filteredData;
  this.totalData = this.dataSource.filteredData.length;
  this.callData()
 }

 async callData()
{
  this.category_list = [];
  await this.dataSource.filteredData.map((res: ItemCategory, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.id = serialNumber;
      this.category_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });
  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}


 public sortData(sort: Sort) {
  const data = this.category_list.slice();
  if (!sort.active || sort.direction === '') {
    this.category_list = data;
  } else {
    this.category_list = data.sort((a, b) => {
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

exportExcel() {
  const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
       '#' : x.id,
       CategoryName:x.title,
       Type : x.type,
       Have_Serial_number : x.have_seriel_number,
    }));

  TableExportUtil.exportToExcel(exportData, 'Category List');
 }

  open() {
   this.Toggledata = !this.Toggledata;
 }

  onRowClick(row:any)
    {
      this.detail_view = row;
      this.select_id   = row.cat_id;
      this.EditCategory.controls['name'].setValue(row.title);
      this.EditCategory.controls['type'].setValue(row.type);
      this.EditCategory.controls['status'].setValue(row.status);
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

   async AddSubmit(data :any)
    {

        Object.keys(this.AddCategory.controls).forEach(field => {
          this.AddCategory.get(field)?.markAsTouched({ onlySelf: true });
        });
      if(this.AddCategory.valid)
      {
        let checking : any
        function normalizeString(str : any) {
          return str.replace(/\s+/g, '').toLowerCase();
        }
        await this.api.get('get_data.php?table=item_category&authToken=' + environment.authToken).then((data: any) =>

          {
            checking = data.some((item: { name: any; }) =>  normalizeString(item.name) ===  normalizeString(this.AddCategory.value.name) );
          }).catch(error =>
            {
                this.toastService.typeError('API Faild : Item checking failed');
                this.loading = false;
            });
        this.loading=true;
        await this.api.post('post_insert_data.php?table=item_category&authToken=' + environment.authToken, this.AddCategory.value).then((data: any) =>
          {

            if(data.status == "success")
              {
                this.loading = false;
                this.toastService.typeSuccess('Item Category Added Succesfully');
                this.AddCategory.controls['name'].reset();
                this.AddCategory.controls['type'].reset();
                this.AddCategory.controls['status'].setValue(1);
                this.getTableData();
                const modalElement = this.add_item.nativeElement;
                $(modalElement).modal('hide');
              }
            else
            { this.toastService.typeError(data.status);  this.loading = false;}

            return true;
          }).catch(error =>
          {
              this.toastService.typeError('API Faild : Item Category Submit');
              this.loading = false;
          });
      }
    }

 async EditSubmit(data:any)
  {
    this.loading = true;
    await this.api.post('post_update_data.php?table=item_category&field=cat_id&value='+this.select_id+'&authToken=' + environment.authToken, this.EditCategory.value).then((data: any) =>
      {
        if(data.status == "success")
          {
            this.loading = false;
            this.toastService.typeSuccess('Item Category Updated Succesfully');
            this.getTableData();
            const modalElement = this.edit_item.nativeElement;
            $(modalElement).modal('hide');
          }
        else
        { this.toastService.typeError(data.status);
          this.loading = false;}

        return true;
      }).catch(error =>
      {
          this.toastService.typeError('API Faild : Item Category Update');
          this.loading = false;
      });
  }
}
