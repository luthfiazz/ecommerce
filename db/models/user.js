'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    no_telepone: DataTypes.STRING,
    address: DataTypes.STRING,
    access: {type:DataTypes.STRING, defaultValue:'user'}
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Carts,{
        foreignKey:'id_user'
      })

  };
  return User;
};