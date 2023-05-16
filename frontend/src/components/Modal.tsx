type Props = {
    data: { id: string, title: string },
    deleteOp: () => void
    cancel: () => void
}

export default function Modal({ data, deleteOp, cancel }: Props) {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.87)] text-4xl">
            <div className="bg-[red] rounded-2xl p-2 w-[300px] h-[120px] text-white">
                <h1>Are you sure to delete: <span className=" font-bold">{data.title}</span>?</h1>
                <div className="flex justify-between mt-5">
                    <span className="border-[1px] border-white border-solid p-2.5 cursor-pointer rounded-lg" onClick={() => deleteOp()}>Delete</span>
                    <span className="border-[1px] border-white border-solid p-2.5 cursor-pointer rounded-lg" onClick={() => cancel()}>Cancel</span>
                </div>
            </div>
        </div>
    );
}
