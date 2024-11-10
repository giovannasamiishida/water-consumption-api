import { Module } from '@nestjs/common';
import { ConsumoModule } from './consumo/consumo.module';

@Module({
  imports: [ConsumoModule],
})
export class AppModule {}
