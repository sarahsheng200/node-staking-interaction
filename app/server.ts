import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/routes";
import { config } from "@config/constants";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
//todo:logger
// app.use(requestLogger)

app.use("/api", routes);

//TODO: error handler
// app.use(errorHandler)

export const startServer = async (): Promise<void> => {
  return new Promise((resolve) => {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    resolve();
  });
};

// 如果直接运行server.ts，仍可正常启动
if (require.main === module) {
  startServer();
}
