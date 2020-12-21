const axios = require('axios');

const app = async () => {
    try {

    const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol',
        {
            query: `
            {
                flashLoans(first: 10, orderBy: amount, orderDirection: desc ) {
                    id
                    reserve {
                        name
                        symbol
                    }
                    amount
                    target
                    timestamp
                }
            }
            `
        }
    );
    console.log(result.data.data.flashLoans);
    } catch(error) {
        console.error(error);
    }
}

app();