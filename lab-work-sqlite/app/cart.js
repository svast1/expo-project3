import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCartItems } from '../database';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems((items) => setCartItems(items));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Корзина</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Ваша корзина пуста</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 18 },
  card: { padding: 15, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: 'green' },
});
