import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
    const port = process.env.PORT ?? 3000;

    app.listen(port, () => {
      console.log(`App running on localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
