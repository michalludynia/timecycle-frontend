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

const tokensAreAvailable = () => !!(currentToken && currentRefreshToken);

const setTokens = (newToken: string, newRefreshToken: string) => {
    refreshTokenStore.set(newRefreshToken);
    tokenStore.set(newToken);
};

const clearTokens = () => {
    refreshTokenStore.set("");
    tokenStore.set("");
}

export { getRefreshToken, setTokens, getToken, tokensAreAvailable, clearTokens };