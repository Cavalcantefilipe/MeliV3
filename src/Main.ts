import express from "express";
import routes from "./infra/http/Routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./shared/swagger.json" with { type: "json" };
import { requestLogger } from "./infra/http/middlewares/LoggerMiddleware.js";

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use("/api", routes);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger at http://localhost:${port}/api-docs`);
});


