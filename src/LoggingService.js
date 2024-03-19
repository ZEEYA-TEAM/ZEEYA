import axios from "axios";

class LoggingService {
    static logUserAction(userId, actionType, component, metadata) {

        const now = Date.now();

        const payload = {
            parent: {
              type: "database_id",
              database_id: "ecf2a1f577244a539f6bda8cefbc8c5f"
            },
            properties: {
              'UserID': {
                type: 'title',
                title: [
                  {
                    type: 'text',
                    text: {
                      content: userId
                    },
                  },
                ],
              },
              'actionType': {
                type: 'rich_text',
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: actionType
                    },
                  },
                ],
              },
              'component': {
                type: 'rich_text',
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: component
                    },
                  },
                ],
              },
              'metadata': {
                type: 'rich_text',
                rich_text: [
                  {
                    type: 'text',
                    text: {
                      content: metadata
                    },
                  },
                ],
              },
              'Date': {
                type: 'date',
                date: {
                  start: new Date(now).toISOString()
                },
              },
            },
        };

        axios.post('http://localhost:3001/api/notion/send', payload)
        .then(response => {
          console.log('Data skickad: ', response.data);
        })
        .catch(error => {
          console.error('Fel vid skickning av data till notion: ', error);
        });
    }
}

export default LoggingService;