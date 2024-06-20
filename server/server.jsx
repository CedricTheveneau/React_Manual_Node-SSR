import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App";
import axios from "axios";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  fs.readFile(
    path.resolve(__dirname, "./index.html"),
    "utf8",
    async (err, data) => {
      if (err) {
        return res.status(500).send("An error occurred");
      }
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        return res.send(
          data.replace(
            '<div id="root"></div>',
            `<div id="root">${ReactDOMServer.renderToStaticMarkup(
              <App tasks={response.data} />
            )}</div>`
          )
        );
      } catch (error) {
        res.status(500);
        console.error(error);
      }
    }
  );
});

app.use(
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
