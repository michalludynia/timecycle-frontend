import { axiosClient as axios } from "./axiosClient";


const authorize = async (credentials: CredentialsRequest): Promise<AuthorizeReponse> => {
    const response = await axios.post<AuthorizeReponse>('/auth/token', credentials);
    return response.data;
};

const getUser = async (): Promise<MeResponse> => {
    const response = await axios.get<MeResponse>('/me');
    return response.data;
};

export { authorize, getUser };

interface CredentialsRequest {
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