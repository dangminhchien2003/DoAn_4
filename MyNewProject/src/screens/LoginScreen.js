import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
        return;
    }

    try {
        // Gửi yêu cầu POST tới API
        const response = await fetch('http://192.168.1.15/api/dangnhap.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&matkhau=${encodeURIComponent(password)}`,
        });

        const json = await response.json();

        // Xử lý kết quả từ API
        if (json.success) {
            Alert.alert('Thành công', 'Đăng nhập thành công');

            // Lưu thông tin người dùng vào AsyncStorage
            const userInfo = JSON.stringify(json.user); // Chuyển đổi thông tin người dùng thành chuỗi JSON
            await AsyncStorage.setItem('user', userInfo);
            await AsyncStorage.setItem('username', json.user.tennguoidung); // Lưu tên người dùng

            // Chuyển đến màn hình Home nếu đăng nhập thành công
            navigation.navigate('Home');
        } else {
            Alert.alert('Thất bại', json.message || 'Email hoặc mật khẩu không đúng');
        }
    } catch (error) {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi kết nối đến API');
        console.error(error);
    }
};


  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleFacebookLogin = () => {
    console.log('Login with Facebook');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://www.mdanderson.org/images/publications/cancerwise/Generics/Pet%20Owners%20and%20Cancer%20Treatment.jpg' }} 
          style={styles.logo}
        />
        <Text style={styles.title}>Booking PetCare</Text>
      </View>

      {/* Form Input */}
      <View style={styles.inputContainer}>
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
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Chưa có tài khoản? Đăng ký ngay</Text>
      </TouchableOpacity>

      {/* Social Media Login */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
          <Image 
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png' }} 
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Đăng nhập bằng Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
          <Image 
            source={{ uri: 'https://e7.pngegg.com/pngimages/631/1001/png-clipart-computer-icons-facebook-social-media-email-share-icon-facebook-blue-text-thumbnail.png' }} 
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Đăng nhập bằng Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
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
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#f9b233',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    marginTop: 15,
    color: '#f9b233',
    fontSize: 14,
  },
  socialContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoginScreen;
