import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import Home from "./pages/Home";
import { Todo } from "./pages/Todo";

export default function App() {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());

	function decrement() {
		if (month === 0) {
			setMonth(11);

			return setYear(y => y - 1);
		}

		setMonth(m => m - 1);

		return month;
	}

	function increment() {
		if (month === 11) {
			setMonth(0);
			
			return setYear(y => y + 1);
		}
		
		setMonth(m => m + 1);

		return month;
	}

	return (
		<Routes>
			<Route 
				path="/" 
				element={<Home year={year} month={month} increment={increment} decrement={decrement} />}
			></Route>
			<Route path=":date" element={<Todo />}></Route>
		</Routes>
	);
}
