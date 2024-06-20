import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App";
import axios from "axios";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  fs.readFile(path.resolve("../index.html"), "utf8", async (err, data) => {
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
      console.error(error);
      return res.status(500).send("An error occured");
    }
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
