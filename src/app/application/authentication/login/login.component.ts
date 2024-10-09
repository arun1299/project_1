/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ToasterService, routes } from 'src/app/core/core.index';
import { ApiService } from 'src/app/core/services/api/api.service';

ToasterService
@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent
{
  public routes = routes;
  public user_type : any;
  public show_password = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
     password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router, private auth: AuthService,public api :ApiService ,public toastrService :ToasterService )
  { }


  loginFormSubmit() {
    if (this.form.valid) {

      this.api.get('login.php?email='+this.form.value.email).then((data: any) =>
      {
        // console.log("log in data : ",data)
          if (data[0].password === this.form.value.password)
          {
              if (data[0].status === 1)
              {

                   this.auth.login();
                   localStorage.setItem('uid', data[0].emp_id);
                   localStorage.setItem('type_id', data[0].user_type);
                   localStorage.setItem('type', data[0].user_type_name);
                   localStorage.setItem('name', data[0].name);
                   localStorage.setItem('last_login', data[0].last_login);

                  this.user_type = data[0].user_type;
                  this.toastrService.typeSuccess('Welcome Back Mr.'+data[0].name);
              }
              else
              {
                  if (data[0].message)
                  {
                      this.toastrService.typeError(data[0].message);
                  }
                  else
                  {
                      this.toastrService.typeError('Something went wrong');
                  }
              }
          }
          else
          {
              this.toastrService.typeError('Incorrect Password');
          }
          return true;
      }).catch(error  =>
      {
          this.toastrService.typeError('Incorrect Username / Password');
      });
    }
  }
}
