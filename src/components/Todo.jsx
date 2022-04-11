import React, { useState, useEffect, useRef } from "react";

function Todo() {
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState({});

    const isMounted = useRef(true);

    useEffect(() => {
        console.log("mounted todo");
        fetch(`https://jsonplaceholder.typicode.com/todos/1`)
            .then((res) => res.json())
            .then((data) => {
                setTimeout(() => {
                    if (isMounted.current) {
                        setTodo(data);
                        setLoading(false);
                    }
                }, 3000);
            });

        // Runs when component is unmounted
        return () => {
            isMounted.current = false;
            console.log("unmounted todo");
        };
    }, [isMounted]);

    return <div>{loading ? <h3>Loading...</h3> : <h1>{todo.title}</h1>}</div>;
}

export default Todo;
