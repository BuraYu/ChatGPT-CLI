import "./App.css";
import { useState, useEffect } from "react";
import Select from "react-select";

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const options = [
    { value: "gpt-4-0125-preview", label: "GPT 4 0125" },
    { value: "gpt-4-turbo-preview", label: "GPT 4 Turbo" },
    { value: "gpt-4-1106-preview", label: "GPT 4 1106" },
    { value: "gpt-4-vision-preview", label: "GPT 4 Vision" },
    { value: "gpt-4-1106-vision-preview", label: "GPT 4 1106 Vision" },
    { value: "gpt-4", label: "GPT 4" },
    { value: "gpt-4-0613", label: "GPT 4 0613" },
    { value: "gpt-4-32k", label: "GPT 4 32k" },
    { value: "gpt-4-32k-0613", label: "GPT 4 32k 0613" },
    { value: "gpt-3.5-turbo-0125", label: "GPT 3.5 Turbo 0125" },
    { value: "gpt-3.5-turbo", label: "GPT 3.5 Turbo" },
    { value: "gpt-3.5-turbo-1106", label: "GPT 3.5 Turbo 1106" },
    { value: "gpt-3.5-turbo-instruct", label: "GPT 3.5 Turbo Instruct" },
    { value: "gpt-3.5-turbo-16k", label: "GPT 3.5 Turbo 16k" },
    { value: "gpt-3.5-turbo-0613", label: "GPT 3.5 Turbo 0613" },
    { value: "gpt-3.5-turbo-16k-0613", label: "GPT 3.5 Turbo 16k 0613" },
    { value: "dall-e-3", label: "DALL·E 3" },
    { value: "dall-e-2", label: "DALL·E 2" },
    { value: "tts-1", label: "Text-to-speech 1" },
    { value: "tts-1-hd", label: "Text-to-speech 1 HD" },
    { value: "whisper-1", label: "Whisper 1" },
    { value: "text-embedding-3-large", label: "Text Embedding 3 Large" },
    { value: "text-embedding-3-small", label: "Text Embedding 3 Small" },
    { value: "text-embedding-ada-002", label: "Text Embedding ADA 002" },
    { value: "text-moderation-latest", label: "Text Moderation Latest" },
    { value: "text-moderation-stable", label: "Text Moderation Stable" },
    { value: "text-moderation-007", label: "Text Moderation 007" },
    { value: "babbage-002", label: "Babbage 002" },
    { value: "davinci-002", label: "Davinci 002" },
  ];

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
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
      setMessage(data.choices[0].message);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats((previousChats) => [
        ...previousChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle]);

  const currentChat = previousChats.filter(
    (previousChats) => previousChats.title === currentTitle
  );
  const uniqueTitle = Array.from(
    new Set(previousChats.map((previousChats) => previousChats.title))
  );

  return (
    <div className="app">
      <section className="side-bar">
        <button className="side-bar--button" onClick={createNewChat}>
          + New Chat
        </button>
        <Select options={options} />
        <ul className="side-bar--history">
          {uniqueTitle?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>buriburi</p>
        </nav>
      </section>
      <section className="main">
        <h1>buriburiGPT</h1>
        <ul className="main--feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className="main--bottom-section">
          <div className="main--input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
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
