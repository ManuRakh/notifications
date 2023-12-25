const express = require('express');
const app = express();
const port = 3001;
const { checkAndProcessNotifications } = require("./modules/notifications.module/notifications.service");

checkAndProcessNotifications();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
