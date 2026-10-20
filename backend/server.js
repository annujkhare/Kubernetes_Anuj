const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Express backend is running" });
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email || !String(email).trim()) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message is required" });
  }
  console.log(`Received submission from ${name}`);
  return res.status(200).json({
    message: "Data received successfully",
    name: String(name).trim()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express backend running on port ${PORT}`);
});
