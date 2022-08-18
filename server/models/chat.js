const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        chatter: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        chat: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        school_name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false, // true면 created_at과 update_at이 자동 추가
        underscored: false, // createdAt -> created_at 으로 바꾸는 옵션
        modelName: "Chat",
        tableName: "chats",
        paranoid: false, // deleteAt 컬럼 추가 후 로우 삭제시 언제 삭제 됐는지가 남아 있음.
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {}
};
