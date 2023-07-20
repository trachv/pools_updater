import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigModule global, no need to import it in other modules
      envFilePath: '.env', // path to your env variables
      // validate or transform the env variables if needed
      // validationSchema: Joi.object({
      //   UNISWAP_V3_SUBGRAPH_URL: Joi.string().required(),
      // }),
    }),
  ],
})
export class AppConfigModule {}
