/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../../core/services/api/api.service";
import { environment } from "../../../../../environments/environment";
import { ToasterService } from 'src/app/core/core.index';
import { paymentmade_list } from './payment-view-models';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ImgToBase64Service } from "src/app/core/services/image/img-to-base64.service";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


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
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.scss']
})
export class PaymentViewComponent implements OnInit {

  [x: string]           :any;
  selected              :any[] = [];
  paymentlist           :Array<paymentmade_list> =[];
  payment_tran_list     :Array<paymentmade_list> =[];

  select_data         :any;
  bill_attention      :any;
  address_line_1      :any;
  address_line_2      :any;
  bill_city           :any;
  bill_zip_code       :any;
  gst_number          :any;
  mobile              :any;
  payment_date        :any;
  reference           :any;
  payment_mode        :any;
  amount_received     :any;
  company_name        :any;
  bill_address_line_1 :any;
  bill_address_line_2 :any;
  city                :any;
  zip_code            :any;
  bill_phone          :any;
  invoice_no          :any;
  invoice_date        :any;
  invoice_amount      :any;
  payment_amount      :any;
  onload_data         :any;
  amount              :any;
  fontFace            :any;
  receipt_no          :any;
  docDefinition       :any;

  select_id          = localStorage.getItem('select_id');
  ColumnMode         = ColumnMode;
  SelectionType      = SelectionType;
  imageToShow        !: string | ArrayBuffer|null;
  imgUrl             = '../../../assets/img/logo/logo.png';

  constructor(private api: ApiService, public toastrService: ToasterService,private imgToBase64: ImgToBase64Service) {  }

  ngOnInit() {

    this.Loadpaymentlist();
    this.Loadselectdata();
    this.getImageFromService();

  }

  async Loadselectdata()
  {
    await this.api.get('mp_payment_made.php?tran_id='+this.select_id+'&authToken=' + environment.authToken).then((data: any) =>
    {
      this.onload_data = data;
      this.databind(this.onload_data)
    }).catch(error => { this.toastrService.typeError('Something went wrong in PaymentMade'); });
  }
  async Loadpaymentlist()
  {
    await this.api.get('mp_payment_made.php?&authToken=' + environment.authToken).then((data: any) =>
    {

      this.paymentlist = data;

      data.map((res: paymentmade_list, index: number) => {

       this.payment_tran_list.push(res);

    })
      const selectedId  = this.select_id;
      const selectedRow = this.paymentlist.find((item: { tran_id: any; }) => item.tran_id == selectedId);
if (selectedRow) {

    this.selected.push(selectedRow);
    setTimeout(() => this.scrollToSelectedRow(this.select_id), 500);
}

    }).catch(error => { this.toastrService.typeError('Something went wrong in payment transaction list'); });
  }


