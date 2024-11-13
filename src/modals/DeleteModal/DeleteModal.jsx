import { useDispatch } from "react-redux";
import { deleteTodos, getTodos } from "../../store/features/todoSlice";

const DeleteModal = ({ open, closeModal, id, getData }) => {

    // const deleteTodo = async (e) => {
    //     e?.preventDefault();
    //     const response = await fetch(`http://localhost:4000/todos/${id}`, {
    //         method: "DELETE",
    //     })
    //     const delData = await response.json();
    //     closeModal()
    //     console.log("DELETED", delData);
    //     getData();
    // }

    const dispatch = useDispatch();

    const deleteTodo = (e) => {
        e?.preventDefault();
        dispatch(deleteTodos({ id }));
        closeModal();
        window.location.reload();
    }


    console.log("DelData", id);
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
                <div className="py-2 my-2 text-2xl">O`chirilsinmi ?</div>
                <div className="flex gap-4">
                    <button className="bg-red-600 border-none text-white px-4 py-2" onClick={deleteTodo}>Ha</button>
                    <button className="bg-blue-400 border-none text-white px-4 py-2" onClick={closeModal}>Yo`q</button>
                </div>
            </div>
        </div> : null
    )
}

export default DeleteModal
