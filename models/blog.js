'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    tableName:'blogs',
    timestamps: false
  });
  Blog.associate = function(models) {
    // associations can be defined here
    models.Blog.belongsTo(models.User,{
      as:'user',
      foreignKey: 'user_id', //fk's blogs table
      sourceKey: 'id' //pk's users table
    })
  };
  return Blog;
};