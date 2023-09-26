import { persisted } from 'svelte-local-storage-store'

const tokenStore = persisted('token', "");
const refreshTokenStore = persisted('refreshToken', "");

let currentRefreshToken: string;

refreshTokenStore.subscribe(value => {
    currentRefreshToken = value;
})

let currentToken: string;

tokenStore.subscribe(value => {
    currentToken = value
})

const getRefreshToken = () => currentRefreshToken
const getToken = () => currentToken;

const setTokens = (newToken: string, newRefreshToken: string) => {
    refreshTokenStore.set(newRefreshToken);
    tokenStore.set(newToken);
};

export { getRefreshToken, setTokens, getToken };