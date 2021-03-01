import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clothes } from 'src/app/DTO/Clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { Location } from '@angular/common';
import { ProductSpecService } from 'src/app/services/product.spec.service';
import { ProductColorSizes } from 'src/app/DTO/ProductColorSizes';

@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit {
 clothes: ProductColorSizes[];
  constructor(
    private route: ActivatedRoute,
    private clothesService: ProductSpecService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClothesById();
  }
  getClothesById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clothesService.getProductSpecByProductId(id).subscribe(clothes => this.clothes = clothes);
  }
  goBack(): void {
    this.location.back();
  }

}

