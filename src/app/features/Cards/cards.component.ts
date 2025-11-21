import { Component, Input } from '@angular/core';
import { CardTcgComponent } from "./components/card-tcg/card-tcg.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, CardTcgComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() cards = [];
}
