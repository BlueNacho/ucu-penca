## Como empezar

1. Entrar a `.env.example`, renombrar el archivo a `.env` y completar los datos:

```bash
DATABASE_URL=""
DATABASE_HOST= ""
DATABASE_NAME= ""
DATABASE_USER= ""
DATABASE_PASSWORD= ""
AUTH_SECRET=""
```

2. Levantar la base de datos en Docker:

```bash
docker compose up -d db
```

3. Instalar dependencias de la aplicación web
```bash
npm i
```

4. Popular la base de datos con los datos de prueba desde la teminal la aplicación web
```bash
npm run seed
```

5. Correr la aplicación
```bash
npm run dev
```

La aplicación web se abre por defecto en [http://localhost:3000](http://localhost:3000).

## Opcional

Testear la conexión a la base de datos enseguida despues del segundo paso.

<div style="width: 100px;">
  <img src="docs/test_connection_datagrip.jpg" alt="DataGrip Test Connection">
</div>

