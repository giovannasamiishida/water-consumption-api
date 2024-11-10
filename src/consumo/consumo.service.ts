import { Injectable } from '@nestjs/common';

export interface Consumo {
  userId: string;
  quantidade: number;
  data: string;
}

@Injectable()
export class ConsumoService {
  private registros: Consumo[] = [];

  registrarConsumo(consumo: Consumo) {
    this.registros.push(consumo);
    return { mensagem: 'Registro de consumo adicionado com sucesso!', consumo };
  }

  obterRegistros(userId: string, dataInicial: string, dataFinal: string) {
    return this.registros.filter(
      (registro) =>
        registro.userId === userId &&
        registro.data >= dataInicial &&
        registro.data <= dataFinal,
    );
  }

  verificarAlerta(userId: string) {
    const registrosUsuario = this.registros.filter((r) => r.userId === userId);
    if (registrosUsuario.length < 2) return { mensagem: 'Dados insuficientes para gerar alerta' };

    const ultimoMes = registrosUsuario[registrosUsuario.length - 1];
    const penultimoMes = registrosUsuario[registrosUsuario.length - 2];

    if (ultimoMes.quantidade > penultimoMes.quantidade) {
      return { alerta: `Consumo elevado detectado! Último mês: ${ultimoMes.quantidade} m³` };
    }

    return { mensagem: 'Consumo dentro dos limites' };
  }
}
