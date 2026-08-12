const { sequelize } = require("../config/database");
const User = require("./User");
const Category = require("./Category");
const Food = require("./Food");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Review = require("./Review");
const Coupon = require("./Coupon");
const Reservation = require("./Reservation");
const Wishlist = require("./Wishlist");

// Define associations
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Food.hasMany(CartItem, { foreignKey: "food_id" });
CartItem.belongsTo(Food, { foreignKey: "food_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Food.hasMany(OrderItem, { foreignKey: "food_id" });
OrderItem.belongsTo(Food, { foreignKey: "food_id" });

Category.hasMany(Food, { foreignKey: "category_id" });
Food.belongsTo(Category, { foreignKey: "category_id" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Food.hasMany(Review, { foreignKey: "food_id" });
Review.belongsTo(Food, { foreignKey: "food_id" });

User.hasMany(Wishlist, { foreignKey: "user_id" });
Wishlist.belongsTo(User, { foreignKey: "user_id" });

Food.hasMany(Wishlist, { foreignKey: "food_id" });
Wishlist.belongsTo(Food, { foreignKey: "food_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Food,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Coupon,
  Reservation,
  Wishlist,
};
