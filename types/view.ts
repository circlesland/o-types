export type SvelteView = {
    new(options: {
        target: Element;
        anchor?: Element;
        props?: Record<string, any>;
        hydrate?: boolean;
        intro?: boolean;
        $$inline?: boolean;
    })
};