import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", AuthRouter);

app.get('/', (req, res) => {
    res.send("API is working");
});

export default app;