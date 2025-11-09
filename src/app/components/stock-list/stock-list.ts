import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';

@Component({
  selector: 'stock-list',
  imports: [],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockList {
  stockTitle = signal<string>('Listado del stock');
  stockList = input.required<Stock[]>();
}
