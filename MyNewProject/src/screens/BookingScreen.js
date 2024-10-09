import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookingScreen = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const services = [
    'Chải lông',
    'Thú y',
    'Dắt thú cưng đi dạo',
    'Tư vấn dinh dưỡng',
    'Chăm sóc tại nhà',
    'Huấn luyện thú cưng'];

  const onConfirmBooking = () => {
    if (selectedService && customerName && phoneNumber) {
      Alert.alert('Đặt lịch thành công', `Dịch vụ: ${selectedService}\nNgày: ${selectedDate.toDateString()}\nKhách hàng: ${customerName}\nSĐT: ${phoneNumber}`);
    } else {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.headerText}>Đặt lịch dịch vụ</Text>

      {/* Phần chọn dịch vụ */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chọn dịch vụ</Text>
        {services.map((service) => (
          <TouchableOpacity
            key={service}
            style={[
              styles.serviceButton,
              selectedService === service && styles.selectedServiceButton,
            ]}
            onPress={() => setSelectedService(service)}
          >
            <Text
              style={[
                styles.serviceText,
                selectedService === service && styles.selectedServiceText,
              ]}
            >
              {service}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Phần chọn ngày */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chọn ngày</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {selectedDate.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        )}
      </View>

      {/* Nhập tên khách hàng */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên khách hàng</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập tên của bạn"
          value={customerName}
          onChangeText={setCustomerName}
        />
      </View>

      {/* Nhập số điện thoại */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Nút xác nhận */}
      <TouchableOpacity style={styles.confirmButton} onPress={onConfirmBooking}>
        <Text style={styles.confirmButtonText}>Xác nhận đặt lịch</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceButton: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedServiceButton: {
    backgroundColor: '#f9b233',
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  selectedServiceText: {
    color: '#fff',
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  textInput: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#f9b233',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
