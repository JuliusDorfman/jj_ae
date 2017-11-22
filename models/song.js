"use strict";

module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        song_name: { type: DataTypes.STRING },
        artist: { type: DataTypes.STRING },
        album: {type: DataTypes.STRING },
        valence: { type: DataTypes.FLOAT },
        liveliness: { type: DataTypes.FLOAT },
        energy: { type: DataTypes.FLOAT },
        duration: { type: DataTypes.INTEGER }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                Song.hasMany(models.Like, { onDelete: "cascade" });
            }
        }
    });
    return Song;
};