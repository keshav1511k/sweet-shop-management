const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await prisma.sweet.create({
      data: {
        name,
        category,
        price,
        quantity
      }
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Failed to add sweet" });
  }
};

exports.getAllSweets = async (req, res) => {
  try {
    const sweets = await prisma.sweet.findMany();
    res.status(200).json(sweets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    const sweets = await prisma.sweet.findMany({
      where: {
        AND: [
          name ? { name: { contains: name } } : {},
          category ? { category } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {}
        ]
      }
    });

    res.status(200).json(sweets);
  } catch (error) {
    console.error(error); // 👈 helps debugging
    res.status(500).json({ message: "Search failed" });
  }
};

exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;

    const sweet = await prisma.sweet.findUnique({ where: { id } });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity - 1 }
    });

    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(500).json({ message: "Purchase failed" });
  }
};

exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const sweet = await prisma.sweet.findUnique({ where: { id } });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const updatedSweet = await prisma.sweet.update({
      where: { id },
      data: { quantity: sweet.quantity + Number(quantity) }
    });

    res.status(200).json(updatedSweet);
  } catch (error) {
    res.status(500).json({ message: "Restock failed" });
  }
};

