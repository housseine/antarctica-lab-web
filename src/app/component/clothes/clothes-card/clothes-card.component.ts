import { Component, OnInit } from '@angular/core';
import { Clothes } from 'src/app/DTO/Clothes';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothes-card',
  templateUrl: './clothes-card.component.html',
  styleUrls: ['./clothes-card.component.css']
})
export class ClothesCardComponent implements OnInit {
  clothes: Clothes[];
  constructor(private clothesService: ClothesService) { }

  ngOnInit() {
    this.getClothes()
  }
  getClothes() :void{
    this.clothesService.getClothes().subscribe(clothes => this.clothes = clothes);
  }

}
