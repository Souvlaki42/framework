import { body, button, h1, head, html, link, title } from "@/lib/elements";
import { createSignal, type Page } from "@/lib/engine";

export const page: Page = () => {
	const count = createSignal<number>(0);

	count(10);
	count();

	return html([
		head([
			title("Bun Server"),
			link("", { rel: "stylesheet", href: "/styles.css" }),
		]),
		body([
			h1("Hello, From Server!", {
				style: { color: "white", textTransform: "uppercase" },
				className: "gagagag",
			}),
			button("ClickMe!", {
				className: "countButton",
			}),
		]),
	]);
};

