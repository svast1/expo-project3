import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { initializeDatabase } from '../database';
import { addToCart } from '../database';

const HomeScreen = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    initializeDatabase();
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.title} добавлен в корзину`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Список товаров</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Добавить в корзину</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('/cart')}>
        <Text style={styles.navButtonText}>Перейти в корзину</Text>
      </TouchableOpacity>
    </View>
  );
}
export default HomeScreen;
