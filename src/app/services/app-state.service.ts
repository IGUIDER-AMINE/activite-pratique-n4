import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  //l'état de l'application
  public productState:any = {
    products :[],
    keyword:"",
    totalPages:0,
    pageSize:3,
    currentPage:1,
    totalProducts:0,
    status:"",
    errorMessage:""
  }
  constructor() { }

  public setProductState(state:any):void{
    this.productState={...this.productState,...state};
  }
}
