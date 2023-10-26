import Orders from "../models/orders";


export const listUser = async (req, res) => {
  try {
    const orders = await Orders.getProductByUserId(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const {
      name,
      userId,
      productId,
      image,
      price,
      quantity,
      quantityProduct,
    } = req.body;
    const orders = await Orders.createOrder(
      name,
      userId,
      productId,
      image,
      price,  
      quantity,
      quantityProduct,
    );
    res.json({ id: orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const {quantity} = req.body;
    await Orders.updateOrder(
      req.params.id,
      quantity,
    );
    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const destroy = async (req, res) => {
  try {
    await Orders.deleteOrder(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
