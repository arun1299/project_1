
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { pageSelection } from 'src/app/shared/custom-pagination/pagination.service';
import { environment } from 'src/environments/environment';
import { Menu_settingModels } from './menu_setting.models';
import { Sort } from '@angular/material/sort';
import { apiResultFormat } from 'src/app/core/models/models';
import { Menu } from './../../../core/models/models';
import { DataService } from 'src/app/core/core.index';
declare let $: any;

@Component({
  selector: 'app-menu_setting',
  templateUrl: './menu_setting.component.html',
  styleUrls: ['./menu_setting.component.scss']
})
export class Menu_settingComponent implements OnInit {
  public uid                = localStorage.getItem('uid');
   public user_type          = localStorage.getItem('type');
   public user_bank_id       = localStorage.getItem('bank_id');

   public lastIndex    = 0;
   public pageSize     = 10;
   public totalData    = 0;
   public skip         = 0;
   public limit: number = this.pageSize;
   public pageIndex    = 0;
   public serialNumberArray: Array<number> = [];
   public currentPage  = 1;
   public pageNumberArray: Array<number> = [];
   public pageSelection: Array<pageSelection> = [];
   dataSource   !: MatTableDataSource<Menu_settingModels>;
   public totalPages   = 0;
   public Toggledata   = false;
   public      show    = false;
   public searchDataValue =''

   public sampleData: Array<number> = [];

    list               : Array<Menu_settingModels> =[];
    from_date          : any
    to_date            : any
    id                 : any
    status_change_id   : any
    select_menu        : any
    menu_list          : any
    user_id            : any
    menu_data          : any
    find_name          : any
    user_name          : any
    menu_data_list     : any
    menu               : any
    list_menu          : any

    list_view          = false
    menubar_view       = false
    user_edit    !: FormGroup
    new_user     !: FormGroup
    loading      = false

    @ViewChild("Edit_menu", { static: true }) Edit_menu!: ElementRef;
    @ViewChild("add_menu", { static: true }) add_menu!: ElementRef;

  constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService,public data : DataService,private cdr: ChangeDetectorRef)
  {
    this.new_user = fb.group({
      ['created_by']:[this.uid],
       name         :[null,Validators.compose([Validators.required])],
    })

    this.user_edit = fb.group({
       name         :[null,Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
    this.get_tabledata()
    this.getTableData()
  }

  async getTableData() {
  //   this.data.getMenu().subscribe((apiRes: apiResultFormat) => {
  //   this.menu_data = apiRes.data[0];
  //   console.log("angular : ",this.menu_data.menu)
  // })
    await  this.api.get('menu_list.php?user_type='+0+'&authToken='+environment.authToken).then((data: any) =>
      {
         this.menu_data = data[0].menu
      }).catch(error => { this.toastService.typeError(' Data Load Error')});
      this.cdr.detectChanges();
  }

  async get_tabledata()
  {
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];
    this.list   = [];
    this.api.get('get_data.php?table=user_type&find=status&value=1&authToken='+environment.authToken).then((data: any) =>
      {
      if (data != null)
        {
            let value : Menu_settingModels [] = []
            let total_data = data;
            this.totalData    = total_data.length
            total_data.map((res: Menu_settingModels, index: number) => {
            const serialNumber = index + 1;
            if (index >= this.skip && serialNumber <= this.limit) {
            res.s_no = serialNumber;
            this.list.push(res);
            this.serialNumberArray.push(serialNumber);

            }
            res.s_no = serialNumber;
            value.push(res);
       });
       this.calculateTotalPages(this.totalData, this.pageSize);
       this.dataSource = new MatTableDataSource<Menu_settingModels>(value);
     }
    }).catch(error => { this.toastService.typeError(' Data Load Error')});
  }


  async onRowClick(row:any)
  {
    this.user_id = row.id;
    this.show = true
    this.user_name = row.name
    this.user_edit.controls['name'].setValue(row.name);
    this.id = row.id
    await  this.api.get('menu_list.php?user_type='+row.id+'&authToken='+environment.authToken).then((data: any) =>
        {

          this.menu_data_list = data[0]
          this.list_menu = data[0].menu
          this.compareAndUpdateMenuData(this.menu_data, this.list_menu);

        }).catch(error => { this.toastService.typeError(' Data Load Error')});
        this.cdr.detectChanges();
  }

  compareAndUpdateMenuData(storedMenu: any[], fetchedMenu: any[]) {
    storedMenu.forEach((item: any) => {
      const fetchedItem = fetchedMenu.find((i: any) => i.menuValue === item.menuValue);
      if (fetchedItem) {
        item.can_view = fetchedItem.can_view;
        item.can_edit = fetchedItem.can_edit;
        item.can_delete = fetchedItem.can_delete;
        item.status = fetchedItem.status;

        // Update submenus if they exist
        if (item.sub_menu && fetchedItem.sub_menu) {
          item.sub_menu.forEach((subItem: any) => {
            const fetchedSubItem = fetchedItem.sub_menu.find((sub: any) => sub.tittle === subItem.tittle);
            if (fetchedSubItem) {
              subItem.can_view = fetchedSubItem.can_view;
              subItem.can_edit = fetchedSubItem.can_edit;
              subItem.can_delete = fetchedSubItem.can_delete;
              subItem.status = fetchedSubItem.status;
            }
          });
        }
      }
    });

    this.menu = storedMenu;
  }

  onActivate_user(row : any)
  {
      this.status_change_id = row.id;
      this.select_menu = row;
      this.load_menu();
  }

  edit_user(row:any)
  {
    this.user_id = row.id;
    this.user_edit.controls['name'].setValue(row.name);
    const modalElement = this.Edit_menu.nativeElement;
    $(modalElement).modal('show');
  }

  load_menu()
    {
        this.api.get('get_data.php?table=main_menu&find=type&value='+ this.status_change_id+'&asign_field=sequence&asign_value=ASC&authToken='+environment.authToken).then((data: any) =>
        {
            this.menu_list = data;
            this.list_view = true;
            this.menubar_view = false;

      }).catch(error => {this.toastService.typeError('Something went wrong ');});
    }

  submit_user(value:any)
  {
        Object.keys(this.new_user.controls).forEach(field => {
          this.new_user.get(field)?.markAsTouched({ onlySelf: true });
        });

        value.menu = this.menu_data

            if(this.new_user.valid)
            {
              this.api.get('get_data.php?table=user_type&authToken='+environment.authToken).then((data: any) =>
              {
                let Data = data;
                this.find_name = Data.find((t: { name: any; })=>t.name == value.name);
                if(this.find_name == undefined)
                {
                  this.loading=true;
                    this.api.post('mp_user_creation.php?&authToken=' + environment.authToken, value).then((data: any) => {

                      if (data.status == "success")
                      {
                        this.loading = false;
                        this.toastService.typeSuccess('User Type Added Succesfully');
                        this.get_tabledata()
                        const modalElement = this.add_menu.nativeElement;
                      $(modalElement).modal('hide');
                        this.new_user.controls['name'].setValue('');
                      }
                      }).catch(error => {this.toastService.typeError('Something went wrong ');
                      this.loading = false;});
                }
                else{
                  this.toastService.typeError('User Type is already Exists');
                }
              }).catch(error => {this.toastService.typeError('Something went wrong ');});
            }
            else{
              this.toastService.typeError('Fill the Details');
            }
  }

  submit_useredit(value:any)
    {
          this.loading=true;
          this.api.post('post_update_data.php?table=user_type&field=id&value=' + this.user_id + '&authToken=' + environment.authToken, value).then((data: any) => {
            if (data.status == "success")
            {
              this.loading=false;
              this.toastService.typeSuccess('User Type Updated Succesfully');
              this.user_edit.reset()
              this.get_tabledata()
              const modalElement = this.Edit_menu.nativeElement;
              $(modalElement).modal('hide');
            }
            else { this.toastService.typeError(data.status);
                  this.loading=false; }

          }).catch(error => { this.toastService.typeError('User Type Updated Failed!!');
                        this.loading=false;});
    }


  public searchData(value: any): void {
          this.dataSource.filter = value.trim().toLowerCase();
          this.totalData = this.dataSource.filteredData.length;
          this.callData()
  }

  async callData()
  {
          this.list = [];
          await this.dataSource.filteredData.map((res: Menu_settingModels, index: number) =>
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

  update()
  {
          this.user_edit.value.menu = this.menu
          this.user_edit.value.name = this.user_name

          this.loading=true;
          this.api.post('mp_user_update.php?value=' + this.user_id + '&authToken=' + environment.authToken, this.user_edit.value).then((data: any) => {
            if (data.status == "success")
            {
              this.loading=false;
              this.toastService.typeSuccess('User Type Updated Succesfully');
              this.user_edit.reset()
              this.get_tabledata()
              this.show = false ;
            }
            else { this.toastService.typeError(data.status);
                  this.loading=false; }

          }).catch(error => { this.toastService.typeError('User Type Updated Failed!!');
                            this.loading=false;});
  }

  cancel()
  {
          this.show = false
  }

}
