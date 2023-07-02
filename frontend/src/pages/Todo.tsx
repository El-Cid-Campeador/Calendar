import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Item from "../components/Item";
import { GetTodos, Post, Delete } from "../../wailsjs/go/main/App";

export function Todo() {
	const { date } = useParams();
	
	const navigate = useNavigate();

	const [showForm, setShowForm] = useState(false);
	const [isSelected, setIsSelected] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null!);

	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ['todo'],
		queryFn: async() => {
			const data = await GetTodos(date as string) as { id: string, title: string, is_important: number }[];
			return data;
		}
	});

	const { mutate: addTodo } = useMutation({
		mutationFn: async(title: string) => {
			return await Post(crypto.randomUUID(), title, date as string, Number(isSelected));
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo'], exact: true });
		}
	});

	const { mutate: deleteTodo } = useMutation({
		mutationFn: async(id: string) => {
			return await Delete(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todo'], exact: true });
		}
	});

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		addTodo(inputRef.current.value);
		inputRef.current.value = '';
	}

	if (isLoading) return <h1>Loading...</h1>;
	if (error instanceof Error) return <h1>{error.message}</h1>;

	return (
		<>
			<nav className="flex items-center h-[70px] bg-[#000000] text-white">
				<button onClick={() => navigate("/")} className="p-2 ml-2.5 rounded-md bg-[#1e9cf1] border-none">Home</button>
				<h1 className="ml-[45%]">{date}</h1>
			</nav>
			<div className="ml-2.5 mt-2.5">
				<button onClick={() => setShowForm(x => !x)} className="p-2 ml-2.5 rounded-md bg-[#1e9cf1] border-none">{showForm ? 'Hide' : 'Show'}</button>
				{
					showForm ? (
						<form onSubmit={handleSubmit} className="mt-4">
							<div className="flex gap-5 mb-4">
								<div className="flex items-center">
									<input type="radio" name="tmp" id="1" checked={isSelected} onChange={() => setIsSelected(x => !x)} />
									<label htmlFor="1">Important</label>
								</div>
								<div className="flex items-center">
									<input type="radio" name="tmp" id="2" checked={!isSelected} onChange={() => setIsSelected(x => !x)} />
									<label htmlFor="2">Not important</label>
								</div>
							</div>
							<input type="text" ref={inputRef} className="p-2 rounded-md shadow-2xl" />
						</form>
					) : <></>
				}
				<ul>
					{
						data?.map(item => {
							return (
								<Item item={item} deleteTodo={deleteTodo} key={item.id} />
							);
						})
					}
				</ul>
			</div>
		</>
	);
}
