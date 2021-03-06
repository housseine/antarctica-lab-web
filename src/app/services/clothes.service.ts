import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from '../common/services/global.service';
import { Clothes } from '../DTO/Clothes';
const BASE_API_URL = environment.ENDPOINT_ROOT_URL;
@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private productUrl = BASE_API_URL + '/public/product';
  constructor(private globalService: GlobalService) { }
  
  getClothes(): Observable<Clothes[]> {
    return this.globalService.getAllObjects(this.productUrl);
  }
  getClothesById(id: number): Observable<Clothes> {
    return this.globalService.getObjectById(this.productUrl, id);
  }
  updateClothes(clothes: Clothes): Observable<any> {
    return this.globalService.updateObject(this.productUrl, clothes);
  }
  addClothes(clothes: Clothes): Observable<Clothes> {
    return this.globalService.addObject(this.productUrl, clothes);
  }
  deleteClothes(clothes: Clothes): Observable<any> {
    return this.globalService.deleteObject(this.productUrl, clothes);
  }
  searchClothes(term: string): Observable<Clothes[]> {
    return this.globalService.searchObjectsByTerm(this.productUrl, term);
  }

}
