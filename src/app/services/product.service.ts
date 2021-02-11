import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../common/services/global.service';
import { ProductColorSizes } from '../DTO/ProductColorSizes';
const BASE_API_URL = environment.ENDPOINT_ROOT_URL;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = BASE_API_URL + '/public/product/spec';
  constructor(private globalService: GlobalService) { }

  getProductSpecs(): Observable<ProductColorSizes[]> {
    return this.globalService.getAllObjects(this.productUrl);
  }
  getProductSpecById(id: number): Observable<ProductColorSizes> {
    return this.globalService.getObjectById(this.productUrl, id);
  }
  updateProductSpec(clothes: ProductColorSizes): Observable<any> {
    return this.globalService.updateObject(this.productUrl, clothes);
  }
  addProductSpec(clothes: ProductColorSizes): Observable<ProductColorSizes> {
    return this.globalService.addObject(this.productUrl, clothes);
  }
  deleteProductSpec(clothes: ProductColorSizes): Observable<any> {
    return this.globalService.deleteObject(this.productUrl, clothes);
  }
  searchProductSpec(term: string): Observable<ProductColorSizes[]> {
    return this.globalService.searchObjectsByTerm(this.productUrl, term);
  }
}