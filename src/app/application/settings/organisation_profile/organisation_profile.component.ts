/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';
import { environment } from 'src/environments/environment';
ToasterService
@Component({
  selector: 'app-organisation_profile',
  templateUrl: './organisation_profile.component.html',
  styleUrls: ['./organisation_profile.component.scss']
})
export class Organisation_profileComponent implements OnInit {

  public uid         = localStorage.getItem('uid');
  profile_update     !:FormGroup;
  loading= false
  report_list : any
  detail_view: any;
  id: any;
  constructor(public api : ApiService,public router: Router,public toastrService: ToasterService, private fb: FormBuilder )
   {

    this.profile_update = fb.group({
      name         :[null],
      gst_no       :['',Validators.compose([Validators.required ,Validators.pattern("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$")])],
      addressline1 :[null],
      addressline2 :[null],
      city         :[null],
      state        :[null],
      country      :[null],
      zipcode      :[null],
      mobile       :[null],
      pan_no       :['', Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{5}[0-9]{4}[A-Z]{1}$")])],
      bank         :[null],
      acc_no       :[null],
      ifsc_code    :[null,Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{4}0\d{6}$")])],
      tan_no       :[null,Validators.compose([Validators.required ,Validators.pattern("^[A-Z]{4}[0-9]{5}[A-Z]$")])],
      website      :['',Validators.compose([ Validators.pattern("^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)?$")])],
      email        :['',Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")])],
      inv_note1    :[null],
      inv_note2    :[null],
      payment_term1:[null],
      payment_term2:[null],
      payment_term3:[null],
      udyam_no     :[null],
      });
    }

  ngOnInit() {
    this.organization_profile();
  }



 async organization_profile()
  {
  await  this.api.get('get_data.php?table=company_profile&authToken='+environment.authToken).then((data: any) =>
    {
      this.report_list = data[0];
      this.detail_view = data[0];
      this.id =data[0].id;
      this.dataload(data[0])
    }).catch(error => {this.toastrService.typeError('Something went wrong');});
  }

  dataload(value:any)
  {
     this.profile_update.controls['name'].setValue(this.report_list.company_name);
     this.profile_update.controls['gst_no'].setValue(this.report_list.gst_number);
     this.profile_update.controls['addressline1'].setValue(this.report_list.address_1);
     this.profile_update.controls['addressline2'].setValue(this.report_list.address_2);
     this.profile_update.controls['city'].setValue(this.report_list.city);
     this.profile_update.controls['state'].setValue(this.report_list.state);
     this.profile_update.controls['country'].setValue(this.report_list.country);
     this.profile_update.controls['zipcode'].setValue(this.report_list.pincode);
     this.profile_update.controls['mobile'].setValue(this.report_list.mobile);
     this.profile_update.controls['pan_no'].setValue(this.report_list.pan_number);
     this.profile_update.controls['bank'].setValue(this.report_list.bank_name);
     this.profile_update.controls['acc_no'].setValue(this.report_list.account_no);
     this.profile_update.controls['ifsc_code'].setValue(this.report_list.ifsc_code);
     this.profile_update.controls['tan_no'].setValue(this.report_list.tan_number);
     this.profile_update.controls['website'].setValue(this.report_list.website);
     this.profile_update.controls['email'].setValue(this.report_list.email);
     this.profile_update.controls['inv_note1'].setValue(this.report_list.inv_note1);
     this.profile_update.controls['inv_note2'].setValue(this.report_list.inv_note2);
     this.profile_update.controls['payment_term1'].setValue(this.report_list.payment_term1);
     this.profile_update.controls['payment_term2'].setValue(this.report_list.payment_term2);
     this.profile_update.controls['payment_term3'].setValue(this.report_list.payment_term3);
     this.profile_update.controls['udyam_no'].setValue(this.report_list.udyam_no);
 }
submit(value : any)
 {
  this.loading=true;
  this.api.post('post_update_data.php?table=company_profile&field=id&value=' + this.id + '&authToken=' + environment.authToken, this.profile_update.value).then((data: any) => {

    if (data.status == "success")
    {
      this.loading=false;
      this.toastrService.typeSuccess('Company Profile Updated Succesfully');
      this.organization_profile();
      this.profile_update.reset();

    }
    else { this.toastrService.typeError(data.status);
          this.loading=false; }

  }).catch(error => { this.toastrService.typeError('Company Profile Updated Failed!!');
                    this.loading=false;});
 }
}
