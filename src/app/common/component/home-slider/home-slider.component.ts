import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.css']
})
export class HomeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.slide();
  }

  slide() {
    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('#next');
    const prev = document.querySelector('#prev');
    const auto = true; // Auto scroll
    const intervalTime = 4000;
    let slideInterval;
    if(slides==undefined||next==undefined||prev==undefined){
      return;
    }
    const nextSlide = () => {
      // Get current class
      const current = document.querySelector('.current');
      if (current==null){
        return;
      }
      // Remove current class
      current.classList.remove('current');
      // Check for next slide
      if (current.nextElementSibling) {
        // Add current to next sibling
        current.nextElementSibling.classList.add('current');
      } else {
        // Add current to start
        slides[0].classList.add('current');
      }
      setTimeout(() => current.classList.remove('current'), 200);
    };

    const prevSlide = () => {
      // Get current class
      const current = document.querySelector('.current');
      // Remove current class
      current.classList.remove('current');
      // Check for prev slide
      if (current.previousElementSibling) {
        // Add current to prev sibling
        current.previousElementSibling.classList.add('current');
      } else {
        // Add current to last
        slides[slides.length - 1].classList.add('current');
      }
      setTimeout(() => current.classList.remove('current'), 200);
    };

    // Button events
    next.addEventListener('click', e => {
      nextSlide();
      if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }
    });

    prev.addEventListener('click', e => {
      prevSlide();
      if (auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
      }
    });

    // Auto slide
    if (auto) {
      // Run next slide at interval time
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  }

}



