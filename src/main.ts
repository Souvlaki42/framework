import App from "./App";
import { render } from "./library";
import "./style.css";

let propCount = 0;
document
	.querySelector<HTMLButtonElement>("#btn-prop")
	?.addEventListener("click", () => {
		propCount++;
		renderComponent();
	});

const renderComponent = () => {
	render(
		App,
		{
			propCount,
			buttonElem: document.querySelector<HTMLButtonElement>("#btn-count"),
		},
		document.querySelector<HTMLDivElement>("#root")
	);
	render(
		App,
		{
			propCount,
			buttonElem: document.querySelector<HTMLButtonElement>("#btn-count-2"),
		},
		document.querySelector<HTMLDivElement>("#root-2")
	);
};

renderComponent();
