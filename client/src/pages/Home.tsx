import Calendar from "../components/Calendar";

type Props = {
	year: number,
	month: number,
	decrement: () => void,
	increment: () => void
}

export default function Home({ year, month, decrement, increment }: Props) {
	return (
		<>
			<button onClick={decrement} className="p-2.5 m-2.5 rounded-md">{`<`}</button>
			<button onClick={increment} className="p-2.5 m-2.5 rounded-md">{`>`}</button>
			<Calendar month={month} year={year} />
		</>
	);
}
