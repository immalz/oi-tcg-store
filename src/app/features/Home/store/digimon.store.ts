import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DigimonCardFull } from '../interfaces/digimon.interfaces';

@Injectable({ providedIn: 'root' })
export class DigimonStore {
  private http = inject(HttpClient);

  // === DATA BASE ===
  private _allCards = signal<DigimonCardFull[]>([]);
  allCards = computed(() => this._allCards());

  // === FILTER SIGNALS ===
  searchTerm = signal('');
  filterSet = signal('');      // expansion BT1, EX3...
  filterColor = signal('');    // Red, Blue...
  filterLevel = signal<number | null>(null);

  // === PAGINATION ===
  page = signal(1);
  readonly pageSize = 20;

  // === FILTER LOGIC ===
  filteredCards = computed(() => {
    let cards = this._allCards();

    // search
    const term = this.searchTerm().toLowerCase();
    if (term) {
      cards = cards.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.id.toLowerCase().includes(term)
      );
    }

    // expansion / set
    if (this.filterSet()) {
      cards = cards.filter(c =>
        c.id.toLowerCase().startsWith(this.filterSet().toLowerCase())
      );
    }

    // color
    if (this.filterColor()) {
      cards = cards.filter(c =>
        c.color?.toLowerCase() === this.filterColor().toLowerCase()
      );
    }

    // level
    if (this.filterLevel()) {
      cards = cards.filter(c =>
        c.level === this.filterLevel()
      );
    }

    return cards;
  });

  // === PAGINATION COMPUTATIONS ===
  totalPages = computed(() =>
    Math.ceil(this.filteredCards().length / this.pageSize)
  );

  paginatedCards = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredCards().slice(start, start + this.pageSize);
  });

  // === LOAD DATABASE ===
  loadCards() {
    this.http
      .get<DigimonCardFull[]>('assets/data/digimon-cards-full.json')
      .subscribe(res => {
        res.sort((a, b) => {
          const orderPrefix = ['BT', 'EX', 'ST', 'P', 'RB', 'LM'];
          const prefixA = orderPrefix.findIndex(p => a.id.startsWith(p));
          const prefixB = orderPrefix.findIndex(p => b.id.startsWith(p));
          if (prefixA !== prefixB) return prefixA - prefixB;
          return a.id.localeCompare(b.id);
        });
  
        this._allCards.set(res);
        this.filterSet.set('BT23');
      });
  }
  
  

  // === FILTER SETTERS ===
  setSearchTerm(v: string) {
    this.searchTerm.set(v);
    this.page.set(1);
  }

  setSet(v: string) {
    this.filterSet.set(v);
    this.page.set(1);
  }

  setColor(v: string) {
    this.filterColor.set(v);
    this.page.set(1);
  }

  setLevel(v: number | null) {
    this.filterLevel.set(v);
    this.page.set(1);
  }

  // === PAGINATION ===
  nextPage() {
    if (this.page() < this.totalPages()) this.page.update(p => p + 1);
  }
  prevPage() {
    if (this.page() > 1) this.page.update(p => p - 1);
  }
}
