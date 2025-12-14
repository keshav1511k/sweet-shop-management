const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const {
  addSweet,
  getAllSweets,
  searchSweets,
  purchaseSweet,
  restockSweet
} = require("../controllers/sweet.controller");

router.post("/", auth, addSweet);
router.get("/", auth, getAllSweets);
router.get("/search", auth, searchSweets);
router.post("/:id/purchase", auth, purchaseSweet);
router.post("/:id/restock", auth, admin, restockSweet);

module.exports = router;
