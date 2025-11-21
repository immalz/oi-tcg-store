import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-tcg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tcg.component.html',
  styleUrl: './card-tcg.component.scss'
})
export class CardTcgComponent {

  @Input() data: any = {};
  @Output() openCard = new EventEmitter<any>();

  isLoading = true;

  onImageLoad() {
    this.isLoading = false;
  }
  

  addToCart(data: any): void {
    console.log("me añadi al carrito");
  }

  redirectToDetail() {
    this.openCard.emit(this.data);
  }

}
