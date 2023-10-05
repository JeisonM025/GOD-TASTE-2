import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  images = [
    { src: '../../../../assets/1.jpeg' },
    { src: '../../../../assets/2.jpeg' },
    // Agrega más imágenes si es necesario
  ];

  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    // Iniciar el carrusel
    this.showSlide(this.currentIndex);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.showSlide(this.currentIndex);
  }

  showSlide(index: number) {
    // Ocultar todos los slides
    this.images.forEach((image, i) => {
      const slide = document.getElementsByClassName('slide')[i] as HTMLElement;
      slide.style.display = 'none';
    });

    // Mostrar el slide actual
    const currentSlide = document.getElementsByClassName('slide')[index] as HTMLElement;
    currentSlide.style.display = 'block';
  }
}
