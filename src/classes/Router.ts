
export class Router {
    static async getManifestFromRoute(ctx): Promise<string> {
        let ipns = this.getIpnsHashFromUrl();
        let manifest = await this.xfetch(ipns, ctx.path.replace("/", ""));
        return JSON.stringify(manifest);
    }

    private static getIpnsHashFromUrl() {
        return window.location.pathname.split('#!')[0].split("/ipns/")[1].replace(/\//g, "");
    }

    static page;

    static checkRoute(): boolean {
        try {
            let hash = this.getIpnsHashFromUrl();
            this.page.base("/ipns/" + hash);
            return true;
        }
        catch (e) {
            // invalid link forwarded to error page
            this.page.base("/ipns/bafzbeidz3eazquyorhjdiosdgbc5j73yz5omnyqrasuz7pertimlmz7e5y");
            this.page.redirect("/error");
        }
        return false;
    }

    static appHashNameLookup = {
        "bafzbeidz3eazquyorhjdiosdgbc5j73yz5omnyqrasuz7pertimlmz7e5y": "o-dentity",
        "bafzbeicmtet2ytuo5jlg2jtuh4rbtfvntznwah5mt2kb4xj3zgxt2ol5ma": "o-wallet",
        // "bafzbeiafbjcuy4dxnily3nbt7nab6ebdwyti3z7jgdrblnm4ivqw7hubki": "textile",
        "bafzbeiahddbruy5letgjx6tiijzaednwr3zngtk57u3yyrjcsba7sqjbdq": "o-market"
    };

    static navigateTo(hash: string, action: string) {
        this.page.base(`/ipns/${hash}`);
        this.page("/" + action.toLowerCase());
    }

    static async xfetch(hash: string, page?: string): Promise<object> {
        let baseUrl = `${window.location.origin}/${window.o.isLocal
            ? `${this.appHashNameLookup[hash]}/src/`
            : `ipns/${hash}/`}`;
        page = page == "" || page == "/" || !page ? "index" : page;
        const data = await fetch(baseUrl + page + ".json");
        const json = await data.json();
        return json;
    }
}


// export function navigateTo(args: RouteArguments, dispatch: any) {
//     dispatch('navigateTo', args);
// }

// export function navigate(event) {
//     var args: RouteArguments = event.detail;
//     Router.navigateTo(args.dapp.toString(), args.route);
// }