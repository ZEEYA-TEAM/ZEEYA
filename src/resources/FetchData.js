import axios from "axios";

export async function fetchData(table) {
    const payload = {
        // Your payload data here
    };

    try {
        const response = await axios.post(`http://localhost:3001/api/notion/${table}`, payload);
        console.log('Data hämtad från notion:', response.data);
        return response.data;
    } catch (error) {
        console.error('Fel vi inhämtning från notion: ', error);
        throw error; // Re-throw the error to propagate it
    }
};