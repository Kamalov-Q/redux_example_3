import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postTodos } from "../../store/features/todoSlice";

const AddModal = ({ open, closeModal }) => {

    const [statuses, setStatuses] = useState([]);

    const getStatuses = async () => {
        const response = await fetch(`http://localhost:4000/statuses`, {
            method: "GET"
        })
        const statusData = await response.json();
        setStatuses(statusData);
    }

    const dispatch = useDispatch();


    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("");

    const addTodo = (e) => {
        e?.preventDefault();
        const id = crypto.randomUUID();
        const newTodo = {
            id: id,
            title: title,
            description: desc,
            status: status
        }
        dispatch(postTodos(newTodo));
        console.log("Added");
        closeModal();
    }

    useEffect(() => {
        getStatuses();
    }, [])

    return (
        open ? <div
            onClick={closeModal}
            className="w-[100vw] h-[100vh] fixed z-50 top-0 left-0 bg-[#00000030] grid place-items-center"
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className="bg-white lg:w-[550px] md:w-[730px] h-auto max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl px-6 py-5"
            >
                <div className="py-2 px-3 my-2">Add Todo</div>
                <form onSubmit={(e) => {
                    addTodo(e)
                }}>
                    <div className="mb-5">
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required placeholder="Title" onChange={(e) => setTitle(e?.target?.value)} />
                    </div>
                    <div className="mb-5">
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required placeholder="Description" onChange={(e) => setDesc(e?.target?.value)} />
                    </div>
                    <div className="mb-5">
                        <select className="bg-gray-50 border-gray-300 text-sm w-full p-2.5 focus-within:outline-none border rounded-lg" required onChange={(e) => setStatus(e?.target?.value)}>
                            <option value="Default" hidden selected disabled>Status</option>
                            {statuses && statuses?.map((status) => (
                                <option value={status.name} key={status.id}>
                                    {status?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-green-700 border-none px-5 py-2 text-white">Add</button>
                </form>
            </div>
        </div> : null
    )
}

export default AddModal
