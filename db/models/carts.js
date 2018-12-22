'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define('Carts', {
    shipping: DataTypes.STRING,
    deliverycost: DataTypes.STRING,
    subtotal: DataTypes.STRING,
    id_user: DataTypes.STRING
  }, {});
  Carts.associate = function(models) {
    // associations can be defined here
    // Carts.hasMany(models.User,{
    //   foreignKey:'id_user'
    // })
  };
  return Carts;
};