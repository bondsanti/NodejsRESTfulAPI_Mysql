'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: DataTypes.STRING,
    createdate: {
     type: DataTypes.DATE,
     defaultValue:DataTypes.NOW
    }
  }, {
    tableName:'users',
    timestamps: false
  });
  User.associate = function(models) {
    // associations can be defined here
    models.User.hasMany(models.Blog,{
      as:'blog',
      foreignKey:'user_id',   //fk blog table
      sourceKey:'id' //pk user table
    })
  };
  return User;
};