import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import userRoutes from './routes/user.routes.js';
import contactRoutes from './routes/contacts.routes.js';
import projectRoutes from './routes/projects.routes.js';
import educationRoutes from './routes/educations.routes.js';
import authRoutes from './routes/auth.routes.js'

const app = express();

// Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Security & utility middlewares
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', authRoutes)

// API Routes
app.use('/', userRoutes);
app.use('/', contactRoutes);
app.use('/', projectRoutes);
app.use('/', educationRoutes);
app.use((err, req, res, next) => {
if (err.name === 'UnauthorizedError') {
res.status(401).json({"error" : err.name + ": " + err.message}) 
}else if (err) {
res.status(400).json({"error" : err.name + ": " + err.message}) 
console.log(err)
} 
})

import path from "path";

const CURRENT_WORKING_DIR = process.cwd();
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));


export default app;
