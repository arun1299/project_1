/* eslint-disable no-self-assign */
/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators ,FormsModule} from '@angular/forms';
import { pageSelection } from 'src/app/core/models/models';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Customer } from './customer-models';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { ToasterService, routes } from 'src/app/core/core.index';
import { Sort } from '@angular/material/sort';
import { TableElement } from 'src/app/shared/TableElement';
import { TableExportUtil } from 'src/app/shared/tableExportUtil';
import { ToastrService } from 'ngx-toastr';

routes
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {

  @ViewChild('cardElement')cardElement!: ElementRef;

  [x: string]: any;
  customer_list : Array<Customer> =[];
  dataSource   !: MatTableDataSource<Customer>;
  public searchDataValue = '';
  public routes =routes;
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


  selected           = [];
  category_filter    = [];

  select_id          : any;
  update_categogy_id : any;
  new_category_id    : any;
  uom_list           : any;
  tax_list           : any;
  category           : any;
  cus_name           : any;
  gstin_number       : any;

  public uid                = localStorage.getItem('uid');
  public can_view           = localStorage.getItem('can_view');
  public can_edit           = localStorage.getItem('can_edit');
  public can_delete         = localStorage.getItem('can_delete');

  public customer        !: FormGroup;
  public address         !: FormGroup;
  public updateAddress   !: FormGroup;
  public customer_data   !: FormGroup;
  public contact_details !: FormGroup;
  public editCustDetail  !: FormGroup;
  public updateContact   !: FormGroup;
  public newaddress      !: FormGroup;
  public addcontact      !: FormGroup;
  public Edit_data       !: FormGroup;

  addAddress       : any;
  addcontact_popup : any;
  editAddress      : any;
  customerName     : any;
  Upl_cust_img     : any;
  file             : any;
  stateName        : any;
  customerDetails  : any;
  paymentTerm      : any;
  customers        : any;
  customer_details : any;
  cust_image       : any;
  img_path         : any;
  updateCustomer   : any;
  cust_id          : any;
  addressChange    : any;
  name             : any;
  address_line_1   : any;
  address_line_2   : any;
  city             : any;
  state            : any;
  zipcode          : any;
  mobile           : any;
  status           : any;
  editAddressId    : any;

  shipAttention    : any;
  shipAddress1     : any;
  shipAddress2     : any;
  shipCity         : any;
  shipState        : any;
  shipZip          : any;
  shipPhone        : any;
  shipFax          : any;
  detail_view      : any;
  customer_address : any;
  customer_bill_address: any;
  customer_id      : any;
  customerType     : any;
  tax_exemption    : any;
  tax_mode         : any;
  pan_number       : any;
  web_site         : any;
  place_of_supply  : any;
  opening_balance  : any;
  terms_condition  : any;
  remarks          : any;
  notes            : any;
  logo             : any;
  pan              : any;
  placeOfSupply    : any;
  public image     : any;
  steps            : any;
  customer_contact : any;
  type             : any;
  udyam_register   : any;
  udyam_no         : any;

  editContactId    : any;
  editcontact      : any;
  contactChange    : any;
  prefix           : any;
  fname            : any;
  lname            : any;
  email            : any;
  workphone        : any;
  edit_name        : any;
  paymentterm      : any;
  payment_term_name: any;
  contact_no       : any;
  mobile_no        : any;
  gst_number       : any;
  edit_id          : any;
  select_data      : any;

  udyam_reg        : boolean = false;
  gst_submit       : Boolean = false;
  name_submit      : Boolean = false;
  pan_submit       : Boolean = false;
  edit_show        : Boolean = false;
  submitted        : boolean = false;
  customerType1    : boolean = true;
  panhide          : boolean = true;
  statehide        : boolean = true;
  imgStatus        : boolean = true;
  loading          : boolean = false;
  gstview          : boolean = true;
  gstuin           : boolean = true;
  change           : boolean = true;
  stateShow        : boolean = true;
  public showConfirm!: boolean;

  edit_form        = false;
  taxRate          = false;
  taxRate1         = false;
  taxfills         = false;
  taxfills1        = false;
  emptyTax         = false;
  show             = true;
  gstDetails       = [];
  temp             = [];
  rows             = [];
  index_value      = 0 ;
  public details   : any = {contacts: []};

  constructor(public api: ApiService, public toastService: ToasterService,private fb: FormBuilder,public ngToast : ToastrService)
  {

      this.customer_data = this.fb.group({
        'created_by'     : [this.uid],
        'type'           : ['1'],
        'customerType'   : ['distributor'],
        'salutation'     : ['Mr'],
        'Name'           : ['', Validators.required],
       'companyName'     : ['', Validators.required],
       'email'           : ['',Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
       'phone'           : [null],
       'mobile'          : [null],
       'website'         : [null],
       'gstTreatment'    : ['1'],
       'gstin'           : [null],
       'udyam_registration':[null],
       'udyam_no'        : [null],
       'pan'             : ['', Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")])],
       'placeOfSupply'   : [null],
       'taxType'         : ['1'],
       'taxEmpty'        : [null],
       'paymentTerms'    : [null],
       'opening_balance' : [0],
       'terms_condition' : [null],
       'remarks'         : [null],
       'notes'           : [null],
       'customerStatus'  : [1],
       'billAttention'   : ['', Validators.required],
      'billAddress1'     : ['', Validators.required],
      'billAddress2'     : ['', Validators.required],
      'billCity'         : ['', Validators.required],
      'billState'        : ['TAMIL NADU'],
      'billZip'          : ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
      'billPhone'        : [null, Validators.compose([Validators.required])],
      'billDefault'      : [1],
      'billType'         : [1],
      'billStatus'       : [1],
      'shipAttention'    : [this.shipAttention,Validators.required],
      'shipAddress1'     : [this.shipAddress1,Validators.required],
      'shipAddress2'     : [this.shipAddress2,Validators.required],
      'shipCity'         : [this.shipCity,Validators.required],
      'shipState'        : [this.state,Validators.required],
      'shipZip'          : [this.zipcode,Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
      'shipPhone'        : [this.mobile,Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      'shipType'         : [2],
      'shipDefault'      : [1],
      'shipStatus'       : [1],
      'contactStatus'    : [1],
      address  : this.fb.array([]),
      contacts : this.fb.array([])
     } );


     this.Edit_data = this.fb.group({

      'type'           : ['1'],
      'customerType'   : ['distributor'],
      'salutation'     : ['Mr'],
      'Name'           : ['', Validators.required],
     'companyName'     : ['', Validators.required],
     'email'           : ['',Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
     'phone'           : ['',Validators.compose([Validators.required])],
     'mobile'          : [null],
     'website'         : [null],
     'gstTreatment'    : ['1'],
     'gstin'           : [null],
     'udyam_registration':[null],
     'udyam_no'        :[null],
     'pan'             : ['', Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")])],
     'placeOfSupply'   : [null],
     'taxType'         : ['1'],
     'taxEmpty'        : [null],
     'paymentTerms'    : [null],
     'opening_balance' : [0],
     'terms_condition' : [null],
     'remarks'         : [null],
     'notes'           : [null],
     'customerStatus'  : [null],
     'bill_addr_id'    : [null],
     'billAttention'   : ['', Validators.required],
    'billAddress1'     : ['', Validators.required],
    'billAddress2'     : ['', Validators.required],
    'billCity'         : ['', Validators.required],
    'billState'        : [null],
    'billZip'          : ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
    'billPhone'        : [null, Validators.compose([Validators.required])],
    'billDefault'      : [null],
    'billType'         : [null],
    'billStatus'       : [null],
    'ship_addr_id'     : [null],
    'shipAttention'    : [this.shipAttention,Validators.required],
    'shipAddress1'     : [this.shipAddress1,Validators.required],
    'shipAddress2'     : [this.shipAddress2,Validators.required],
    'shipCity'         : [this.shipCity,Validators.required],
    'shipState'        : [this.state,Validators.required],
    'shipZip'          : [this.zipcode,Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")])],
    'shipPhone'        : [this.mobile,Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
    'shipType'         : [2],
    'shipStatus'       : [null],
    'ship_default'     : [null],
    'contactStatus'    : [1],
     contacts_edit     : this.fb.array([])
   } );


  }

ngOnInit(): void {
  this.getTableData();
}

 async getTableData()
  {
  this.customer_list         = [];
  this.serialNumberArray     = [];
  this.pageNumberArray       = [];

   await this.api.get('mp_customer_info.php?&authToken=' + environment.authToken).then((data: any) =>
      {
        let value :  Customer[] = [];
        this.customers     = data.customer_info;
        this.stateName     = data.state_code
        this.paymentTerm   = data.payment_terms;
        if(data != null)
        {
            this.totalData = data.customer_info.length;
            data.customer_info.map((res: Customer, index: number) => {
                  const serialNumber = index + 1;
                if (index >= this.skip && serialNumber <= this.limit) {
                  res.id = serialNumber;
                  this.customer_list.push(res);
                  this.serialNumberArray.push(serialNumber);

                  }
                  res.id = serialNumber;
                  value.push(res)
            });
            this.calculateTotalPages(this.totalData, this.pageSize);
            this.dataSource = new MatTableDataSource<Customer>(this.customer_list);
        }
        else{
          this.toastService.typeWarning('No Data  Customer list');
        }
      }).catch(error => {
        this.toastService.typeError('API Faild : loadData  Customer list');
      });
}

public searchData(value: any): void {
  this.dataSource.filter = value.trim().toLowerCase();
  this.totalData = this.dataSource.filteredData.length;
  this.callData()
}

async callData()
{
  this.customer_list = [];
 
  await this.dataSource.filteredData.map((res: Customer, index: number) =>
    {
    const serialNumber = index + 1;

    if (index >= this.skip && serialNumber <= this.limit) {
      res.id = serialNumber;
      this.customer_list.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });

  this.calculateTotalPages(this.dataSource.filteredData.length, this.pageSize);
}

public sortData(sort: Sort) {
  const data = this.customer_list.slice();
  if (!sort.active || sort.direction === '') {
    this.customer_list = data;
  } else {
    this.customer_list = data.sort((a, b) => {
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
       '#'    : x.id,
       Name   : x.company_name,
       Type   : x.customer_type,
       PAN    : x.gst_number,
      "Terms & Condition" : x.terms_condition,
       "Opening Balance"  : x.opening_balance,
    }));

  TableExportUtil.exportToExcel(exportData, 'Customer List');
 }

//   open() {
//    this.Toggledata = !this.Toggledata;
//  }

addCustomer()
  {
    this.gstin_number = null;
    this.pan          = null;
    this.placeOfSupply= null
    this.show = false;
  }

  onRowClick(row : any)
  {
    console.log(row)
    this.gstin_number = null;
    this.pan          = null;
    this.placeOfSupply= null;
    this.select_data = row
    this.customer_id = row.customer_id;
    this.Edit_data.controls['type'].setValue(row.type);
    this.Edit_data.controls['customerType'].setValue(row.customer_type)
    this.Edit_data.controls['salutation'].setValue('Mr');
    this.Edit_data.controls['Name'].setValue(row.name);
    this.Edit_data.controls['companyName'].setValue(row.company_name);
    this.Edit_data.controls['email'].setValue(row.email);
    this.Edit_data.controls['phone'].setValue(row.contact_number);
    this.Edit_data.controls['mobile'].setValue(row.mobile_number);
    this.Edit_data.controls['website'].setValue(row.web_site);
    this.Edit_data.controls['gstTreatment'].setValue(row.gst_type);
    this.Edit_data.controls['gstin'].setValue(row.gst_number);
    this.Edit_data.controls['udyam_registration'].setValue(row.udyam_registration);
    this.Edit_data.controls['udyam_no'].setValue(row.udyam_number);
    this.Edit_data.controls['gstin'].setValue(row.gst_number);
    this.Edit_data.controls['pan'].setValue(row.pan_number);
    this.Edit_data.controls['placeOfSupply'].setValue(row.place_of_supply_code);
    this.Edit_data.controls['taxType'].setValue(row.tax_mode);
    this.Edit_data.controls['taxEmpty'].setValue(row.tax_exemption);
    this.Edit_data.controls['paymentTerms'].setValue(row.payment_term);
    this.Edit_data.controls['opening_balance'].setValue(row.opening_balance);
    this.Edit_data.controls['terms_condition'].setValue(row.terms_condition);
    this.Edit_data.controls['remarks'].setValue(row.remarks);
    this.Edit_data.controls['notes'].setValue(row.notes);
    this.Edit_data.controls['customerStatus'].setValue(row.status);
    this.Edit_data.controls['billAttention'].setValue(row.bill_attention);
    this.Edit_data.controls['billAddress1'].setValue(row.bill_address_line1);
    this.Edit_data.controls['billAddress2'].setValue(row.bill_address_line2);
    this.Edit_data.controls['billCity'].setValue(row.bill_city);
    this.Edit_data.controls['billState'].setValue(row.bill_state);
    this.Edit_data.controls['billZip'].setValue(row.bill_pincode);
    this.Edit_data.controls['billPhone'].setValue(row.bill_phone);
    this.Edit_data.controls['billDefault'].setValue(row.bill_default);
    this.Edit_data.controls['bill_addr_id'].setValue(row.bill_addr_id);
    this.Edit_data.controls['billStatus'].setValue(1);
    this.Edit_data.controls['shipAttention'].setValue(row.ship_attention);
    this.Edit_data.controls['shipAddress1'].setValue(row.ship_address_line1);
    this.Edit_data.controls['shipAddress2'].setValue(row.ship_address_line2);
    this.Edit_data.controls['shipCity'].setValue(row.ship_city);
    this.Edit_data.controls['shipState'].setValue(row.ship_state);
    this.Edit_data.controls['shipZip'].setValue(row.ship_pincode);
    this.Edit_data.controls['shipPhone'].setValue(row.ship_phone);
    this.Edit_data.controls['shipType'].setValue(2);
    this.Edit_data.controls['ship_default'].setValue(row.ship_default);
    this.Edit_data.controls['ship_addr_id'].setValue(row.ship_addr_id);
    this.Edit_data.controls['contactStatus'].setValue(1);
    this.shipAttention =  row.ship_attention
    this.shipAddress1  = row.ship_address_line1
    this.shipAddress2  = row.ship_address_line2
    this.shipCity      = row.ship_city
    this.shipState     = row.ship_state
    this.shipZip     = row.ship_pincode
    this.shipPhone     = row.ship_phone;

   this.gstin_number = row.gst_number;
   this.pan          = row.pan_number;
   this.placeOfSupply= row.place_of_supply_code

   if(row.gst_type === 1)
   {
    this.gstview = true
   }
   else{
    this.gstview = false
   }

   if(row.tax_mode === 0)
   {
     this.emptyTax = true;
   }
   else{
    this.emptyTax = false;
   }

   const product1 = this.Edit_data.get('contacts_edit') as FormArray;

   if (product1 != null) {
    product1.clear();
    }
    if( row.contact !== null)
    {
       this.index_value = 0;
      (row.contact).forEach((item:any,j: any) => {
        product1.push(this.fb.group({
          id           : [item.cust_cont_id],
          prefix       : [item.prefix],
          fname        : [item.first_name],
          lname        : [item.last_name],
          contactEmail : [item.email],
          workPhone    : [item.phone],
          mobile       : [item.mobile],
         }));
        });
    }
  }

  edit_removePerson_wizard(i:any)
  {
    let con = this.Edit_data.get('contacts_edit') as FormArray;
    con.removeAt(i);
  }

 edit_addPerson_wizard(prefix = "Mr.", fname = "", lname = "", contactEmail = "", workPhone = "", mobile = "")
  {
    let contacts_edit = this.Edit_data.get('contacts_edit') as FormArray;
    contacts_edit.push(this.fb.group(
      {
        prefix      : [prefix],
        fname       : [fname],
        lname       : [lname],
        contactEmail: [contactEmail,Validators.compose([ Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
        workPhone   : [workPhone,Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
        mobile      : [mobile,Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])]
    })
    );
  }

  get contacts_edit(): FormArray {
    return this.Edit_data.get('contacts_edit') as FormArray;
  }


  add_address(type = 1,name="", address_1 = "", address_2 = "", city = "", state = "", pin = "",contact="")
  {
    let address = this.customer_data.get('address') as FormArray;
    address.push(this.fb.group(
      {
        type           : [type],
        name           : [name],
        address_1      : [address_1],
        address_2      : [address_2],
        city           : [city],
        state          : [state],
        pin            : [pin],
        contact        : [contact]
    })
    );
  }
  get cust_address(): FormArray {
    return this.customer_data.get('address') as FormArray;
  }
  edit_view()
  {
    this.edit_form   = true;
    this.show        = false;
  }

 type1()
  {
    this.customerType1 = true;
    this.panhide       = true;
    this.statehide     = true;
    this.customer_data.controls['pan'].reset();
    this.customer_data.controls['placeOfSupply'].reset();
  }

  type2()
  {
    this.customerType1 = false;
    this.panhide       = false;
    this.statehide     = false;
    this.customer_data.controls['pan'].reset();
    this.customer_data.controls['placeOfSupply'].reset();
  }

 gstTreat(event :any)
  {
    let value :any = (event.target as HTMLSelectElement).value;
    if (value === "1")
    {
      this.gstview    = true;
    }
    else if (value === "0") {
      this.gstview    = false;
      this.panhide    = false;
      this.statehide  = false;
    }
  }


    getGstNo(gstNo:any)
    {
      let gst_no:any = (gstNo.target as HTMLSelectElement).value;
      this.placeOfSupply = gst_no.slice(0, 2);
      this.placeOfSupply = this.placeOfSupply;
      this.pan           = gst_no.slice(2, 12);
      this.pan           = this.pan;
      this.panhide       = false;
    }

   edit_getGstNo(gstNo:any)
    {

      let gst_no:any = (gstNo.target as HTMLSelectElement).value;
      this.placeOfSupply = gst_no.slice(0, 2);
      this.placeOfSupply = this.placeOfSupply;
      this.pan           = gst_no.slice(2, 12);
      this.pan           = this.pan;
      this.panhide       = false;
    }

   onInputChange()
   {
    let value :any;
     const billNoValue = this.cus_name;
     value   = this.customers.find((item: { company_name: any; }) => item.company_name === billNoValue);

        if(value != undefined)
        {
         this.toastService.typeError(' Customer Name has already been entered')
        }
        if(value == undefined)
        {
        }
   }

   onInput()
   {
    const gstvalue = this.gstin_number;
    if(this.gstin_number != null)
    {
        let value_1 = this.customers.find((item: { gst_number: any; }) => item.gst_number   === gstvalue);
        if(value_1 != undefined)
        {
          this.toastService.typeError(' GST NUmber has already been entered')
        }
    }
  }
   onInput_pan()
   {
    const panvalue = this.pan;
    if(this.pan != null)
    {
      let value = this.customers.find((item: { pan_number: any; }) => item.pan_number   === panvalue);

      if(value != undefined)
      {
        this.toastService.typeError(' PAN Number has already been entered')
      }
    }
   }

   taxEmpty()
   {
     this.emptyTax  = true;
   }

   taxEmpty1()
   {
     this.emptyTax  = false;
   }

   removePerson_wizard(i:any)
   {
     let con = this.customer_data.get('contacts') as FormArray;
     con.removeAt(i);
   }

   addPerson_wizard(prefix = "Mr.", fname = "", lname = "", contactEmail = "", workPhone = "", mobile = "")
   {

     let contacts = this.customer_data.get('contacts') as FormArray;
     contacts.push(this.fb.group(
       {
       prefix      : [prefix],
       fname       : [fname],
       lname       : [lname],
       contactEmail: [contactEmail,Validators.compose([ Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
       workPhone   : [workPhone,Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
       mobile      : [mobile,Validators.compose([ Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])]
     })
     );
   }

   myForm = new FormGroup(
    {
      type: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });

  fileChange(input:any) {
    const reader = new FileReader();
    if (input.files.length) {
      this.file = input.files[0].name;
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

   get f(): { [key: string]: AbstractControl } {
    return this.customer.controls;
  }

  get c(): { [key: string]: AbstractControl } {
    return this.updateAddress.controls;
  }

  get e() {
    return this.myForm.controls;
  }


get contacts(): FormArray {
  return this.customer_data.get('contacts') as FormArray;
}


  // get contacts() {
  //   return this.contact_details.get('contacts') as FormArray;
  // }
  taxview() {
    this.taxRate  = true
    this.taxRate1 = false
  }

  taxview1()
  {
    this.taxRate   = false;
    this.taxRate1  = true;
    this.taxfills  = false;
    this.taxfills1 = false;
  }

  taxfill()
  {
    this.taxfills  = true;
    this.taxfills1 = false;
    this.api.get('get_data.php?table=tax&authToken=' + environment.authToken).then((data: any) => {
      this.gstDetails = data;
    }).catch(error => { this.toastService.typeError('Something went wrong'); });
  }

  taxfill1()
   {
    this.taxfills1 = true;
    this.taxfills  = false;
    this.api.get('get_data.php?table=tax&authToken=' + environment.authToken).then((data: any) => {
      this.gstDetails = data;
    }).catch(error => { this.toastService.typeError('Something went wrong'); });
  }


  copyAddress()
  {
    let address = this.customer_data.value;
    this.shipAttention = address.billAttention;
    this.shipAddress1  = address.billAddress1;
    this.shipAddress2  = address.billAddress2;
    this.shipCity      = address.billCity;
    this.shipState     = address.billState;
    this.shipZip       = address.billZip;
    this.shipPhone     = address.billPhone;
    this.shipFax       = address.billFax;
  }

  copyAddress_edit()
  {
    let address = this.Edit_data.value;
    this.shipAttention = address.billAttention;
    this.shipAddress1  = address.billAddress1;
    this.shipAddress2  = address.billAddress2;
    this.shipCity      = address.billCity;
    this.shipState     = address.billState;
    this.shipZip       = address.billZip;
    this.shipPhone     = address.billPhone;
    this.shipFax       = address.billFax;
  }
  submit(event:Event)
  {

    Object.keys(this.customer_data.controls).forEach(field => {
      this.customer_data.get(field)?.markAsTouched({ onlySelf: true });
    });
        event.preventDefault();

    const billNoValue = this.cus_name;
    let value = this.customers.find((item: { company_name: any; }) => item.company_name === billNoValue);

       let value_1 :any
       let value_2 :any

    if(this.gstin_number != null )
    {
       const gstvalue = this.gstin_number;
       value_1 = this.customers.find((item: { gst_number: any; }) => item.gst_number   === gstvalue);
    }

    if(this.pan != null)
    {
    const panvalue = this.pan;
     value_2 = this.customers.find((item: { pan_number: any; }) => item.pan_number   === panvalue);
    }
      if(value != undefined)
      {
       this.toastService.typeError(' Company Name has already been entered')
      }

      if(value_1 != undefined  )
      {
       this.toastService.typeError(' GST Number has already been entered')
      }

      if(value_2 != undefined)
      {
        if(value_2 != null)
         this.toastService.typeError(' PAN Number has already been entered')
      }

      if(value == undefined)
      {
        if( value_1 == undefined)
        {
          if(value_2 == undefined)
          {
       if(this.customer_data.valid)
             {
                this.loading=true;
                 this.api.post('mp_customer_create.php?authToken=' + environment.authToken, this.customer_data.value ).then((data: any) => {
                    if (data.status == "success")
                    {
                      this.toastService.typeSuccess('Customer Added Succesfully');
                     // this.ngToast.success('Customer Added Succesfully', 'Success Message', {  positionClass: 'toast-bottom-right'  });
                      this.loading=false;
                      this.customer_data.controls['created_by'].setValue(this.uid);
                      this.customer_data.controls['type'].setValue('1');
                      this.customer_data.controls['customerType'].setValue('distributor')
                      this.customer_data.controls['salutation'].setValue('Mr');
                      this.customer_data.controls['Name'].setValue('');
                      this.customer_data.controls['companyName'].setValue('');
                      this.customer_data.controls['email'].setValue('');
                      this.customer_data.controls['phone'].setValue('');
                      this.customer_data.controls['mobile'].setValue('');
                      this.customer_data.controls['website'].setValue('');
                      this.customer_data.controls['gstTreatment'].setValue(1);
                      this.customer_data.controls['gstin'].setValue('');
                      this.customer_data.controls['pan'].setValue('');
                      this.customer_data.controls['placeOfSupply'].setValue('33');
                      this.customer_data.controls['taxType'].setValue('1');
                      this.customer_data.controls['taxEmpty'].setValue('');
                      this.customer_data.controls['paymentTerms'].setValue('1');
                      this.customer_data.controls['opening_balance'].setValue(0);
                      this.customer_data.controls['terms_condition'].setValue('');
                      this.customer_data.controls['remarks'].setValue('');
                      this.customer_data.controls['notes'].setValue('');
                      this.customer_data.controls['customerStatus'].setValue(1);
                      this.customer_data.controls['billAttention'].setValue('');
                      this.customer_data.controls['billAddress1'].setValue('');
                      this.customer_data.controls['billAddress2'].setValue('');
                      this.customer_data.controls['billCity'].setValue('');
                      this.customer_data.controls['billState'].setValue('TAMIL NADU');
                      this.customer_data.controls['billZip'].setValue('');
                      this.customer_data.controls['billPhone'].setValue('');
                      this.customer_data.controls['billDefault'].setValue(1);
                      this.customer_data.controls['billType'].setValue(1);
                      this.customer_data.controls['billStatus'].setValue(1);
                      this.customer_data.controls['shipAttention'].setValue('');
                      this.customer_data.controls['shipAddress1'].setValue('');
                      this.customer_data.controls['shipAddress2'].setValue('');
                      this.customer_data.controls['shipCity'].setValue('');
                      this.customer_data.controls['shipState'].setValue('');
                      this.customer_data.controls['shipZip'].setValue('');
                      this.customer_data.controls['shipPhone'].setValue('');
                      this.customer_data.controls['shipType'].setValue(2);
                      this.customer_data.controls['shipDefault'].setValue(1);
                      this.customer_data.controls['shipStatus'].setValue(1);
                      this.customer_data.controls['contactStatus'].setValue(1);

                      this.getTableData();
                      this.customerType1 = true;
                      this.emptyTax  = false;
                      this.show = true;
                      this.gstin_number = null;
                      this.pan          = null;
                      this.placeOfSupply= null
                    }
                    else {
                      this.toastService.typeError('Something went wrong');
                      this.ngToast.error('Something went wrong ', 'Error Message', {
                        positionClass: 'toast-bottom-right'
                      });
                      this.loading = false;
                    }
                    return true;
                  }).catch(error => {  this.ngToast.error('Something went wrong ', 'Error Message', {
                    positionClass: 'toast-bottom-right'
                  });
                      this.loading = false;});
             }
             else{
              this.ngToast.error('Fill the Details', 'Error Message', {
                positionClass: 'toast-bottom-right'
              });
             }
         }
        }
        this.scrollToCard();
    }
  }

  scrollToCard() {
    if (this.cardElement) {
      this.cardElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  cancel()
  {
    this.show      = true;
    this.edit_form = false;
  }

  edit_submit()
  {
      Object.keys(this.Edit_data.controls).forEach(field => {
        this.Edit_data.get(field)?.markAsTouched({ onlySelf: true });
      });
      if (this.Edit_data.valid)
        {
         this.loading=true;
          this.api.post('mp_customer_update.php?value='+this.customer_id+'&authToken=' + environment.authToken, this.Edit_data.value).then((data: any) =>
         {
           if (data.status == "success")
           {
             this.loading=false;
             this.toastService.typeSuccess('Customer Updated Succesfully');
             this.getTableData();
             this.show = true;
             this.edit_form = false;
             this.Edit_data.reset();
           }
            else {
             // this.toastService.typeError('Something went wrong');
             this.ngToast.error('Something went wrong ', 'Error Message', {
             positionClass: 'toast-bottom-right'});
           this.loading=false; }
           return true;
         }).catch(error =>
           {
            this.ngToast.error('Something Went wrong', 'Error Message', {
              positionClass: 'toast-bottom-right'
            });
           this.loading=false;
         });
       }
  }


  udyam(event : any)
  {
     if(event.target.value == 1)
      {
         this.udyam_reg = true ;
      }
      if(event.target.value == 0)
        {
           this.udyam_reg = false ;
        }
  }
}


