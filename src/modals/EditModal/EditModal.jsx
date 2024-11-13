import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTodos, putTodos } from "../../store/features/todoSlice";

const EditModal = ({ open, closeModal, data }) => {

    const [editData, setEditData] = useState({
        id: data.id,
        title: data?.title,
        description: data?.description,
        status: data?.status
    })
    const dispatch = useDispatch();

    const [statuses, setStatuses] = useState([]);

    const getStatuses = async () => {
        const response = await fetch(`http://localhost:4000/statuses`, {
            method: "GET"
        })
        const statusData = await response.json();
        setStatuses(statusData);
    }

    const editTodo = (e) => {
        e?.preventDefault();
        const updTodo = {
            id: editData.id,
            title: editData.title,
            description: editData.description,
            status: editData.status
        }
        dispatch(putTodos({ id: editData.id, updTodo }));
        console.log("EDITED");
        closeModal();
        window.location.reload();
    }


    useEffect(() => {
        getStatuses();
    }, []);


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
                <div className="py-2 px-3 my-2">Edit Todo</div>
                <form>
                    <div className="mb-5">
                        <input type="text" id="base-input" className="bg-gray-50 focus-within:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required placeholder="Title" value={editData?.title} onChange={(e) => setEditData({ ...editData, title: e?.target?.value })} />
                    </div>
                    <div className="mb-5">
                        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 focus-within:outline-none text-sm rounded-lg block w-full p-2.5" required placeholder="Description" value={editData?.description} onChange={(e) => setEditData({ ...editData, description: e?.target?.value })} />
                    </div>
                    <div className="mb-5">
                        <select className="bg-gray-50 border-gray-300 text-sm w-full p-2.5 focus-within:outline-none border rounded-lg" onChange={(e) => setEditData({ ...editData, status: e?.target?.value })}>
                            <option value={editData?.status} hidden selected disabled>{editData?.status}</option>
                            {statuses && statuses?.map((status) => (
                                <option value={status.name} key={status.id}>
                                    {status?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="bg-blue-700 border-none px-5 py-2 text-white" onClick={(e) => {
                        e?.preventDefault();
                        editTodo(e);
                    }}>Edit</button>
                </form>
            </div>
        </div> : null
    )
}

export default EditModal
