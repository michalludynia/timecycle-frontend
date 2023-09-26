import { axiosClient as axios } from "./axiosClient";

const endpoint = '/users';

const GET = async () => {
    const response = await axios.get<Context[]>(endpoint);
    return response.data;
};

const POST = async (data: RecordBody) => {
    const response = await axios.post(endpoint, data);
    return response;
};

export { GET, POST };

interface Context {
    id: string
    name: string
}

interface RecordBody {
    date: Date;
    interval: string;
    context: string;
    records: Array<{
        subcontext: string;
        minutes: number;
        activity: string;
        comment?: string;
    }>;
}