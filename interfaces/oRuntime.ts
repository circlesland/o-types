import type { Observable } from "rxjs";
import type { Trigger, DeviceClass, Manifest, ManifestDefinition, Composite } from "..";
import type { SvelteViewLeaf } from "../../o-os/node_modules/o-views/_other/foo";

export interface oRuntime {
    register(id: string, instance: any): Observable<Trigger>;
    find(id: string): any;
    remove(id: string): void;
    getDeviceClass(): DeviceClass;
    _clone<T extends oRuntime>(obj: T): T;
    findManifestDefinition(manifest: Manifest): ManifestDefinition;
    getViewByName(name: string): SvelteViewLeaf;
    getLayoutByName(name: string): { new(): Composite<any, any> };
}