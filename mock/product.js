let products = [
  {
      id: 1,
      name: 'macbook pro 2020',
      unitPrice: 2079.00,
      type: 'hardware',
      description: 'New 13-inch model with faster performance and a new Magic Keyboard.'
  },
  {
      id: 2,
      name: '13" Macbook Pro Touch Bar',
      unitPrice: 1899,
      type: 'hardware',
      description: ' 4-, 6- and now 8-core Intel processors, Up to 32GB of memory for running multiple pro apps.'
  },        
  {
      id: 3,
      name: 'Microsoft 365 Personal',
      unitPrice: 119,
      type: 'software',
      description: 'Get design and writing suggestions and templates, stock photos, icons, and fonts in Word, Excel, PowerPoint'
  },
  {
      id: 4,
      name: 'IntelliJ IDEA',
      unitPrice: 750.99,
      type: 'software',
      description: 'ComponentSource has specialized in Product Licensing for Software Developers and Resellers globally'
  },
];

export default {
  'GET /api/products': products,

  'POST /api/products': (req, res) => {
    console.log(req);
    res.send({
      status: 'ok',
    });
  },

  'PUT /api/products': (req, res) => {
    console.log(req);
    res.send({
      status: 'ok',
    });
  },

  'DELETE /api/products': (req, res) => {
    console.log(req);
    res.send({
      status: 'ok',
    });
  }
};
