import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './consulta.html',
  styleUrls: ['./consulta.scss'],
})
export class Consulta implements OnInit {
  listaClientes: Cliente[] = [];
  colunasTabela: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.listaClientes = this.clienteService.pesquisarClientes("");
  }
}
