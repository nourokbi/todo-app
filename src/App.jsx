import "./App.css";
import Header from "./components/Header";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="app-wrapper">
      <div className="background-header"></div>
      <div className="content-wrapper">
        <Header />
        <Todo />
      </div>
    </div>
  );
}

export default App;
