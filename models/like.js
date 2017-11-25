"use strict";

module.exports = function(sequelize, DataTypes) {
    var Like = sequelize.define("Like", {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        songId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
        duration: { type: DataTypes.INTEGER }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            Like.belongsTo(models.User,  { onDelete: "CASCADE", foreignKey: { allowNull: false } });
            Like.belongsTo(models.Song, { onDelete: "CASCADE", foreignKey: { allowNull: false } });
            }
        }
    });
    return Like;
};