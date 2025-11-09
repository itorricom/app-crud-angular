import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import Home  from './pages/home/home';
import Usuario from './pages/usuario/usuario';
import Stock from './pages/stock/stock';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Home, Sidebar, Usuario, Stock],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-proyecto-final');
}
