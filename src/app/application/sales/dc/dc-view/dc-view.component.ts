/* eslint-disable no-inner-declarations */
/* eslint-disable use-isnan */
/* eslint-disable no-empty */
/* eslint-disable no-empty-pattern */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../../../core/services/api/api.service";
import { environment } from "../../../../../environments/environment";
import { ToasterService } from 'src/app/core/core.index';
import {  DatatableComponent, SelectionType, id } from '@swimlane/ngx-datatable';
import { ImgToBase64Service } from "src/app/core/services/image/img-to-base64.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { paymentmade_list, user_account ,all_account, cash_account, company_account, gst_account} from './dc-view-models';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { __await } from 'tslib';
import { Observable, map, startWith } from 'rxjs';
import { Customer } from '../../customer/customer-models';
declare let $: any;

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).fonts = {

  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
}
};


@Component({
  selector: 'app-dc-view',
  templateUrl: './dc-view.component.html',
  styleUrls: ['./dc-view.component.scss']
})
export class DcViewComponent implements OnInit {
  select = false;
  search_box=true;
  myControl = new FormControl();
  filteredOptions  !: Observable<Customer[]>;
  customers: Customer[] = [];

  [x: string]           :any;
  selected              :any[] = [];
  paymentlist           :Array<paymentmade_list> =[];
  payment_tran_list     :Array<paymentmade_list> =[];

  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');
  public uid                = localStorage.getItem('uid');
  SelectionType     = SelectionType;

  dcPdf               : any;
  all_account         : Array<all_account>     = [];
  user_account        : Array<user_account>    = [];
  company_account     : Array<company_account> = [];
  cash_account        : Array<cash_account>    = [];
  gst_account         : Array<gst_account>     = [];
  dcItems             : any;

  show_new_bill             : boolean = false;
  loading                   : boolean = false;
  show                      : boolean = true;
  show_edit_btn             : boolean = false;
  show_dc_edit         : boolean = false;
  public formShow           : boolean = true;
  clone_dc_show        : boolean = false;
  payment_view              : boolean = true;
  amoumt_word               : any;
  openMd                    : any;
  fontFace                  : any;
  CustomerBillList          : any;
  public notes              : any;
  public terms_condition    : any;
  public bill_addr          : any;
  public billFrom           : any;
  public billAttention      : any;
  public billAddress_line_1 : any;
  public billAddress_line_2 : any;
  public billCity           : any;
  public billState          : any;
  public billZipcode        : any;
  public shipp_addr         : any;
  public shipFrom           : any;
  public shipAttention      : any;
  public shipAddress_line_1 : any;
  public shipAddress_line_2 : any;
  public shipCity           : any;
  public shipState          : any;
  public shipZipcode        : any;
  public taxes              : any;
  public i_valu             : any;

  balance                   : any;
  prefix                    : any;
  receipt_serial_no         : any;
  amount                    : any;
  descriptions              : any;
  dcDate               : any;
  followingDay              : any;
  day                       : any;
  month                     : any;
  year                      : any;
  fullDate                  : any;
  dueValues                 : any = 0;

  billToPdf                 : any;
  customerPdf               : any;
  branchPdf                 : any;
  dcPdfDetails         : any;
  img_path                  : any;
  company_pdf_logo          : any;
  company_mobile            : any;
  company_gst_no            : any;
  company_tan_no            : any;
  events                    : any;
  alldata1                  : any;

  price                     : any;
  quantity                  : any;
  inv_id                    : any;
  dcNumber                  : any;
  stateCode                 : any;
  vendor_id                 : any;
  customer_bill_address     : any;
  customer_ship_address     : any;
  payment_terms             : any;
  bill_attention            : any;
  bill_address_line_1       : any;
  bill_address_line_2       : any;
  bill_city                 : any;
  bill_state                : any;
  bill_zip_code             : any;
  bill_phone                : any;
  ship_attention            : any;
  ship_city                 : any;
  ship_state                : any;
  ship_zip_code             : any;
  ship_phone                : any;
  company_name              : any;
  state_code                : any;
  dc_id                     : any;

  customer_id               : any;
  ItemList                  : any;
  editGST_Data              : any;
  editGST_Length            : any;
  dc_item                   : any;
  dcitem_list               : any;
  selectdata                : any;
  dc_list                   : any;
  name                      : any;
  GST_Data                  : any;
  GST_Length                : any;
  edit_ItemList             : any;
  dc_type                   : any;
  dcCustDetails             : any;
  add_payment               : any;
  payment_transaction       : any;
  bankData                  : any;
  bankData_length           : any;
  inv_no                    : any;
  details                   : any;
  new_category_id           : any;
  alldata                   : any;
  dc_number                 : any;
  type_id                   : any;
  payment_term              : any;
  tds_percent               : any;
  tcs_percent               : any;
  tds_data                  : any;
  tcs_data                  : any;
  taxempty                  : any;
  uom                       : any;
  subtotal                  : any;
  item_DeleteId             : any;
  item_index                : any;
  state_list                : any;

  public router             !: Router;
  clone_dc                  !: FormGroup;
  Edit_dc                   !: FormGroup;
  dc_payment                !: FormGroup;
  e_way_bill                !: FormGroup;
  advance                   !: FormGroup;
  updateAddress             !: FormGroup;
  newAddress                !: FormGroup;
  imageToShow               !: string | ArrayBuffer|null;
  today                     = new Date();
  todaysDate                = '';

  imgUrl             = '../../../assets/img/logo/logo.png';

  public view_dc       = localStorage.getItem('view_bill');
  public user          = localStorage.getItem('type');
  public user_bank_id  = localStorage.getItem('bank_id');

  @ViewChild(DatatableComponent) table !: DatatableComponent;
  @ViewChild("addPayment", { static: true }) addPayment!: ElementRef;
  @ViewChild("ewayBill", { static: true }) ewayBill   !: ElementRef;
  @ViewChild("delete", { static: true }) delete   !: ElementRef;
  @ViewChild("delete_item", { static: true }) delete_item   !: ElementRef;
  @ViewChild("use_advancePayment", { static: true }) use_advancePayment !: ElementRef;
  @ViewChild("new_address", { static: true }) new_address!: ElementRef;
  @ViewChild("edit_address", { static: true }) edit_address!: ElementRef;

