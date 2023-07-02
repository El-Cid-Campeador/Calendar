import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { addZero, days, months } from "../constants";
import { Link } from "react-router-dom";
import { GetAll } from "../../wailsjs/go/main/App";

type Props = {
	month: number,
	year: number
}

export default function Calendar({ year, month }: Props) {
	const begin = useMemo(() => {
		const x = new Date(year, month, 1).getDay();

		if (x === 0) {
			return 6;
		}

		return x - 1;
	}, [month, year]);

	const end = useMemo(() => {
		return new Date(year, month + 1, 0).getDate();
	}, [month, year]);

	const { data, isLoading, error, isFetching } = useQuery({
		queryKey: ['todos'],
		queryFn:async () => {
			const data = await GetAll() as { date: string, is_important: number }[];
			return data;
		}
	});

	if (isLoading || isFetching) return <h1>Loading...</h1>;
	if (error instanceof Error) return <h1>{error.message}</h1>;

	function setID(id: string) {
		if (data?.find(x => x.date === id && x.is_important !== 0)) {
			return 'important';
		}
		if (data?.find(x => x.date === id && x.is_important === 0)) {
			return 'selected';
		}
		
		return 'id';
	}

	return (
		<div className="ml-2.5">
			<h1 className="mt-5 mb-5 ">{months[month]}{" "}{year}</h1>
			<div className="grid grid-cols-7 grid-rows-[repeat(7,minmax(0,1fr))] w-[355px] h-[355px] gap-1 border-[cyan] border-2 p-1 rounded-md">
				{
                    days.map((day) => {
                        return (
                            <div key={day} className="flex justify-center items-center border-black border-b-[3px]">
                                {day}
                            </div>
                        );
                    })
                }
				
				{
					Array.from({ length: begin }).map((_, i) => {
						return <div key={i}></div>
					})
				}

				{
					Array.from({ length: end }).map((_, i) => {
						return <Link 
							to={`${year}-${addZero(month)}-${addZero(i + 1)}`} 
							key={i}
							id={setID(`${year}-${addZero(month)}-${addZero(i + 1)}`)}
							className="flex justify-center items-center bg-[#3FABF3] rounded-md text-white`"
						>{i + 1}</Link>;
					})
				}
			</div>
		</div>
	);
}
