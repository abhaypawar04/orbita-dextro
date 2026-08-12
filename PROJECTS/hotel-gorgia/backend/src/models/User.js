const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      validate: {
        is: /^[0-9+\-\s()]{10,20}$/,
      },
    },
    role: {
      type: DataTypes.ENUM("guest", "customer", "admin"),
      defaultValue: "customer",
    },
    avatar: {
      type: DataTypes.STRING(255),
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING(50),
    },
    state: {
      type: DataTypes.STRING(50),
    },
    zip_code: {
      type: DataTypes.STRING(20),
    },
    country: {
      type: DataTypes.STRING(50),
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reset_password_token: {
      type: DataTypes.STRING(255),
    },
    reset_password_expires: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

// Instance method to compare passwords
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT
User.prototype.generateAuthToken = function () {
  const jwt = require("jsonwebtoken");
  return jwt.sign(
    { user_id: this.user_id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE },
  );
};

// Instance method to generate refresh token
User.prototype.generateRefreshToken = function () {
  const jwt = require("jsonwebtoken");
  return jwt.sign({ user_id: this.user_id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};

module.exports = User;
