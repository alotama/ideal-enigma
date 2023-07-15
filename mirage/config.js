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
            code: 'GR1',
            badge: {
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
            code: 'SR1',
            badge: {
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
            code: 'SR1',
            badge: {
              id: 'multibuy',
              value: '2 for 1',
            },
          },
        },
      ],
    };
  });
}
