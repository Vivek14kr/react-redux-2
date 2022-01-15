import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"


export const TodoDetails = ()=>{
    const {todoid} = useParams()
    const [user, setUser] = useState({});
     const [toggle, setToggle] = useState(false);

    useEffect(() => {
            fetch(`http://localhost:3001/todos/${todoid}`)
              .then((d) => d.json())
              .then((res) => setUser(res));
    }, []);
      const handleToggle = (id) => {
        setToggle(!toggle);

  
      };

    console.log(user, "dfdjkfjdkfdkf")
    return (
      <div>
        <h1>Product Name: {user.title}</h1>
        <button onClick={() => handleToggle(user.id)}>
          {toggle ? "Done" : "Not Done"}
        </button>
      </div>
    );
}