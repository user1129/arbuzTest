import Models from "../models/model.js";

export const createSubscribe = async (req, res) => {
  try {
    const { userId, endDate, dayWeek, products } = req.body;
    if (!endDate || !userId || !dayWeek) {
      return res.status(400).json({ message: "Не достаточно данных" }); //Простая валидация данных
    }

    if (!products.length) {
      return res.status(400).json({
        message: "Укажите продукты",
      });
    }

    const user = await Models.User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isAllProductsExists = await Models.Product.findAll({
      where: { name: products, quantity: true },
    });

    if (products.length !== isAllProductsExists.length) {
      return res.status(400).json({
        message: "Некоторые продукты не в наличии",
      });
    }

    const start = new Date();
    const subscribe = await Models.Subscription.create({
      startDate: start,
      endDate,
      dayWeek,
      userId: user.id,
      productIds: products,
    });

    res.status(200).json(subscribe);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неизвестная ошибка",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, weight, quantity } = req.body;
    if (!name || !weight) {
      return res.status(400).json({ message: "Не достаточно данных" });
    }

    const isExistingProduct = await Models.Product.findOne({ where: { name } });
    if (isExistingProduct) {
      return res.status(400).json({
        message: "Такой продукт уже существует",
      });
    }

    const product = await Models.Product.create({
      name,
      weight,
      quantity,
    });
    res.status(200).json(product);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неизвестная ошибка",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { adress, number } = req.body;
    if (!adress || !number) {
      return res.status(400).json({ message: "Не достаточно данных" });
    }
    const user = await Models.User.create({
      adress,
      number,
    });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Неизвестная ошибка",
    });
  }
};
