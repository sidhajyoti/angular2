import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { AppService, LoginService, PolicyService } from '../../services';
import { IRouteData } from '../../interfaces';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title: string;
  
      constructor(private _policyService: PolicyService, private appService: AppService, private loginService: LoginService,  private activatedRoute: ActivatedRoute) {
        this.title = 'Login';
        console.log( 'Inside Constructor' );
  }
  onSubmit(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    console.log( 'Inside Login() ::'+ username+ " :: " + password );
    console.log("Body :: "+ body);
    this._policyService.login( body ).then((res) => {
      if (res) {
        this._router.navigate([ 'Dashboard' ]);
      }
      else {
        alert ( 'Invalid credentials!!' );
        console.log( 'res' );
  }
})
}
}
