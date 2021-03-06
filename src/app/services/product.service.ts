import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../common/services/global.service';
import { Product } from '../DTO/Product';
const BASE_API_URL = environment.ENDPOINT_ROOT_URL;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = BASE_API_URL + '/public/clothes';
  constructor(private globalService: GlobalService) { }

  getProduct(): Observable<Product[]> {
    return this.globalService.getAllObjects(this.productUrl+"/all");
  }
  getProductById(id: number): Observable<Product> {
    return this.globalService.getObjectById(this.productUrl, id);
  }
  updateProduct(clothes: Product): Observable<any> {
    return this.globalService.updateObject(this.productUrl, clothes);
  }
  addProduct(clothes: Product): Observable<Product> {
    return this.globalService.addObject(this.productUrl, clothes);
  }
  deleteProduct(clothes: Product): Observable<any> {
    return this.globalService.deleteObject(this.productUrl, clothes);
  }
  searchProduct(term: string): Observable<Product[]> {
    return this.globalService.searchObjectsByTerm(this.productUrl, term);
  }
}
