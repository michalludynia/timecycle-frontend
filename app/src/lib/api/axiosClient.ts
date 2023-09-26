import axios from "axios";
import { getRefreshToken, getToken, setTokens } from "../stores/tokens.store";
import createAuthRefreshInterceptor, { type AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

const axiosClient = axios.create({
    // baseURL: 'https://6cd262b8-7f11-4628-8aec-57bf4e71660b.mock.pstmn.io/',
    baseURL: 'https://localhost/',
});

createAuthRefreshInterceptor(
    axiosClient,
    () => (async (): Promise<any> => {
        const newToken = await axiosClient.post<RefreshResponse>(
            '/auth/token/refresh',
            { "refreshToken": getRefreshToken() },
            { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig
        );
        setTokens(newToken.data.token, newToken.data.refreshToken);
        return Promise.resolve();
    })()
);

axiosClient.interceptors.request.use((request) => {
    const token = getToken();
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

type RefreshResponse = {
    token: string,
    refreshToken: string,
}

export { axiosClient }