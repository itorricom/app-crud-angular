import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';

@Component({
  selector: 'stock-add',
  imports: [],
  templateUrl: './stock-add.html',
  styleUrl: './stock-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockAdd {
  stockAddTitle = signal<string>("Agregar stock");
  public name = signal("Gafete");
  public quantity = signal(10);
  OnNewStock = output<Stock>();

  addStock(){
    const newStock: Stock = {
      id: Math.floor(Math.random() * 100),
      name: this.name(),
      quantity: this.quantity()
    }
    this.OnNewStock.emit(newStock);
    this.resetInputs();
  }

  resetInputs(){
    this.name.set('');
    this.quantity.set(0);
  }
}
