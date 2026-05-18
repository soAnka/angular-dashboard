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

let widgets = [
  {
    widgetType: "chart",
    widgetId: 1,
    deviceId: 1,
    color: "blue",
    widget: {
      chartType: "line",
      dataLabels: ["idle", "low", "medium", "high"],
      datasets: [
        {
          label: "Vacuum Power Usage",
          data: [-10, 18, 2, 22],
          color: "#26C8DE",
          className: "vacuum_pow_us",
        },
      ],
    },
  },
  {
    widgetType: "chart",
    widgetId: 100,
    deviceId: 2,
    color: "mixed",
    widget: {
      chartType: "line",
      dataLabels: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"],
      datasets: [
        {
          deviceId: 2,
          label: "Solar Input",
          data: [10, 12, 10, 13, 15, 9, 12, 11],
          color: "orange",
          className: "solar_inp",
        },
        {
          deviceId: 2,
          label: "Solar Output",
          data: [15, 18, 21, 19, 16, 13, 15, 16],
          color: "#CB2454",
          className: "solar_out",
        },

        {
          deviceId: 2,
          label: "Air Conditioner",
          data: [-5, -10, -8, -11, -10, -12, -8, -11],
          color: "#1172D1",
          className: "air_con",
        },
      ],
    },
  },
  {
    widgetType: "chart",
    widgetId: 3,
    deviceId: 3,
    color: "#B925FF",
    widget: {
      chartType: "bar",
      datasets: [
        {
          deviceId: 3,
          label: "Vacuum Load",
          data: [
            -15, -18, -23, 18, -20, 10, 20, 20, 15, -18, 10, -15, 12, 15, -8,
          ],
          color: "#B925FF",
          className: "vacuum_loa",
        },
      ],
      dataLabels: [
        "1h",
        "2h",
        "3h",
        "4h",
        "5h",
        "6h",
        "7h",
        "8h",
        "9h",
        "10",
        "11h",
        "12h",
        "13h",
        "14h",
        "15h",
      ],
    },
  },
];

let devices = [
  {
    id: 1,
    name: "Vacuum Power Usage",
    status: "online",
    value: 1,
  },
  {
    id: 2,
    name: "Energy Flow Overview",
    status: "online",
    value: 4,
  },
  {
    id: 3,
    name: "Vacuum Load",
    status: "online",
    value: -8,
  },
];

app.get("/api/devices", (req, res) => {
  res.json({ devices, widgets });
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // initial state
  socket.emit("init", { devices, widgets });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

setInterval(() => {
  devices = devices.map((d) => {
    const newVal = Math.floor(Math.random() * 10) + 1;
    const mr = Math.random();
    if (d.status === "offline") {
      if (mr < 0.6) d.status = "online";
    } else {
      if (mr < 0.2) d.status = "offline";
    }

    return {
      ...d,
      status: d.status,
      value: newVal,
    };
  });
  widgets = widgets.map((w) => {
    const device = devices.find((d) => d.id === w.deviceId);
    if (!w.widget.datasets) return w;

    return {
      ...w,
      widget: {
        ...w.widget,
        datasets: w.widget.datasets.map((dataset) => ({
          ...dataset,
          data:
            device.status === "online"
              ? [...dataset.data.slice(1), Math.floor(Math.random() * 12) + 1]
              : [...dataset.data],
        })),
      },
    };
  });

  io.emit("update", { devices, widgets });
}, 2000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
