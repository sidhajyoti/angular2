import { Component } from '@angular/core';
import {Router} from '@angular2/router';
import { login } from './login';

//Importing the AuthService, which was in service folder, to be used further.
import {AuthService} from './services/login-form-authservice';


@Component({
	
  selector: 'login-form',
  templateUrl: 'app/login-form.component.html',
  providers: [AuthService]
  
})

export class loginFormComponent {

	//This will help to fetch the username and password from login form.
	localUser = {
        username: '',
        password: ''
    }
	
	//This constructor wll call the respective service AuthService.ts
	constructor(private _service:AuthService, private _router: Router) {
        console.log("Inside COnstructor..")
    }
  
  //This function will be called when login ll be clicked on the login-form.
	login() {
	
		console.log("Inside LOgin()..")
		// Here calling the service for validation of the given credentials.
		this._service.loginfn(this.localUser).then((res) => {
            if(res){
				this._router.navigate(['Dashboard']);
			}else{
				alert("Invalid credentials!!");
				console.log(res);
			}
        })
    }
	
}
