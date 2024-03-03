const { isPrimeHandler, server } = require('./index');

describe('is_prime endpoint handler', () => {
  test('true_when_x_is_17', () => {
    const req = {
      params: {
        x: '17'
      }
    };
    const res = {
      json: jest.fn()
    };

    isPrimeHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ isPrime: true });
  });

  test('false_when_x_is_36', () => {
    const req = {
      params: {
        x: '36'
      }
    };
    const res = {
      json: jest.fn()
    };

    isPrimeHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ isPrime: false });
  });

  test('true_when_x_is_13219', () => {
    const req = {
      params: {
        x: '13219'
      }
    };
    const res = {
      json: jest.fn()
    };

    isPrimeHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ isPrime: true });
  });

});

afterAll(done => {
  server.close(done);
});
