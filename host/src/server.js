const express = require('express');
const React = require('react');
const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const { default: App } = require('./App');
const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  fs.readFile(path.resolve("./dist/client-index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${renderToString(<App />)}</div>`
      )
    );
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
