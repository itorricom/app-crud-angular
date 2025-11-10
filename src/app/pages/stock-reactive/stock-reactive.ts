import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../interfaces/stock.interface';

@Component({
  selector: 'app-stock-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './stock-reactive.html',
  styleUrl: './stock-reactive.css'
})
export default class StockReactive implements OnInit {
  stockForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    // Inicializar el formulario con validaciones
    this.stockForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    console.log('Componente Stock Reactivo inicializado');
  }

  // Método para acceder fácilmente a los controles del formulario
  get f() {
    return this.stockForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Validar si el formulario es inválido
    if (this.stockForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    // Crear el objeto stock
    const newStock: Stock = {
      id: Math.floor(Math.random() * 10000),
      name: this.stockForm.value.name,
      quantity: this.stockForm.value.quantity
    };

    // Agregar al servicio
    this.stockService.addStock(newStock);
    
    console.log('Stock agregado:', newStock);

    // Resetear el formulario
    this.stockForm.reset({
      name: '',
      quantity: 0
    });
    this.submitted = false;
  }

  onReset() {
    this.submitted = false;
    this.stockForm.reset({
      name: '',
      quantity: 0
    });
  }
}
