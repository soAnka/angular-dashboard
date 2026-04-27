const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const devices = [
  { id: 1, name: "warm floor", status: "offline", value: 22.5, color: "blue" },
  { id: 2, name: "smart light", status: "online", value: 18.5, color: "blue" },
  {
    id: 3,
    name: "vacuum cleaner",
    status: "online",
    value: 8.35,
    color: "blue",
  },
  {
    id: 4,
    name: "solar energy",
    status: "offline",
    value: 22.5,
    color: "blue",
  },
  {
    id: 5,
    name: "air conditioner",
    status: "online",
    value: 18.5,
    color: "blue",
  },
  { id: 6, name: "door locked", status: "online", value: 8.35, color: "blue" },
];

app.get("/api/devices", (req, res) => {
  res.json(devices);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
