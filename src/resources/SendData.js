import axios from "axios";

export async function sendProject(projectName, hours, status, statusColor, dateStart, dateEnd) {
    const payload = {
        parent: {
            type: "database_id",
            database_id: "0cb39c6042c547a988326a168176d6fe"
        },
        properties: {
            'Projectname': {
            type:'title',
            title: [
                {
                    type: 'text',
                    text: {
                        content: projectName
                    }
                }
                ]
            },
            'Hours': {
                type: 'number',
                number: hours 
            },
            'Status': {
                type: 'select',
                select: {
                    name: status,
                    color: statusColor
                }
            },
            'Timespan': {
                type: 'date',
                date: {
                    start: dateStart,
                    end: dateEnd
                }
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
}

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

export async function sendTimereport(hours, note, date, PrivateId) {
    const payload = {
        parent: {
          type: "database_id",
          database_id: "fba06eb24c9241e585ab41aaae362e31"
        },
        properties: {
        //   'UserID': {
        //     type: 'title',
        //     title: [
        //       {
        //         type: 'text',
        //         text: {
        //           content: userId
        //         },
        //       },
        //     ],
        //   },
          'Hours': {
            type: "number",
            number: hours
          },
        //   'Project': {
        //     type: 'relation',
        //     relation: {
        //         id: projectId
        //     },
        //   },
          'Note': {
            type: "title",
            title: [
                {
                    type: 'text',
                    text: {
                        content: note
                    }
                }
            ]
          },
          'Date': {
            type: 'date',
            date: {
              start: date
            }
          },
          'PrivateId': {
            type: "rich_text",
            rich_text: [
              {
                plain_text: PrivateId
              }
            ]
          }
        }
    };

    axios.post('http://localhost:3001/api/notion/send', payload)
    .then(response => {
      console.log('Data skickad: ', response.data);
    })
    .catch(error => {
      console.error('Fel vid skickning av data till notion: ', error);
    });
}

export async function sendLog(userId, actionType, component, metadata, date) {
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
              start: date
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


