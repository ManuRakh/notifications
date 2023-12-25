const fs = require("fs");

const logMessage = (message) => {
  console.log("Writing message", { message });
  const logStream = fs.createWriteStream("app.log", { flags: "a" });

  const logEntry = `${message}\n`;
  logStream.write(logEntry);
  logStream.end();
};

module.exports = {
  logMessage,
};
