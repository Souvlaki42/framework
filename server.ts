import { fetch } from "@/lib/routing";

Bun.serve({
	port: 8080,
	fetch,
});

