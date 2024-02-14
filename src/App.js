import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState(null);

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello!",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      // setMessage(data.choices[0].message);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <section className="side-bar">
        <button className="side-bar--button">+ New Chat</button>
        <ul className="side-bar--history">
          <li>test</li>
        </ul>
        <nav>
          <p>buriburi</p>
        </nav>
      </section>
      <section className="main">
        <h1>buriburiGPT</h1>
        <ul className="main--feed"></ul>
        <div className="main--bottom-section">
          <div className="main--input-container">
            <input />
            <div id="submit" onClick={getMessages}>
              &gt;
            </div>
          </div>
          <p className="main--info">ChatGPT is an AI tool</p>
        </div>
      </section>
    </div>
  );
};

export default App;
