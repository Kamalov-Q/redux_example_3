import { useEffect, useState } from 'react'
import AddModal from '../../modals/AddModal/AddModal';
import EditModal from './../../modals/EditModal/EditModal';
import DeleteModal from '../../modals/DeleteModal/DeleteModal';
const Home = () => {
    const [todos, setTodos] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [todoData, setTodoData] = useState({});
    const [id, setId] = useState();
    const [delOpen, setDelOpen] = useState(false);
    const getTodos = async () => {
        const response = await fetch(`http://localhost:4000/todos`);
        const data = await response.json();
        setTodos(data);
    }

    useEffect(() => {
        getTodos();
    }, [])
    return (
        <div className="m-5">
            <button className="bg-green-700 m-3 border-none text-white px-4 py-2" onClick={() => setAddOpen(true)}>Add Todo</button>
            {todos?.map((todo, id) => (
                <div key={id} className={`px-4 py-2 ${todo.status == "Completed" && "border-green-800"} ${todo.status == "Progress" && "border-orange-300"} ${todo.status == "Failed" && "border-red-800"} border-[10px] flex items-center justify-between m-3`} onClick={() => {
                    setTodoData(todo);
                    setEditOpen(true);
                }}>
                    <div>
                        <div>
                            {id + 1}. {todo.title}
                        </div>
                        <div>{todo?.description}</div>
                    </div>
                    <button className='bg-red-500 text-white border-none px-4 py-2' onClick={(e) => {
                        setId(todo?.id);
                        e?.stopPropagation();
                        setDelOpen(true);
                    }}>Delete</button>
                </div>
            ))}
            {addOpen && <AddModal getData={getTodos} open={addOpen} closeModal={() => setAddOpen(false)} />}
            {editOpen && <EditModal getData={getTodos} open={editOpen} closeModal={() => setEditOpen(false)} data={todoData} />}
            {delOpen && <DeleteModal getData={getTodos} open={delOpen} closeModal={() => setDelOpen(false)} id={id} />}
        </div>
    )
}

export default Home
