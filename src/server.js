const PORT = 8000;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

app.listen(PORT, () => console.log("Server is running at PORT " + PORT));

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    header: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      message: [
        {
          role: "user",
          content: "What model are you running",
        },
      ],
      max_tokes: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});
