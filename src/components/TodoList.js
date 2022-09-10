import { useSelector } from "react-redux";
import Todo from "./Todo";
import {useGetTodosQuery} from "../features/api/apiSlice";
import Loading from "./Loading";

export default function TodoList() {
    const filters = useSelector((state) => state.filters);
    const { status, colors } = filters;

    let queryStr = '';
    if(status) queryStr = `completed=${(status === 'Complete')}&`;
    if(colors.length) {
        const colorsQuery = colors.map(color => `color=${color}`).join('&')
        queryStr += colorsQuery;
    }

    if(queryStr) queryStr = `?${queryStr}`;

    const { data: todos, isLoading, isError } = useGetTodosQuery(queryStr, {
        refetchOnMountOrArgChange: true,
    });

    const filterByStatus = (todo) => {
        const { status } = filters;
        switch (status) {
            case "Complete":
                return todo.completed;

            case "Incomplete":
                return !todo.completed;

            default:
                return true;
        }
    };

    const filterByColors = (todo) => {
        const { colors } = filters;
        if (colors.length > 0) {
            return colors.includes(todo?.color);
        }
        return true;
    };

    const filterByNotCompleted = (todo) => !todo.completed;

    if(isLoading) return <div className="grid place-items-center pt-4"><Loading/></div>;
    if(isError) return <div className="grid place-items-center pt-4">Something went wrong!</div>;
    if(todos && todos.length === 0) return <div className="grid place-items-center pt-4">No task found!</div>;

    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[500px] overflow-y-auto">
            {
                todos && todos
                    // .filter(filterByNotCompleted)
                    .filter(filterByStatus)
                    .filter(filterByColors)
                    .map((todo) => (
                        <Todo todo={todo} key={todo.id} />
                    ))
            }
        </div>
    );
}
