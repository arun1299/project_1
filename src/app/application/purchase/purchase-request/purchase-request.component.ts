
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, ElementRef, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService, routes } from 'src/app/core/core.index';
import { pageSelection, } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { TableElement, TableExportUtil } from 'src/app/shared';
import { purchaseRequest } from './purchase-request.models';
import { Router } from '@angular/router';
declare let $: any;


@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent  {

  public uid                = localStorage.getItem('uid');
  public user_type          = localStorage.getItem('type');
  public user_bank_id       = localStorage.getItem('bank_id');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public Toggledata  = false;
  public      show   = false;
  public searchDataValue =''
  public routes = routes;
  loading       = false;
  transactions  :Array<purchaseRequest> =[];
  po_list       :Array<purchaseRequest> =[];
  dataSource   !: MatTableDataSource<purchaseRequest>;
  po            : any;
  SelectCategory: any;
  type          : any;
  ItemList      : any;
  public formShow  = true;
  select           = false;
  vendor_id    : any;
  company_name : any;
  notes        : any;
  terms_condition : any;
  stateCode     : any;
  payment_terms : any;
  po_no         : any;
  taxempty      : any;
  vendorDetails            : any
  GST_Length               : any;
  tax_list                 : any;
  GST_Data                 : any;
  price                    : any;
  quantity                 : any;
  inv_id                   : any;
  dcNumber                 : any;

  customer_id              : any;
  customer_bill_address    : any;
  customer_ship_address    : any;

  bill_attention           : any;
  bill_address_line_1      : any;
  bill_address_line_2      : any;
  bill_city                : any;
  bill_state               : any;
  bill_zip_code            : any;
  bill_phone               : any;
  ship_attention           : any;
  ship_city                : any;
  ship_state               : any;
  ship_zip_code            : any;
  ship_phone               : any;

  state_code               : any;
  dc_id                    : any;
  subtotal                 : any;
  billAttention            : any;
  billAddress_line_1       : any;
  billAddress_line_2       : any;
  billCity                 : any;
  billState                : any;
  billZipcode              : any;
  shipAttention            : any;
  shipAddress_line_1       : any;
  shipAddress_line_2       : any;
  shipCity                 : any;
  shipState                : any;
  shipZipcode              : any;
  poDate                   : any;
  followingDay             : any;
  dueValues                : any;
  fullDate                 : any;
  bill_addr                : any;
  billFrom                 : any;
  shipp_addr               : any;
  shipFrom                 : any;
  amount                   : any;
  taxes                    : any;
  descriptions             : any;
  uom                      : any;
  tds_percent              : any;
  tcs_percent              : any;
  total_tax                : any;

  public isDropdownAppendedToBody : boolean = true;
  updateAddress          !: FormGroup;
  newAddress             !: FormGroup;
  state_list             : any;
  editAddressId          : any;
  alldata                : any;
  alldata1               : any;
  @ViewChild("new_address", { static: true }) new_address!: ElementRef;
  @ViewChild("edit_address", { static: true }) edit_address!: ElementRef;
  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder, public router:Router)
  {
    this.router    = router;


    this.po = fb.group(
      {
        created_by : [this.uid],
        vendorId   : ['', Validators.compose([Validators.required])],
        billFrom   : [null],
        shipFrom   : [null],
        poNo       : [null, Validators.compose([Validators.required])],
        reference_number: [null],
        billDate  : [(new Date()).toISOString().substring(0, 10)],
        paymentTerms: ['', Validators.compose([Validators.required])],
        dueDate    : [(new Date()).toISOString().substring(0, 10)],
        subTotal   : [0],
        shippingCharge: [0],
        TCS        : [0],
        TDS        : [0],
        roundOff   : [0],
        notes      : [null, Validators.compose([Validators.required])],
        terms_condition: [null, Validators.compose([Validators.required])],
        status     : [1],
        total      : [0],
        product    : this.fb.array([]),
        tax_type   :[null],
        tds_percentage :[0],
        tcs_percentage :[0],
      })
      this.updateAddress = fb.group(
        {
          name        : ['', Validators.compose([Validators.required])],
          addressline1: ['', Validators.compose([Validators.required])],
          addressline2: ['', Validators.compose([Validators.required])],
          city        : ['', Validators.compose([Validators.required])],
          state       : ['', Validators.compose([Validators.required])],
          type        : ['', Validators.compose([Validators.required])],
          zipcode     : ['',Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
          mobile      : ['',Validators.compose([Validators.required])],
          status      : ['', Validators.compose([Validators.required])],
        })


        this.newAddress = fb.group(
          {
            created_by  : [this.uid],
            vendor_id   : ['', Validators.compose([Validators.required])],
            name        : ['', Validators.compose([Validators.required])],
            addressline1: ['', Validators.compose([Validators.required])],
            addressline2: ['', Validators.compose([Validators.required])],
            city        : ['', Validators.compose([Validators.required])],
            state       : ['', Validators.compose([Validators.required])],
            type        : ['', Validators.compose([Validators.required])],
            zipcode     : ['',Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
            mobile      : ['',Validators.compose([Validators.required])],
            status      : [1, Validators.compose([Validators.required])],
          })
  }

  ngOnInit(): void {
     this.load_paymentTransaction();
     this.LoadVendorDetails();
 }

 async LoadVendorDetails()
  {
    await this.api.get('get_data.php?table=vendor&authToken=' + environment.authToken).then((data: any) =>
    {
      this.vendorDetails = data;
    }).catch(error => { this.toastService.typeError('Something went wrong in LoadVendorDetails'); });

    await this.api.get('get_data.php?table=item&authToken=' + environment.authToken).then((data: any) =>
      {
        this.ItemList = data;
      }).catch(error => { this.toastService.typeError('Something went wrong in LoadVendorDetails'); });
  }
 async load_paymentTransaction()
  {
    this.serialNumberArray     = [];
    this.pageNumberArray       = [];
    this.po_list   = [];
    await this.api.get('get_data.php?table=purchase_request&find=status&value=1&authToken='+environment.authToken).then((data: any) =>
    {
       this.api.get('get_data.php?table=item&authToken='+environment.authToken).then((data_item: any) =>
        {
            if(data != null)
            {
              for(let i=0;i<data.length;i++)
              {
                var item_name = data_item.find((t: { item_id: any; })=>t.item_id == data[i]['item_id']);
                data[i]['item_name'] = item_name['name'];
              }
            }
        }).catch(error => {this.toastService.typeError('Something went wrong');});
      this.transactions = data;
      this.totalData    =data.length
      data.map((res: purchaseRequest, index: number) => {
        const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       res.id_no = serialNumber;
       this.po_list.push(res);
       this.serialNumberArray.push(serialNumber);
       this.calculateTotalPages(this.totalData, this.pageSize);
       this.dataSource = new MatTableDataSource<purchaseRequest>(this.po_list);

       }

  });
    }).catch(error => { this.toastService.typeError('Payment Data Load Error')});
  }

  selected: any[] = [];

 onRowClick(row: any) {

  const id: any = row;
  const rowIndex = this.selected.indexOf(id);
  if (rowIndex === -1) {
    this.selected.push(id);
  } else {
    this.selected.splice(rowIndex, 1);
  }
}


  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.po_list = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.po_list.slice();
    if (!sort.active || sort.direction === '') {
      this.po_list = data;
    } else {
      this.po_list = data.sort((a, b) => {
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
      this.load_paymentTransaction();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.load_paymentTransaction();
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
    this.load_paymentTransaction();
  }

  public PageSize(value:any): void {
    this.pageSize = parseInt (value)
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.load_paymentTransaction();
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

  addpo()
  {

      let value = this.selected;
      console.log(this.selected)
    if(value.length != 0)
    {
      this.select = true;
    }
    else{
      this.toastService.typeWarning('No Selected Data');
    }
  }

  open() {
    this.Toggledata = !this.Toggledata;
  }

  setzero()
  {
    this.show = false;
    this.load_paymentTransaction();
  }

  exportExcel()
  {
    const exportData: Partial<TableElement>[] =
    this.dataSource.filteredData.map((x) => ({
        "#"               : x.id_no,
        "Type"            : x.type,
        "Item Name"       : x.item_name,
        "Quntity"         : x.qty,
    }));

   TableExportUtil.exportToExcel(exportData, 'Purchase Order List');

  }



  async VendorSelection(id : any)
  {
    this.isDropdownAppendedToBody = false;
    this.formShow = false;
    this.vendor_id = id;

    const today = new Date();
    let date = today.toISOString().split('T')[0];
    this.po.reset();
    this.po.controls['vendorId'].setValue(id);
    this.po.controls['created_by'].setValue(this.uid);
    this.po.controls['billDate'].setValue(date);
    this.po.controls['subTotal'].setValue(0);
    this.po.controls['shippingCharge'].setValue(0);
    this.po.controls['TCS'].setValue(0);
    this.po.controls['TDS'].setValue(0);
    this.po.controls['roundOff'].setValue(0);
    this.po.controls['tax_type'].setValue(null);
    this.po.controls['status'].setValue(1);
    this.po.controls['tds_percentage'].setValue(0);
    this.po.controls['tcs_percentage'].setValue(0);
    this.tds_percent = 0;
    this.tcs_percent = 0;
    const formArray         = this.po.get('product') as FormArray;
    const formArrayLength   = formArray.length;
    const formArrayControls = formArray.controls;
    for (let i = formArrayControls.length-1; i >= 1; i--)
    {
      const control = formArrayControls[i];
      formArray.removeAt(i);
    }

    this.formShow = false;
    this.vendor_id = id;
    await this.api.get('mp_po.php?&value=' + this.vendor_id + '&authToken=' + environment.authToken).then((data: any) =>
      {
        this.FetchAddress(data[0]);

        this.company_name    = data[0].company_name;
        this.notes           = data[0].notes;
        this.terms_condition = data[0].terms_condition;

        this.stateCode       = data[0].place_from_supply_code;
        this.payment_terms   = data[0].payment_terms;

        let MyPaymentTerm    = data[0].my_payment_terms;
        let po_id            = data[0].serial_no + 1;
        var po_prifix        = data[0].prefix ;
        this.po_no           = po_prifix + po_id;
        this.taxempty        = data[0].tax_mode;

        this.po.controls['paymentTerms'].setValue(MyPaymentTerm)
        const today = new Date();
        let date = today.toISOString().split('T')[0];

        this.dueDates(MyPaymentTerm, date);

        if(this.stateCode == 33)
        {
          this.LoadGST('GST');
          this.po.controls['tax_type'].setValue("GST");
        }
        else
        {
          this.LoadGST('IGST');
          this.po.controls['tax_type'].setValue("IGST");
        }
      }).catch(error => { this.toastService.typeError('Something went wrong'); });
      this.vendor_address(this.vendor_id)
  }


  async LoadGST(mode:any)
  {
    await this.api.get('get_data.php?table=tax&find=type&value=' + mode + '&authToken=' + environment.authToken).then((data: any) =>
    {
      this.GST_Data   = data;
      this.tax_list   = data;
      this.GST_Length = data.length;
    }).catch(error => { this.toastService.typeError('Something went wrong'); });

    for(let m = 0; m < this.GST_Length; m++)
      {
        this.GST_Data[m]['amount'] = 0;
      }

      this.loaditem_list();
  }

  edit_initProduct()
  {
    let product = this.po.get('product') as FormArray;
    product.push(this.fb.group({
      type        :"new",
      id          : new FormControl(''),
      items       : new FormControl('', Validators.required),
      descriptions: new FormControl(''),
      taxes       : new FormControl('', Validators.required),
      price       : new FormControl('', Validators.required),
      quantity    : new FormControl('', Validators.required),
      amount      : new FormControl('', Validators.required),
      uom         : new FormControl('', Validators.required)
    }))
  }

  onDeleteRow(rowIndex: number)
  {
    let product = this.po.get('product') as FormArray;
    if (product.length > 1) {
      product.removeAt(rowIndex)
    } else {
      product.reset()
    }

  }
  get product(): FormArray {
    return this.po.get('product') as FormArray;
  }



  Billdate(a: any)
  {
    this.dueDateChange();
    this.poDate  = a;
    var current       = new Date(this.poDate);
    this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
    this.fullDate     = this.followingDay.toISOString().substring(0, 10);
  }

  dueDates(s: any, BillDate: any)
  {

    if(s != 0)
    {}
    else{
      this.toastService.typeWarning('Date was not selected ')
    }
      this.dueValues    = s;
      var current       = new Date(this.poDate || BillDate);
      this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
      this.fullDate     = this.followingDay.toISOString().substring(0, 10)
  }

  dueDateChange()
  {
    this.po.controls["paymentTerms"].setValue(this.payment_terms);
  }

  async FetchAddress(data:any)
  {
    for (let i = 0; i < data.bill_address.length; i++)
    {

        if (data.bill_address[i].set_as_default === 1 && data.bill_address[i].type === 1 && data.bill_address[i].status === 1 ) {

          this.bill_addr          = data.bill_address[i];
          this.billFrom           = this.bill_addr.vendor_addr_id;
          this.billAttention      = this.bill_addr.attention;
          this.billAddress_line_1 = this.bill_addr.address_line_1;
          this.billAddress_line_2 = this.bill_addr.address_line_2;
          this.billCity           = this.bill_addr.city;
          this.billState          = this.bill_addr.state;
          this.billZipcode        = this.bill_addr.zip_code;
          this.po.controls['billFrom'].setValue(this.billFrom);

        }

      if (data.ship_address[i].set_as_default === 1 && data.ship_address[i].type === 2 && data.ship_address[i].status === 1 ) {

        this.shipp_addr         = data.ship_address[i];
        this.shipFrom           = this.shipp_addr.vendor_addr_id;
        this.shipAttention      = this.shipp_addr.attention;
        this.shipAddress_line_1 = this.shipp_addr.address_line_1;
        this.shipAddress_line_2 = this.shipp_addr.address_line_2;
        this.shipCity           = this.shipp_addr.city;
        this.shipState          = this.shipp_addr.state;
        this.shipZipcode        = this.shipp_addr.zip_code;
       this.po.controls['shipFrom'].setValue(this.shipFrom);

      }
    }
  }

  async edit_specItem(item: any,j: any)
  {
   await this.api.get('get_data.php?table=item&find=item_id&value=' + item + '&authToken=' + environment.authToken).then((data: any) => {

    if(this.taxempty == 1)
       {
        this.taxes        = data[0].tax_percent;
       }
       if(this.taxempty == 0)
       {
        this.taxes        = 0;
       }

     this.price     = data[0].price;
     this.quantity  = 1;
     this.amount    = data[0].price;
     this.descriptions = data[0].description;
     this.uom       = data[0].uom;
   }).catch(error => { this.toastService.typeError('Something went wrong'); });
   const formData = {
     taxes: item,
   }

   this.edit_patchValues(item,j);
   this.edit_SubTotalChange(j);
   this.edit_GSTCalculation(j);
  }

 async edit_patchValues(id: any,j: any)
  {

    let y = (<FormArray>this.po.controls['product']).at(j);
    y.patchValue({

      taxes        : this.taxes,
      price        : this.price,
      quantity     : this.quantity,
      amount       : this.amount,
      descriptions : this.descriptions,
      uom          : this.uom
    });
  }

  edit_priceChange(qty: any, price: any, j: any)
  {
    this.amount = Number(qty * price).toFixed(2);
    let y       = (<FormArray>this.po.controls['product']).at(j);
    y.patchValue({
      amount : this.amount
    })
    this.edit_SubTotalChange(j);
  }

 edit_qty(qty: any, price: any, j: any)
  {
    this.amount = Number(qty * price).toFixed(2);
    let y       = (<FormArray>this.po.controls['product']).at(j);
    y.patchValue({
      amount : this.amount
    })
    this.edit_SubTotalChange(j);
  }

  edit_GSTCalculation(i: any)
  {
    this.GST_Data.forEach((data: { amount: number; }) => {
      data.amount = 0;
    });
    this.total_tax = 0
    let products = (<FormArray>this.po.controls['product']).value;
    products.forEach((product: { amount: number; taxes: number; }) => {
      let taxValue = (product.amount / 100) * product.taxes;
      let taxAmount = parseFloat(taxValue.toFixed(2));
      this.total_tax = (product.amount / 100) * product.taxes;
      this.GST_Data.forEach((data: { rate: any; amount: number; }) => {
        if (data.rate === product.taxes)
        {
          data.amount += taxAmount;
          data.amount = parseFloat(data.amount.toFixed(2));
        }
      });
    });
    this.edit_FinalTotalCalculation();
  }

 edit_SubTotalChange(j: any)
  {
    let edit_arr = this.po.controls['product'].value;
    let sum1: number = edit_arr.map((a: { amount: string; }) => parseFloat(a.amount)).reduce(function(a: any, b: any) {
      return a + b;
    });
    if(Number.isNaN(sum1))
    {
      this.subtotal = 0;
      this.po.controls['subTotal'].setValue(0);

    }
    else{
      this.subtotal = sum1;
      this.po.controls['subTotal'].setValue((sum1).toFixed(2));
    }

    // if (typeof sum1 === 'number') {
    //   let sum1value =Number(sum1).toFixed(2);
    //  this.po.controls['subTotal'].setValue(sum1value);
    //  console.log(sum1value); // Output: 10.35
    // } else {
    //   console.log('sum1 is not a valid number');
    // }
    this.edit_GSTCalculation(j);
    this.edit_FinalTotalCalculation();
    this.tdsCalculation();
    this.tcsCalculation();
  }


  tdsCalculation()
  {
     var tds =  ((this.subtotal+this.total_tax)*(this.tds_percent/100)).toFixed(2);

      this.po.controls['TDS'].setValue(tds);
      this.edit_FinalTotalCalculation();

  }

  tcsCalculation()
  {
    let tcs =  ((this.subtotal+this.total_tax)*(this.tcs_percent/100)).toFixed(2);

        this.po.controls['TCS'].setValue(tcs);
        this.edit_FinalTotalCalculation();
  }

  edit_FinalTotalCalculation()
  {
    let editSub_Total       = this.po.controls['subTotal'].value;
    let editTDS_Value       = this.po.controls['TDS'].value;
    let editTCS_Vale        = this.po.controls['TCS'].value;
    let editShipping_Value  = this.po.controls['shippingCharge'].value;
    let editRoundof_Value   = this.po.controls['roundOff'].value;

    let editTotalGST: number = this.GST_Data.map((a: { amount: string; }) => parseFloat (a.amount)).reduce(function(a: any, b: any)
    {
      return a + b;
    });
    let editTotal_Calculation =  (Number(editSub_Total) - Number(editTDS_Value) + Number(editTCS_Vale) + Number(editShipping_Value) + Number(editRoundof_Value)+ Number(editTotalGST)).toFixed(2);
    this.po.controls['total'].setValue(editTotal_Calculation);
  }


  async onSubmit(bill_data : any)
  {
    Object.keys(this.po.controls).forEach(field => {
      const control = this.po.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.po.valid)
    {
      const billNoValue = this.po_no;
      let value = this.po_list.find(item => item.po_number === billNoValue);
         if(value != undefined)
         {
          this.toastService.typeError('PO number has already been entered')
         }
        if(value == undefined)
         {
            this.loading = true;
            await this.api.post('mp_po_create.php?type=pr&authToken=' + environment.authToken, bill_data).then((data: any) =>
            {

              if (data.status == "success")
              {
                this.toastService.typeSuccess('PO Added Succesfully');
                this.loading = false

                this.load_paymentTransaction()
                this.select = false;
                this.selected = []
              }
              else { this.toastService.typeError('Something went wrong');
              this.loading = false; }
              return true;
            }).catch(error =>
              {
              this.toastService.typeError('Something went wrong');
              this.loading = false;
            });
          }
    }
    else {
      this.toastService.typeError('Please Fill All Details');
    }
  }

  add_po = false;
  item_tax_data : any;

  ReturnToList()
  {
    this.select = false
    this.isDropdownAppendedToBody = true;
    this.add_po= false;
    this.po.reset();
    this.po.controls['created_by'].setValue(this.uid);
    this.po.controls['subTotal'].setValue(0);
    this.po.controls['shippingCharge'].setValue(0);
    this.po.controls['TCS'].setValue(0);
    this.po.controls['TDS'].setValue(0);
    this.po.controls['roundOff'].setValue(0);
    this.po.controls['total'].setValue(0);
    this.po.controls['status'].setValue(1);
    this.po.controls['tds_percentage'].setValue(0);
    this.po.controls['tcs_percentage'].setValue(0);

    this.bill_addr          = null;
    this.billFrom           = null;
    this.billAttention      = null;
    this.billAddress_line_1 = null;
    this.billAddress_line_2 = null;
    this.billCity           = null;
    this.billState          = null;
    this.billZipcode        = null;

    this.shipp_addr         = null;
    this.shipFrom           = null;
    this.shipAttention      = null;
    this.shipAddress_line_1 = null;
    this.shipAddress_line_2 = null;
    this.shipCity           = null;
    this.shipState          = null;
    this.shipZipcode        = null;
    this.formShow = true;
    this.loading  = false;
    const formArray         = this.po.get('product') as FormArray;
    const formArrayLength   = formArray.length;
    const formArrayControls = formArray.controls;
    for (let i = formArrayControls.length-1; i >= 1; i--)
    {
      const control = formArrayControls[i];
      formArray.removeAt(i);
    }
  }



  async loaditem_list()
  {
    await this.api.get('get_data.php?table=item&authToken=' + environment.authToken).then((data: any) =>
    {
       this.item_tax_data = data;
    }).catch(error => { this.toastService.typeError('Something went wrong'); });

    let value = this.selected;

    if( this.item_tax_data != null)
    {
      for(let i=0;i< value.length;i++)
      {
        var item_name = this.item_tax_data.find((t: { item_id: any; })=>t.item_id == value[i].item_id);

        if(this.taxempty == 1)
        {
        value[i]['tax_percent'] = item_name['tax_percent'];
        }
        if(this.taxempty == 0)
        {
        value[i]['tax_percent'] = 0;
        }
        value[i]['uom']         = item_name['uom'];
        value[i]['price']       = item_name['price'];
        value[i]['amount']      = item_name['price']*value[i].qty;
      }
    }

    const product1 = this.po.get('product') as FormArray;
    product1.clear();
    value.forEach((item : any,j : any) => {
      product1.push(this.fb.group({
        id          : [item.id],
        item_name   : [item.item_name],
        items       : [item.item_id],
        descriptions: [item.description],
        taxes       : [item.tax_percent],
        price       : [item.price],
        quantity    : [item.qty],
        amount      : [item.amount],
        uom         : [item.uom],
      }));
      this.LoadpaymentTerms();
      let qty   = item.qty;
      let price = item.price;

      this.priceChange(qty, price, j);
  })
}

async LoadpaymentTerms()
{
  await this.api.get('get_data.php?table=payment_terms&authToken=' + environment.authToken).then((data: any) => {

    this.payment_terms=data;
  }).catch(error => { this.toastService.typeError('Something went wrong'); });
}

priceChange(qty:any, price:any, i:any)
  {
      this.amount = (qty *price).toFixed(2);
    let x = (<FormArray>this.po.controls['product']).at(i);
    x.patchValue({
      amount : this.amount
    });
    this.edit_SubTotalChange(i);
  }

  async submit(updateAddress : any)
  {
      let id = this.editAddressId;
      this.loading = true;
      this.api.post('post_update_data.php?table=vendor_address&field=vendor_addr_id&value=' + id + '&authToken=' + environment.authToken, updateAddress).then((data_rt: any) => {
        if (data_rt.status == "success")
         {
          this.loading = false;
          this.toastService.typeSuccess('Address Updated Succesfully');
          this.vendor_address(this.vendor_id)
                  this.api.get('get_data.php?table=vendor_address&find=vendor_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {

                  if(data[0]['type'] == 1)
                    {
                      this.bill_addr = data[0];
                      this.billFrom = this.bill_addr.cust_addr_id;
                      this.billAttention = this.bill_addr.attention;
                      this.billAddress_line_1 = this.bill_addr.address_line_1;
                      this.billAddress_line_2 = this.bill_addr.address_line_2;
                      this.billCity = this.bill_addr.city;
                      this.billState = this.bill_addr.state;
                      this.billZipcode = this.bill_addr.zip_code;
                      this.po.controls['billFrom'].setValue(this.billFrom);
                    }

                    if(data[0]['type'] == 2)
                      {
                        this.shipp_addr = data[0];
                        this.shipFrom = this.shipp_addr.cust_addr_id;
                        this.shipAttention = this.shipp_addr.attention;
                        this.shipAddress_line_1 = this.shipp_addr.address_line_1;
                        this.shipAddress_line_2 = this.shipp_addr.address_line_2;
                        this.shipCity = this.shipp_addr.city;
                        this.shipState = this.shipp_addr.state;
                        this.shipZipcode = this.shipp_addr.zip_code;
                        this.po.controls['shipFrom'].setValue(this.shipFrom);
                      }

                  }).catch(error => { this.toastService.typeError('Something went wrong'); });
          const modalElement = this.edit_address.nativeElement;
          $(modalElement).modal('hide');
        }
        else { this.toastService.typeError(data_rt.status); }
      }).catch(error => { this.toastService.typeError('Vendor Address Update Failed!!');
      this.loading = false; });
    }


    new_submit(value:any)
    {
       this.newAddress.controls['vendor_id'].setValue(this.vendor_id);
        Object.keys(this.newAddress.controls).forEach(field => {
          this.newAddress.get(field)?.markAsTouched({ onlySelf: true });
        });
        if(this.newAddress.valid)
        {
          this.loading=true;
          this.api.post('post_insert_data.php?table=vendor_address&authToken=' + environment.authToken, this.newAddress.value).then((data_rt: any) => {

            if (data_rt.status == "success")
            {
              this.loading=false;
              this.vendor_address(this.vendor_id)
              this.toastService.typeSuccess('Vendor Address Added Succesfully');
              this.newAddress.reset();

              const modalElement = this.new_address.nativeElement;
              $(modalElement).modal('hide');
            }
            else { this.toastService.typeError(data_rt.status);
                this.loading=false;}

          }).catch(error => { this.toastService.typeError('Vendor Address Added Failed!!');
              this.loading=false; });
        }
        else{
          this.toastService.typeError('Please Fill the Details!');
        }
    }

    vendor_address(id: any)
    {

      this.api.get('get_data.php?table=vendor_address&find=vendor_id&value=' + id + '&find1=type&value1=1&authToken=' + environment.authToken).then((data: any) => {
          this.alldata = data;
      }).catch(error => { this.toastService.typeError('Something went wrong'); });

       this.api.get('get_data.php?table=vendor_address&find=vendor_id&value=' + id + '&find1=type&value1=2&authToken=' + environment.authToken).then((data: any) => {
         this.alldata1 = data;
       }).catch(error => { this.toastService.typeError('Something went wrong'); });

       this.stateList();
    }

    ReloadBillAddr(event: any)
    {

         this.editAddressId = event.vendor_addr_id

       this.api.get('get_data.php?table=vendor_address&find=vendor_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {
        this.bill_addr = data[0];

        this.billFrom = this.bill_addr.vendor_addr_id;
        this.billAttention = this.bill_addr.attention;
        this.billAddress_line_1 = this.bill_addr.address_line_1;
        this.billAddress_line_2 = this.bill_addr.address_line_2;
        this.billCity = this.bill_addr.city;
        this.billState = this.bill_addr.state;
        this.billZipcode = this.bill_addr.zip_code;
        this.po.controls['billFrom'].setValue(this.billFrom);

      }).catch(error => { this.toastService.typeError('Something went wrong'); });

      this.updateAddress.controls['name'].setValue(this.bill_addr.attention);
      this.updateAddress.controls['addressline1'].setValue(this.bill_addr.address_line_1);
      this.updateAddress.controls['addressline2'].setValue(this.bill_addr.address_line_2);
      this.updateAddress.controls['city'].setValue(this.bill_addr.city);
      this.updateAddress.controls['state'].setValue(this.bill_addr.state);
      this.updateAddress.controls['zipcode'].setValue(this.bill_addr.zip_code);
      this.updateAddress.controls['mobile'].setValue(this.bill_addr.phone);
      this.updateAddress.controls['type'].setValue(this.bill_addr.type);
      this.updateAddress.controls['status'].setValue(this.bill_addr.set_as_default);
    }

    ReloadShippAddr(event: any) {

      this.editAddressId = event.vendor_addr_id

      this.api.get('get_data.php?table=vendor_address&find=vendor_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {
        this.shipp_addr = data[0];

        this.shipFrom = this.shipp_addr.vendor_addr_id;
        this.shipAttention = this.shipp_addr.attention;
        this.shipAddress_line_1 = this.shipp_addr.address_line_1;
        this.shipAddress_line_2 = this.shipp_addr.address_line_2;
        this.shipCity = this.shipp_addr.city;
        this.shipState = this.shipp_addr.state;
        this.shipZipcode = this.shipp_addr.zip_code;
        this.po.controls['shipFrom'].setValue(this.shipFrom);

      }).catch(error => { this.toastService.typeError('Something went wrong'); });

      this.updateAddress.controls['name'].setValue(this.shipp_addr.attention);
      this.updateAddress.controls['addressline1'].setValue(this.shipp_addr.address_line_1);
      this.updateAddress.controls['addressline2'].setValue(this.shipp_addr.address_line_2);
      this.updateAddress.controls['city'].setValue(this.shipp_addr.city);
      this.updateAddress.controls['state'].setValue(this.shipp_addr.state);
      this.updateAddress.controls['zipcode'].setValue(this.shipp_addr.zip_code);
      this.updateAddress.controls['mobile'].setValue(this.shipp_addr.phone);
      this.updateAddress.controls['type'].setValue(this.shipp_addr.type);
      this.updateAddress.controls['status'].setValue(this.shipp_addr.set_as_default);
    }

    stateList()
    {
      this.api.get('get_data.php?table=state_code&authToken=' + environment.authToken).then((data: any) => {

        this.state_list = data
      }).catch(error => { this.toastService.typeError('Something went wrong'); });
    }
}
