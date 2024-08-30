import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Config } from "./configuracion/configuracion";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { formatearErroresValidacion } from "./utils/functions/formatear-errores-validacion";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: errors => {
        const mensajeValidaciones = formatearErroresValidacion(errors);
        return new BadRequestException(mensajeValidaciones);
      }
    })
  );

  await app.listen(Config.puerto);
  console.log(`Corriendo reservations en puerto ${Config.puerto}`);
}
bootstrap();

