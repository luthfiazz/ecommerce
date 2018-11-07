'use strict';
module.exports = (sequelize, DataTypes) => {
  const Detailproduct = sequelize.define('Detailproduct', {
    stock: DataTypes.STRING,
    quantity: DataTypes.STRING,
    weight: DataTypes.STRING,
    color: DataTypes.STRING,
    description: DataTypes.STRING,
    id_product: DataTypes.STRING
  }, {});
  // Detailproduct.associate = function(models) {
  //   // associations can be defined here
  //   Detailproduct.hasMany(models.Cart,{
  //     foreignKey:'id_detailproduct'
  //   })
  //   Detailproduct.belongsTo(models.Product,{
  //     foreignKey:'id_product'
  //   })
  // };
  return Detailproduct;
};