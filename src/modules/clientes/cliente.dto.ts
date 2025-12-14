export interface CreateClienteDTO {
  nome: string;
  email: string;
  telefone?: string;
}

export interface UpdateClienteDTO {
  nome?: string;
  email?: string;
  telefone?: string;
}
