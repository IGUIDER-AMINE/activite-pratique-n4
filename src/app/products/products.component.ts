import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  //variable de type Observable par convention on aime beaucoup généralement utiliser var_name$
  //products$! :Observable<Array<Product>>; //! => dire au compilateur tpescipt ignore meme si j'ai pas initialisé
  public products :Array<Product>=[];
  public keyword:string="";
  constructor(private productService:ProductService) {
  }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data
      },
      error : err => {
        console.log(err);
      }
    })
    //this.products$ = this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    //put ça permet de changer tous les attributs
    // on va utiliser patch car on va changer just attribut checked
    this.productService.handleCheckProduct(product).subscribe({
      next: updatedProduct => {
        product.checked=!product.checked;
        //this.getProducts();
      },
      error : err => {
        console.log(err);
      }
    })
  }


  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();
        this.products = this.products.filter(p=>p.id!=product.id)
      }
    })
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }
}
