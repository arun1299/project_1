/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToasterService } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
declare let $: any;


@Component({
  selector: 'app-prifix_setting',
  templateUrl: './prifix_setting.component.html',
  styleUrls: ['./prifix_setting.component.scss']
})
export class Prifix_settingComponent implements OnInit {
  prefix_view = false
  show        = true
  prefix_list : any
  detail_view : any
  id          : any
  loading     = false
  prefix_update     !: FormGroup;

  @ViewChild("Edit_Prefix", { static: true }) Edit_Prefix!: ElementRef;

  constructor(public api : ApiService,public toastService :ToasterService,public fb :FormBuilder) {

    this.prefix_update =
    fb.group({
      dc             :[null],
      invoice        :[null],
      po             :[null],
      bill           :[null],
      credit         :[null],
      payment_receipt:[null],
      payment_made   :[null],
    });

  }

  ngOnInit() {
    this.api.get('get_data.php?table=prefix&authToken='+environment.authToken).then((data: any) =>
      {
        this.prefix_list = data[0];
        this.detail_view = data[0];
        this.id =data[0].prefix_id;
        this.prefix_dataload()
      }).catch(error => {this.toastService.typeError('Something went wrong ');});
  }

prefix_dataload()
  {
    this.prefix_update.controls['dc'].setValue(this.prefix_list.dc_year);
    this.prefix_update.controls['invoice'].setValue(this.prefix_list.inv_year);
    this.prefix_update.controls['po'].setValue(this.prefix_list.po_year);
    this.prefix_update.controls['bill'].setValue(this.prefix_list.bill_year);
    this.prefix_update.controls['payment_made'].setValue(this.prefix_list.payment_made);
    this.prefix_update.controls['payment_receipt'].setValue(this.prefix_list.payment_receipt);
    this.prefix_update.controls['credit'].setValue(this.prefix_list.credit_notes);
  }

  edit_prefix_data()
    {
      const modalElement = this.Edit_Prefix.nativeElement;
      $(modalElement).modal('show');
    }

    submit_prefix(value : any)
    {
      if (this.prefix_update.valid)
        {
          this.loading=true;
          this.api.post('post_update_data.php?table=prefix&field=prefix_id&value=' + this.id + '&authToken=' + environment.authToken, this.prefix_update.value).then((data: any) => {

            if (data.status == "success")
            {
              this.loading=false;
              this.toastService.typeSuccess(' Prefix Updated Succesfully');
              const modalElement = this.Edit_Prefix.nativeElement;
              $(modalElement).modal('hide');
              this.prefix_update.reset();
              this.ngOnInit()

            }
            else { this.toastService.typeError(data.status);
                  this.loading=false; }

          }).catch(error => { this.toastService.typeError('Prefix  Updated Failed!!');
                            this.loading=false;});
        }
        else
        {
          this.toastService.typeError('Please Fill All Details');
        }
    }
}
