import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'stock-add',
  imports: [],
  templateUrl: './stock-add.html',
  styleUrl: './stock-add.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockAdd {
  public stockAddTitle = signal<string>('Agregar Nuevo Stock');

  public name = signal<string>('Gafete');
  public quantity = signal<number>(100);

  AddStock() {
    console.log('Hola stock add');
    
  }
}
