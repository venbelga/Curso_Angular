import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente) {
    const storageClientes = this.obterStorage();
    storageClientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storageClientes));
  }

  atualizar(cliente: Cliente) {
    const storageClientes = this.obterStorage();
    const index = storageClientes.findIndex(c => c.id === cliente.id);
    if (index !== -1) {
      storageClientes[index] = cliente;
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storageClientes));
    }
  }

  excluir(id: string) {
    const storageClientes = this.obterStorage();
    const index = storageClientes.findIndex(c => c.id === id);
    if (index !== -1) {
      storageClientes.splice(index, 1);
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storageClientes));
    }
  }

  pesquisarClientes(nome: string): Cliente[] {
    const storageClientes = this.obterStorage();
    return storageClientes.filter(cliente => cliente.nome.toLowerCase().includes(nome.toLowerCase()));
  }

  obterClientePorId(id: string): Cliente | undefined {
    const storageClientes = this.obterStorage();
    return storageClientes.find(cliente => cliente.id === id);
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
