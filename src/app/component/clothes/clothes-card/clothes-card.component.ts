import { Component, OnInit } from '@angular/core';
import { Clothes } from 'src/app/DTO/Clothes';
import { Product } from 'src/app/DTO/Product';
import { ProductColorSizes } from 'src/app/DTO/ProductColorSizes';
import { ClothesService } from 'src/app/services/clothes.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductSpecService } from 'src/app/services/product.spec.service';

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.css']
})
export class ClothesCardComponent implements OnInit {
  clothes: Product[];
  constructor(private producService: ProductService) { }

  ngOnInit() {
    this.getClothes()
  }
  getClothes() :void{
    this.producService.getProduct().subscribe(clothes => this.clothes = clothes);
  }

}
