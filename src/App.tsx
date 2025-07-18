import TodoList from "./components/TodoList";
import "./CSS/App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logoside">
          <h1>Add New Task</h1>
        </div>
      </header>

      <main className="main-content">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
