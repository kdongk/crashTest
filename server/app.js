const express = require("express");
const bodyParser = require("body-parser");

const webSocket = require("./socket");
const indexRouter = require("./routes");
const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 7727);

// sequelize를 통해 db 연결
sequelize
    .sync({ force: false }) // -> true 설정 시 서버 실행할때 마다 테이블 재생성
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((error) => {
        console.error(error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

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
const server = app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});

webSocket(server, app);
