import { Component, signal } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';


@Component({
  selector: 'stock-list',
  imports: [],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})
export class StockList {
  stockTitle = signal<string>('Listado de Stock');
  
}
