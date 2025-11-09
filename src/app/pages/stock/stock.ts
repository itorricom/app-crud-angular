import { Component } from '@angular/core';
import { StockAdd } from '../../components/stock-add/stock-add';
import { StockList } from '../../components/stock-list/stock-list';

@Component({
  selector: 'app-stock',
  imports: [StockAdd, StockList],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export default class Stock {

}
