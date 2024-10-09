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
  selector: 'app-pay_roll',
  templateUrl: './pay_roll.component.html',
  styleUrls: ['./pay_roll.component.scss']
})
export class Pay_rollComponent implements OnInit {

  prefix_view  = false
  show         = true
  prefix_list  : any
  detail_view  : any
  id           : any
  loading      = false
  pay_roll_update  !: FormGroup;
  pay_roll_list : any
  pay_roll_id   : any

  @ViewChild("Edit_Prefix", { static: true }) Edit_Prefix!: ElementRef;

  constructor(public api : ApiService,public toastService :ToasterService,public fb :FormBuilder) {

    this.pay_roll_update =fb.group({
      pl                :[null],
      epf               :[null],
      basic_da          :[null],
      epf_max_amount    :[null],
      hra               :[null],
      allowance         :[null],
      epf_percentage    :[null],
      company_paid_esi  :[null],
   })

  }

  ngOnInit() {
    this.api.get('get_data.php?table=pay_roll_items&authToken=' + environment.authToken).then((data: any) => {
      this.pay_roll_list = data[0];
      this.dataload()
   }).catch(error => {this.toastService.typeError('Something went wrong ');});
    setTimeout(() => {
    this.show
    }, 200);
  }

dataload()
  {
    this.pay_roll_id = this.pay_roll_list.id;
    this.pay_roll_update.controls['pl'].setValue(this.pay_roll_list.pl);
    this.pay_roll_update.controls['epf'].setValue(this.pay_roll_list.epf);
    this.pay_roll_update.controls['basic_da'].setValue(this.pay_roll_list.basic_da);
    this.pay_roll_update.controls['epf_max_amount'].setValue(this.pay_roll_list.epf_max_amount);
    this.pay_roll_update.controls['hra'].setValue(this.pay_roll_list.hra);
    this.pay_roll_update.controls['allowance'].setValue(this.pay_roll_list.allowance);
    this.pay_roll_update.controls['epf_percentage'].setValue(this.pay_roll_list.epf_percentage);
    this.pay_roll_update.controls['company_paid_esi'].setValue(this.pay_roll_list.company_paid_esi);

  }

  edit_prefix_data()
    {
      const modalElement = this.Edit_Prefix.nativeElement;
      $(modalElement).modal('show');
    }

    submit_payroll_edit(value:any)
    {
      if (this.pay_roll_update.valid)
        {
          this.loading=true;
          this.api.post('post_update_data.php?table=pay_roll_items&field=id&value=' + this.pay_roll_id + '&authToken=' + environment.authToken, value).then((data: any) => {

            if (data.status == "success")
            {
              this.loading=false;
              this.toastService.typeSuccess(' PayRoll Updated Succesfully');
              const modalElement = this.Edit_Prefix.nativeElement;
              $(modalElement).modal('hide');
              this.pay_roll_update.reset();
              this.ngOnInit()

            }
            else { this.toastService.typeError(data.status);
                  this.loading=false; }

          }).catch(error => { this.toastService.typeError('PayRoll  Updated Failed!!');
                            this.loading=false;});
        }
        else
        {
          this.toastService.typeError('Please Fill All Details');
        }
    }

}
