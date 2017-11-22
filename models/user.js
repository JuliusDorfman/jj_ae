"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        user_name: { type: DataTypes.STRING }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.hasMany(models.Like, { onDelete: "cascade" });
            }
        }
    });
    return User;
}