import sequelize from "../db.js";
import { DataTypes, Sequelize } from "sequelize";
const User = sequelize.define("user", {
  adress: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.STRING,

    unique: true,
  },
});

const Subscription = sequelize.define("subscription", {
  startDate: {
    type: DataTypes.DATE,
  },
  endDate: {
    type: DataTypes.DATE,
  },
  dayWeek: {
    type: DataTypes.STRING,
  },
  productIds: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
});

const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    unique:true
  },
  weight: {
    type: DataTypes.FLOAT,
  },
  quantity: {
    type: DataTypes.BOOLEAN,
  },
});



User.hasOne(Subscription);
Subscription.belongsTo(User);

Subscription.hasMany(Product);
Product.belongsTo(Subscription);

export default { User, Product, Subscription };
