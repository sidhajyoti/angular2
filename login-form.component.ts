import { Component } from '@angular/core';

import { login }    from './login';

import {bootstrap}&nbsp; from 'angular2/platform/browser';
import {NGL_DIRECTIVES, provideNglConfig} from 'ng-lightning/ng-lightning';

@Component({
  selector: 'login-form',
  directives: [NGL_DIRECTIVES],
  templateUrl: 'app/login-form.component.html',
})
export class loginFormComponent {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];

  model = new login(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;
  
    constructor (){
        alert("Inside constructor");
    }
  onSubmit() { 
  
  //console.log("Hi inside onSubmit method");
  alert("HIii..");
  this.submitted = true; 
  
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  // Reset the form with a new login AND restore 'pristine' class state
  // by toggling 'active' flag which causes the form
  // to be removed/re-added in a tick via NgIf
  // TODO: Workaround until NgForm has a reset method (#6822)
  active = true;

  newlogin() {
    this.model = new login(42, '', '');
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
  //////// NOT SHOWN IN DOCS ////////

  // Reveal in html:
  //   Name via form.controls = {{showFormControls(loginForm)}}
  showFormControls(form: any) {

    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }

  /////////////////////////////

}

export class Angular2Modal {
 
opened: boolean = false;
size: string;
 
open(size: string) {
this.size = size;
this.opened = !this.opened;
}
 
cancel() {
this.opened = false;
}
}
 
bootstrap(Angular2Modal, [provideNglConfig()]);
