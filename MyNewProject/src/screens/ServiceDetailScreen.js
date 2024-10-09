import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ServiceDetailSreen = ({ route, navigation }) => {
  const { service } = route.params; // Nhận dữ liệu dịch vụ từ navigation

  return (
    <ScrollView style={styles.container}>
      {/* Phần hình ảnh dịch vụ */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: service.image }} style={styles.image} />
      </View>

      {/* Phần tiêu đề và mô tả dịch vụ */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.price}>Giá: {formatPrice(service.price)} VND</Text>
        <Text style={styles.time}>Thời gian thực hiện: {service.time}</Text>
        <Text style={styles.description}>
          Mô tả: {service.mota ? service.mota : 'Không có mô tả.'}
        </Text>
      </View>

      {/* Nút Đặt lịch */}
      <View style={styles.bookingContainer}>
        <TouchableOpacity style={styles.bookingButton} onPress={() => navigation.navigate('Booking')}>
          <Text style={styles.bookingButtonText}>Đặt lịch ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Hàm format giá tiền
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Style cho màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Màu nền nhẹ
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    borderColor: '#f9b233',
    borderWidth: 3,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9b233',
    marginVertical: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  bookingContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookingButton: {
    backgroundColor: '#f9b233',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Thêm độ nổi cho nút
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceDetailSreen;
