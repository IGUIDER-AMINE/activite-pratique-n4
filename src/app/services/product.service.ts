import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";
// la communication avec le back-end on les fait dans les services
@Injectable({ // au démarrage il va etre instancier
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
    // l'injection des dépendances
  }

  public searchProducts(keyword:string="",page : number = 1, size : number = 4){
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'}); // return la reponse http avec headers et son corps
  }

  public handleCheckProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
  }

  public deleteProduct(product:Product){
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`)
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products/`,
      product);
  }

  /*public searchProducts(keyword:string,page:number,size:number):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  }*/
  getProdcutById(prodductId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${prodductId}`);
  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);
  }
}
