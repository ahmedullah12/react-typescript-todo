import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

type PropsTypes = {
    todo: TodoItemType;
    completeHandler: (id: string) => void;
    deleteHandler: (id:TodoItemType["id"]) => void;
    editHandler: (id:TodoItemType["id"], value:TodoItemType["title"]) => void;
};

const TodoItem = ({todo, completeHandler, deleteHandler, editHandler}: PropsTypes) => {
    const [editActive, setEditActive] = useState<boolean>(false);
    const [textVal, setTextVal] = useState<string>(todo.title);

    return (
       <Paper sx={{
        padding: "1rem"
       }}>
        <Stack direction={"row"} alignItems={"center"}>
            {
                editActive ? 
                    <TextField value={textVal} onChange={(e) => setTextVal(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter" && textVal !== "") {
                            editHandler(todo.id, textVal);
                            setEditActive(false);
                        }
                    }}
                    /> 
                        :
                    <Typography marginRight={"auto"}>{todo.title}</Typography>
            }
            <Checkbox checked={todo.isCompleted} onChange={() => completeHandler(todo.id)}/>
            {
                editActive ? 
                    <Button sx={{fontWeight: "600", opacity: "0.5", textTransform: "inherit"}} color="secondary"
                    onClick={() => {
                        editHandler(todo.id, textVal);
                        setEditActive(false);
                    }}
                    >
                     Done
                    </Button>
                        :
                    <Button
                    sx={{fontWeight: "600", opacity: "0.5", textTransform: "inherit"}} color="secondary"
                    onClick={() => setEditActive(!editActive)} 
                    >
                        Edit
                    </Button>
            }
            <Button
                onClick={() => deleteHandler(todo.id)}
            >
                <DeleteIcon/>
            </Button>
        </Stack>
       </Paper>
    );
};

export default TodoItem;