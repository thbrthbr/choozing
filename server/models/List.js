const { DataTypes } = require('sequelize');

const List = (sequelize) => {
  const List = sequelize.define('todo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    top: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    left: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return List;
};

module.exports = List;
