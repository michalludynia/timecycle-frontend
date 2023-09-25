import axios from "axios";

const uri = 'https://jsonplaceholder.typicode.com/users';

export const getIntervals = async () => {
    const response = await axios.get(uri);
    return response.data;
};

interface Interval {
    id: string
    name: string,
    value: string
}