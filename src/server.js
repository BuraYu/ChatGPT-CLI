require("dotenv").config({ path: "./src/.env" });
const PORT = 8000;
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.listen(PORT, () => console.log("Server is running at PORT " + PORT));

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      //prettier-ignore
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //prettier-ignore
      "model": "gpt-3.5-turbo",
      //prettier-ignore
      "messages": [{"role": "user", "content": req.body.message}],
      //prettier-ignore
      "max_tokens": 512,
      //prettier-ignore
      "top_p": 1,
      //prettier-ignore
      "temperature": 0.5,
      //prettier-ignore
      "frequency_penalty": 0,
      //prettier-ignore
      "presence_penalty": 0,
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
