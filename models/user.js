"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        display_name: { type: DataTypes.STRING, unique: true, ignoreDuplicates: true },
        email: { type: DataTypes.STRING },
        id_name: { type: DataTypes.STRING },
        image: { type: DataTypes.STRING }
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