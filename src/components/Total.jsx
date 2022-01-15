import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export const Total = () => {
      const [todos, setTodos] = useState([]);
      const navigate = useNavigate();
      useEffect(() => {
        getTodos();
      }, []);

      function getTodos() {
        fetch(`http://localhost:3001/todos`)
          .then((r) => {
            return r.json();
          })
          .then((res) => {
            let newTodo = res.filter((e) => {
              return e.status === true;
            });
            setTodos(newTodo);
          });
      }
       const Homepage = () => {
         navigate("/");
       };
 return (
   <>
     <div>
       {todos.length !== 0 ? (
         <h1>Completed Tasks</h1>
       ) : (
         <h1>All tasks is incomplete</h1>
       )}
     </div>
     {todos.length !== 0 ? (
       todos.map((e) => {
         return (
           <div>
             <div>
               <h3>Work done = {e.title}</h3>
             </div>
           </div>
         );
       })
     ) : (
       <h1></h1>
     )}
     <button onClick={Homepage}> Home Page</button>
   </>
 );
};
