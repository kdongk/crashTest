const Sequelize = require("sequelize");
const User = require("./user");
const Room = require("./room");
const Chat = require("./chat");

const env = process.env.NODE_ENV || "development";

// database 설정 불러옴.
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

db.User = User;
db.Room = Room;
db.Chat = Chat;

User.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);

User.associate(db);
Room.associate(db);
Chat.associate(db);

module.exports = db;
