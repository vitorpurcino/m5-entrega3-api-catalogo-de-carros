import { app } from "./app";

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started successfully on port: ${PORT}`);
});
