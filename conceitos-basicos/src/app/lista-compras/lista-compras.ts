import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './itemLista';

@Component({
  selector: 'app-lista-compras',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-compras.html',
  styleUrl: './lista-compras.scss',
})
export class ListaCompras {
  item: string = '';
  lista: ItemLista[] = [];

  adicionarItem() {
    let itemLista: ItemLista = new ItemLista();
    itemLista.nome = this.item;
    itemLista.id = this.lista.length + 1;
    this.lista.push(itemLista);
    this.item = '';
  }

  limparLista() {
    this.lista = [];
  }
}
