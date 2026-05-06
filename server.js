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
          data: [10.5, -8.2, 8, 6],
          borderColor: "blue",
        },
      ],
    },
  },
  {
    widgetType: "chart",
    widgetId: 2,
    deviceId: 8,
    color: "#CB2454",
    widget: {
      chartType: "line",
      data: [2],
      dataLabels: ["Start", "Ramp", "Peak", "Cooldown"],
      color: "#CB2454",
    },
  },
  {
    widgetType: "chart",
    widgetId: 3,
    deviceId: 3,
    color: "#6A0AC7",
    widget: {
      chartType: "bar",
      datasets: [
        {
          // label: "Solar Input",
          data: [24, -8, 23, 16, -10, 15, 26, 18, 25, 18, 10, -15, 12, 15, 8],
          borderColor: "#6A0AC7",
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
      color: "#6A0AC7",
    },
  },
  {
    widgetType: "chart",
    widgetId: 4,
    deviceId: 4,
    color: "#3169E6",
    widget: {
      chartType: "doughnut",
      data: [1],
      dataLabels: ["online", "offline", "all"],
      color: "#3169E6",
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
          label: "Solar Input",
          data: [10.5, 15.2, 10, 10, -8, -10, 5, 10],
          borderColor: "orange",
        },
        {
          label: "Solar Output",
          data: [20.35, 28.2, 21, 22, 20, 18, 15, 19],
          borderColor: "red",
        },

        {
          label: "Air Conditioner",
          data: [-5.5, -10.2, 8, 16, 10, 12, 8, 13, 15],
          borderColor: "#1172D1",
        },
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
    name: "Vacuum Power",
    status: "online",
    value: 1,
  },
  {
    id: 3,
    name: "Vacuum Load",
    status: "online",
    value: 1,
  },
  {
    id: 4,
    name: "System Overview",
    status: "online",
    value: 1,
  },
  {
    id: 5,
    name: "Solar Input",
    status: "online",
    value: 10.5,
  },
  {
    id: 6,
    name: "Air Conditioner",
    status: "online",
    value: 2.5,
  },
  {
    id: 7,
    name: "Solar Output",
    status: "online",
    value: 4.35,
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
    let status = d.status;
    if (status === "offline") {
      if (Math.random() < 0.6) status = "online";
    } else {
      if (Math.random() < 0.2) status = "offline";
    }

    const mr = (Math.random() - 0.5) * 10;
    const val =
      status === "offline"
        ? 0
        : Math.max(-20, Math.min(20, +(d.value + mr).toFixed(2)));
    return {
      ...d,
      status,
      value: val,
    };
  });
  widgets = widgets.map((w) => {
    if (w.widgetId !== 100) return w;
    return {
      ...w,
      widget: {
        ...w.widget,
        datasets: w.widget.datasets.map((ds) => {
          const device = devices.find((d) => d.name === ds.label);

          return {
            ...ds,
            data: [...ds.data, device?.value ?? 0].slice(-20),
          };
        }),
      },
    };
  });

  io.emit("update", { devices, widgets });
}, 5000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
