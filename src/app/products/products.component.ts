import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  //variable de type Observable par convention on aime beaucoup généralement utiliser var_name$
  //products$! :Observable<Array<Product>>; //! => dire au compilateur tpescipt ignore meme si j'ai pas initialisé
  //l'état de l'application
  public products :Array<Product>=[];
  public keyword:string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService:ProductService,private router:Router) {
  }
  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(){
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next: (resp) => {
        this.products = resp.body as Product[]; // as Product[] => je qais que c'est un tableau de produit
        //let totalProducts:number = parseInt(resp.headers.get('x-total-count')!); //! => je demande de compilateur d'ignorer parce que je sais que ça c'est une attribut qui contient un entier
        let totalProducts: number = parseInt( resp.headers.get('x-total-count') == null ? this.products.length.toString() :  resp.headers.get('x-total-count')!);
        this.totalPages=Math.floor(totalProducts/this.pageSize);
        if(totalProducts%this.pageSize!=0){
          this.totalPages=this.totalPages+1;
        }
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

  /*searchProducts() {
    this.currentPage=1;
    this.totalPages=0;
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }*/

  handleGoToPage(page: number) {
    this.currentPage=page;
    this.searchProducts()
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
