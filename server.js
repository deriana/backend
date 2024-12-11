const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const rfcRoutes = require("./app/route/rfcRoutes");
const reportRoute = require("./app/route/reportRoutes");
const testRoute = require("./app/route/testRoute");
const userRoute = require("./app/route/userRoute");
const adminRoute = require("./app/route/adminRoute")

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rfcRoutes);
app.use("/api", reportRoute);
app.use("/api", testRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
