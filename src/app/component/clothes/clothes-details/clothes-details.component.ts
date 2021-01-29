import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clothes } from 'src/app/DTO/Clothes';
import { ClothesService } from 'src/app/services/clothes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clothes-details',
  templateUrl: './clothes-details.component.html',
  styleUrls: ['./clothes-details.component.css']
})
export class ClothesDetailsComponent implements OnInit {
 clothe: Clothes;
  constructor(
    private route: ActivatedRoute,
    private clothesService: ClothesService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClothesById();
  }
  getClothesById() {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("id: "+id)
    this.clothesService.getClothesById(id).subscribe(clothe => this.clothe = clothe);
  }
  goBack(): void {
    this.location.back();
  }

}

