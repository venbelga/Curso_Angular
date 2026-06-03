import { Component, OnInit, inject } from '@angular/core';
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snackBar: MatSnackBar = inject(MatSnackBar);

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
    this.openSnackBar('Cliente salvo com sucesso!');
    this.router.navigate(['/cadastro'], { queryParams: { id: this.cliente.id } });
  }

  atualizar() {
    this.clienteService.atualizar(this.cliente);
    this.openSnackBar('Cliente atualizado com sucesso!');
  }

  limpar() {
    this.cliente = Cliente.newCliente();
    this.atualizando = false;
    this.router.navigate(['/cadastro']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }
}
