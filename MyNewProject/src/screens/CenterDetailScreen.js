import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CenterDetailScreen = ({ route }) => {
  const { center } = route.params; // Nhận dữ liệu trung tâm từ navigation

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: center.image }} style={styles.image} />
      <Text style={styles.title}>{center.name}</Text>
      <Text style={styles.infoLabel}>Địa chỉ:</Text>
      <Text style={styles.infoText}>{center.diachi ? center.diachi : 'Không có địa chỉ'}</Text>
      
      <Text style={styles.infoLabel}>Số điện thoại:</Text>
      <Text style={styles.infoText}>{center.sodienthoai ? center.sodienthoai : 'Không có số điện thoại'}</Text>
      
      <Text style={styles.infoLabel}>Email:</Text>
      <Text style={styles.infoText}>{center.email ? center.email : 'Không có email'}</Text>

      <Text style={styles.infoLabel}>Mô tả:</Text>
      <Text style={styles.description}>
        {center.mota ? center.mota : 'Không có mô tả'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
  },
});

export default CenterDetailScreen;
