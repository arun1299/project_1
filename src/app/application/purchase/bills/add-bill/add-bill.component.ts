/* eslint-disable no-inner-declarations */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { environment } from 'src/environments/environment';
import { MatSelectSearchVersion } from 'ngx-mat-select-search';
import { SelectionType } from '@swimlane/ngx-datatable';
declare let $: any;

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.scss']
})
export class AddBillComponent implements OnInit {

  matSelectSearchVersion = MatSelectSearchVersion;
  customerDetails :any;
  select = false;
  search_box=true;
  myControl = new FormControl();

  public isDropdownAppendedToBody: boolean = true;

  price                    : any;
  quantity                 : any;
  inv_id                   : any;
  dcNumber                 : any;
  stateCode                : any;
  customer_id              : any;
  customer_bill_address    : any;
  customer_ship_address    : any;
  payment_terms            : any;
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
  company_name             : any;
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
  vendor_id                : any;

public uid = localStorage.getItem('uid');
public notes             : any;
public terms_condition   : any;
public bill_addr         : any;
public billFrom          : any;

public taxes             : any;
public i_valu            : any;
VendorBillList           : any;
ItemList                 : any;
BillingAddress           : any;
ShippingAddress          : any;
GST_Data                 : any;
GST_Length               : any;
type_id                  : any;
taxmode                  : any;
addForm                  !: FormGroup;
bill                     !: FormGroup;


imageToShow              !: string | ArrayBuffer;
billPerfix               !: string;
imgUrl                   :  string = '../../../../assets/img/logo/geogreen.png';

rows                     = [];
temp                     = [];
selected                 = [];
options                  : string[] = ['One', 'Two', 'Three'];
SelectionType            = SelectionType;

ingredients              : any;
response                 : any;
modalRef                 : any;
file                     : any;
test                     : any;
po_Details               : any;
paymentTerm              : any;
branches                 : any;
vendorDetails            : any;
poCustDetails            : any;
new_category_id          : any;


uom                      : any;
amount                   : any;
descriptions             : any;
billDate                 : any;
followingDay             : any;
day                      : any;
month                    : any;
year                     : any;
fullDate                 : any;
dueValues                : any = 0;
poPdf                    : any;
poItems                  : any;
billToPdf                : any;
customerPdf              : any;
branchPdf                : any;
poPdfDetails             : any;
img_path                 : any;
company_pdf_logo         : any;
company_mobile           : any;
company_gst_no           : any;
company_tan_no           : any;
events                   : any;
bill_no                  : any;
SelectCategory           !: FormGroup;
type                     : any;
tax_list                 : any;
tds_percent              : any=0;
tcs_percent              : any=0;
lastindex                : any=0;
loading                  = false;
show_new_bill            = false;
public formShow          = true;
shipp_addr               : any;
shipFrom                 : any;
taxempty                 : any;
total_tax                : any;
updateAddress            !: FormGroup;
newAddress               !: FormGroup;
NewItem                  !: FormGroup;
state_list               : any;
editAddressId            : any;
alldata                  : any;
alldata1                 : any;
customer_list            : any;
category_list            : any;
uom_list                 : any;

@ViewChild("new_address", { static: true }) new_address!: ElementRef;
@ViewChild("edit_address", { static: true }) edit_address!: ElementRef;
@ViewChild('add_item') add_item!: ElementRef;


