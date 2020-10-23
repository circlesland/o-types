import { v4 as uuidv4 } from "uuid";
import type { oComponent, oRegistry } from "../interfaces";

export abstract class Arguments { }
export abstract class Definition { }


export abstract class Component<Args extends Arguments, Def extends Definition> implements oComponent<Args, Def> {
    title: string;
    private parent: Component<Args, Def> | null = null;
    private children: { component: Component<Args, Def>; args: Arguments; }[] = [];
    id: string;
    type: string;
    data: object;
    private definition: Def;
    private hidden: boolean;
    new() {
    }
    constructor() {
        this.id = uuidv4();
    }
    isHidden(): boolean {
        return this.hidden;
    }
    setHidden(val: boolean) {
        this.hidden = val;
    }
    abstract renderLeafStyle(child: Component<any, any>, args: Args): string;

    getDefinition(): Def {
        return this.definition;
    }

    abstract renderCompositeStyle(): string;

    setChildren(children: { component: Component<Args, Def>; args: Arguments; }[]): void {
        this.children = children;
    }
    setParent(parent: Component<Args, Def> | null): void {
        this.parent = parent;
    }
    getParent(): Component<Args, Def> | null {
        return this.parent;
    }
    getChildren(): { component: Component<Args, Def>; args: Arguments; }[] {
        return this.children;
    }
    add(component: Component<any, any>, args?: Args): Component<Args, Def> {
        if (this.isComposite) {
            component.setParent(this);
            this.children.push({ component, args });
        }
        else if (this.parent) {
            this.parent.add(component);
            console.warn("you cannot add a component to a leaf. I have added it to parent Component.")
        }
        else {
            throw Error("Component couldn't added")
        }
        return this;
    }
    remove(component: Component<any, any>): Component<Args, Def> {
        component.parent = null;
        this.children = this.children.filter(x => x.component == component);
        return this;
    }
    init(type: string, definition: Def) {
        this.type = type;
        this.definition = definition;
    }
    isComposite(): boolean {
        return this instanceof Composite;
    }


    toString() {
        function replacer(key, value) {
            if (key == "id")
                return undefined;
            if (key == "parent")
                return undefined;
            // if (key == "data")
            //     return JSON.stringify(value);
            if (key == "children")
                return value.length ? value : undefined;
            else
                return value;
        }
        return JSON.stringify(this, replacer);
    }

    static fromString(str: string, registry: oRegistry): Component<any, any> {
        function reviver(nm, val) {
            if (nm == 0) {
                this.id = uuidv4();
            }
            if (nm == "children") {
                for (let child of val)
                    child.parent = this;
            }
            // if (nm == "data") {
            //     // return JSON.parse(val)
            // }
            return val;
        }
        var json = JSON.parse(str, reviver);
        var composite = this.convertToComposite(json, registry);
        return composite;
    }

    private static convertToComposite(json: any, registry: oRegistry): Component<any, any> {
        var converted = registry.getNewInstance<Component<any, any>>(json.type, json);
        var children: { component: Component<any, any>; args: Arguments; }[] = [];
        for (let child of converted.getChildren()) {
            let convertedChild = this.convertToComposite(child.component, registry);
            convertedChild.setParent(converted);
            children.push({ args: child.args, component: convertedChild });
        }
        converted.setChildren(children);
        return converted;
    }

    protected static create<T extends new () => Component<any, any>, A extends Arguments, U extends Definition>(t: T, definition: U, a: A): Component<A, U> {
        let comp = new t();
        comp.init(t.name, definition);
        return comp;
    }
}

export abstract class Composite<A extends Arguments, D extends Definition> extends Component<A, D> { }

export abstract class Leaf<A extends Arguments, D extends Definition> extends Component<A, D> {
    abstract getSvelteView(): string;
}
