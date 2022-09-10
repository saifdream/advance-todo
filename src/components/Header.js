import { useState } from "react";
import tickImage from "../assets/images/double-tick.png";
import noteImage from "../assets/images/notes.png";
import plusImage from "../assets/images/plus.png";
import {
    useAddTodoMutation,
    useGetTodosQuery,
    useRemoveTodoMutation,
    useUpdateTodoMutation
} from "../features/api/apiSlice";
import Loading from "./Loading";

export default function Header() {
    const [input, setInput] = useState("");
    const [addTodo, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError }] = useAddTodoMutation();
    const [updateTodo, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useRemoveTodoMutation();

    const { todos } = useGetTodosQuery(undefined, {
        selectFromResult: ({status, data}) => ({todos: status === "fulfilled" ? data : []}),
    });

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addTodo({text: input, completed: false});
        setInput("");
    };

    const completeHandler = () => {
        Promise.all(todos.filter((todo) => !todo.completed).map(item => {
            return updateTodo({id: item.id, data: {completed: true}});
        })).then(r => console.log("Completed true completed"));
    };

    const clearHandler = () => {
        Promise.all(todos.filter((todo) => todo.completed).map(item => {
            return removeTodo(item.id);
        })).then(r => console.log("Clear Completed"))
    };

    return (
        <div>
            <form
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
                onSubmit={submitHandler}
            >
                <img src={noteImage} className="w-6 h-6" alt="Add todo" />
                <input
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                    value={input}
                    onChange={handleInput}
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusImage}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    className="flex space-x-1 cursor-pointer"
                    onClick={completeHandler}
                >
                    <img className="w-5 h-5 ml-2 mr-4" src={tickImage} alt="Complete" />
                    { isUpdateLoading && <span style={{float: 'left'}}><Loading/></span> }
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={clearHandler}>
                    { isDeleteLoading && <span style={{float: 'left'}}><Loading/></span> }
                    Clear completed
                </li>
            </ul>
        </div>
    );
}
