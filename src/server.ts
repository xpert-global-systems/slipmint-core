import express from "express";
import cors from "cors";
import { processTrade } from "./api/trade";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "SlipMint Core running 🚀" });
});

// Trade endpoint
app.post("/trade", (req, res) => {
  try {
    const result = processTrade(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SlipMint Core running on port ${PORT}`);
});
