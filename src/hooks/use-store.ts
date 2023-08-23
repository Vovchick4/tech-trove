'use client'

import { useSyncExternalStore } from "react";

export interface IStore {
    page: number;
    sort: object
}

let initState: IStore = {
    page: 1,
    sort: {
        name: "asc"
    }
}
let listeners: (() => void)[] = []

export const store = {
    getStore: () => {
        return initState;
    },
    setState: (newState: IStore | ((prevState: IStore) => IStore)) => {
        initState = typeof newState === 'function' ? newState(initState) : newState;
        listeners.forEach(listener => listener());
    },
    subscribe: (listener: () => void) => {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }
}

export default function useStore() {
    return useSyncExternalStore(store.subscribe, store.getStore, () => store.getStore());
}