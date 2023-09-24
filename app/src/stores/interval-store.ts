import { readable } from 'svelte/store';
export const intervalsStore = readable<Interval[]>([], (set) => {
    const uri = 'https://jsonplaceholder.typicode.com/users';

    (async () => {
        const response = await fetch(uri);
        const result = await response.json();
        const typedResult: Interval[] = result.map((item: any) => ({
            id: item.id,
            name: item.name,
            value: item.id,
        }));
        set(typedResult);
    })();
});

interface Interval {
    id: string
    name: string,
    value: string
}