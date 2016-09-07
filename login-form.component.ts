import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {CORE_DIRECTIVES,FORM_DIRECTIVES} from '@angular/common';
import { Http, Headers } from '@angular/http';
import { login } from './login';

@Component({

  selector: 'login-form',
  templateUrl: 'app/login-form.component.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
  
})
export class loginFormComponent {

	constructor (){
		console.log("Inside Constructor....");
	}
  
  onSubmit(emailVal,pwdVal) { 
  
	  console.log("Inside onSubmit()...."+ emailVal + " :: " + pwdVal);
	  if(emailVal == "test@test.com" && pwdVal == "test"){
		console.log("Success!!!");
		this.submitted = true;
		this.router.navigate(['/successPage']);
	  }else{
		console.log("Failed!!!");
		alert("Invalid Username / Password, please check the credentials.");
		this.submitted = false;
	  }
  }
}
