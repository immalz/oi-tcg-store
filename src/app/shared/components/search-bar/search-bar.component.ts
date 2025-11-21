import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { DigimonStore } from '../../../features/Home/store/digimon.store';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DigimonService } from '../../../features/Home/services/digimon.service';
import { DigimonCardFull } from '../../../features/Home/interfaces/digimon.interfaces';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DigimonService],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  store = inject(DigimonStore);
  router = inject(Router);
  el = inject(ElementRef);
  localSearch = signal('');
  // control del dropdown
  showResults = signal(false);

  // sugerencias automáticas
  results = computed(() => {
    const term = this.localSearch().toLowerCase().trim();
    if (!term) return [];
  
    return this.store.allCards().filter(c =>
      c.name.toLowerCase().includes(term)
    ).slice(0, 12);
  });
  // cerrar dropdown al hacer clic afuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showResults.set(false);
    }
  }

  onInput(value: string) {
    // this.store.setSearchTerm(value);
    this.localSearch.set(value);
    this.showResults.set(value.trim().length > 0);
  }
  

  selectCard(card: DigimonCardFull) {
    this.localSearch.set('');
    this.showResults.set(false);
    this.router.navigate(['/card', card.id]);
  }
}