import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
      return;
    }

    // Chuẩn bị dữ liệu để gửi đến API
    const formData = {
      tennguoidung: name,
      email: email,
      matkhau: password,
      sodienthoai: phoneNumber,
      diachi: address
    };

    try {
      // Gửi yêu cầu API
      const response = await fetch('http://192.168.1.28/api/dangky.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Xử lý phản hồi từ máy chủ
      if (result.success) {
        Alert.alert("Thành công", result.message);
        // Chuyển đến màn hình đăng nhập sau khi đăng ký thành công
        navigation.navigate('Login');
      } else {
        Alert.alert("Lỗi", result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Đã xảy ra sự cố. Vui lòng thử lại sau.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://www.mdanderson.org/images/publications/cancerwise/Generics/Pet%20Owners%20and%20Cancer%20Treatment.jpg' }} 
          style={styles.logo}
        />
        <Text style={styles.title}>Booking PetCare</Text>
      </View>

      {/* Form nhập thông tin */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      {/* Nút Đăng ký */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Đăng ký</Text>
      </TouchableOpacity>

      {/* Liên kết quay lại Đăng nhập */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.backToLoginText}>Đã có tài khoản? Đăng nhập ngay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f9b233',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f9b233',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  signUpButton: {
    backgroundColor: '#f9b233',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginText: {
    marginTop: 15,
    color: '#f9b233',
    fontSize: 14,
  },
});

export default SignUpScreen;
