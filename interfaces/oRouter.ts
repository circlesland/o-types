// import { createEventDispatcher } from 'svelte';
// const dispatch = createEventDispatcher();

export type RouteArguments = {
    dapp: o;
    route: string;
}

export enum o {
    DENTITY = "bafzbeidz3eazquyorhjdiosdgbc5j73yz5omnyqrasuz7pertimlmz7e5y",
    WALLET = "bafzbeicmtet2ytuo5jlg2jtuh4rbtfvntznwah5mt2kb4xj3zgxt2ol5ma",
    // textile="bafzbeiafbjcuy4dxnily3nbt7nab6ebdwyti3z7jgdrblnm4ivqw7hubki",
    MARKET = "bafzbeiahddbruy5letgjx6tiijzaednwr3zngtk57u3yyrjcsba7sqjbdq"
}

export function navigateTo(args: RouteArguments) {
    // dispatch('navigateTo', args);
}

export function navigate(args: RouteArguments){
    alert(JSON.stringify(args));
}
