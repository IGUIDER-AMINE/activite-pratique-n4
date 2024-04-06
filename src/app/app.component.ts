import { Component } from '@angular/core';
import {createSecureContext} from "node:tls";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'enset 12345';
  actions : Array<any> = [
    {title:"Home","route":"/home",icon:"house"},
    {title:"Products","route":"/products",icon:"search"},
    {title:"New Product","route":"/newProduct",icon:"safe"},
  ];
  currentAction:any;
  setCurrentAction(action: any) {
    this.currentAction=action
  }
}
