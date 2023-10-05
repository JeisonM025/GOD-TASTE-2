import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isMenuOpen = false;
  isMobileView = false;

  constructor() {}

  ngOnInit(): void {
    this.checkIfMobile();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobileView = window.innerWidth <= 768; // Puedes ajustar este valor según tus necesidades
  }
}
