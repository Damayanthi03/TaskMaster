import { useState, useEffect } from "react";
import "./Todo.css";

export default function Todo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");   
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todoList")) || [];
    setList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = { text: task, completed: false, date };
      setList(updatedList);
      setEditIndex(null);
    } else {
      setList([...list, { text: task, completed: false, date }]);
    }

    setTask("");
    setDate("");
  };

  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(list[index].text);
    setDate(list[index].date || "");
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  const clearCompleted = () => {
    setList(list.filter((item) => !item.completed));
  };

  const remainingTasks = list.filter((item) => !item.completed).length;

  const filteredList = list.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );
  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      if (filteredList.length > 0) {
        setSearchMessage("✅ Task is there!");
      } else {
        setSearchMessage("❌ No task found!");
      }
    }
  };

  return (
    <div className="todo">
      <h2>TaskMaster</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Set targetdate"
      />
  
      <small className="date-info">
        📅 Set your targetdate — helps you remember when you want to complete this task.
      </small>

      <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <button onClick={clearCompleted}>Clear Completed</button>

      <p>{remainingTasks} task{remainingTasks !== 1 ? "s" : ""} left</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKey}
        placeholder="Search task..."
      />

  
      {searchMessage && <p className="search-msg">{searchMessage}</p>}

      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((item, i) => (
            <li key={i} className={item.completed ? "completed" : ""}>
              <div>
                <strong>{item.text}</strong>
                {item.date && <span className="date">📅 {item.date}</span>}
              </div>
              <div className="actions">
                <button onClick={() => toggleComplete(i)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => editTask(i)}>Edit</button>
                <button onClick={() => deleteTask(i)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-task">No tasks found</p>
        )}
      </ul>
    </div>
  );
import { useState, useEffect } from "react";
import "./Todo.css";

export default function Todo() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");   
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [searchMessage, setSearchMessage] = useState(""); 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todoList")) || [];
    setList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedList = [...list];
      updatedList[editIndex] = { text: task, completed: false, date };
      setList(updatedList);
      setEditIndex(null);
    } else {
      setList([...list, { text: task, completed: false, date }]);
    }

    setTask("");
    setDate("");
  };

  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(list[index].text);
    setDate(list[index].date || "");
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedList = [...list];
    updatedList[index].completed = !updatedList[index].completed;
    setList(updatedList);
  };

  const clearCompleted = () => {
    setList(list.filter((item) => !item.completed));
  };

  const remainingTasks = list.filter((item) => !item.completed).length;
  
  const filteredList = list.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      if (filteredList.length > 0) {
        setSearchMessage("✅ Task is there!");
      } else {
        setSearchMessage("❌ No task found!");
      }
    }
  };

  return (
    <div className="todo">
      <h2>TaskMaster</h2>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
      />
      <input
        type="date"  
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Set targetdate"
      />
  
      <small className="date-info">
        📅 Set your targetdate — helps you remember when you want to complete this task.
      </small>

      <button onClick={addTask}>
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <button onClick={clearCompleted}>Clear Completed</button>

      <p>{remainingTasks} task{remainingTasks !== 1 ? "s" : ""} left</p>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearchKey}
        placeholder="Search task..."
      />

      {searchMessage && <p className="search-msg">{searchMessage}</p>}

      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((item, i) => (
            <li key={i} className={item.completed ? "completed" : ""}>
              <div>
                <strong>{item.text}</strong>
                {item.date && <span className="date">📅 {item.date}</span>}
              </div>
              <div className="actions">
                <button onClick={() => toggleComplete(i)}>
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button onClick={() => editTask(i)}>Edit</button>
                <button onClick={() => deleteTask(i)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-task">No tasks found</p>
        )}
      </ul>
    </div>
  );
}
