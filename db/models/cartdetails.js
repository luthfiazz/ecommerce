'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cartdetails = sequelize.define('Cartdetails', {
    id_cart: DataTypes.STRING,
    id_detailproduct: DataTypes.STRING
  }, {});
  Cartdetails.associate = function(models) {
    // associations can be defined here
  //   Cartdetails.hasMany(models.Cart,{
  //     foreignKey:'id_cart',
  //   })
  //   Cartdetails.belongsTo(models.Detailproduct,{
  //     foreignKey:'id_detailproduct'
  //   })
   };
  return Cartdetails;
};