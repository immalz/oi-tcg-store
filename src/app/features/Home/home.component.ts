import { Component, computed, inject } from '@angular/core';
import { CardTcgComponent } from "../Cards/components/card-tcg/card-tcg.component";
import { HttpClientModule } from '@angular/common/http';
import { DigimonStore } from './store/digimon.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardTcgComponent, HttpClientModule],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  store = inject(DigimonStore);
  router = inject(Router);

  cards = computed(() => this.store.paginatedCards());
  page = computed(() => this.store.page());
  totalPages = computed(() => this.store.totalPages());

  sets = [
    // BT
    'BT1','BT2','BT3','BT4','BT5','BT6','BT7','BT8','BT9','BT10','BT11','BT12',
    'BT13','BT14','BT15','BT16','BT17','BT18','BT19','BT20','BT21','BT22','BT23',
  
    // EX
    'EX1','EX2','EX3','EX4','EX5','EX6','EX7','EX8','EX9','EX10',
  
    // ST
    'ST1','ST2','ST3','ST4','ST5','ST6','ST7','ST8','ST9','ST10','ST11',
    'ST12','ST13','ST14','ST15','ST16','ST17','ST18','ST19','ST20','ST21','ST22',
  
    // Otros
    'RB1',
    'P'
  ];
  
  colors = [ 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White' ];
  levels = [2, 3, 4, 5, 6, 7];

  ngOnInit() {
    this.store.loadCards();
  }

  next() { this.store.nextPage(); }
  prev() { this.store.prevPage(); }

  goToDetail(card: any) {
    this.router.navigate(['/card', card.id]);
  }

  // Filtros UI
  filterSet(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.store.setSet(value);
  }

  filterColor(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.store.setColor(value);
  }

  filterLevel(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this.store.setLevel(value ? Number(value) : null);
  }
}
