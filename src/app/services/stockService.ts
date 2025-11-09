import { Injectable, signal } from '@angular/core';
import { Stock } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  stocklist  = signal<Stock[]>([
    { id: 1, name: 'Producto A', quantity: 100},
    { id: 2, name: 'Producto B', quantity: 200},
    { id: 3, name: 'Producto C', quantity: 150},
  ]);

  addStock(stockItem: Stock) {
    this.stocklist.update(list => [...list, stockItem]);
  };

}
