import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Product list
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Redis client setup
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Get item by ID
function getItemById(id) {
  return listProducts.find(product => product.itemId === parseInt(id));
}

// Reserve stock in Redis
async function reserveStockById(itemId, stock) {
  await setAsync(`item.${itemId}`, stock);
}

// Get current reserved stock
async function getCurrentReservedStockById(itemId) {
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

// Express server
const app = express();
const PORT = 1245;

// List all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(({ itemId, itemName, price, initialAvailableQuantity }) => ({
    itemId,
    itemName,
    price,
    initialAvailableQuantity
  })));
});

// Get product details
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentQuantity = product.initialAvailableQuantity - await getCurrentReservedStockById(itemId);

  res.json({
    ...product,
    currentQuantity
  });
});

// Reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);

  if (!product) {
    return res.json({ status: 'Product not found' });
  }

  const currentReservedStock = await getCurrentReservedStockById(itemId);

  if (currentReservedStock >= product.initialAvailableQuantity) {
    return res.json({ status: 'Not enough stock available', itemId });
  }

  await reserveStockById(itemId, currentReservedStock + 1);

  res.json({ status: 'Reservation confirmed', itemId });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
