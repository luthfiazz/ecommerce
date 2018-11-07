'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    picture: DataTypes.STRING,
    name: DataTypes.STRING,
    material: DataTypes.STRING,
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    discount: DataTypes.STRING,
    id_user: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Detailproduct,{
      foreignKey:'id_product'
    })
    Product.belongsTo(models.User,{
      foreignKey:'id_user'
    })

  };
  return Product;
};