  scrollToSelectedRow(selectedId:any) {
    const uniqueId = `bill-row-${selectedId}`;
    const selectedRow = document.getElementById(uniqueId);
    if (selectedRow) {
      selectedRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async download()
  {

     this.api.get('mp_payment_made.php?tran_id='+this.select_id+'&authToken=' + environment.authToken).then((data: any) =>
    {
      this.onload_data = data;
      this.pdfDownload(data);
    }).catch(error => { this.toastrService.typeError('Something went wrong in LoadDownload'); });

  }

  onActivate(event :any)
  {
    if(event.type=="click")
    {

     this.select_data      = event.row.tran_id;
     this.onload_data      = event.row;
     this.company_name     = event.row.company_name;
     this. address_line_1  = event.row.address_1;
     this. address_line_2  = event.row.address_2;
     this. city            = event.row.city;
     this. zip_code        = event.row.zip_code;
     this. gst_number      = event.row.gst_number;
     this. mobile          = event.row.mobile;
     this.payment_date     = event.row.tran_date;
     this.reference        = event.row.reference;
     this.payment_mode     = event.row.tran_type;
     this.amount_received  = event.row.credit;
     this.bill_address_line_1=event.row.bill_address_line_1;
     this.bill_address_line_2=event.row.bill_address_line_2;
     this.bill_city        = event.row.bill_city;
     this. bill_zip_code   = event.row.bill_zip_code;
     this.bill_phone       = event.row.bill_phone;
     this.bill_attention   = event.row.bill_attention;
     this.invoice_no       = event.row.bill_number;
     this.invoice_date     = event.row.tran_date;
     this.invoice_amount   = event.row.total;
     this.payment_amount   = event.row.credit;
     this.receipt_no       = event.row.receipt_no;
    }
  }

  onSelect(event :any)
  {

   this.selected = [event.selected[0]]

  }

  onclick(row:any)
  {

  }

  databind(data :any)
  {
    this.company_name      = data[0].company_name;
    this.address_line_1    = data[0].address_1;
    this.address_line_2    = data[0].address_2;
    this.city              = data[0].city;
    this.zip_code          = data[0].zip_code;
    this.gst_number        = data[0].gst_number;
    this.mobile            = data[0].mobile;
    this.payment_date      = data[0].tran_date;
    this.reference         = data[0].reference;
    this.payment_mode      = data[0].tran_type;
    this.amount_received   = data[0].credit;
    this.bill_address_line_1=data[0].bill_address_line_1;
    this.bill_address_line_2=data[0].bill_address_line_2;
    this.bill_city         = data[0].bill_city;
    this.bill_zip_code     = data[0].bill_zip_code;
    this.bill_phone        = data[0].bill_phone;
    this.bill_attention    = data[0].bill_attention;
    this.invoice_no        = data[0].bill_number;
    this.invoice_date      = data[0].tran_date;
    this.invoice_amount    = data[0].total;
    this.payment_amount    = data[0].credit;
    this.receipt_no        = data[0].receipt_no;
    this.amount='₹'+this.amount_received

  }


  getImageFromService() {
    this.imgToBase64.imgToString(this.imgUrl).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }


async pdfDownload(files :any) {

  const paidAmount    = '₹' + this.amount_received.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const invoiceAmount = '₹' + this.invoice_amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  const paymentAmount = '₹' + this.payment_amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');

  this.docDefinition = {
    info: {
      title: "Receipt",
    },
    content: [
      {
        columns: [
          { text: ' ' ,margin: [50, 0] },
            { text: 'PAYMENT RECEIPT', style: 'header', alignment: 'center' },
            { text: ' ' ,margin: [0, 10] },

        ],
      },
      {
        columns: [
          {
            width: '*',

            stack: [
              { image: this.imageToShow, width: 160 },
              { text: '', width: 300 },
            ]
          },
          {
            stack: [
              { text: 'GST No: ' + this.gst_number, bold: true,  },
              { text: this.company_name, bold: true, color: 'blue',margin: [0, 1] },
              { text: this.address_line_1 ,fontSize:11,margin: [0, 1]},
              { text: this.address_line_2 ,fontSize:11,margin: [0, 1]},
              { text:  this.city + '-' + this.zip_code ,fontSize:11,margin: [0, 1]},
            ]
          },
        ],
        columnGap: 90
      },

      { text: ' ' },

      { text: ' ' ,margin: [0, 10] },
      {
        columns: [

          [
            { text: 'Paid To  ',  bold: true ,margin: [0, 1]},
            { text: this.bill_attention, bold: true ,margin: [0, 1]},
            { text:this.bill_address_line_1,fontSize: 10,margin: [0, 1]},
            { text: this.bill_address_line_2, fontSize: 10,margin: [0, 1] },
            { text: this.bill_city + '-' + this.bill_zip_code, fontSize: 10, margin: [0, 1] },
            { text: this.bill_phone, fontSize: 10,margin: [0, 1] },

          ],

          // [
          //   { text: 'Ship To   ',  bold: true ,margin: [0, 1]},
          //   { text: this.bill_attention, bold: true ,margin: [0, 1]},
          //   { text:this.bill_address_line_1,fontSize: 10,margin: [0, 1]},
          //   { text: this.bill_address_line_2, fontSize: 10,margin: [0, 1] },
          //   { text: this.bill_city + '-' + this.bill_zip_code, fontSize: 10,margin: [0, 1]  },
          //   { text: this.bill_phone, fontSize: 10,margin: [0, 1] },
          // ],
          [
            {
              table : {
                body: [
                    [
                      { text: 'Receipt #            ', fontSize: 10, bold: true, border: [false, false, false, false]},
                      { text: this.receipt_no, fontSize: 10 ,width:14,border: [false, false, false, false]},
                    ],
                    [
                      { text: 'Payment Date       ', fontSize: 10, bold: true ,border: [false, false, false, false]},
                      { text: this.payment_date, fontSize: 10 , width:14,border: [false, false, false, false]},
                    ],
                   [
                      { text: 'Reference #      ', fontSize: 10, bold: true, border: [false, false, false, false] },
                      { text: this.reference, fontSize: 10,width:14, border: [false, false, false, false] },
                   ],
                   [
                    { text: 'Payment Mode    ', fontSize: 10, bold: true, border: [false, false, false, false] },
                    { text: this.payment_mode, fontSize: 10,width:14 ,border: [false, false, false, false]  },
                   ]
                ],
                border: undefined
              }
            }
          ],
        ],
        columnGap: 11
      },

      { text: ' ',margin: [0, 10]  },
      { text: 'Payment for', style: 'subheader',margin: [0, 15] },
      {
        table: {
          widths: [120, 120, 120, 120],
          body: [
            [
              { text: 'Bill Number', fillColor: 'lightgray', border: [false, true, false, true], fontSize: 12, bold: true, alignment: 'center' },
            { text: 'Bill Date', fillColor: 'lightgray', border: [false, true, false, true], fontSize: 12, bold: true, alignment: 'center' },
            { text: 'Bill Amount', fillColor: 'lightgray', border: [false, true, false, true], fontSize: 12, bold: true, alignment: 'center' },
            { text: 'Payment Amount', fillColor: 'lightgray', border: [false, true, false, true], fontSize: 12, bold: true, alignment: 'center' },

            ],
            [
              { text: this.invoice_no, fontSize: 12, alignment: 'center',border: [false, false, false, false] },
              { text: this.invoice_date, fontSize: 12, alignment: 'center',border: [false, false, false, false] },
              { text: invoiceAmount, fontSize: 12, alignment: 'center',border: [false, false, false, false] },
              { text: paymentAmount, fontSize: 12, alignment: 'center',border: [false, false, false, false] },
            ],
          ]
        },
      }
    ],
    defaultStyle: {
      font: 'Roboto',
    },
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        alignment: 'center',

      },
      subheader: {
        fontSize: 12,
        bold: true,
      },
      square: {
        width: 150,
        height: 150,
        display: 'flex',
        fillColor: '#80a376f8',
        margin: [0, 0, 50, 0],
        color: '#fff',
        alignment: 'center',
      }
    },
  };
  pdfMake.createPdf(this.docDefinition).open();
  // pdfMake.createPdf(docDefinition).download("invoice.pdf");

}

}
