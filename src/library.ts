export type Props = {
	[key: string]: any;
};

export type ComponentState<T> = {
	cache: ({ value: T } | { dependencies: any })[];
	component: (props: Props) => string;
	props: Props;
};

let globalId = 0;
let globalParent: HTMLElement;
const componentState = new Map<HTMLElement, any>();

export const render = <T extends HTMLElement | null>(
	component: (props: Props) => string,
	props: Props,
	parent: T
): void => {
	if (!parent) throw new Error("Parent isn't available in the DOM!");

	const state = componentState.get(parent) || { cache: [] };
	componentState.set(parent, { ...state, component, props });
	globalParent = parent;
	const output = component(props);
	globalId = 0;
	parent.textContent = output;
};

export const useMemo = (callback: () => void, dependencies: any[]) => {
	const id = globalId;
	const parent = globalParent;
	globalId++;

	return (() => {
		const { cache } = componentState.get(parent) || {
			cache: [],
		};
		if (!cache[id]) cache[id] = { dependencies: undefined };

		const dependenciesChanged =
			dependencies == null ||
			dependencies.some((dependency, i) => {
				return (
					cache[id].dependencies == null ||
					cache[id].dependencies[i] !== dependency
				);
			});

		if (dependenciesChanged) {
			cache[id].value = callback();
			cache[id].dependencies = dependencies;
		}

		return cache[id].value;
	})();
};

export const useEffect = (callback: () => void, dependencies: any[]) => {
	const id = globalId;
	const parent = globalParent;
	globalId++;

	(() => {
		const { cache } = componentState.get(parent) || {
			cache: [],
		};
		if (!cache[id]) cache[id] = { dependencies: undefined };

		const dependenciesChanged =
			dependencies == null ||
			dependencies.some((dependency, i) => {
				return (
					cache[id].dependencies == null ||
					cache[id].dependencies[i] !== dependency
				);
			});

		if (dependenciesChanged) {
			if (cache[id].cleanup != null) cache[id].cleanup();
			cache[id].cleanup = callback();
			cache[id].dependencies = dependencies;
		}
	})();
};

export const useState = <T>(initialState: T | (() => T)) => {
	const id = globalId;
	const parent = globalParent;
	globalId++;

	return (() => {
		const { cache } = componentState.get(parent) || {
			cache: [],
		};
		if (!cache[id])
			cache[id] = {
				value:
					typeof initialState === "function"
						? (initialState as Function)()
						: initialState,
			};

		const setState = (newState: T | ((previousState: T) => T)) => {
			const { component, props } = componentState.get(parent) || {
				component: () => "",
				props: {},
			};
			if (typeof newState === "function")
				cache[id].value = (newState as Function)(cache[id].value);
			else {
				cache[id].value = newState;
			}

			render(component, props, parent);
		};

		return [cache[id].value, setState] as const;
	})();
};
