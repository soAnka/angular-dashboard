const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

let devices = [
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
    value: 10.5,
    color: "blue",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [10.5],
    },
  },
  {
    id: 8,
    name: "air conditioner",
    status: "online",
    value: 2.5,
    color: "purple",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [2.5],
    },
  },
  {
    id: 9,
    name: "door locked",
    status: "online",
    value: 4.35,
    color: "teal",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [4.35],
    },
  },
];

const updateWidget = {
  chart: (d) => {
    const mr = Math.random() > 0.5 ? 1 : -1;
    const val = +(d.value + mr * (Math.random() * 2)).toFixed(2);
    return {
      ...d,
      value: val,
      widget: {
        ...d.widget,
        data: [...d.widget.data, val].slice(-20),
      },
    };
  },
  table: (d) => {
    const val = +(d.value + (Math.random() - 0.5)).toFixed(2);
    return {
      ...d,
      value: val,
    };
  },
};

app.get("/api/devices", (req, res) => {
  res.json(devices);
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // initial state
  socket.emit("init", devices);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

setInterval(() => {
  devices = devices.map((d) => {
    // d.widget.widgetType === "chart" ? updateWidget.chart(d) : d;
    const updater = updateWidget[d.widget.widgetType];
    return updater ? updater(d) : d;
  });

  io.emit("update", devices);
}, 3000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
