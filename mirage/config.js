export default function () {
  this.namespace = '/api';

  this.get('/products', function () {
    return {
      data: [
        {
          type: 'product',
          id: '1',
          attributes: {
            img: 'images/strawberries.png',
            name: 'Strawberries',
            price: 5,
            code: 'SR1',
            count: 0,
            token: {
              id: '3_1350',
              value: '3 for £13.50',
            },
          },
        },
        {
          type: 'product',
          id: '2',
          attributes: {
            img: 'images/coffee.png',
            name: 'Coffee',
            price: 11.23,
            code: 'CF1',
            count: 0,
            token: {
              id: 'multibuy',
              value: 'Multi-buy Discount',
            },
          },
        },
        {
          type: 'product',
          id: '3',
          attributes: {
            img: 'images/green-tea.png',
            name: 'Green Tea',
            price: 3.11,
            code: 'GR1',
            count: 0,
            token: {
              id: '2_4_1',
              value: '2 for 1',
            },
          },
        }
      ],
    };
  });

  this.get('/navbar', function () {
    return {
      data: [
        {
          type: 'navbar',
          id: '1',
          attributes: {
            id: 'groceries',
            value: 'Groceries'
          },
        },
        {
          type: 'navbar',
          id: '2',
          attributes: {
            id: 'wine',
            value: 'Wine'
          },
        },
        {
          type: 'navbar',
          id: '3',
          attributes: {
            id: 'clothes',
            value: 'Clothes'
          },
        },
        {
          type: 'navbar',
          id: '4',
          attributes: {
            id: 'fx',
            value: 'FX'
          },
        }
      ],
    };
  });
}
