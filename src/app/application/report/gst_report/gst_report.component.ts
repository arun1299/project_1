/* eslint-disable no-empty */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { pageSelection } from 'src/app/shared/sharedIndex';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { gst_details, material_list } from './gst_report.models';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SelectionType } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-gst_report',
  templateUrl: './gst_report.component.html',
  styleUrls: ['./gst_report.component.scss']
})
export class Gst_reportComponent implements OnInit {

  selectionType: SelectionType = SelectionType.checkbox;
  date!: FormGroup;
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
  dataSource   !: MatTableDataSource<gst_details>;
  public totalPages   = 0;
  public Toggledata   = false;
  public      show    = false;
  public searchDataValue =''
  list           :Array<gst_details> =[];

  public lastIndex_1  = 0;
  public pageSize_1    = 10;
  public totalData_1   = 0;
  public skip_1        = 0;
  public limit_1   : number = this.pageSize;
  public pageIndex_1   = 0;
  public serialNumberArray_1 : Array<number> = [];
  public currentPage_1 = 1;
  public pageNumberArray_1 : Array<number> = [];
  public pageSelection_1 : Array<pageSelection> = [];
  dataSource_1   !: MatTableDataSource<material_list>;
  public totalPages_1  = 0;
  public Toggledata_1  = false;
  public      show_1   = false;
  public loading       = false;
  public searchDataValue_1 =''

   list_1            : Array<material_list> =[];
   gstlist           : any
   cgst_5            : any=0;
   cgst_12           : any=0;
   cgst_18           : any=0;
   cgst_28           : any=0;
   sgst_5            : any=0;
   sgst_12           : any=0;
   sgst_18           : any=0;
   sgst_28           : any=0;
   igst_5            : any=0;
   igst_12           : any=0;
   igst_18           : any=0;
   igst_28           : any=0;
   op_igst_5         : any=0;
   op_igst_12        : any=0;
   op_igst_18        : any=0;
   op_igst_28        : any=0;

   from_date         : any;
   to_date           : any;
   bill_id           : any;
   select_data       : any;
   tax_field         : any;
   feild_value       : any;
   check_box_value   : any;

   @ViewChild(DatatableComponent) table !: DatatableComponent;
   @ViewChild('headerCheckbox', { static: false }) headerCheckbox !: ElementRef;

 constructor(public fb: FormBuilder,public api :ApiService,public toastService : ToasterService)
 {
   this.date = fb.group({
     fromdate: [null,Validators.compose([Validators.required])],
     todate  : [null,Validators.compose([Validators.required])],
   });

 }

 ngOnInit() {
 }

