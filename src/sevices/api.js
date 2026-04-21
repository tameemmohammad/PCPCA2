import express from 'express';
import axios from 'axios';

const app = express();
const port = 3030;

const url = 'https://t4e-testserver.onrender.com/api';

let dataset = [];

const fetchData = async () => {
    try {
        const response1 = await axios.post(`${url}/public/token`, {
            "Password": "112175",
        });

        const token = response1.data.token;
        const dataurl = response1.data.dataUrl;
        
        const response2 = await axios.get(`${url}${dataurl}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dataset = response2.data;
        console.log('Dataset loaded successfully');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

fetchData();

app.get('/', (req, res) => {
    res.send(dataset);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
