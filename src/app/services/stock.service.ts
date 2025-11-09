import { effect, Injectable, signal } from '@angular/core';
import { Stock } from '../interfaces/stock.interface';

function loadFromlocalStorage(): Stock[] {
  const stocks = localStorage.getItem('stocks');
  return stocks ? JSON.parse(stocks) : [
    { id: 1, name: 'Laptop', quantity: 5 },
    { id: 2, name: 'Escritorio', quantity: 10 },
    { id: 3, name: 'Silla', quantity: 30 },
    { id: 4, name: 'Tinta', quantity: 2 },
    { id: 5, name: 'Boligrafos', quantity: 200 }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor() { }

  stocklist = signal<Stock[]>(loadFromlocalStorage());

  saveStockstoLocalStorage = effect(() => {
    localStorage.setItem('stocks', JSON.stringify(this.stocklist()));
  });

  addStock(stock: Stock) {
    this.stocklist.update((stocks) => [...stocks, stock]);
  }
}
