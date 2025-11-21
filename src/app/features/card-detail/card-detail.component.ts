import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DigimonStore } from '../../features/Home/store/digimon.store';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private store = inject(DigimonStore);

  id = '';
  card = computed(() =>
    this.store.allCards().find(c => c.id === this.id)
  );

  sellers = computed(() => [
    { name: 'Payasito store', stock: 3, price: 14.50 },
    { name: 'Naranja', stock: 1, price: 16.00 },
    { name: 'Pachacutec city', stock: 5, price: 13.00 }
  ]);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.store.loadCards(); // asegura datos cargados
  }

  addToCart(card: any) {
    console.log("Añadido al carrito:", card);
  }
}
