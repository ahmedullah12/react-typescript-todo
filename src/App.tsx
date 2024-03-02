import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "./utils/features";


function App(){
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");


  const handleAddTodo = () => {
    const newTodo:TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.floor(Math.random() * 100000000)),
    };

    setTodos(prev => ([...prev, newTodo]));
    saveTodos(todos);
    setTitle("");
  }

  const completeHandler = (id:TodoItemType["id"]): void => {
    const newTodos:TodoItemType[] = todos.map(todo => {
      if(todo.id === id) todo.isCompleted = !todo.isCompleted;
      return todo;
    });
    setTodos(newTodos);
    saveTodos(todos)
  }

  const deleteHandler = (id:TodoItemType["id"]): void => {
    const newTodos:TodoItemType[] = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
    saveTodos(todos);
  };

  const editHandler = (id:TodoItemType["id"], value:TodoItemType["title"]): void => {
    console.log(value);
    const newTodos:TodoItemType[] = todos.map(todo => {
      if(todo.id === id) todo.title = value;
      return todo;
    });
    setTodos(newTodos);
    saveTodos(todos);
  };


  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  return <Container maxWidth="sm" sx={{height: "100vh"}}>
    <AppBar position="static">
      <Toolbar>
        <Typography>Todo App</Typography>
      </Toolbar>
    </AppBar>
    
    <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
      {
        todos.map(todo => <TodoItem 
          key={todo.id} todo={todo}
          completeHandler={completeHandler}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        ></TodoItem>)
      }
    </Stack>
    <TextField value={title} onChange={(e) => setTitle(e.target.value)}
     fullWidth label={"New Task"}
     onKeyDown={(e) => {
        if (e.key === "Enter" && title !== "") handleAddTodo();
     }}
     />

    <Button disabled={title === ""} onClick={handleAddTodo} sx={{margin: "1rem 0"}} variant="contained" fullWidth>Add</Button>
  </Container>
  
}

export default App
