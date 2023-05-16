import { useState } from "react";
import Modal from "./Modal";

type Props = {
    item: { id: string, title: string, is_important: number },
    deleteTodo: (x: string) => void
}

export default function Item({ item, deleteTodo }: Props) {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <li className="flex justify-between items-center w-[400px] p-2.5 bg-[#eee] rounded-lg mt-2.5">
            {item.title}
            <button 
                onClick={() => setShowModal(true)} 
                className="p-2 rounded-md text-white border-none bg-[red]"
                id={item.is_important! === 1 ? 'important' : 'selected'}
            >Delete</button>

            {
                showModal ? (
                    <Modal data={item} deleteOp={() => deleteTodo(item.id)} cancel={() => setShowModal(false)}/>
                ) : <></>
            }
        </li>
    );
}
