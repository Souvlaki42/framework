import { MatchedRoute, Server } from "bun";
import { Page } from "./engine";

export const router = new Bun.FileSystemRouter({
	style: "nextjs",
	dir: "./pages",
});

export const notFound = () =>
	new Response("", { status: 404, statusText: "Page not found!" });

const pageBody = (options: { page: Page; route: MatchedRoute }) => {
	const { page, route } = options;

	return page(route);
};

const servePage = async (route: MatchedRoute | null): Promise<Response> => {
	if (!route) return notFound();
	try {
		const { page }: { page: Page } = await import(route.filePath);

		const body = pageBody({ page, route });

		return new Response(body, {
			headers: { "Content-Type": "text/html" },
		});
	} catch (error) {
		return notFound();
	}
};

export async function fetch(this: Server, request: Request): Promise<Response> {
	const url = new URL(request.url);

	const pathname = url.href.replace(url.origin, "");

	const route = router.match(pathname);

	if (url.pathname.includes(".")) {
		return new Response(Bun.file(`./public${url.pathname}`));
	}

	return await servePage(route);
}

