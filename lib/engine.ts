import type { MatchedRoute } from "bun";
import type { HTMLAttributes } from "react";

export type Page = (route: MatchedRoute) => string;

export type ElementProps<E extends HTMLElement, T> = HTMLAttributes<E> & {
	newLine?: boolean;
	[name: string]: unknown;
} & T;

export function element<E extends HTMLElement, T>(tag: string) {
	const handler = (
		children?: string | string[],
		props?: ElementProps<E, T>
	): string => {
		const openingTag = "<" + `${tag} ${!props ? "" : propsParser<E>(props)}>`;

		const elements = !children
			? ""
			: typeof children === "string"
			? children
			: children.join("");

		const closingTag = `</${tag}>`;

		const newLine = !props || props.newLine ? "\n" : "";

		return openingTag + elements + closingTag + newLine;
	};

	return {
		new: handler,
	};
}

function kebabCaseConverter(input: string): string {
	return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function propsParser<E extends HTMLElement>(props: HTMLAttributes<E>): string {
	const htmlProps = Object.entries(props)
		.map(([key, value]) => {
			// Convert camelCase to kebab-case for non-event attributes
			let htmlKey = key === "style" ? key : kebabCaseConverter(key);

			// Convert className to class
			if (key === "className") {
				htmlKey = "class";
			}

			if (key === "style" && typeof value === "object") {
				const styleString = Object.entries(value)
					.map(([styleKey, styleValue]) => {
						// Convert camelCase to kebab-case for style keys
						const convertedStyleKey = kebabCaseConverter(styleKey);
						return `${convertedStyleKey}:${styleValue}`;
					})
					.join(";");
				return `${htmlKey}='${styleString}'`;
			} else if (typeof value === "function") {
				// Handle event handlers with escaping double quotes and converting to lowercase
				const eventHandlerString = value
					.toString()
					.replace(/\(\) => /g, "")
					.replace(/"/g, "'");
				const eventName = key.toLowerCase();
				return `${eventName}="${eventHandlerString}"`;
			} else if (typeof value === "boolean") {
				// Handle boolean values
				return value ? `${htmlKey}` : "";
			} else {
				return `${htmlKey}="${value}"`;
			}
		})
		.filter((prop) => prop !== "") // Remove empty strings
		.join(" ");

	return htmlProps;
}

export function checkJavascriptNeeds(htmlContent: string): boolean {
	// Regular expressions to search for JavaScript-related patterns
	const scriptTagRegex = /<script[\s\S]*?<\/script>/gi; // Matches <script> tags
	const eventAttributeRegex = /on\w+\s*=/gi; // Matches event handler attributes like onclick, onmouseover, etc.

	// Check for <script> tags
	const scriptTagsFound = scriptTagRegex.test(htmlContent);

	// Check for event handler attributes
	const eventAttributesFound = eventAttributeRegex.test(htmlContent);

	// If either scripts or event handlers are found, JavaScript is needed
	const requiresJavascript = scriptTagsFound || eventAttributesFound;

	if (requiresJavascript)
		console.warn("The page you provided actually uses js in the client.");

	return requiresJavascript;
}

const stateManager: Map<number, any> = new Map<number, any>();

export function createSignal<T>(initialValue?: T) {
	const stateNumber = Math.floor(Math.random() * 999);
	stateManager.set(stateNumber, initialValue);
	console.log(`Add ${stateNumber}: ${initialValue}`);

	const getValue = () => {
		const value = stateManager.get(stateNumber);
		console.log(`Get ${stateNumber}: ${value}`);
		return value as T;
	};

	const setValue = (newValue: T) => {
		stateManager.set(stateNumber, newValue);
		console.log(`Set ${stateNumber}: ${newValue}`);
		return newValue;
	};

	return (newValue?: T) => {
		if (!newValue) return getValue();
		else return setValue(newValue);
	};
}

