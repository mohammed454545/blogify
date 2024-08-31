const dotenv =require('dotenv');
dotenv.config();
const http =require('http');
const express=require('express');
const usersRouter = require('./routes/users/usersRouter');
const connectDB = require('./config/database');
const { notFound, globalErrHandler } = require('./middlewares/globalErrorHandler');
const categoryRouter = require('./routes/category/categoryRouter');
const postRouter = require('./routes/post/postRouter');
const commentRouter = require('./routes/comment/commentRouter');
// !Server
const app =express();
//middlewares
app.use(express.json());//pass incoming data
//db connect
connectDB();
//Routes
app.use('/api/v1/users',usersRouter);
app.use('/api/v1/categories',categoryRouter);
app.use('/api/v1/posts',postRouter);
app.use('/api/v1/comments',commentRouter);
//? not found middleware
app.use(notFound);
//! error middleware
app.use(globalErrHandler)
const server=http.createServer(app);
const PORT=process.env.PORT ||9080
server.listen(PORT,console.log(`server is running on port ${PORT}`))

