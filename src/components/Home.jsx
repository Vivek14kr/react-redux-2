import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import "./Home.css";

import {
  addTodo,
  addTodoError,
  addTodoLoading,
  addTodoSuccess,
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
  updateTodoLoading,
  updateTodoSuccess,
  updateTodoError,
} from "../features/Todos/actions";
import { Link } from "react-router-dom";
export const Home = () => {
  const dispatch = useDispatch();
  const { loading, todos, error } = useSelector(
    (state) => ({
      loading: state.todoState.loading,
      todos: state.todoState.todos,
      error: state.todoState.error,
    }),
    function (prev, curr) {
      if (prev.loading == curr.loading && prev.error === curr.error) {
        return true;
      }
      return false;
    }
  );
  const [text, setText] = useState("");
  const [item, setItem] = useState({
    title: "",
    status: Boolean,
  });

  useEffect(() => {
    getTodos();
  }, []);
  async function getTodos() {
    try {
      dispatch(getTodoLoading());
      const data = await fetch("http://localhost:3001/todos").then((d) =>
        d.json()
      );
      dispatch(getTodoSuccess(data));
    } catch (err) {
      dispatch(getTodoError(err));
    }
  }

  const handleDel = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        getTodos();
      });
  };

  const handleToggle = (id) => {
    console.log(id, "this is the moment")
   let todoItem = todos.find((e) => {
     return e.id === id;
   });
   todoItem.status = !todoItem.status;
   fetch(`http://localhost:3001/todos/${id}`, {
     method: "PATCH",
     body: JSON.stringify(todoItem),
     headers: {
       "content-type": "application/json",
     },
   })
     .then((res) => {
       return res.json();
     })
     .then((r) => {
       // console.log(r);
    
       getTodos();
     })
     .catch((e) => {
       dispatch(addTodoError());
     });
  
  };

  const handleUpdate = (id) => {
    console.log(item, "jhj");
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => {
        return r.json();
      })
      .then(() => {
        getTodos();
        setItem("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const addTodo = () => {
    dispatch(addTodoLoading());
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: false, title: text }),
    })
      .then((d) => d.json())
      .then((res) => {
        //success
        dispatch(addTodoSuccess(res));
        getTodos();
        setText("")
       
      })
      .catch((err) => {
        dispatch(addTodoError(err));
      });
  };
  console.log(todos, "tum");
  const handleChange = (e) => {
    const { value, name } = e.target;
    setItem({ ...item, [name]: value });
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div>
      <h1>Add ToDo</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="enter todo"
      />
      <button
        onClick={() => {
          addTodo();
        }}
      >
        Add Todo
      </button>
      <div className="mainbox">
        {todos.map((e) => (
          <>
            <div className="box" key={e.id}>
              <Link to={`/todos/${e.id}`}>{e.title} </Link>-
              <Popup
                key={e.id}
                trigger={<button>Edit</button>}
                position="right center"
              >
                <input
                  onChange={handleChange}
                  name="title"
                  value={item.title}
                  placeholder="update"
                />
                <button
                  onClick={() => {
                    handleUpdate(e.id);
                  }}
                >
                  Update
                </button>
              </Popup>
              <button onClick={() => handleToggle(e.id)}>
                {e.status ? "Done" : "Not Done"}
              </button>
              <button
                onClick={() => {
                  handleDel(e.id);
                }}
              >
                Delete
              </button>
            </div>
          </>
        ))}
      </div>

      <div>
        <Link to={`/Total`}>
         
          <button>Completed Tasks</button>
        </Link>
        -
      </div>
    </div>
  );
};
