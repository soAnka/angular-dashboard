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
    widgetId: 3,
    deviceId: 3,
    color: "blue",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [1],
      dataLabels: ["idle", "low", "medium", "high"],
    },
  },
  {
    widgetId: 4,
    deviceId: 4,
    color: "#CB2454",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [2],
      dataLabels: ["Start", "Ramp", "Peak", "Cooldown"],
    },
  },
  {
    widgetId: 5,
    deviceId: 5,
    color: "#6A0AC7",
    widget: {
      widgetType: "chart",
      chartType: "bar",
      data: [4, 8, 3, 6, 10, 5, 3, 8, 10, 12, 4, 5],
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
      ],
    },
  },
  {
    widgetId: 6,
    deviceId: 6,
    color: "#3169E6",
    widget: {
      widgetType: "chart",
      chartType: "doughnut",
      data: [1],
      dataLabels: ["online", "offline", "all"],
    },
  },
  {
    widgetId: 7,
    deviceId: 7,
    name: "Door Activity",
    status: "online",
    value: 10.5,
    color: "#31C6E6",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [10.5],
      dataLabels: ["Closed", "Opening", "Open", "Closing"],
    },
  },
  {
    widgetId: 8,
    deviceId: 8,
    color: "purple",
    widget: {
      widgetType: "chart",
    },
  },
  {
    widgetId: 9,
    deviceId: 9,
    color: "teal",
    widget: {
      widgetType: "chart",
      chartType: "line",
      data: [4.35],
      dataLabels: ["Dawn", "Morning", "Noon", "Evening"],
    },
  },
];
let devices = [
  {
    id: 3,
    name: "Vacuum Power Usage",
    status: "online",
    value: 1,
  },
  {
    id: 4,
    name: "Vacuum Power",
    status: "online",
    value: 1,
  },
  {
    id: 5,
    name: "Vacuum Load",
    status: "online",
    value: 1,
  },
  {
    id: 6,
    name: "System Overview",
    status: "online",
    value: 1,
  },
  {
    id: 7,
    name: "Door Activity",
    status: "online",
    value: 10.5,
  },
  {
    id: 8,
    name: "air conditioner",
    status: "online",
    value: 2.5,
  },
  {
    id: 9,
    name: "Solar Output",
    status: "online",
    value: 4.35,
  },
];

const updateWidget = {
  chart: (d) => {
    let status = d.status;
    if (status === "offline") {
      if (Math.random() < 0.6) status = "online";
    } else {
      if (Math.random() < 0.2) {
        status = "offline";
      }
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
      widget: {
        ...d.widget,
        data:
          status === "online"
            ? [...d.widget.data, val].slice(-20)
            : [...d.widget.data.slice(-20)],
      },
    };
  },
  table: (d) => {
    const val = Math.max(0, +(d.value + (Math.random() - 0.5)).toFixed(2));
    return {
      ...d,
      value: val,
    };
  },
};

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
    if (w.widget.widgetType !== "chart") return w;
    const device = devices.find((d) => d.id === w.deviceId);
    if (!device) return w;

    const val = device.value;

    return {
      ...w,
      widget: {
        ...w.widget,
        data: [...(w.widget.data || []), val].slice(-20),
      },
    };
  });

  io.emit("update", { devices, widgets });
}, 3000);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
