import { writable } from "svelte/store";

const userStore = writable<UserInterface | null>(null)

export interface UserInterface {
    id: string,
    name: string,
    login: string,
}

export { userStore }