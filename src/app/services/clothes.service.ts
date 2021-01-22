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
  private clothesUrl = BASE_API_URL + '/public/clothes';
  constructor(private globalService: GlobalService) { }
  
  
  getClothes(): Observable<Clothes[]> {
    return this.globalService.getAllObjects(this.clothesUrl);
  }
  getClothesById(id: number): Observable<Clothes> {
    return this.globalService.getObjectById(this.clothesUrl, id);
  }
  updateClothes(clothes: Clothes): Observable<any> {
    return this.globalService.updateObject(this.clothesUrl, clothes);
  }
  addClothes(clothes: Clothes): Observable<Clothes> {
    return this.globalService.addObject(this.clothesUrl, clothes);
  }
  deleteClothes(clothes: Clothes): Observable<any> {
    return this.globalService.deleteObject(this.clothesUrl, clothes);
  }
  searchClothes(term: string): Observable<ClothesService[]> {
    return this.globalService.searchObjectsByTerm(this.clothesUrl, term);
  }

}
