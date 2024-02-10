import './App.css';

const App = () => {
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
            <div id="submit">&gt;</div>
          </div>
          <p className="main--info">ChatGPT is an AI tool</p>
        </div>
      </section>
    </div>
  );
};

export default App;
