import { Component, signal } from '@angular/core';
//import { Calculadora } from './calculadora/calculadora';
import {ListaCompras} from "./lista-compras/lista-compras";

@Component({
  selector: 'app-root',
  imports: [ListaCompras],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('conceitos-basicos');
  //protected readonly calculadora = new Calculadora();
  protected readonly listaCompras = new ListaCompras();
}
