import { v4 as uuidv4 } from "uuid";

export abstract class Component {
    private parent: Component | null = null;
    private children: Component[] = [];
    id: string;
    type: string;

    constructor(type: string) {
        this.id = uuidv4();
        this.type = type;
    }

    get Parent(): Component | null {
        return this.parent;
    }

    add(component: Component, ...args): Component {
        component.parent = this;
        this.children.push(component);
        return this;
    }

    remove(component: Component): Component {
        component.parent = null;
        this.children = this.children.filter(x => x != component);
        return this;
    }

    public abstract render(): string;

    static new<T extends new (type: string) => Component>(t: T): Component {
        return new t(t.name);
    }

    toString() {
        function replacer(key, value) {
            if (key == "id") return undefined;
            if (key == "parent") return undefined;
            if (key == "children") return value.length ? value : undefined;
            else return value;
        }
        return JSON.stringify(this, replacer)
    }

    static fromString(str: string): Component {
        function reviver(nm, val) {
            if (nm == 0) {
                this.id = uuidv4();
            }
            if (nm == "children") {
                for (let child of val)
                    child.parent = this;
            }
            return val
        }
        return JSON.parse(str, reviver);
    }
}

// interface oComponent {
//     add(component: Component, ...args): Component;
//     remove(component: Component): Component;
//     render();
// }

abstract class Leaf extends Component {
}

abstract class Composite extends Component {

}


export class CssGrid extends Composite {
    public render(): string {
        throw new Error("Method not implemented.");
    }
}

export class View extends Leaf {
    public render(): string {
        throw new Error("Method not implemented.");
    }
}
