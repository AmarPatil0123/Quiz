import express from 'express';
const app = express();
import cors from 'cors';

const corsOptions = {
    origin: 'https://quizapp-4fgo.onrender.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(8080, () => {
    console.log("server is running on port 8080");
})

app.get('/quiz', async (req, res) => {

    try {
        let fetchRes = await fetch('https://api.jsonserve.com/Uw5CrX');
        let data = await fetchRes.json();
        res.json(data);
    } catch (error) {
        console.log(error.message);
    }
})