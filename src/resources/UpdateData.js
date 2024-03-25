import axios from "axios";

export async function updateProjectHours(id, newHours) {
    const payload = {
        pageId: id,
        page: {
            properties: {
                'Hours': {
                    number: newHours 
                }
            }
        }
    };
    
    try {
        const response = await axios.post('http://localhost:3001/api/notion/update', payload)
        console.log('Data uppdaterad: ', response.data);
        return response;
    } catch (error) {
        console.error('Fel vid skickning av data till notion: ', error);            
    }
}