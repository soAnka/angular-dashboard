const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const devices = [
  { id: 1, name: "Sensor 01" },
  { id: 2, name: "Sensor 02" },
  { id: 3, name: "Sensor 03" },
];

app.get("/api/devices", (req, res) => {
  res.json(devices);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
