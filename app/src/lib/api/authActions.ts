import type { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { axiosClient as axios } from "./axiosClient";


const authorize = async (credentials: CredentialsRequest): Promise<AuthorizeReponse> => {
    const response = await axios.post<AuthorizeReponse>(
        '/auth/token',
        credentials,
        { skipAuthRefresh: true } as AxiosAuthRefreshRequestConfig
    );
    return response.data;
};

const getUser = async (): Promise<MeResponse> => {
    const response = await axios.get<MeResponse>('/me');
    return response.data;
};

export { authorize, getUser };

export interface CredentialsRequest {
    username: string;
    password: string;
}

interface AuthorizeReponse {
    token: string;
    refreshToken: string;
}

interface MeResponse {
    id: string,
    name: string
    login: string
}