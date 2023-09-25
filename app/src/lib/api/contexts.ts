import axios from "axios";

const uri = 'https://jsonplaceholder.typicode.com/users';

const GET = async () => {
    const response = await axios.get<Context[]>(uri);
    return response.data;
};

const POST = async (data: RecordBody) => {
    const response = await axios.post(uri, data);
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