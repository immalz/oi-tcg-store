import { Injectable, computed, signal, inject } from '@angular/core';
import { DigimonStore } from './digimon.store';

@Injectable({
  providedIn: 'root',
})
export class DigimonListStore {
  private baseStore = inject(DigimonStore);

  // FILTROS LOCALES (no afectan al buscador superior)
  setFilter = signal<string>('');   // BT1, BT2, EX3, ST8...
  colorFilter = signal<string>(''); // Red, Blue
  levelFilter = signal<number | null>(null);

  // Para paginación
  page = signal(1);
  pageSize = 20;

  // CARTAS ORIGINALES (solo una vez)
  allCards = computed(() => this.baseStore.allCards());

  // LISTA FILTRADA
  filteredCards = computed(() => {
    let cards = this.allCards();

    // Filtro por expansión
    if (this.setFilter()) {
      cards = cards.filter(c => c.id.toUpperCase().startsWith(this.setFilter().toUpperCase()));
    }

    // Filtro por color
    if (this.colorFilter()) {
      cards = cards.filter(c => (c.color?.toLowerCase() === this.colorFilter().toLowerCase()));
    }

    // Filtro por nivel
    if (this.levelFilter() !== null) {
      cards = cards.filter(c => c.level === this.levelFilter());
    }

    return cards;
  });

  // PAGINACIÓN
  totalPages = computed(() =>
    Math.ceil(this.filteredCards().length / this.pageSize)
  );

  paginatedCards = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredCards().slice(start, start + this.pageSize);
  });

  // METODOS PARA FILTROS
  setExpansion(exp: string) {
    this.setFilter.set(exp);
    this.page.set(1);
  }

  setColor(color: string) {
    this.colorFilter.set(color);
    this.page.set(1);
  }

  setLevel(lv: number | null) {
    this.levelFilter.set(lv);
    this.page.set(1);
  }

  resetFilters() {
    this.setFilter.set('');
    this.colorFilter.set('');
    this.levelFilter.set(null);
    this.page.set(1);
  }

  nextPage() {
    if (this.page() < this.totalPages()) this.page.update(p => p + 1);
  }

  prevPage() {
    if (this.page() > 1) this.page.update(p => p - 1);
  }
}
