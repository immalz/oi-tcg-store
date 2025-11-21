import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DigimonCardFull } from '../interfaces/digimon.interfaces';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  private http = inject(HttpClient);

  /** Cargamos el JSON una sola vez y lo cacheamos en memoria */
  private readonly cards$ = this.http
    .get<DigimonCardFull[]>('assets/data/digimon-cards-full.json')
    .pipe(shareReplay(1));

  /** Obtener todas las cartas */
  getAllCards(): Observable<DigimonCardFull[]> {
    return this.cards$;
  }

  /** Buscar una carta por su id (BT4-016, BT1-001, etc.) */
  getCardById(id: string): Observable<DigimonCardFull | undefined> {
    return this.cards$.pipe(
      map((cards) => cards.find((c) => c.id === id))
    );
  }

  /** Búsqueda simple por nombre (contiene, case-insensitive) */
  searchByName(term: string): Observable<DigimonCardFull[]> {
    const normalized = term.trim().toLowerCase();

    if (!normalized) {
      return this.getAllCards();
    }

    return this.cards$.pipe(
      map((cards) =>
        cards.filter((c) =>
          c.name.toLowerCase().includes(normalized)
        )
      )
    );
  }

  /** Filtrar por color (Red, Blue, Green, etc.) */
  filterByColor(color: string): Observable<DigimonCardFull[]> {
    const normalized = color.trim().toLowerCase();

    return this.cards$.pipe(
      map((cards) =>
        cards.filter(
          (c) => c.color && c.color.toLowerCase() === normalized
        )
      )
    );
  }

  /** Filtrar por tipo (Digimon, Option, Tamer, etc.) */
  filterByType(type: string): Observable<DigimonCardFull[]> {
    const normalized = type.trim().toLowerCase();

    return this.cards$.pipe(
      map((cards) =>
        cards.filter(
          (c) => c.type && c.type.toLowerCase() === normalized
        )
      )
    );
  }
}