 download(value:any)
 {
   this.from_date  = value.fromdate
   this.to_date    = value.todate
   this.get_tabledata();
 }
 async get_tabledata()
 {
   this.serialNumberArray     = [];
   this.pageNumberArray       = [];
   this.list   = [];

   this.cgst_5     = 0;
   this.cgst_12    = 0;
   this.cgst_18    = 0;
   this.cgst_28    = 0;
   this.sgst_5     = 0;
   this.sgst_12    = 0;
   this.sgst_18    = 0;
   this.sgst_28    = 0;
   this.igst_5     = 0;
   this.igst_12    = 0;
   this.igst_18    = 0;
   this.igst_28    = 0;
   this.op_igst_5  = 0;
   this.op_igst_12 = 0;
   this.op_igst_18 = 0;
   this.op_igst_28 = 0;
   this.loading = true;

   await this.api.post('mp_tax_report.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&type=bill_details&authToken=' + environment.authToken, null)
   .then((data: any[]) => {

         if (data != null)
          {

            let total_data = (data as any)['report'];
            for(let i=0;i<total_data.length;i++)
              {
                if(total_data[i]['Tax_percent'] == 5 && total_data[i]['Name'] =="CGST")
                {
                  this.cgst_5 = total_data[i]['Tax']*2
                }
                if(total_data[i]['Tax_percent'] == 12 && total_data[i]['Name'] =="CGST")
                {
                  this.cgst_12 = total_data[i]['Tax']*2
                }
                if(total_data[i]['Tax_percent'] == 18 && total_data[i]['Name'] =="CGST")
                {
                  this.cgst_18 = total_data[i]['Tax']*2
                }
                if(total_data[i]['Tax_percent'] == 28 && total_data[i]['Name'] =="CGST")
                {
                  this.cgst_28 = total_data[i]['Tax']*2
                }

                if(total_data[i]['Tax_percent'] == 5 && total_data[i]['Name'] =="IGST")
                {
                  this.igst_5 = total_data[i]['Tax']
                }
                if(total_data[i]['Tax_percent'] == 12 && total_data[i]['Name'] =="IGST")
                {
                  this.igst_12 = total_data[i]['Tax']
                }
                if(total_data[i]['Tax_percent'] == 18 && total_data[i]['Name'] =="IGST")
                {
                  this.igst_18 = total_data[i]['Tax']
                }
                if(total_data[i]['Tax_percent'] == 28 && total_data[i]['Name'] =="IGST")
                {
                  this.igst_28 = total_data[i]['Tax']
                }
              }

              let totalSales = 0;
              let totalBalance = 0;

              total_data.forEach((data: { Amount: any; Tax: any; }) => {

             totalBalance +=data.Amount;
             totalSales +=data.Tax;

           });

              totalSales     = parseFloat(totalSales.toFixed(2));
              totalBalance   = parseFloat(totalBalance.toFixed(2));

              const totalRow = {
                Name      : 'Total',
                Tax_percent: '',
                Tax: totalSales,
              };

              total_data.push(totalRow);
        }
    }).catch(error => { this.toastService.typeError(' Data Load Error')});


    this.api.post('mp_tax_report_new.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken, null).then((data: any[]) => {

      if (data != null)
        {
          let value : gst_details [] = []
          let tax_list     =  (data as any)['report'];
            this.totalData    = tax_list.length
            tax_list.map((res: gst_details, index: number) => {
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
       this.dataSource = new MatTableDataSource<gst_details>(value);
      }
    }).catch(error => { this.toastService.typeError(' Data Load Error 2')});

    this.api.post('mp_tax_report_type2.php?from_date=' + this.from_date + '&to_date=' + this.to_date + '&authToken=' + environment.authToken, null).then((data: any[]) => {

      if (data != null)
        {

          let tax_type2           =   (data as any)['report'];

          var totalSales = 0;
          for(let i=0;i<tax_type2.length;i++)
          {
            if(tax_type2[i]['Tax_percent'] == 5 && tax_type2[i]['Name'] =="CGST")
            {
              this.sgst_5 = tax_type2[i]['Tax']*2
            }
            if(tax_type2[i]['Tax_percent'] == 12 && tax_type2[i]['Name'] =="CGST")
            {
              this.sgst_12 = tax_type2[i]['Tax']*2
            }
            if(tax_type2[i]['Tax_percent'] == 18 && tax_type2[i]['Name'] =="CGST")
            {
              this.sgst_18 = tax_type2[i]['Tax']*2
            }
            if(tax_type2[i]['Tax_percent'] == 28 && tax_type2[i]['Name'] =="CGST")
            {
              this.sgst_28 = tax_type2[i]['Tax']*2
            }

            if(tax_type2[i]['Tax_percent'] == 5 && tax_type2[i]['Name'] =="IGST")
            {
              this.op_igst_5 = tax_type2[i]['Tax']
            }
            if(tax_type2[i]['Tax_percent'] == 12 && tax_type2[i]['Name'] =="IGST")
            {
              this.op_igst_12 = tax_type2[i]['Tax']
            }
            if(tax_type2[i]['Tax_percent'] == 18 && tax_type2[i]['Name'] =="IGST")
            {
              this.op_igst_18 = tax_type2[i]['Tax']
            }
            if(tax_type2[i]['Tax_percent'] == 28 && tax_type2[i]['Name'] =="IGST")
            {
              this.op_igst_28 = tax_type2[i]['Tax']
            }
          }

              tax_type2.forEach((data: { Tax: number; }) => {
              totalSales +=data.Tax;
            });
              totalSales =  parseFloat(totalSales.toFixed(2));
            const totalRow = {
              Name      : 'Total',
              Tax_percent: '',
              Tax: totalSales,
            };
            tax_type2.push(totalRow);
        }
        else{
          this.toastService.typeWarning('No Input Tax Data')
        }
        this.loading= false;
      })
      .catch(error => {
        this.loading= false;
        this.toastService.typeError('API Failed: report load');
      });
 }

 onRowClick(row:any)
 {

 }

 getTransaction(data : any)
  {
    this.serialNumberArray_1     = [];
    this.pageNumberArray_1       = [];
    this.list_1   = [];

         var field :any;
              if(data.Invoice_id != null)
              {
                 field ="invoice_id"
                var value = data.Invoice_id;
                this.tax_field = 'invoice_id';
                this.feild_value = data.Invoice_id;
              }
              if(data.Bill_id != null)
              {
                 field = "bill_id"
                var value = data.Bill_id;
                this.tax_field = 'bill_id';
                this.feild_value = data.Bill_id;
              }
             this.api.get('mp_tax_report_list.php?find='+field+'&value='+value+'&authToken='+environment.authToken).then((data: any) =>
            {

                if(data != null)
                {
                      let total_data = data ;
                      this.gstlist =  data
                      this.totalData_1    = total_data.length
                      total_data.map((res: material_list, index: number) => {
                      const serialNumber = index + 1;
                      if (index >= this.skip_1 && serialNumber <= this.limit_1) {
                      res.s_no = serialNumber;
                      this.list_1.push(res);
                      this.serialNumberArray_1.push(serialNumber);
                      this.calculateTotalPages_1(this.totalData_1, this.pageSize_1);
                      this.dataSource_1 = new MatTableDataSource<material_list>(this.list_1);
                      }
                    });
                }
                else
                    {

                      this.toastService.typeWarning('No Data');
                    }

                  }).catch(error => { this.toastService.typeError('Something went wrong');
          });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.totalData = this.dataSource.filteredData.length;
    this.callData()
  }

  async callData()
  {
    this.list = [];
    await this.dataSource.filteredData.map((res: gst_details, index: number) =>
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

 public PageSize(value:any): void {
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

 public searchData_1(value: any): void {
  this.dataSource_1.filter = value.trim().toLowerCase();
  this.list_1 = this.dataSource_1.filteredData;
}

public sortData_1(sort: Sort) {
  const data = this.list_1.slice();
  if (!sort.active || sort.direction === '') {
    this.list_1 = data;
  } else {
    this.list_1 = data.sort((a, b) => {
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
    this.getTransaction(this.select_data);
  } else if (event == 'previous') {
    this.currentPage_1--;
    this.pageIndex_1 = this.currentPage_1 - 1;
    this.limit_1 -= this.pageSize_1;
    this.skip_1 = this.pageSize_1 * this.pageIndex_1;
    this.getTransaction(this.select_data);
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
  this.getTransaction(this.select_data);
}

public PageSize_1(): void {
  this.pageSelection_1 = [];
  this.limit_1 = this.pageSize_1;
  this.skip_1 = 0;
  this.currentPage_1 = 1;
  this.getTransaction(this.select_data);
}

private calculateTotalPages_1(totalData: number, pageSize: number): void {
  this.pageNumberArray_1 = [];

  this.totalPages_1 = totalData / pageSize;
  if (this.totalPages_1 % 1 != 0) {
    this.totalPages_1 = Math.trunc(this.totalPages_1 + 1);
  }
  for (let i = 1; i <= this.totalPages_1; i++) {
    const limit = pageSize * i;
    const skip = limit - pageSize;
    this.pageNumberArray_1.push(i);
    this.pageSelection_1.push({ skip: skip, limit: limit });
  }
}

 exportExcel()
 {
          const exportData: Partial<TableElement>[] =
          this.dataSource.filteredData.map((x) => ({
              "#"               : x.s_no,
              "Date"            : x.Date,
              "Invoice No"      : x.Invoice_No,
              "Bill No"         : x.Bill_No,
              "Po No"           : x.Po_No,
              "CGST"            : x.cgst,
              "SGST"            : x.sgst,
              "IGST"            : x.igst,
              "payment_status"  : x.payment_status
           }));
         TableExportUtil.exportToExcel(exportData, 'Tax Report');
 }

 exportExcel_1()
 {
        //   const exportData: Partial<TableElement>[] =
        //   this.dataSource_1.filteredData.map((x) => ({
        //       "#"               : x.s_no,
        //       "Date"            : x.s_no,
        //       "Transaction"     : x.tran_date,
        //       "Details"         : x.tran_details,
        //       "Invoice Amount"  : x.amount,
        //       "Payments"        : x.payments,
        //       "Balance"         : x.balance,
        //       "Receive From"    : x.bank
        //   }));
        //  TableExportUtil.exportToExcel(exportData,  this.select_data.Customer_Name+ 'Report');
 }

 setzero()
 {
   this.show = false;
 }

 select()
 {

 }
 onCheckboxChange(item: any)
 {

 }
 selected         = [];
 onSelect_all(event : any)
   {
     // this.selected.splice(0, this.selected.length);

      // if (event && Array.isArray(event.selected)) {
      //     this.selected.push(...event.selected);
      //     event = null;
      // }
      // else {
      //    // console.error('Invalid event structure:', event);
      // }

      // this.cdr.detectChanges();

      // this.updateHeaderCheckboxState();
  }

  OnSelect(event : any)
  {
    if(event.type == "click")
      {
    // this.selected.push(...event.selected);
      }
  }

  inonActivate(row : any)
  {

     this.show = true
     this.bill_id = row.bill_id
     this.select_data = row
     this.getTransaction(row);
  }

  paid_update(row : any)
  {
    var field = null
    var id    = null
    if(row.Invoice_id != null)
      {
         field = "invoice_id";
         id    = row.Invoice_id
      }

    if(row.Bill_id != null)
        {
           field = "bill_id";
           id    = row.Bill_id
        }

    if(row.Po_id != null && row.Bill_id == null)
      {
          field = "po_id";
          id    = row.Po_id
      }

      if(row.Po_id != null && row.Bill_id != null)
        {
            field = "bill_id";
            id    = row.Bill_id
        }

     this.api.post('single_field_update.php?table=gst_ledger&field='+field+'&value='+id+'&up_field=status&update=2&authToken='+environment.authToken,null).then((data: any) =>
      {

        if(data.status == "success")
          {
            this.toastService.typeSuccess('Paid Successfully');
            this.loading = false;
            this.get_tabledata()
          }
          else { this.toastService.typeError('Something went wrong : paid');
              this.loading = false; }
            }).catch(error =>
            {
            this.toastService.typeError('API Faild : paid');
            this.loading = false;
            });
  }
}