  constructor(private api: ApiService, public toastrService: ToasterService,private imgToBase64: ImgToBase64Service, public fb :FormBuilder)
  {

  this.Edit_dc = fb.group(
    {
      created_by: [this.uid],
      customerId: ['', Validators.compose([Validators.required])],
      billFrom  : [''],
      shipFrom  : [null],
      dcNo      : [null, Validators.compose([Validators.required])],
      reference_number: [null],
      billDate  : [(new Date()).toISOString().substring(0, 10)],
      paymentTerms: ['', Validators.compose([Validators.required])],
      dueDate   : [(new Date()).toISOString().substring(0, 10)],
      subTotal  : [0],
      shippingCharge: [0],
      TCS       : [0],
      TDS       : [0],
      tds_percentage:[0],
      tcs_percentage:[0],
      tax_type  :[null],
      roundOff  : [0],
      notes     : [null, Validators.compose([Validators.required])],
      terms_condition: [null, Validators.compose([Validators.required])],
      status    : [1],
      total     : [0],
      product   : this.fb.array([]),
      dc_id     : [null],
      inv_type  : [null]
    })

    this.clone_dc = fb.group(
      {
        created_by: [this.uid],
        customerId: ['', Validators.compose([Validators.required])],
        billFrom  : [],
        shipFrom  : [null],
        dcNo : [null, Validators.compose([Validators.required])],
        reference_number: [null],
        billDate  : [(new Date()).toISOString().substring(0, 10)],
        paymentTerms: ['', Validators.compose([Validators.required])],
        dueDate   : [(new Date()).toISOString().substring(0, 10)],
        subTotal  : [0],
        shippingCharge: [0],
        TCS       : [0],
        TDS       : [0],
        roundOff  : [0],
        notes     : [null, Validators.compose([Validators.required])],
        terms_condition: [null, Validators.compose([Validators.required])],
        status    : [1],
        total     : [0],
        product   : this.fb.array([]),
        dc_id: [null],
        inv_type  : [null],
        tds_percentage:[0],
        tcs_percentage:[0],
        tax_type  :[null],
      })

    {
      this.todaysDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530'); // hh:mm:ss a
    this.dc_payment =fb.group({
          'created_by': [this.uid],
          receipt_no  : [null],
          tran_mode   : [0, Validators.compose([Validators.required, Validators.min(1)])],
          from_bank   : [null, Validators.compose([Validators.required, Validators.min(1)])],
          to_bank     : [1, Validators.compose([Validators.required, Validators.min(1)])],
          amount      : [0],
          tran_date   : [this.todaysDate],
           reference   : [null, Validators.compose([Validators.required])],
          description : [null, Validators.compose([Validators.required, Validators.minLength(3)])]
        } )
      }

      this.e_way_bill = fb.group({
        bill_no :[null,Validators.compose([Validators.required])],
        vehicle_no:[null,Validators.compose([Validators.required])],
        shipment_mode:[null,Validators.compose([Validators.required])],
      })

      this.advance = fb.group({
        dc_amount:[null,Validators.compose([Validators.required])],
        advance_id    :[null,Validators.compose([Validators.required])],
        dc_id    :[null],
        description   :[null,Validators.compose([Validators.required])],
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
            customer_id : ['', Validators.compose([Validators.required])],
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

  ngOnInit()
  {
    this.loadonce();
    this.LoadCustomerBills();
    this.getImageFromService();
    this.loaddata();
  }

  async loaddata()
  {
    await this.api.get('get_data.php?table=customers&authToken=' + environment.authToken).then((data: any) =>
    {
          this.customers = data;
    }).catch(error => { this.toastrService.typeError('Something went wrong in LoadCustomerDetails'); });
  }

  ontextChange(event:Event)
  {
    const selectedValue = this.myControl.value;
    if(selectedValue.length == 0)
    {
      this.select = false;
      this.search_box = true
    }
  }

  onChange(data:any)
  {
    this.select = true;
    this.search_box = false
    const selectedValue = this.myControl.value;
    var name =this.customers.find((x: { company_name: any; }) => x.company_name === selectedValue);
    this.Edit_dc.controls['customerId'].setValue(name?.customer_id);
    //this.customer_details(name?.customer_id)
  }

  getImageFromService() {
    this.imgToBase64.imgToString(this.imgUrl).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    // eslint-disable-next-line prefer-const
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  async loadonce()
  {
    await this.api.get('mp_customer_dc_pdf.php?value=' + this.view_dc + '&authToken=' + environment.authToken).then((data: any) => {

      this.dc_id        = data[0].dc_id;
      this.dcPdf        = data;

      this.company_pdf_logo = this.dcPdf[0].company_details[0].logo;
      this.company_pdf_logo = environment.baseURL + "download_file.php?path=upload/company/" +  this.company_pdf_logo + "&authToken=" + environment.authToken

      this.dcItems       = this.dcPdf[0].invoiceItems;

      this.company_gst_no = this.dcPdf[0].gst_number;
      this.company_tan_no = this.dcPdf[0].tan_number;

      this.dcNumber      =  this.dcPdf[0].dc_number;
      this.taxempty      = this.dcPdf[0].tax_mode;
      this.stateCode     = data[0].place_from_supply_code;

      this.customer_address(data[0].customer_id);
      this.name = data[0].customer_name;
    }).catch(error => {
       this.toastrService.typeError('Something went wrong');
      });
  }

  async LoadCustomerBills()
  {
    await this.api.get('mp_customer_dc.php?&authToken=' + environment.authToken).then((data: any) =>
    {
      this.CustomerBillList = data;
      var selectedId  = this.view_dc;
      let selectedRow = this.CustomerBillList.find((item: { serial_no: any; }) => item.serial_no == selectedId);
      if (selectedRow)
      {
        this.selected = [selectedRow];
        this.dc_list=this.selected[0];

       // setTimeout(() => this.scrollToSelectedRow(selectedId), 500);
      }
    }).catch(error => { this.toastrService.typeError('Something went wrong in LoadCustomerdc'); });
  }

  private _filter(value: string): Customer[] {
    const filterValue = value.toLowerCase();
    return this.customers.filter((customer: Customer | null) => {
      if (customer && customer.company_name) {
        return customer.company_name.toLowerCase().includes(filterValue);
      }
      return false;
    });
  }

  scrollToSelectedRow(selectedId: any) {
    const uniqueId = `dc-row-${selectedId}`;
    const selectedRow = document.getElementById(uniqueId);
    if (selectedRow) {
      selectedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  onActivate(event:any)
  {
    if (event.type === "click")
    {
      this.dc_id   = event.row.dc_id;
      this.dc_list = event.row;
      this.name = event.row.customer_name;
      this.dcNumber = event.row.dc_number
      this.selectEdit_data();

      this.e_way_bill.controls['bill_no'].setValue(this.dc_list.e_way_bill);
      this.e_way_bill.controls['vehicle_no'].setValue(this.dc_list.vehicle_number);
      this.e_way_bill.controls['shipment_mode'].setValue(this.dc_list.transport_mode);
      this.customer_address(event.row.customer_id);
    }
  }

 async  selectEdit_data()
    {
        var serial_no =  this.dc_list['serial_no'];

      this.api.get('mp_customer_dc_pdf.php?value=' + serial_no  + '&authToken=' + environment.authToken).then((data: any) => {

        this.dcPdf = data;
        this.dcItems          = this.dcPdf[0].invoiceItems;
        this.taxempty         = this.dcPdf[0].tax_mode;
        this.company_pdf_logo = this.dcPdf[0].company_details[0].logo;
        this.company_pdf_logo = environment.baseURL + "download_file.php?path=upload/company/" + this.company_pdf_logo + "&authToken=" + environment.authToken
        this.stateCode        = data[0].place_from_supply_code;
      }).catch(error => {
        this.toastrService.typeError('Something went wrong');
      });

    }

onSelect( selected :any )
{

  this.selected.splice(0, selected.length);
  this.selected.push(...selected.selected);
  this.show_edit_btn=true;
}

editbill()
{
  this.edit_dataload();
  this.LoadItemDetails();
  this.selectEdit_data();
  this.show_dc_edit = true;
  this.show = false;
}

get product(): FormArray {
  return this.Edit_dc.get('product') as FormArray;
}

async LoadItemDetails()
{
  await this.api.get('get_data.php?table=item&find=sales&value=1&authToken=' + environment.authToken).then((data: any) =>
  {
    this.ItemList = data;
  }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });
}

async edit_dataload()
{
  let dc_id =  this.dc_list['dc_id'];
  await this.api.get('mp_dc_edit_data.php?value=' +  dc_id  + '&authToken=' + environment.authToken).then((data: any) => {

     if(data != null)
       {

         this.dc_item          = data[0];
         this.dcitem_list      = data[0].dc_items;
         this.edit_ItemList    = data[0].items_list;
         this.dc_type     = data[0].inv_type;
         this.customer_id      = data[0].customer_id;
         this.taxempty         = data[0].tax_mode;
       }
     }).catch(error => { this.toastrService.typeError('Something went wrong '); });

     this.Edit_dc.controls['customerId'].setValue(this.dc_list.customer_id);
     this.Edit_dc.controls['inv_type'].setValue(this.dc_type);


    //  if(this.clone_dc_show == false)
    //  {
      this.FetchAddress(this.dc_item);
    //  }

    //  if(this.clone_dc_show == true)
    //  {
    //  this.clone_address(this.customer_id);
     //}

     this.stateCode =this.dc_item.place_from_supply_code;
     if(this.stateCode == 33 )
     {
      this.edit_LoadGST('GST');
      this.Edit_dc.controls['tax_type'].setValue("GST");
     }
    else
     {
      this.edit_LoadGST('IGST');
      this.Edit_dc.controls['tax_type'].setValue("IGST");
     }
     this.load_dcnumber( this.dc_item);
     this.load_dcnumber( this.dc_item);

     this.api.get('get_data.php?table=state_code&authToken=' + environment.authToken).then((data: any) =>
      {
        this.state_list = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });
}

clone_address(id: string)
{
   this.api.get('get_data.php?table=customer_address&find=customer_id&value='+id+'&find1=status&value1=1&authToken=' + environment.authToken).then((data: any) =>
  {

    this.FetchAddress(data)
  }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });


  this.api.get('get_data.php?table=customer_address&find=customer_id&value='+id+'&find1=status&value1=1&authToken=' + environment.authToken).then((data: any) =>
  {

    this.FetchAddress(data)
  }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });
}


 async FetchAddress(data: any)
  {
  // if(this.clone_dc_show == true && this.show_dc_edit == false)
  // {
  //     for (let i = 0; i < data.length; i++)
  //     {
  //       if (data[i].set_as_default === 1 && data[i].type === 1 && data[i].status === 1) {
  //         this.bill_addr   = data[i];
  //         this.billFrom    = this.bill_addr.cust_addr_id;

  //         this.billAttention      = this.bill_addr.attention;
  //         this.billAddress_line_1 = this.bill_addr.address_line_1;
  //         this.billAddress_line_2 = this.bill_addr.address_line_2;
  //         this.billCity           = this.bill_addr.city;
  //         this.billState          = this.bill_addr.state;
  //         this.billZipcode        = this.bill_addr.zip_code;
  //         this.Edit_dc.controls['billFrom'].setValue(this.billFrom);
  //       }

  //       if (data[i].set_as_default === 1 && data[i].type === 2 && data[i].status === 1) {
  //         this.shipp_addr = data[i];
  //         this.shipFrom   = this.shipp_addr.cust_addr_id;

  //         this.shipAttention      = this.shipp_addr.attention;
  //         this.shipAddress_line_1 = this.shipp_addr.address_line_1;
  //         this.shipAddress_line_2 = this.shipp_addr.address_line_2;
  //         this.shipCity           = this.shipp_addr.city;
  //         this.shipState          = this.shipp_addr.state;
  //         this.shipZipcode        = this.shipp_addr.zip_code;
  //         this.Edit_dc.controls['shipFrom'].setValue(this.shipFrom);
  //       }
  //     }
  //   }

  // if(this.show_dc_edit == true && this.clone_dc_show == false)
  // {

      for (let i = 0; i < data.bill_address.length; i++)
      {
        if (data.bill_address[i] ) {
          this.bill_addr   = data.bill_address[i];
          this.billFrom    = this.bill_addr.cust_addr_id;

          this.billAttention      = this.bill_addr.attention;
          this.billAddress_line_1 = this.bill_addr.address_line_1;
          this.billAddress_line_2 = this.bill_addr.address_line_2;
          this.billCity           = this.bill_addr.city;
          this.billState          = this.bill_addr.state;
          this.billZipcode        = this.bill_addr.zip_code;
          this.Edit_dc.controls['billFrom'].setValue(this.billFrom);
        }

        if (data.ship_address[i] ) {
          this.shipp_addr = data.ship_address[i];
          this.shipFrom   = this.shipp_addr.cust_addr_id;

          this.shipAttention      = this.shipp_addr.attention;
          this.shipAddress_line_1 = this.shipp_addr.address_line_1;
          this.shipAddress_line_2 = this.shipp_addr.address_line_2;
          this.shipCity           = this.shipp_addr.city;
          this.shipState          = this.shipp_addr.state;
          this.shipZipcode        = this.shipp_addr.zip_code;
          this.Edit_dc.controls['shipFrom'].setValue(this.shipFrom);

      //  }
      }
    }

  }

  Billdate(a: any)
  {
    this.dueDateChange();
    this.dcDate  = a;
    var current       = new Date(this.dcDate);
    this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
    this.fullDate     = this.followingDay.toISOString().substring(0, 10);
  }
  dueDates(s: any, BillDate: any)
  {
    this.dueValues    = s;
    var current       = new Date(this.dcDate || BillDate);
    this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
    this.fullDate     = this.followingDay.toISOString().substring(0, 10)
  }
  dueDateChange()
  {
    this.Edit_dc.controls["paymentTerms"].setValue(this.payment_terms);
  }

  edit_initProduct()
  {
    let product = this.Edit_dc.get('product') as FormArray;
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
    let product = this.Edit_dc.get('product') as FormArray;
    if (product.length > 1) {
      product.removeAt(rowIndex)
    } else {
      product.reset()
    }

  }
  async edit_LoadGST(mode: string)
  {
      await this.api.get('get_data.php?table=tax&find=type&value=' + mode + '&authToken=' + environment.authToken).then((data: any) =>
      {
       this.editGST_Data     = data;
       this.editGST_Length   = data.length;
       this.editGST_Length   = data.length;
      }).catch(error => { this.toastrService.typeError('Something went wrong'); });

        for(let n = 0; n < this.editGST_Length; n++)
        {
          this.editGST_Data[n]['amount'] = 0;
        }

          this.load_editpage();
  }


 async load_editpage()
 {
  this.LoadpaymentTerms();

   setTimeout(() => {
  this.name =this.dc_list.company_name;

  if(this.clone_dc_show == false)
  {
   this.Edit_dc.controls['dcNo'].setValue(this.dc_list.dc_number);
   this.Edit_dc.controls['billDate'].setValue(this.dc_list.dc_date);
  }

  this.Edit_dc.controls['reference_number'].setValue(this.dc_list.reference_number);
  this.Edit_dc.controls['dueDate'].setValue(this.dc_list.dc_due_date);
  this.Edit_dc.controls['subTotal'].setValue(0);
  this.Edit_dc.controls['shippingCharge'].setValue(this.dc_list.transport);
  this.Edit_dc.controls['tds_percentage'].setValue(this.dc_list.tds_percentage);
  this.Edit_dc.controls['tcs_percentage'].setValue(this.dc_list.tcs_percentage);
  this.Edit_dc.controls['TCS'].setValue(this.dc_list.TCS);
  this.Edit_dc.controls['TDS'].setValue(this.dc_list.TDS);
  this.Edit_dc.controls['roundOff'].setValue(this.dc_list.round_off);

  this.Edit_dc.controls['dc_id'].setValue(this.dc_list.dc_id);
  this.Edit_dc.controls['created_by'].setValue(this.uid);
  this.Edit_dc.controls['paymentTerms'].setValue(this.dc_list.payment_term);
  this.Edit_dc.controls['terms_condition'].setValue(this.dc_list.terms_condition);
  this.Edit_dc.controls['notes'].setValue(this.dc_list.note);


  const product1 = this.Edit_dc.get('product') as FormArray;
  product1.clear();

  this.dcitem_list.forEach((item: { dc_item_id: any; item_list_id: any; item_description: any; tax_percent: any; amount: any; qty: any; total: any; uom: any; },j: any) => {
    product1.push(this.fb.group({
      type        : "edit",
      id          : [item.dc_item_id],
      items       : [item.item_list_id],
      descriptions: [item.item_description],
      taxes       : [item.tax_percent],
      price       : [item.amount],
      quantity    : [item.qty],
      amount      : [item.total],
      uom         : [item.uom]
    }));

     let qty   = item.qty;
     let price = item.amount;
     this.edit_priceChange(qty, price, j);
   });

  for(let m = 0; m < this.dcitem_list.length; m++)
    {
      this.edit_GSTCalculation(m);
    }
  }, 100);
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
   }).catch(error => { this.toastrService.typeError('Something went wrong'); });
   const formData = {
     taxes: item,
   }

   this.edit_patchValues(item,j);
   this.edit_SubTotalChange(j);
   this.edit_GSTCalculation(j);
  }


 async edit_patchValues(id: any,j: any)
  {

    let y = (<FormArray>this.Edit_dc.controls['product']).at(j);
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
    let y       = (<FormArray>this.Edit_dc.controls['product']).at(j);
    y.patchValue({
      amount : this.amount
    })
    this.edit_SubTotalChange(j);
  }

 edit_qty(qty: any, price: any, j: any)
  {
    this.amount = Number(qty * price).toFixed(2);
    let y       = (<FormArray>this.Edit_dc.controls['product']).at(j);
    y.patchValue({
      amount : this.amount
    })
    this.edit_SubTotalChange(j);
  }
total_tax : any
  edit_GSTCalculation(i: any)
  {
    this.editGST_Data.forEach((data: { amount: number; }) => {
      data.amount = 0;
    });
     this.total_tax = 0
    let products = (<FormArray>this.Edit_dc.controls['product']).value;
    products.forEach((product: { amount: number; taxes: number; }) => {
      let taxValue = (product.amount / 100) * product.taxes;
      let taxAmount = parseFloat(taxValue.toFixed(2));
      this.total_tax = (product.amount / 100) * product.taxes;
      this.editGST_Data.forEach((data: { rate: any; amount: number; }) => {
        if (data.rate === product.taxes)
        {
          data.amount += taxAmount;
        }
      });
    });
    this.edit_FinalTotalCalculation();

  }

 edit_SubTotalChange(j: any)
  {
    let edit_arr = this.Edit_dc.controls['product'].value;
    let sum1: number = edit_arr.map((a: { amount: string; }) => parseFloat(a.amount)).reduce(function(a: any, b: any) {
      return a + b;
    });
    if(Number.isNaN(sum1))
    {
      this.subtotal = 0;
      this.Edit_dc.controls['subTotal'].setValue(0);

    }
    else{
      this.subtotal = sum1;
      this.Edit_dc.controls['subTotal'].setValue((sum1).toFixed(2));
    }

    // if (typeof sum1 === 'number') {
    //   let sum1value =Number(sum1).toFixed(2);
    //  this.Edit_po.controls['subTotal'].setValue(sum1value);
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

      this.Edit_dc.controls['TDS'].setValue(tds);
      this.edit_FinalTotalCalculation();

  }

  tcsCalculation()
  {
    let tcs =  ((this.subtotal+this.total_tax)*(this.tcs_percent/100)).toFixed(2);

        this.Edit_dc.controls['TCS'].setValue(tcs);
        this.edit_FinalTotalCalculation();

  }

  edit_FinalTotalCalculation()
  {
    let editSub_Total       = this.Edit_dc.controls['subTotal'].value;
    let editTDS_Value       = this.Edit_dc.controls['TDS'].value;
    let editTCS_Vale        = this.Edit_dc.controls['TCS'].value;
    let editShipping_Value  = this.Edit_dc.controls['shippingCharge'].value;
    let editRoundof_Value   = this.Edit_dc.controls['roundOff'].value;

    let editTotalGST: number = this.editGST_Data.map((a: { amount: string; }) => parseFloat (a.amount)).reduce(function(a: any, b: any)
    {
      return a + b;
    });
    let editTotal_Calculation =  (Number(editSub_Total) - Number(editTDS_Value) + Number(editTCS_Vale) + Number(editShipping_Value) + Number(editRoundof_Value)+ Number(editTotalGST)).toFixed(2);
    this.Edit_dc.controls['total'].setValue(editTotal_Calculation);
  }


  edit_onDeleteRow(rowIndex: any)
  {
     this.item_index = rowIndex;
    let editproduct=this.Edit_dc.get('product') as FormArray;
    const delete_data = editproduct.at(rowIndex).value;
          if(delete_data.id !== '')
          {
            this.item_DeleteId = delete_data.id
            const modalElement = this.delete_item.nativeElement;
            $(modalElement).modal('show');
          }
          else{
              editproduct.removeAt(rowIndex)
          }

    this.edit_SubTotalChange(rowIndex);
  }

  item_delete()
  {
    let editproduct=this.Edit_dc.get('product') as FormArray;
    this.api.get('delete_data.php?authToken='+environment.authToken+'&table=dc_item&field=dc_item_id&id='+this.item_DeleteId).then((data: any) =>
    {
      if (editproduct.length > 1)
        {

          editproduct.removeAt(this.item_index)
          this.toastrService.typeSuccess('DC Item Deleted Successfull');
          const modalElement = this.delete_item.nativeElement;
          $(modalElement).modal('hide');
          this.edit_SubTotalChange(this.item_index);
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
  async LoadpaymentTerms()
  {
    await this.api.get('get_data.php?table=payment_terms&authToken=' + environment.authToken).then((data: any) => {
      this.payment_terms=data;
    }).catch(error => { this.toastrService.typeError('Something went wrong'); });
  }

  async edit_onSubmit(value: any)
  {
    let dc_id =  this.dc_list['dc_id'];
    let serial_no =  this.dc_list['serial_no'];

       Object.keys(this.Edit_dc.controls).forEach(field => {
        this.Edit_dc.get(field)?.markAsTouched({ onlySelf: true });
      });

       if (this.Edit_dc.valid)
         {
          this.loading=true;
          await this.api.post('mp_dc_edit_submit.php?value='+dc_id+'&authToken=' + environment.authToken, value).then((data: any) =>
          {

            if (data.status == "success")
            {
              this.loading=false;
              this.toastrService.typeSuccess('DC Updated Succesfully');
              this.Return();
              this.view_dc = serial_no;
              this.loadonce();
            }
            else { this.toastrService.typeError('Something went wrong');
            this.loading=false; }
            return true;
          }).catch(error =>
            {
            this.toastrService.typeError('Something went wrong');
            this.loading=false;
          });
        }
 }

 Return()
 {
      this.show_dc_edit = false;
      this.show              = true;
      this.LoadCustomerBills();
 }


 download()
 {

     let dc_id =this.dcPdf[0].dc_id;
    this.api.get('mp_download_dc.php?value=' + dc_id + '&authToken=' + environment.authToken).then((data: any) =>
    {

          let value = this.transform(data[0].total)
          this.amoumt_word = value;
          var dc_data = data;
          this.pdfDownload( dc_data);

    }).catch(error => { this.toastrService.typeError('Something went wrong'); });
 }

 numberToWords(num: number): string {

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) {
    return 'Zero';
  }

  if (num < 10) {
    return units[num];
  }

  if (num < 20) {
    return teens[num - 10];
  }

  if (num < 100) {
    return tens[Math.floor(num / 10)] + ' ' + units[num % 10];
  }

  if (num < 1000) {
    return units[Math.floor(num / 100)] + ' Hundred ' + this.numberToWords(num % 100);
  }

  if (num < 1000000) {
    return this.numberToWords(Math.floor(num / 1000)) + ' Thousand ' + this.numberToWords(num % 1000);
  }

  if (num < 1000000000) {
    return this.numberToWords(Math.floor(num / 1000000)) + ' Million ' + this.numberToWords(num % 1000000);
  }

  return '';
}

transform(value: any): string {
  if (value == null || isNaN(value)) {
    return 'Invalid Number';
  }

  const numberString = String(value);
  const [integerPart, decimalPart] = numberString.split('.');

  let integerWords = this.numberToWords(Number(integerPart));

  let decimalWords = '';
  let units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  if (decimalPart) {
    decimalWords = ' point ';
    for (let i = 0; i < decimalPart.length; i++) {
      decimalWords += units[Number(decimalPart[i])] + ' ';
    }
  }

  return integerWords + decimalWords;
}

async pdfDownload(files: any) {


  const font = 'Roboto';

  let docDefinition = {
    pageSize: 'A4',
    pageMargins: [ 40, 40, 40, 40 ],
    bold:true,
    info: {
      title: files[0].invoice_number,
    },
    pageBorder: [40, 40, 40, 40], // [left, top, right, bottom] border widths in pixels
      defaultStyle: {
        border: '2px solid black', // Border style for the content
        //padding: 10, // Optional padding
        font: 'Roboto'
      },
    content: [
      {
        stack: [
          this.getCompanyDetails(files),
          this.getInvoiceObject(files),
          this.getAddress(files),
          this.getBillObject(files),
          this.getItemsObject(files),
          this.getItemstotalObject(files),
          this.getBankObject(files),
          this.getMarginObject(files)
        ]
      },
      // { qr: 'text in QR' },
    ],
    background: function () {
      // Draw a rectangle with border around the entire page
      return {
        canvas: [
          {
            type: 'rect',
            x: 39,
            y: 40,
            w: 516.8, // Width of A4 page in points (210mm converted to points)
            h: 761, // Height of A4 page in points (297mm converted to points)
            r: 0, // Border radius (optional)
            lineColor: 'lightblack', // Border color
            lineWidth: 1 // Border width
          }
        ]
      };
    }
  };

  // Generate and open PDF
  (pdfMake as any).createPdf(docDefinition).open();
}

  getCompanyDetails(files: any) {
    var test = files[0].company_details[0];
    return {
      table: {
        widths: ['20%', '80%'],
        body: [
            [
                { image: this.imageToShow, width: 100, alignment: 'left', border: [false, false,false, false] },
                {columns: [
                      {
                        stack: [
                           { text: test.company_name,bold:true,fontSize: 12, color: 'black', alignment: 'left',},
                           { text: "" + test.address_1 + "," + test.address_2 +",", fontSize: 8, color: 'black', alignment: 'left' ,},
                           { text: "" + test.city + "-" + test.pincode+",", fontSize: 8, color: 'black', alignment: 'left' ,},
                           { text: 'GSTIN :' + test.gst_number, fontSize: 8, bold: true, alignment: 'left' },
                           { text: 'Delevery Challan', fontSize: 21, alignment: 'right' },
                        ]
                      }
                      ],
                    margin: [0,30,0,0],
                    border: [false, false, false, false],
                    columnGap: 10
                }
            ],
        ],
        layout: {
            hLineWidth: function (i:any, node:any) {  return (i === 0 || i === node.table.body.length) ? 0 : 1; },
            vLineWidth: function (i:any) {return 0;}
        }
      }
    }
  }

getInvoiceObject(files:any) {

  var test = files[0]
  return {

    table: {
      widths: ['*', '*'],
      body: [
        [
          {
            columns: [
              [
                { text: 'Dc No ', fontSize: 9 },
                { text: 'Dc Date ', fontSize: 9 },
                { text: 'State ', fontSize: 9 },
                { text: 'Pin Code  ', fontSize: 9 },
              ],
              [
                { text: ": "+test.dc_number,bold:true, fontSize: 9 },
                { text: ": "+test.dc_date,bold:true, fontSize: 9 },
                { text: ": "+test.bill_state,bold:true, fontSize: 9 },
                { text: ": "+test.bill_zip_code,bold:true, fontSize: 9 },
              ],
            ],
            border: [false, true,false, false]
          },

          {
            columns: [
              [
                { text: test.shipment_mode ? 'Shipment '  :'', fontSize: 9 },
                { text: test.vehicle_number ? 'Vehicle Number ' : '', fontSize: 9 },
                { text: 'Place of Supply ', fontSize: 9 },
                { text: 'P.O ref No ', fontSize: 9 },

              ],
              [
                { text: test.shipment_mode ? ": " + test.shipment_mode : '', bold: true, fontSize: 9 },
                { text: test.shipment_mode ? ": " + test.vehicle_number : '', bold: true, fontSize: 9 },
                { text:": "+ test.place_from_supply,bold:true, fontSize: 9 },
                { text:": "+ test.reference_number,bold:true, fontSize: 9 },

              ]
            ],
            border: [true, true,false, false]
          },
        ],
      ]
    },
    layout: {
      layout: 'lightHorizontalLines',
      hLineWidth: function (i:any, node:any) {
        return (i === 0 || i === node.table.body.length) ? 1 : 1;
      },
    },
  }
}


getAddress(files:any) {
  var test = files[0];
  return {
      table: {
          widths: ['50%', '50%'],
          body: [
              [
                  {text: 'Bill To ',  border: [false, true, true, true], fontSize: 9, bold: true, fillColor: '#f2f2f2'},
                  { text: 'Ship To ', bold: true,  fontSize: 9, fillColor: '#f2f2f2' ,border: [false, true, false, true]},
              ],
          ],
      },
  };
}


getBillObject(files:any) {

  var test = files[0]

  return {
    table: {
      widths: ['*', '*'],
      body: [
        [
          {
              columns: [
                    [

                      { text: test.bill_attention, bold: true, fontSize: 11 , border: [false, false, false, false]},
                      { text: test.bill_address_line_1, fontSize: 9 , border: [false, false, false, false]},
                      { text: test.bill_address_line_2+''+test.bill_state, fontSize: 9 , border: [false, false, false, false]},
                      { text:  test.bill_zip_code, alignment: 'left', fontSize: 9 , border: [false, false, false, false]},
                      { text: 'GSTIN  ' + test.customer_gst, fontSize: 9, border: [false, false, false, false]},

                    ],
               ], border: [false, false, true, false]
          },
          {
            columns: [
              [
              { text: test.ship_attention, bold: true, fontSize: 11 },
              { text: test.ship_address_line_1, fontSize: 9 },
              { text: test.bill_address_line_2+''+test.bill_state, fontSize: 9 },
              { text: test.ship_zip_code, alignment: 'left',  fontSize: 9 },
              { text: 'GSTIN ' + test.customer_gst, fontSize: 9, },

              ],
            ], border: [false, false, false, false]
          },
        ],
      ],border: [false, false, false, false]
    },
    layout: {
      layout: 'lightHorizontalLines',
      hLineWidth: function (i:any, node:any) {
        return (i === 1 || i === node.table.body.length) ? 0 : 1;
      },
    },
  }
}

getItemsObject(files:any) {

  var test = files[0].dcItems;
  var serialNumber = 1;

 if(files[0].place_from_supply_code == 33)
  {
     return {

    table: {
      widths: [21, 103, 31, 27, 26, 35, 22, 32, 22, 32, 64],
      body: [
        [

          { text: '#', border: [false, true, true, false], fontSize: 9, bold: true , alignment: 'center', fillColor: '#f2f2f2'},
          { text: 'Item & Description', alignment: 'center', border: [true, true, true, false], fontSize: 9, bold: true,  fillColor: '#f2f2f2'},
          { text: 'HSN/SAC', border: [true, true, true, false], fontSize: 9, bold: true , alignment: 'center', fillColor: '#f2f2f2'},
          { text: 'QTY', border: [true, true, true, false], fontSize: 9, bold: true, alignment: 'center',  fillColor: '#f2f2f2'},
          { text: 'UOM', border: [true, true, true, false], fontSize: 9, bold: true, alignment: 'center' , fillColor: '#f2f2f2'},
          { text: "Rate", border: [true, true, true, false], fontSize: 9, bold: true, alignment: 'center', fillColor: '#f2f2f2' },
          { text: 'CGST', border: [true, true, true, false],fontSize: 9, bold: true, alignment: 'center', colSpan: 2, fillColor: '#f2f2f2' },
          {},
          { text: 'SGST', fontSize: 11, bold: true, alignment: 'center', colSpan: 2 , fillColor: '#f2f2f2'},
          {},
          { text: 'Amount', border: [true, true, false, true], fontSize: 11, bold: true ,alignment: 'center', fillColor: '#f2f2f2'},
        ],
        [
          { text: '', border: [false, false, true, false] , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, true, false] , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, true, false] , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, true, false] , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, true, false] , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, true, false] , fillColor: '#f2f2f2'},
          { text: '%', bold: true, fontSize: 9 ,alignment:'center', fillColor: '#f2f2f2'},
          { text: 'Amt', bold: true, fontSize: 9,alignment:'center', fillColor: '#f2f2f2' },
          { text: '%', bold: true, fontSize: 9,alignment:'center', fillColor: '#f2f2f2'},
          { text: 'Amt', bold: true, fontSize: 9,alignment:'center' , fillColor: '#f2f2f2'},
          { text: '', border: [true, false, false, true], bold:true, fillColor: '#f2f2f2'},
        ],
        ...test.map((ed:any, index:any) => {
            let cellBorder = [false, true, true, false];
            if (index >= 0) {
              cellBorder = [false, true, true, true];
            }

          return [
            { text:  serialNumber++,border: [false, true, false, true], fontSize: 9 , alignment: 'center', },
            { text: [{ text: ed.item_name,bold: true },{ text: '\n' }, { text: ed.item_description },], border: cellBorder, fontSize: 9, alignment: 'left' },
            { text: ed.hsn,border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.qty,border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.uom,border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'),border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.tax_percent/2 +'%',border:cellBorder, fontSize: 9 ,alignment: 'center'},
            { text: (ed.item_tax/2).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'),border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.tax_percent/2 +'%',border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: (ed.item_tax/2).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'),border:cellBorder, fontSize: 9 , alignment: 'center'},
            { text: ed.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'), border: [true, true, false, true], fontSize: 9,  alignment: 'right'}]

        },
        )
      ],
    }
     }
  }else{
    return {
      table: {
        widths: [11, 130, 55, 23, 32, 40, 40,50,52],
        body: [
          [
            { text: '#', border: [false, true, true, false],fillColor: '#f2f2f2', fontSize: 10, bold: true , alignment: 'center'},
            { text: 'Product Description', alignment: 'center',fillColor: '#f2f2f2', border: [true, true, true, false], fontSize: 10, bold: true },
            { text: 'HSN', border: [true, true, true, false],fillColor: '#f2f2f2', fontSize: 10, bold: true , alignment: 'center'},
            { text: 'QTY', border: [true, true, true, false],fillColor: '#f2f2f2', fontSize: 10, bold: true, alignment: 'center' },
            { text: 'UOM', border: [true, true, true, false],fillColor: '#f2f2f2', fontSize: 10, bold: true, alignment: 'center' },
            { text: "Unit Rate", border: [true, true, true, false],fillColor: '#f2f2f2', fontSize: 10, bold: true, alignment: 'center' },
            { text: 'IGST', border: [true, true, false, false],fillColor: '#f2f2f2',fontSize: 10, bold: true, alignment: 'center', colSpan: 2 },
            { text: '',fillColor: '#f2f2f2',border: [false, false, false, false]},

            { text: 'Amount', border: [true, true, false, true],fillColor: '#f2f2f2', fontSize: 10, bold: true ,alignment: 'center'},
          ],
          [
            { text: '',fillColor: '#f2f2f2', border: [false, false, true, false] },
            { text: '',fillColor: '#f2f2f2', border: [true, false, true, false] },
            { text: '', fillColor: '#f2f2f2',border: [true, false, true, false] },
            { text: '', fillColor: '#f2f2f2',border: [true, false, true, false] },
            { text: '', fillColor: '#f2f2f2',border: [true, false, true, false] },
            { text: '', fillColor: '#f2f2f2',border: [true, false, true, false] },
            { text: '%',fillColor: '#f2f2f2', bold: true, fontSize: 11 ,alignment:'center'},
            { text: 'Amt',fillColor: '#f2f2f2', bold: true, fontSize: 10,alignment:'center' },

            { text: '',fillColor: '#f2f2f2', border: [true, false, false, true], bold:true},
          ],
          ...test.map((ed:any, index:any) => {
              let cellBorder = [false, true, true, true];
              if (index > 0) {
                cellBorder = [false, true, true, true];
              }

            return [
              { text:  serialNumber++,border:cellBorder, fontSize: 9 , alignment: 'center'},
              { text: [{ text: ed.item_name,bold: true },{ text: '\n' }, { text: ed.item_description },], border: cellBorder, fontSize: 9, alignment: 'left' },
              { text: ed.hsn,border:cellBorder, fontSize: 9 , alignment: 'center'},
              { text: ed.qty,border:cellBorder, fontSize: 9 , alignment: 'center'},
              { text: ed.uom,border:cellBorder, fontSize: 9 , alignment: 'center'},
              { text: ed.amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'),border:cellBorder, fontSize: 9 , alignment: 'center'},
              { text: ed.tax_percent +'%',border:cellBorder, fontSize: 9 ,alignment: 'center'},
              { text: (ed.item_tax).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'),border:cellBorder, fontSize: 9 , alignment: 'center'},

              { text: ed.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'), border: [true, true, false, true], fontSize: 9,  alignment: 'right'}]
            },
            )
          ],
        }
      }
  }
}



getItemstotalObject_(files:any) {

  var test = files[0];
  var tax  = files[0].tax_amount_percentage;
  const without_tax = '₹' + test.without_tax.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_5     =  tax.tax_5.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_12    =  tax.tax_12.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_18    =  tax.tax_18.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_28    =  tax.tax_28.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const round_off =  test.round_off.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const total     = '₹' + test.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const transport   =   test.transport.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tds         =   test.tds.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tcs         =   test.tcs.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tcs_percent = test.tcs_percent;
  const tds_percent = test.tds_percent;

  var rows = [
    [
      { text: 'Total Amount Before Tax', fontSize: 9, colSpan: 11, alignment: 'right',  border: [true, false, false, false]},
      '', '', '', '', '', '', '', '', '', '',
      { text: without_tax, fontSize: 9 ,alignment: 'right',border: [false, false, false, false]}
    ],

  ];

  if (tax.tax_5 > 0) {
    rows.push([
      { text: 'GST (5%)', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text: tax_5, fontSize: 9 ,alignment: 'right',border: [false, false, false, false]}
    ]);
  }

  if (tax.tax_12 > 0) {
    rows.push([
      { text: 'GST (12%)', fontSize: 9, colSpan: 11, alignment: 'right' ,border: [true, false, false, false]},
      '', '', '', '', '', '', '', '', '', '',
      { text: tax_12, fontSize: 9, alignment: 'right',border: [false, false, false, false]}
    ]);
  }

  if (tax.tax_18 > 0) {
    rows.push([
      { text: 'GST (18%)', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text: tax_18, fontSize: 9, alignment: 'right',border: [false, false, false, false] }
    ]);
  }

  if (tax.tax_28 > 0) {
    rows.push([
      { text: 'GST (28%)', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text:tax_28, fontSize: 9, alignment: 'right' ,border: [false, false, false, false]}
    ]);
  }

  if (test.transport > 0) {
    rows.push([
      { text: 'Shipping Charge', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text:transport, fontSize: 9, alignment: 'right',border: [false, false, false, false] }
    ]);
  }
  if (test.tds > 0) {
      rows.push([
        { text: 'TDS('+test.tds_percent+'%)', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
        '', '', '', '', '', '', '', '', '', '',
        { text:tds, fontSize: 9, alignment: 'right',border: [false, false, false, false] }
      ]);
    }

  if (test.tcs > 0) {
    rows.push([
      { text: 'TCS('+test.tcs_percent+'%)', fontSize: 9, colSpan: 11, alignment: 'right',border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text:tcs, fontSize: 9, alignment: 'right',border: [false, false, false, false] }
    ]);
  }
  rows.push([

      { text: 'Round off',  fontSize: 9, colSpan: 11, alignment: 'right' ,border: [true, false, false, false]},
      '', '', '', '', '', '', '', '', '', '',
      { text: round_off, fontSize: 9, alignment: 'right',border: [false, false, false, false] }
    ],
    [
      { text: 'Total', fontSize: 9, colSpan: 11, alignment: 'right', border: [true, false, false, false] },
      '', '', '', '', '', '', '', '', '', '',
      { text: total !== undefined ? total.toString() : '', fontSize: 9, alignment: 'right', border: [false, false, false, false] }
    ] );

  return {
    table: {
      widths:[20, 103, 23, 23, 20, 35, 34, 15, 32, 15, 22, 62],
      body: rows
    }
  };
}


getItemstotalObject(files:any) {

  var test = files[0];
  var tax  = files[0].tax_amount_percentage;
  const without_tax = '₹' + test.without_tax.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_5     =  tax.tax_5.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_12    =  tax.tax_12.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_18    =  tax.tax_18.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tax_28    =  tax.tax_28.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const round_off =  test.round_off.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const total     = '₹' + test.total.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const transport   =   test.transport.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tds         =   test.tds.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tcs         =   test.tcs.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const tcs_percent = test.tcs_percent;
  const tds_percent = test.tds_percent;

  return {
    table: {
      widths: ['*', '*'],
      body: [
        [
          {
            columns: [
              [
                { text: 'Total in words', fontSize: 9, colSpan: 11, alignment: 'left',  border: [false, true, false, false]},
                { text: this.amoumt_word +' Only', fontSize: 9,bold:true, colSpan: 11, alignment: 'left',  border: [false, true, false, false]}
              ],

            ],
            border: [false, true,true, false]
          },

          {
            columns: [

               [
                  { text:  'Total Amount Wthout Tax', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: tax.tax_5 > 0 ? 'GST (5%)':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: tax.tax_12 > 0 ? 'GST (12%)':'', fontSize: 9, colSpan: 11, alignment: 'right' ,border: [false, false, false, false]},
                  { text: tax.tax_18 > 0 ? 'GST (18%)':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: tax.tax_28 > 0 ? 'GST (28%)':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: test.transport > 0 ? 'Shipping Charge':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: test.tds > 0 ? 'TDS('+test.tds_percent+'%)':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: test.tcs > 0 ? 'TCS('+test.tcs_percent+'%)':'', fontSize: 9, colSpan: 11, alignment: 'right',border: [false, false, false, false] },
                  { text: 'Round off',  fontSize: 9, colSpan: 11, alignment: 'right' ,border: [false, false, false, false]},
                  { text: 'Total', fontSize: 10, colSpan: 11, bold: true, alignment: 'right', border: [false, false, false, false] },
              ],

              [
                  { text: without_tax, fontSize: 9 ,alignment: 'right',border: [false, false, false, false]},
                  { text: tax.tax_5 > 0 ? tax_5:''  , fontSize: 9 ,alignment: 'right',border: [false, false, false, false]},
                  { text: tax.tax_12 > 0 ? tax_12:''  , fontSize: 9, alignment: 'right',border: [false, false, false, false]},
                  { text: tax.tax_18 > 0 ? tax_18:''  , fontSize: 9, alignment: 'right',border: [false, false, false, false]},
                  { text: tax.tax_28 > 0 ? tax_28:''  , fontSize: 9, alignment: 'right' ,border: [false, false, false, false]},
                  { text: test.transport > 0 ? transport:'' , fontSize: 9, alignment: 'right',border: [false, true, false, false] },
                  { text: test.tds > 0 ? tds:'' , fontSize: 9, alignment: 'right',border: [false, false, false, false] },
                  { text: test.tcs > 0 ? tcs:'' , fontSize: 9, alignment: 'right',border: [false, false, false, false] },
                  { text: round_off , fontSize: 9, alignment: 'right',border: [false, false, false, false] },
                  { text: total !== undefined ? total.toString() : '', fontSize: 9, alignment: 'right',bold:true, border: [false, false, false, false] }
              ]

            ],
            border: [false,true, false,false,]
          },
        ],
      ]
    },
    layout: {
      layout: 'lightHorizontalLines',
      hLineWidth: function (i:any, node:any) {
        return (i === 0 || i === node.table.body.length) ? 0 : 1;
      },
    },
  }
}


getBankObject(files: any) {
  const test = files[0].company_details[0];

  return {
    table: {
      widths: ['*', '*'],
      body: [
        [
          {
            columns: [
              {
                stack: [
                  { text: 'Bank Details :', bold: true, fontSize: 9, alignment: 'left' },
                  { text: 'Bank Name          : ' + test.bank_name, fontSize: 9, alignment: 'left' },
                  { text: 'Account Number : ' + test.account_no, fontSize: 9, alignment: 'left' },
                  { text: 'IFSC CODE            : ' + test.ifsc_code, fontSize: 9, alignment: 'left' },
                ],
              },
            ],
            margin: [0, 30, 0, 0],
            border: [false, false, true, false],
            columnGap: 10,
          },
          { text: 'Authorized Signature :', bold: true, fontSize: 9, alignment: 'center', margin: [0, 40, 0, 0], border: [true, true, false, false] },
        ],
      ],
      layout: {
        hLineWidth: (i: any, node: any) => (i === 0 || i === node.table.body.length) ? 1 : 0,
        vLineWidth: () => 0,
      },
    },
  };
}

getMarginObject(files: any) {
  var test = files[0]
  return {
    table: {
      widths: ['*','*'],
      body: [
        [
        { text: 'Terms & Conditions of sale:', bold: true, italics: true, fontSize: '8', alignment: 'left',border: [false, true, true, true] },
        //{ text: 'Terms & Conditions of sale:', bold: true, italics: true, fontSize: '8', alignment: 'left' },
        { text: test.terms_conditions, margin: [0, 10], italics: true, fontSize: '8', alignment: 'left' ,border: [false, true, false, true]},
      ],

      ],
      layout: {
        hLineWidth: (i: any, node: any) => (i === 0 || i === node.table.body.length) ? 0 : 1,
        vLineWidth: () => 0,
      },
    },
  };
}

getTermsObject(files:any) {
  var test = files[0]

  return {
    table: {
      widths: ['*', '*'],
      body: [
        [
          [
            [
              { text: test.inv_notes1, alignment: 'justify', margin: [0, 10, 0, 0], bold: false, fontSize: '8' },
              { text: test.inv_notes2, alignment: 'justify', margin: [0, 10, 0, 0], bold: false, fontSize: '8' },
              { text: 'For '+test.company_name, margin: [0, 10, 0, 0], bold: true, fontSize: '8', alignment: 'left' },
              { text: 'Authorised Signatory', margin: [0, 35, 0, 0], bold: true, italics: true, fontSize: '8', alignment: 'left' },]
          ],
          [
            [
              { text: 'Terms & Conditions of sale:', bold: true, italics: true, fontSize: '8', alignment: 'left' },
              { text: test.terms_conditions, margin: [0, 10], italics: true, fontSize: '8', alignment: 'left' },
            ]
          ],
        ],
      ]
    },
    layout: {

      layout: 'lightHorizontalLines',

      hLineWidth: function (i:any, node:any) {
        return (i === 0 || i === node.table.body.length) ? 1 : 0;
      },
    },
  }
}


async openpop()
  {

    const modalElement = this.addPayment.nativeElement;
     $(modalElement).modal('show');

    this.name =this.dc_list.company_name;
      if(this.payment_transaction!=null)
      {
        this.balance = this.payment_transaction[0].balance;
        var amount  =  this.balance;

      }
       else{
        var amount   =  this.dcPdf[0].total;
        this.balance = this.dcPdf[0].total;
       }
    this.dc_payment.controls['from_bank'].setValue(this.name);
    this.dc_payment.controls['amount'].setValue(amount);
    this.dc_payment.controls['description'].setValue(this.dcNumber);
  }


feedData(data:any)
  {
    this.bankData        = data;
    this.bankData_length = data.length;
    let j = 0 ; let k = 0; let l = 0; let m = 0; let n=0;
    for (let i = 0; i<this.bankData_length; i++)
      {

        if (this.bankData[i].type === 1 && this.bankData[i].mode === 1 && this.bankData[i].status == 1 )
        {
          this.company_account[j] = this.bankData[i];

          j++;
        }
        if (this.bankData[i].type === 1 && this.bankData[i].mode === 2 && this.bankData[i].status === 1 )
        {
          this.cash_account[k] = this.bankData[i];
          k++;
        }
        if (this.bankData[i].type === 1 && this.bankData[i].mode === 3 && this.bankData[i].status === 1 )
        {
          this.all_account[l] = this.bankData[i];
          l++;
        }
        if (this.bankData[i].bank_id === this.user_bank_id && this.bankData[i].status === 1 )
        {
          this.user_account[m] = this.bankData[i];
          m++;
        }
        if (this.bankData[i].type === 2 && this.bankData[i].mode === 1 && this.bankData[i].status === 1 )
        {
          this.gst_account[n] = this.bankData[i];
          n++;
        }
      }
  }

  cancel()
  {
    this.show_dc_edit = false;
    this.show=true;
    this.clone_dc_show=false;
  }

 clone()
  {
    this.edit_dataload();
    this.LoadItemDetails();
    this.selectEdit_data()
    this.clone_dc_show = true;
    this.show_dc_edit=false;
    this.show=false;
  }

  async load_dcnumber(id: any)
 {
    this.details =id
   await  this.api.get('mp_dc.php?&value=' + this.details.customer_id+ '&authToken=' + environment.authToken).then((data: any) =>
   {
      let dc_id        = data[0].serial_no + 1;
      var dcprifix     = data[0].prefix ;
      this.inv_no           = dcprifix + dc_id;
      this.view_dc     = dc_id;
      this.dc_type     = this.details.inv_type

      if(this.clone_dc_show == true)
      {
        this.Edit_dc.controls['dcNo'].setValue(this.inv_no);
        this.Edit_dc.controls['billDate'].setValue(this.todaysDate);
        // this.Edit_dc.controls['inv_type'].setValue(this.details.inv_type);
      }
   }).catch(error => { this.toastrService.typeError('Something went wrong') });
}

async onSubmit(bill_data: any)
  {
    Object.keys(this.Edit_dc.controls).forEach(field => {
      this.Edit_dc.get(field)?.markAsTouched({ onlySelf: true });
    });
    if (this.Edit_dc.valid)
    {
      const billNoValue = this.inv_no;
      let value = this.CustomerBillList.find((item: { dc_number: any; }) => item.dc_number === billNoValue);
         if(value != undefined)
         {
          this.toastrService.typeError('DC number has already been entered')
         }
        if(value == undefined)
         {
              this.loading = true;
              await this.api.post('mp_dc_create.php?type=new_dc&authToken=' + environment.authToken, bill_data).then((data: any) =>
              {
                if (data.status == "success")
                {
                  this.toastrService.typeSuccess('DC Added Succesfully');
                  this.loading = false;
                  this.Return();
                  this.show_dc_edit = false;
                  this.show = true;
                  this.loadonce()
                  this.clone_dc_show = false;
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
    }
    else
    {
      this.toastrService.typeError('Please Fill All Details');
    }
  }


  e_bill()
  {
   // this.new_category_id = this.modalService.open(this.ewayBill, { size: 'md' });



    this.api.get('get_data.php?table=dc&find=dc_id&value='+this.dc_id+'&authToken=' + environment.authToken).then((data: any) => {

       this.e_way_bill.controls['bill_no'].setValue(data[0].e_way_bill);
       this.e_way_bill.controls['vehicle_no'].setValue(data[0].vehicle_number);
       this.e_way_bill.controls['shipment_mode'].setValue(data[0].transport_mode);

    }).catch(error => { this.toastrService.typeError('Something went wrong'); });

    const modalElement = this.ewayBill.nativeElement;
     $(modalElement).modal('show');
  }

  async billSubmit(value: any)
  {
    Object.keys(this.e_way_bill.controls).forEach(field => {
      this.e_way_bill.get(field)?.markAsTouched({ onlySelf: true });
    });
    let dc_id =this.dcPdf[0].dc_id;
    this.view_dc =this.dc_list.serial_no;

    await this.api.post('mp_dc_create.php?dc_id='+dc_id+'&type=e_way&authToken=' + environment.authToken, value).then((data: any) =>
    {
      if (data.status == "success")
      {
        this.toastrService.typeSuccess('Added Succesfully');
        this.loading = false;
        this.Return();
        this.show_dc_edit = false;
        this.show = true;
        this.loadonce()
        this.clone_dc_show = false;
        const modalElement = this.ewayBill.nativeElement;
        $(modalElement).modal('hide');
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

  remove()
  {
    //this.openMd = this.modalService.open(this.delete, { size: 'md' });
    const modalElement = this.delete.nativeElement;
    $(modalElement).modal('show');
  }

  async ReqDelete()
  {
    let dc_id =this.dcPdf[0].dc_id;

    await this.api.post('mp_delete_dc.php?table=dc&field=dc_id&delete_id='+dc_id+'&authToken=' + environment.authToken,dc_id).then((data: any) =>
    {

      if (data.status == "success")
      {
               this.view_dc = data.id;
               this.toastrService.typeSuccess('Deleted Succesfully');
               this.loading = false;
               this.Return();
               this.show_dc_edit = false;
               this.show = true;
               this.loadonce()
               this.clone_dc_show = false;
               const modalElement = this.delete.nativeElement;
               $(modalElement).modal('hide');
      }
      else { this.toastrService.typeError('Something went wrong ');
      this.loading = false;}
      return true;
    }).catch(error =>
      {
      this.toastrService.typeError('Something went wrong ');
      this.loading = false;
    });
  }

  customer_address(id: string)
  {
    this.api.get('get_data.php?table=customer_address&find=customer_id&value=' + id + '&find1=type&value1=1&authToken=' + environment.authToken).then((data: any) => {

        this.alldata = data;
    }).catch(error => { this.toastrService.typeError('Something went wrong'); });

    this.api.get('get_data.php?table=customer_address&find=customer_id&value=' + id + '&find1=type&value1=2&authToken=' + environment.authToken).then((data: any) => {

      this.alldata1 = data;
  }).catch(error => { this.toastrService.typeError('Something went wrong'); });
  }

  ReloadBillAddr(id: any)
  {
    this.editAddressId = id.cust_addr_id
    this.api.get('get_data.php?table=customer_address&find=cust_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {
      this.bill_addr = data[0];

      this.billFrom = this.bill_addr.cust_addr_id;
      this.billAttention = this.bill_addr.attention;
      this.billAddress_line_1 = this.bill_addr.address_line_1;
      this.billAddress_line_2 = this.bill_addr.address_line_2;
      this.billCity = this.bill_addr.city;
      this.billState = this.bill_addr.state;
      this.billZipcode = this.bill_addr.zip_code;
      this.Edit_dc.controls['billFrom'].setValue(this.billFrom);
    }).catch(error => { this.toastrService.typeError('Something went wrong'); });

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

  ReloadShippAddr(id: any)
  {
    this.editAddressId = id.cust_addr_id
    this.api.get('get_data.php?table=customer_address&find=cust_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {
      this.shipp_addr = data[0];

      this.shipFrom = this.shipp_addr.cust_addr_id;
      this.shipAttention = this.shipp_addr.attention;
      this.shipAddress_line_1 = this.shipp_addr.address_line_1;
      this.shipAddress_line_2 = this.shipp_addr.address_line_2;
      this.shipCity = this.shipp_addr.city;
      this.shipState = this.shipp_addr.state;
      this.shipZipcode = this.shipp_addr.zip_code;
      this.Edit_dc.controls['shipFrom'].setValue(this.shipFrom);

    }).catch(error => { this.toastrService.typeError('Something went wrong'); });

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

  onInputChange()
  {
    const billNoValue = this.inv_no;
    let value = this.CustomerBillList.find((item: { dc_number: any; }) => item.dc_number === billNoValue);
       if(value != undefined)
       {
        this.toastrService.typeError('DC number has already been entered')
       }
       if(value == undefined)
       {
       }
  }


  advance_list : any

  use_advance()
  {

    let customer_id = this.dc_list.customer_id;
    this.advance.controls['dc_amount'].setValue(this.dc_list.total);
    this.advance.controls['dc_id'].setValue(this.dc_id);
    this.advance.controls['description'].setValue(this.dc_list.dc_number);

    this.api.get('get_data.php?table=customer_balance&find=customer_id&value='+customer_id+'&authToken=' + environment.authToken).then((data: any) => {

      if (data != null)
      {
        function levelFilter(value :any) {
          if (!value) { return false; }
           return value.dc_id === null;
          }
            this.advance_list = data.filter(levelFilter);
      }
    }).catch(error => { this.toastrService.typeError('Something went wrong'); });


     const modalElement = this.use_advancePayment.nativeElement;
     $(modalElement).modal('show');
  }

  editAddressId:any
  async submit(updateAddress : any)
  {
      let id = this.editAddressId;
      this.loading = true;
      this.api.post('post_update_data.php?table=customer_address&field=cust_addr_id&value=' + id + '&authToken=' + environment.authToken, updateAddress).then((data_rt: any) => {
        if (data_rt.status == "success")
         {
          this.loading = false;
          this.toastrService.typeSuccess('Address Updated Succesfully');
          this.customer_address(this.dc_list.customer_id)
                  this.api.get('get_data.php?table=customer_address&find=cust_addr_id&value=' + this.editAddressId + '&authToken=' + environment.authToken).then((data: any) => {

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
                      this.Edit_dc.controls['billFrom'].setValue(this.billFrom);
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
                        this.Edit_dc.controls['shipFrom'].setValue(this.shipFrom);
                      }

                  }).catch(error => { this.toastrService.typeError('Something went wrong'); });
          const modalElement = this.edit_address.nativeElement;
          $(modalElement).modal('hide');
        }
        else { this.toastrService.typeError(data_rt.status); }
      }).catch(error => { this.toastrService.typeError('Customer Address Update Failed!!');
      this.loading = false; });
    }


    new_submit(value:any)
    {
       this.newAddress.controls['customer_id'].setValue(this.dc_list.customer_id);
        Object.keys(this.newAddress.controls).forEach(field => {
          this.newAddress.get(field)?.markAsTouched({ onlySelf: true });
        });
        if(this.newAddress.valid)
        {
          this.loading=true;
          this.api.post('post_insert_data.php?table=customer_address&authToken=' + environment.authToken, this.newAddress.value).then((data_rt: any) => {

            if (data_rt.status == "success")
            {
              this.loading=false;
              this.customer_address(this.dc_list.customer_id)
              this.toastrService.typeSuccess('Customer Address Added Succesfully');
              this.newAddress.reset();

              const modalElement = this.new_address.nativeElement;
              $(modalElement).modal('hide');
            }
            else { this.toastrService.typeError(data_rt.status);
                this.loading=false;}

          }).catch(error => { this.toastrService.typeError('Customer Address Added Failed!!');
              this.loading=false; });
        }
        else{
          this.toastrService.typeError('Please Fill the Details!');
        }
    }

    VendorSelection(customer : any)
    {
        this.Edit_dc.controls['customerId'].setValue(customer);

        this.api.get('get_data.php?table=customer_address&find=customer_id&value=' + customer + '&authToken=' + environment.authToken).then((data: any) => {
          if(data != null)
            {
              for(let i=0 ; i< data.length; i++)
                {
                  if(data[i].type == 1)
                    {
                      this.billFrom      = data[i].cust_addr_id;
                      this.billAttention = data[i].attention;
                      this.billAddress_line_1 = data[i].address_line_1;
                      this.billAddress_line_2 = data[i].address_line_2;
                      this.billCity = data[i].city;
                      this.billState = data[i].state;
                      this.billZipcode = data[i].zip_code;
                      this.Edit_dc.controls['billFrom'].setValue(this.billFrom);
                    }

                    if(data[i].type == 2)
                      {
                        this.shipFrom      = data[i].cust_addr_id;
                        this.shipAttention = data[i].attention;
                        this.shipAddress_line_1 = data[i].address_line_1;
                        this.shipAddress_line_2 = data[i].address_line_2;
                        this.shipCity = data[i].city;
                        this.shipState = data[i].state;
                        this.shipZipcode = data[i].zip_code;
                        this.Edit_dc.controls['shipFrom'].setValue(this.shipFrom);
                      }
                }
            }
        }).catch(error => { this.toastrService.typeError('Something went wrong'); });

    }
}
