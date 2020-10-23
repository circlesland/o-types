import type { Constructor } from "../types/constructor";

export interface oRegistry {
    getNewInstance<I>(name: string, clone?: any, ...args: any[]): I;
    getClass<I>(name: string): Constructor<I>;
    registerClass<T extends Constructor<I>, I>(ctor: T);
}