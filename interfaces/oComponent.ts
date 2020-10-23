import type { Arguments, Definition, Component } from "..";

export interface oComponent<A extends Arguments, D extends Definition> {
    init(type: string, definition: D)
    getParent(): Component<A, D> | null;
    setParent(parent: Component<A, D> | null): void;
    getChildren(): { component: Component<A, D>; args: Arguments; }[];
    setChildren(children: { component: Component<A, D>; args: Arguments; }[]): void;
    add(component: Component<any, any>, args?: A): Component<A, D>;
    remove(component: Component<any, any>): Component<A, D>;
    isComposite(): boolean;
    renderCompositeStyle(): string;
    renderLeafStyle(child: Component<any,any>, args:A): string;
    getDefinition():D;
    isHidden():boolean;
    setHidden(val:boolean);
}