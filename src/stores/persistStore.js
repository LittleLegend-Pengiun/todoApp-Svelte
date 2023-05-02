import { writable } from "svelte/store";

export const persistStore = (key, initial) => {
    const persist = localStorage.getItem(key);
    let data;
    try {
        data = persist ? JSON.parse(persist) : initial;
    } catch (e) {
        localStorage.clear();
    }
    const store = writable(data, () => {
        const unsub = store.subscribe(value => {
            localStorage.getItem(key, JSON.stringify(value))
        })

        return unsub
    })

    return store
}