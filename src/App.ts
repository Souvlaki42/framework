import { type Props, useState, useEffect, useMemo } from "./library";

export default function App({ propCount, buttonElem }: Props) {
	const [count, setCount] = useState(0);
	const propCountDoubled = useMemo(() => {
		console.log("In memo");
		return propCount * 2;
	}, [propCount]);

	useEffect(() => {
		const handler = () => setCount((currentCount) => currentCount + 1);
		buttonElem.addEventListener("click", handler);

		return () => buttonElem.removeEventListener("click", handler);
	}, [buttonElem]);

	return `
    State: ${count}
    Prop: ${propCount}
    Prop Doubled: ${propCountDoubled}
  `;
}
