import { useState } from "react";
import useToggle from "./../hooks/useToggle";
import editImage from "../assets/images/edit.png";
import checkMarkImage from "../assets/images/check-mark.png";
import cancelImage from "../assets/images/cancel.png";
import {useRemoveTodoMutation, useUpdateTodoMutation} from "../features/api/apiSlice";
import Loading from "./Loading";

export default function Todo({ todo }) {
    const [editedTodo, setEditedTodo] = useState();
    const [value, toggleValue] = useToggle();

    // const [addTodo, { isLoading: isAddLoading, isSuccess: isAddSuccess, isError: isAddError }] = useAddTodoMutation();
    const [updateTodo, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateTodoMutation();
    const [removeTodo, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError }] = useRemoveTodoMutation();

    const { text, id, completed, color } = todo;

    const handleStatusChange = (todoId) => {
        updateTodo({id: todoId, data: {completed: !completed}});
    };

    const handleColorChange = (todoId, color) => {
        updateTodo({id: todoId, data: {color}});
    };

    const handleEdit = () => {
        updateTodo({id, data: {text: editedTodo}});
        setTimeout(()=> toggleValue(), 300);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            handleEdit();
        }
    }

    const handleDelete = (todoId) => {
        removeTodo(todoId);
    };

    return (
        <div className="flex justify-start items-center p-2 hover:bg-gray-100 hover:transition-all space-x-4 border-b border-gray-400/20 last:border-0">
            <div
                className={`relative rounded-full bg-white border-2 border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 ${
                    completed &&
                    "border-green-500 focus-within:border-green-500"
                }`}
            >
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleStatusChange(id)}
                    className="opacity-0 absolute rounded-full"
                />
                {completed && (
                    <svg
                        className="fill-current w-3 h-3 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                    >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                )}
            </div>

            <div
                className={`select-none flex-1 ${completed && "line-through"}`}
            >
                {
                    value ?
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                            onChange={(e) => setEditedTodo(e.target.value)}
                            onKeyDown={handleKeyDown}
                            value={editedTodo}
                        />
                        :
                        text
                }
                {
                    isUpdateLoading && <span style={{float: 'right'}}><Loading/></span>
                }
            </div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-green-500 border-green-500 ${
                    color === "green" && "bg-green-500"
                }`}
                onClick={() => handleColorChange(id, "green")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-yellow-500 border-yellow-500 ${
                    color === "yellow" && "bg-yellow-500"
                }`}
                onClick={() => handleColorChange(id, "yellow")}
            ></div>

            <div
                className={`flex-shrink-0 h-4 w-4 rounded-full border-2 ml-auto cursor-pointer hover:bg-red-500 border-red-500 ${
                    color === "red" && "bg-red-500"
                }`}
                onClick={() => handleColorChange(id, "red")}
            ></div>

            {
                value ?
                    <img
                        src={checkMarkImage}
                        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                        alt="Edit"
                        onClick={handleEdit}
                    />
                    :
                    <img
                        src={editImage}
                        className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                        alt="Edit"
                        onClick={() => { toggleValue(); setEditedTodo(text); }}
                    />
            }

            <img
                src={cancelImage}
                className="flex-shrink-0 w-4 h-4 ml-2 cursor-pointer"
                alt="Cancel"
                onClick={() => handleDelete(id)}
            />
        </div>
    );
}
