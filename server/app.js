import express from "express";
import nunjucks from 'nunjucks';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// import webSocket from "./socket";
import authRouter from "./routes/auth.js";
import { config } from './config.js';
import { db } from "./db/auth.js";

app.use(helmet());  // 보안용

app.set("port", process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", authRouter);


// 라우터 존재 x 시
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

//error 라우터
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

//리스너
db.getConnection().then();
app.listen(config.host.port);

// const server = app.listen(app.get("port"), () => {
//     console.log(app.get("port"), "번 포트에서 대기 중");
// });

// webSocket(server, app);
