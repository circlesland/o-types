import type { Manifest } from "./manifest";

export interface oLoader {
    getViewByName: (name: string) => any;
    getLayoutByName: (name: string) => any;
    isAreaAvailable(layoutName: string, manifest: Manifest): boolean;
    _getAreasFromString(areas);
}