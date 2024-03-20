import axios from "axios";

export async function sendPerson(name, role) {
    const payload = {
        parent: {
            type: "database_id",
            database_id: "b86de2e54b4c4e7789b07dc308489e4d"
        },
        properties: {
            'Name': {
            type:'title',
            title: [
                {
                type: 'text',
                text: {
                    content: name
                    }
                }
                ]
            },
            'Role': {
                rich_text: [
                {
                    text: {
                    content: role
                    }
                }
                ]
            }
        }
    };
    
    try {
        const response = await axios.post('http://localhost:3001/api/notion/send', payload)
        console.log('Data skickad: ', response.data);
        return response;
    } catch (error) {
        console.error('Fel vid skickning av data till notion: ', error);            
    }
};


