import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('cart.db');

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY NOT NULL, title TEXT, price REAL, description TEXT);'
    );
  });
};

export const addToCart = (item) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO cart (title, price, description) VALUES (?, ?, ?);',
      [item.title, item.price, item.description],
      (_, result) => console.log('Item added to cart:', result),
      (_, error) => console.error('Error adding item to cart:', error)
    );
  });
};

export const getCartItems = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM cart;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.error('Error fetching cart items:', error)
    );
  });
};
