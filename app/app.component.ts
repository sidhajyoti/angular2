import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { SideNavComponent } from '../side-nav/side-nav.component';
import { GlobalService } from '../../services/global/global.service';
import {PolicyService} from '../../services/policy/policy.service';

@Component({
  selector: 'app',
  templateUrl: '/templates/app.component.html',
  providers: [ HTTP_PROVIDERS, PolicyService ],
  directives: [ ROUTER_DIRECTIVES, SideNavComponent ]
})
export class AppComponent {
  brand: string;

  constructor(private globalService: GlobalService) {
    this.brand = 'Sentry';
    console.log(globalService.getOtherUri());
  }

}
