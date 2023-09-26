import { element } from "@/lib/engine";

// Core Elements
export const { new: html } = element<HTMLHtmlElement, {}>("html");
export const { new: head } = element<HTMLHeadElement, {}>("head");
export const { new: body } = element<HTMLBodyElement, {}>("body");

// Head Elements
export const { new: title } = element<HTMLTitleElement, {}>("title");
export const { new: link } = element<HTMLLinkElement, { href: string }>("link");

// Body Elements
export const { new: div } = element<HTMLDivElement, {}>("div");
export const { new: span } = element<HTMLSpanElement, {}>("span");

export const { new: button } = element<
	HTMLButtonElement,
	{ disabled?: boolean }
>("button");

export const { new: ul } = element<HTMLUListElement, {}>("ul");
export const { new: li } = element<HTMLLIElement, {}>("li");
export const { new: a } = element<HTMLAnchorElement, {}>("a");
export const { new: p } = element<HTMLParagraphElement, {}>("p");
export const { new: input } = element<HTMLInputElement, {}>("input");
export const { new: textarea } = element<HTMLTextAreaElement, {}>("textarea");
export const { new: form } = element<HTMLFormElement, {}>("form");
export const { new: img } = element<HTMLImageElement, {}>("img");
export const { new: script } = element<HTMLScriptElement, {}>("script");
export const { new: style } = element<HTMLStyleElement, {}>("style");

// Text Elements
export const { new: h1 } = element<HTMLHeadingElement, {}>("h1");
export const { new: h2 } = element<HTMLHeadingElement, {}>("h2");
export const { new: h3 } = element<HTMLHeadingElement, {}>("h3");
export const { new: h4 } = element<HTMLHeadingElement, {}>("h4");
export const { new: h5 } = element<HTMLHeadingElement, {}>("h5");
export const { new: h6 } = element<HTMLHeadingElement, {}>("h6");

export const elements = {
	html,
	head,
	body,
	title,
	link,
	div,
	span,
	button,
	ul,
	li,
	a,
	p,
	input,
	textarea,
	form,
	img,
	script,
	style,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
};
