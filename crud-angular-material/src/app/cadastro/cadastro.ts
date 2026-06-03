import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        let clienteEncontrado = this.clienteService.obterClientePorId(id) || Cliente.newCliente();
        if (clienteEncontrado) {
          this.cliente = clienteEncontrado;
          this.atualizando = true;
        }
      } else {
        this.cliente = Cliente.newCliente();
        this.atualizando = false;
      }
    });
  }

  salvar() {
    this.clienteService.salvar(this.cliente);
    this.router.navigate(['/cadastro'], { queryParams: { id: this.cliente.id } });
  }

  atualizar() {
    this.clienteService.atualizar(this.cliente);
  }

  limpar() {
    this.cliente = Cliente.newCliente();
    this.atualizando = false;
    this.router.navigate(['/cadastro']);
  }
}
