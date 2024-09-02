import userRoutes from './routes/userRoutes.js';
import dietGeneratorRoutes from "./routes/dietGeneratorRoutes.js";
import usersHealthInfoRoutes from "./routes/usersHealthInfoRoutes.js";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import trainingPlanGeneratorRoutes from "./routes/trainingPlanGeneratorRoutes.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

const port = PORT;

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/diet', dietGeneratorRoutes);
app.use('/api/health', usersHealthInfoRoutes);
app.use('/api/training', trainingPlanGeneratorRoutes);

app.get('/health-check', (req, res) => {
    res.send('Server working!')
})

app.listen(port, () => {})