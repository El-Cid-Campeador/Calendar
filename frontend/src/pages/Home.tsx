import Calendar from "../components/Calendar";

type PropsHome = {
	year: number,
	month: number,
	decrement: () => number | void,
	increment: () => number | void
}

export default function Home({ year, month, decrement, increment }: PropsHome) {
	return (
		<>
			<button onClick={() => decrement()} className="p-2.5 m-2.5 rounded-md">{`<`}</button>
			<button onClick={() => increment()} className="p-2.5 m-2.5 rounded-md">{`>`}</button>
			<Calendar month={month} year={year} />
		</>
	);
}
