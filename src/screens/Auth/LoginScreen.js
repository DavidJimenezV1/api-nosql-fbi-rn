import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { supabase } from '../../supabaseClient';
import { useTheme } from '../../context/ThemeContext';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme, isDarkMode } = useTheme();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error de Inicio de Sesión',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: '¡Bienvenido!',
        text2: 'Has iniciado sesión correctamente.',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Iniciar Sesión</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
        placeholder="Correo electrónico"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { backgroundColor: theme.inputBackground, borderColor: theme.inputBorder, color: theme.text }]}
        placeholder="Contraseña"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? 'Cargando...' : 'Iniciar Sesión'}
        onPress={handleLogin}
        disabled={loading}
        color={theme.buttonBackground}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.toggleButton}>
        <Text style={[styles.toggleText, { color: theme.primary }]}>¿No tienes una cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;