  constructor( private api :ApiService, public toastService :ToasterService , public fb : FormBuilder, public router:Router, public toastrService :ToasterService  )
  {
    this.bill = fb.group(
      {
        created_by: [this.uid],
        vendorId: [null, Validators.compose([Validators.required])],
        billFrom: [null],
        shipFrom: [null],
        billNo  : [null, Validators.compose([Validators.required])],
        reference_number: [null],
        billDate: [(new Date()).toISOString().substring(0, 10)],
        paymentTerms: ['', Validators.compose([Validators.required])],
        dueDate: [(new Date()).toISOString().substring(0, 10)],
        subTotal: [0],
        shippingCharge: [0],
        TCS: [0],
        tds_percentage:[0],
        tcs_percentage:[0],
        TDS: [0],
        roundOff: [0],
        notes: [null, Validators.compose([Validators.required])],
        terms_condition: [null, Validators.compose([Validators.required])],
        status: [1],
        total: [0],
        tax_type :[null],
        product: this.fb.array([])
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

          this.NewItem = fb.group({
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
  }

  ngOnInit()
  {
    this.LoadCustomerDetails();
    this.LoadItemDetails();
    this.initProduct();
    this.LoadCustomerBills();
  }

  async LoadCustomerBills()
  {
    await this.api.get('mp_vendor_bill.php?&authToken=' + environment.authToken).then((data: any) =>
      {
        this.VendorBillList = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong in LoadVendorBills'); });


  }
  async LoadCustomerDetails()
  {
    await this.api.get('get_data.php?table=vendor&authToken=' + environment.authToken).then((data: any) =>
      {
        this.vendorDetails = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong in LoadVendorDetails'); });

    await this.api.get('get_data.php?table=customers&authToken=' + environment.authToken).then((data: any) =>
        {
          this.customer_list = data;
        }).catch(error => { this.toastrService.typeError('Something went wrong in LoadCustomerDetails'); });
  }

  async LoadItemDetails()
  {

    await this.api.get('get_data.php?table=item&find=purchase&value=1&authToken=' + environment.authToken).then((data: any) =>
      {
        this.ItemList = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });
  }


  ReturnToList()
  {

    this.show_new_bill = !this.show_new_bill;
    this.selected = [];
    this.bill.reset();
    this.bill.controls['created_by'].setValue(this.uid);
    this.bill.controls['subTotal'].setValue(0);
    this.bill.controls['shippingCharge'].setValue(0);
    this.bill.controls['TCS'].setValue(0);
    this.bill.controls['TDS'].setValue(0);
    this.bill.controls['roundOff'].setValue(0);
    this.bill.controls['tax_type'].setValue(null);
    this.bill.controls['status'].setValue(1);
    this.router.navigate(['/purchase', 'bills']);
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

    this.loading=false;
    const formArray         = this.bill.get('product') as FormArray;
    const formArrayLength   = formArray.length;
    const formArrayControls = formArray.controls;
    for (let i = formArrayControls.length-1; i >= 1; i--)
    {
      const control = formArrayControls[i];
      formArray.removeAt(i);
    }
  }

  get product(): FormArray {
    return this.bill.get('product') as FormArray;
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

  async VendorSelection(id : any)
  {
    this.isDropdownAppendedToBody = false;
    this.formShow = false;
    this.vendor_id = id;
    this.select = true;
    const today = new Date();
    let date = today.toISOString().split('T')[0];
    this.bill.reset();
    this.bill.controls['vendorId'].setValue(id);
    this.bill.controls['created_by'].setValue(this.uid);
    this.bill.controls['billDate'].setValue(date);
    this.bill.controls['subTotal'].setValue(0);
    this.bill.controls['shippingCharge'].setValue(0);
    this.bill.controls['TCS'].setValue(0);
    this.bill.controls['TDS'].setValue(0);
    this.bill.controls['roundOff'].setValue(0);
    this.bill.controls['tax_type'].setValue(null);
    this.bill.controls['status'].setValue(1);
    this.bill.controls['tds_percentage'].setValue(0);
    this.bill.controls['tcs_percentage'].setValue(0);
    const formArray         = this.bill.get('product') as FormArray;
    const formArrayLength   = formArray.length;
    const formArrayControls = formArray.controls;

    for (let i = formArrayControls.length-1; i >= 1; i--)
    {
      const control = formArrayControls[i];
      formArray.removeAt(i);
    }

    this.formShow = false;
    this.vendor_id = id;
    await this.api.get('mp_bill.php?&value=' + this.vendor_id + '&authToken=' + environment.authToken).then((data: any) =>
      {

        this.FetchAddress(data[0]);

        this.company_name    = data[0].company_name;
        this.notes           = data[0].notes;
        this.terms_condition = data[0].terms_condition;
        this.stateCode       = data[0].place_from_supply_code;
        this.payment_terms   = data[0].payment_terms;
        let MyPaymentTerm    = data[0].my_payment_terms;
        let bill_id          = data[0].serial_no + 1;
        var prifix           = data[0].prefix ;
        this.bill_no         = bill_id;
        this.taxempty        = data[0].tax_mode;

        this.bill.controls['paymentTerms'].setValue(MyPaymentTerm)
        const today = new Date();
        let date = today.toISOString().split('T')[0];

       if(MyPaymentTerm != null)
        this.dueDates(MyPaymentTerm, date);

        if(this.stateCode == 33)
        {
          this.LoadGST('GST');
          this.bill.controls['tax_type'].setValue("GST");
        }
        else
        {
          this.LoadGST('IGST');
          this.bill.controls['tax_type'].setValue("IGST");
        }
      }).catch(error => { this.toastrService.typeError('Something went wrong 1'); });
        this.vendor_address(this.vendor_id)
  }

  async LoadGST(mode:any)
  {
    await this.api.get('get_data.php?table=tax&find=type&value=' + mode + '&authToken=' + environment.authToken).then((data: any) =>
    {
      this.GST_Data   = data;
      this.tax_list   = data;
      this.GST_Length = data.length;
    }).catch(error => { this.toastrService.typeError('Something went wrong'); });

    for(let m = 0; m < this.GST_Length; m++)
      {
        this.GST_Data[m]['amount'] = 0;
      }
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
          this.bill.controls['billFrom'].setValue(this.billFrom);

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
       this.bill.controls['shipFrom'].setValue(this.shipFrom);

      }
    }
  }


  onInputChange()
  {
    const billNoValue = this.bill_no;
    let value = this.VendorBillList.find((item: { bill_number: any; }) => item.bill_number === billNoValue);

       if(value != undefined)
       {
        this.toastrService.typeError('Bill number has already been entered')
       }
       if(value == undefined)
       {
       }
  }

  Billdate(a: any)
  {
    this.dueDateChange();
    this.billDate  = a;
    var current       = new Date(this.billDate);
    this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
    this.fullDate     = this.followingDay.toISOString().substring(0, 10);
  }

  dueDates(s: any, BillDate: any)
  {

    if(s != 0)
    {}
    else{
      this.toastrService.typeWarning('Date was not selected ')
    }
      this.dueValues    = s;
      var current       = new Date(this.billDate || BillDate);
      this.followingDay = new Date(current.getTime() + (this.dueValues * 24 * 60 * 60 * 1000));
      this.fullDate     = this.followingDay.toISOString().substring(0, 10)
  }

  dueDateChange()
  {
    this.bill.controls["paymentTerms"].setValue(this.payment_terms);
  }

  initProduct()
  {
    let product = this.bill.get('product') as FormArray;
    product.push(this.fb.group({
      items       : new FormControl('',Validators.required),
      descriptions: new FormControl(''),
      taxes       : new FormControl('', Validators.required),
      price       : new FormControl('', Validators.required),
      quantity    : new FormControl('', Validators.required),
      amount      : new FormControl('', Validators.required),
      uom         : new FormControl('', Validators.required),
      customer_id : new FormControl(''),
    }))
  }

  patchValues(id: any,i: any)
  {
    let x = (<FormArray>this.bill.controls['product']).at(i);
    x.patchValue({
      taxes    : this.taxes,
      price    : this.price,
      quantity : this.quantity,
      amount   : this.amount,
      descriptions : this.descriptions,
      uom      : this.uom
    });
  }

  async specItem(item:any,i: any)
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
        this.price        = data[0].price;
        this.quantity     = 1;
        this.amount       = data[0].price;
        this.descriptions = data[0].description;
        this.uom          = data[0].uom;
   }).catch(error => { this.toastrService.typeError('Something went wrong'); });

    const formData = {
      taxes: item,
    }

    this.patchValues(item,i);
    this.SubTotalChange(i);
    this.GSTCalculation(i);
  }

  SubTotalChange(i: any)
  {
    let arr = this.bill.controls['product'].value;
    let sum: number = arr.map((a: { amount: any; }) => a.amount).reduce(function(a: any, b: any)
    {
      return a + b;
    });
    this.subtotal=sum;
    this.bill.controls['subTotal'].setValue((sum).toFixed(2));
    this.FinalTotalCalculation();
    this.GSTCalculation(i);
    this.tdsCalculation();
    this.tcsCalculation();
  }

  tdsCalculation()
  {
     let tds =  ((this.subtotal+this.total_tax)*(this.tds_percent/100)).toFixed(2);
     this.bill.controls['TDS'].setValue(tds);
     this.FinalTotalCalculation();
  }

  tcsCalculation()
  {
    let tcs =  ((this.subtotal+this.total_tax)*(this.tcs_percent/100)).toFixed(2);
    this.bill.controls['TCS'].setValue(tcs);
    this.FinalTotalCalculation();
  }

  FinalTotalCalculation()
  {
    let Sub_Total       = this.bill.controls['subTotal'].value;
    let TDS_Value       = this.bill.controls['TDS'].value;
    let TCS_Vale        = this.bill.controls['TCS'].value;
    let Shipping_Value  = this.bill.controls['shippingCharge'].value;
    let Roundof_Value   = this.bill.controls['roundOff'].value;

    let TotalGST: number = this.GST_Data.map((a: { amount: any; }) => a.amount).reduce(function(a: any, b: any)
    {
      return a + b;
    });
    let Total_Calculation =  Number(Sub_Total) - Number(TDS_Value) + Number(TCS_Vale) + Number(Shipping_Value) + Number(Roundof_Value)+ Number(TotalGST);
    this.bill.controls['total'].setValue((Total_Calculation).toFixed(2));
  }

  GSTCalculation(i:any) {

    this.GST_Data.forEach((data: { amount: number; }) => {
      data.amount = 0;
    });
    this.total_tax  = 0;
    let products = (<FormArray>this.bill.controls['product']).value;
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
    this.FinalTotalCalculation();
  }

  GSTCalculation_tax(value: string,j: any)
  {
    this.taxes     = parseInt(value);

    let y = (<FormArray>this.bill.controls['product']).at(j);
    y.patchValue({
      taxes        : this.taxes,
     })

    this.SubTotalChange(j);
    this.GSTCalculation(j);
    this.FinalTotalCalculation();
  }

  qty(qty: any, price: any, i: any)
  {
    this.amount = qty * price;
    let x = (<FormArray>this.bill.controls['product']).at(i);
    x.patchValue({
      amount : this.amount
    });
    this.SubTotalChange(i);
  }

  priceChange(qty: any, price: any, i: any)
  {
    this.amount = qty * price;
    let x       = (<FormArray>this.bill.controls['product']).at(i);
    x.patchValue({
      amount : this.amount
    });
    this.SubTotalChange(i);
  }
  onDeleteRow(rowIndex: number)
  {
    let product = this.bill.get('product') as FormArray;
    if (product.length > 1) {
      product.removeAt(rowIndex)
    } else {
      product.reset()
    }

  }

  // createImageFromBlob(image: Blob)
  // {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.imageToShow = reader.result;
  //   }, false);
  //   if (image)
  //   {
  //     reader.readAsDataURL(image);
  //   }
  // }

  set_zero()
  {
    this.selected = [];
  }

  removeEmployee(i: number)
  {
    let address = this.bill.get('products') as FormArray;
    address.removeAt(i);
  }

  // onSelect({ selected }) {
  //   this.selected.splice(0, this.selected.length);
  //   this.selected.push(...selected);
  // }


  onFocus($event: Event) {
    this.events.push({ name: '(focus)', value: $event });
  }
  onBlur($event: Event) {
    this.events.push({ name: '(blur)', value: $event });
  }
  onOpen() {
    this.events.push({ name: '(open)', value: null });
  }
  onClose() {
    this.events.push({ name: '(close)', value: null });
  }
  onAdd($event: any) {
    this.events.push({ name: '(add)', value: $event });
  }
  onRemove($event: any) {
    this.events.push({ name: '(remove)', value: $event });
  }
  onClear() {
    this.events.push({ name: '(clear)', value: null });
  }
  onScrollToEnd($event: any) {
    this.events.push({ name: '(scrollToEnd)', value: $event });
  }
  onSearch($event: any) {
    this.events.push({ name: '(search)', value: $event });
  }

  add_po()
  {
    this.show_new_bill = true;
    this.formShow      = true;
  }
  setzero()
  {
    this.show_new_bill = false;
    this.selected      = [];

  }

  AddSubmit(data:any)
  {
    this.type=data.dctype;
    this.loading = true;
    if(this.type != null)
    {
      this.add_po();
      this.api.get('get_data.php?table=item&find=purchase&value=1&authToken=' + environment.authToken).then((data: any) =>
        {
          this.ItemList = data;
        }).catch(error => { this.toastrService.typeError('Something went wrong in LoadItemDetails'); });
    }
    else{
      this.toastrService.typeError('Select any Type');
    }

     this.new_category_id.close();
     this.loading = false;
  }

  async onSubmit(bill_data :any)
  {

    Object.keys(this.bill.controls).forEach(field => {
      this.bill.get(field)?.markAsTouched({ onlySelf: true });
    });
    if (this.bill.valid)
    {
      const billNoValue = bill_data.dcNo;
         if(this.VendorBillList != null)
          {
           var value = this.VendorBillList.find((item: { bill_number: any; }) => item.bill_number === billNoValue);
          }
          else
          {
            value = undefined;
          }
         if(value != undefined)
         {
          this.toastrService.typeError('Bill number has already been entered')
         }
        if(value == undefined)
         {

            this.loading = true;
            await this.api.post('mp_bill_create.php?type=new_bill&authToken=' + environment.authToken, bill_data).then((data: any) =>
            {

              if (data.status == "success")
              {
                this.toastrService.typeSuccess('Bill Added Succesfully');
                this.loading = false;
                this.ReturnToList();
                this.router.navigate(['/purchase', 'bills']);
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


  async submit(updateAddress : any)
  {
      let id = this.editAddressId;
      this.loading = true;
      this.api.post('post_update_data.php?table=vendor_address&field=vendor_addr_id&value=' + id + '&authToken=' + environment.authToken, updateAddress).then((data_rt: any) => {
        if (data_rt.status == "success")
         {
          this.loading = false;
          this.toastrService.typeSuccess('Address Updated Succesfully');
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
                      this.bill.controls['billFrom'].setValue(this.billFrom);
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
                        this.bill.controls['shipFrom'].setValue(this.shipFrom);
                      }

                  }).catch(error => { this.toastrService.typeError('Something went wrong'); });
          const modalElement = this.edit_address.nativeElement;
          $(modalElement).modal('hide');
        }
        else { this.toastrService.typeError(data_rt.status); }
      }).catch(error => { this.toastrService.typeError('Vendor Address Update Failed!!');
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
              this.toastrService.typeSuccess('Vendor Address Added Succesfully');
              this.newAddress.reset();

              const modalElement = this.new_address.nativeElement;
              $(modalElement).modal('hide');
            }
            else { this.toastrService.typeError(data_rt.status);
                this.loading=false;}

          }).catch(error => { this.toastrService.typeError('Vendor Address Added Failed!!');
              this.loading=false; });
        }
        else{
          this.toastrService.typeError('Please Fill the Details!');
        }
    }

    vendor_address(id: any)
    {

      this.api.get('get_data.php?table=vendor_address&find=vendor_id&value=' + id + '&find1=type&value1=1&authToken=' + environment.authToken).then((data: any) => {
          this.alldata = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong'); });

       this.api.get('get_data.php?table=vendor_address&find=vendor_id&value=' + id + '&find1=type&value1=2&authToken=' + environment.authToken).then((data: any) => {
         this.alldata1 = data;
       }).catch(error => { this.toastrService.typeError('Something went wrong'); });

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
        this.bill.controls['billFrom'].setValue(this.billFrom);

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
        this.bill.controls['shipFrom'].setValue(this.shipFrom);

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

    stateList()
    {
      this.api.get('get_data.php?table=state_code&authToken=' + environment.authToken).then((data: any) => {

        this.state_list = data
      }).catch(error => { this.toastrService.typeError('Something went wrong'); });
    }

    openpop()
    {
      this.category()
      const modalElement = this.add_item.nativeElement;
      $(modalElement).modal('show');
    }

    async category()
    {
      await this.api.get('get_data.php?table=item_category&find=status&value=1&authToken=' + environment.authToken).then((data: any) =>
      {
            this.category_list = data;
      }).catch(error => { this.toastrService.typeError('Something went wrong in LoadCustomerDetails'); });

      await this.api.get('get_data.php?table=unit&authToken=' + environment.authToken).then((data: any) =>
        {
              this.uom_list = data;
        }).catch(error => { this.toastrService.typeError('Something went wrong in LoadCustomerDetails'); });
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
                  this.LoadItemDetails();
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
}
