const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const productRouter = express.Router();

const products = [
  {
    id: 1,
    name: 'Iphone',
    total_quantity: 12,
    type_of_product: 'Gadgets',
    price: 300000
  },
  {
    id: 2,
    name: 'Macbook',
    total_quantity: 12,
    type_of_product: 'Laptop',
    price: 123400
  },
  {
    id: 3,
    name: 'Mouse',
    total_quantity: 12,
    type_of_product: 'Accesories',
    price: 3000
  },
  
];

// Get all products
productRouter.get('/', (req, res) => {
  res.json(products);
});

// Get product by id
productRouter.get('/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find(p => p.id === productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

// Get product by name
productRouter.get('/name/:name', (req, res) => {
  const productName = req.params.name;
  const product = products.find(p => p.name === productName);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.json(product);
  }
});

// Add new product
productRouter.post('/add', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Mount the productRouter at /products
app.use('/products', productRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
