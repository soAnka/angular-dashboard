const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const devices = [
  // {
  //   id: 1,
  //   name: "warm floor",
  //   status: "offline",
  //   value: 22.5,
  //   color: "blue",
  //   widget: {
  //     widgetType: "info",
  //     chartType: "bar",
  //   },
  // },
  // {
  //   id: 2,
  //   name: "smart light",
  //   status: "online",
  //   value: 18.5,
  //   color: "purple",
  //   widget: {
  //     widgetType: "info",
  //     chartType: "bar",
  //   },
  // },
  // {
  //   id: 3,
  //   name: "vacuum cleaner",
  //   status: "online",
  //   value: 8.35,
  //   color: "blue",
  //   widget: {
  //     widgetType: "info",
  //     chartType: "line",
  //   },
  // },
  //  { id: 4,
  //   name: "vacuum cleaner",
  //   status: "online",
  //   value: 8.35,
  //   color: "blue",
  //   widget: {
  //     widgetType: "info",
  //     chartType: "line",
  //   },
  // },
  //  { id: 5,
  //   name: "vacuum cleaner",
  //   status: "online",
  //   value: 8.35,
  //   color: "blue",
  //   widget: {
  //     widgetType: "chart",
  //     chartType: "line",
  //   },
  // },
  //  { id: 6,
  //   name: "vacuum cleaner",
  //   status: "online",
  //   value: 8.35,
  //   color: "blue",
  //   widget: {
  //     widgetType: "chart",
  //     chartType: "line",
  //   },
  // },
  {
    id: 7,
    name: "solar energy",
    status: "offline",
    value: 22.5,
    color: "green",
    widget: {
      widgetType: "chart",
      chartType: "line",
    },
  },
  {
    id: 8,
    name: "air conditioner",
    status: "online",
    value: 18.5,
    color: "blue",
    widget: {
      widgetType: "chart",
      chartType: "line",
    },
  },
  {
    id: 9,
    name: "door locked",
    status: "online",
    value: 8.35,
    color: "green",
    widget: {
      widgetType: "chart",
      chartType: "line",
    },
  },
];

app.get("/api/devices", (req, res) => {
  res.json(devices);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
