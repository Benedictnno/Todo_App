import { useEffect, useState } from "react";
import Lister from "./Lister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getLocalStorage = () => {
  const value = localStorage.getItem("listHolder");
  if (value) {
    return JSON.parse(value);
  } else return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (!name) {
      notify("can not submit empty value", "danger");
    } else if (name && editing) {
      setList(
        list.map((item) => {
          if (item.id === editingId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditing(false);
      notify("successfully edited", "success");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      notify("successfully added", "success");
    }
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    notify("successfully removed item", "success");
  };

  const edit = (id) => {
    const sItem = list.find((item) => item.id === id);
    setEditing(true);
    setEditingId(id);
    setName(sItem.title);
  };

  const clearFn = () => {
    setList([]);
    notify("item cleared", "success");
  };

  const notify = (msg, type) => toast(msg, { type });

  useEffect(() => {
    localStorage.setItem("listHolder", JSON.stringify(list));
  }, [list]);

  return (
    <div className="section-center">
      <div className="grocery-form">
        <h2>To Do App</h2>
        <div className="form-control">
          <input
            type="text"
            value={name}
            className="grocery"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit} className="submit-btn">
            {editing ? "Edit" : "Add"}
          </button>
        </div>
      </div>
      {list.length > 0 && (
        <div className="grocery-container">
          <Lister items={list} removeItem={removeItem} editItem={edit} />
          <button onClick={clearFn} className="clear-btn">
            Clear
          </button>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
