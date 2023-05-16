import { Route, Routes } from "react-router-dom";
import { useMemo, useState } from "react";
import { addZero } from "./constants";
import Calendar from "./components/Calendar";
import { Todo } from "./components/Todo";

type PropsHome = {
	year: number,
	month: number,
	decrement: () => number | void,
	increment: () => number | void
}

function Home({ year, month, decrement, increment }: PropsHome) {
	return (
		<>
			<button onClick={() => decrement()} className="p-2.5 m-2.5 rounded-md">{`<`}</button>
			<button onClick={() => increment()} className="p-2.5 m-2.5 rounded-md">{`>`}</button>
			<Calendar month={month} year={year} />
		</>
	);
}

export default function App() {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());

	const end = useMemo(() => {
		return new Date(year, month + 1, 0).getDate();
	}, [month, year]);

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
			{
				Array.from({ length: end }).map((_, i) => {
					return <Route 
						path={`${year}-${addZero(month)}-${addZero(i + 1)}`} 
						element={<Todo date={`${year}-${addZero(month)}-${addZero(i + 1)}`} />}
						key={`${year}-${addZero(month)}-${addZero(i + 1)}`}
					>
					</Route>
				})
			}
		</Routes>
	);
}
