const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("http://backend:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.send(`
            <html>
            <head>
                <title>Success</title>
                <style>
                    body {
                        font-family: Arial;
                        text-align: center;
                        padding: 50px;
                    }
                    .box {
                        max-width: 500px;
                        margin: auto;
                        padding: 30px;
                        border-radius: 10px;
                        background: #f4f4f4;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>Form Submitted Successfully</h1>
                    <p>${data.message}</p>
                    <a href="/">Go Back</a>
                </div>
            </body>
            </html>
        `);
  } catch (error) {
    console.error(error);

    res.status(500).send(`
            <h1>Backend connection failed</h1>
            <p>${error.message}</p>
        `);
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});
