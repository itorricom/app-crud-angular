import { Component } from '@angular/core';
import { StockAdd } from '../../components/stock-add/stock-add';
import { StockList } from '../../components/stock-list/stock-list';
import { StockService } from '../../services/stock.service';
import { Stock as StockInterface } from '../../interfaces/stock.interface';

@Component({
  selector: 'app-stock',
  imports: [StockAdd, StockList],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export default class Stock {
  constructor(public stockService: StockService) { }

  onNewStock(stock: StockInterface) {
    this.stockService.addStock(stock);
  }
}
