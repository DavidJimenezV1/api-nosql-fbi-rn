import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { Feather } from '@expo/vector-icons';

function ProfileScreen() {
  const { session, signOut } = useAuth();
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al cerrar sesión',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: 'Sesión Cerrada',
        text2: 'Has cerrado sesión correctamente.',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Perfil de Usuario</Text>
      {session?.user && (
        <View style={styles.userInfo}>
          <Text style={[styles.label, { color: theme.text }]}>Correo Electrónico:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{session.user.email}</Text>
          <Text style={[styles.label, { color: theme.text, marginTop: 10 }]}>ID de Usuario:</Text>
          <Text style={[styles.value, { color: theme.text }]}>{session.user.id}</Text>
        </View>
      )}

      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
        <Feather name={isDarkMode ? "sun" : "moon"} size={24} color={theme.primary} />
        <Text style={{ color: theme.primary, marginLeft: 10 }}>
          {isDarkMode ? "Cambiar a Modo Día" : "Cambiar a Modo Noche"}
        </Text>
      </TouchableOpacity>

      <Button
        title="Cerrar Sesión"
        onPress={handleLogout}
        color={theme.buttonBackground}
        style={styles.logoutButton}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  userInfo: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  themeToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
    width: '100%',
  },
  logoutButton: {
    marginTop: 20,
    width: '100%',
  }
});

export default ProfileScreen;