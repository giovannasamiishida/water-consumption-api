import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ConsumoService, Consumo } from './consumo.service';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post('registro')
  registrarConsumo(
    @Body('userId') userId: string,
    @Body('quantidade') quantidade: number,
    @Body('data') data: string,
  ): { mensagem: string; consumo: Consumo } {
    return this.consumoService.registrarConsumo({ userId, quantidade, data });
  }

  @Get('historico')
  consultarHistorico(
    @Query('userId') userId: string,
    @Query('dataInicial') dataInicial: string,
    @Query('dataFinal') dataFinal: string,
  ): Consumo[] {
    return this.consumoService.obterRegistros(userId, dataInicial, dataFinal);
  }

  @Get('alerta')
  verificarAlerta(@Query('userId') userId: string) {
    return this.consumoService.verificarAlerta(userId);
  }
}
