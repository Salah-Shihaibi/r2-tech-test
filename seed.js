const fs = require("fs");

exports.readOriginalData = () => {
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) console.log(error);
    resolve(data);
  });
};

exports.seedDB = (data) => {
  fs.writeFile("./data/data.json", data, "utf8", (err) => {
    console.log(err);
  });
};
