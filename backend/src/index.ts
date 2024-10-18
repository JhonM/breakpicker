import server from "./server";

const PORT = 3000;

server.listen(PORT, () => {
  console.info(`Server is running on ${PORT}`);
});
