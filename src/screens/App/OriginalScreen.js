import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

function OriginalScreen() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const { session } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Página Original / Detalles</Text>
      <Text style={[styles.text, { color: theme.text }]}>
        Aquí podrías mostrar el detalle de un elemento de la API,
        o un mensaje de bienvenida.
      </Text>
      {session && (
        <Text style={[styles.text, { color: theme.text, marginTop: 20 }]}>
          Usuario autenticado: {session.user.email}
        </Text>
      )}

      <Button
        title={isDarkMode ? "Cambiar a Modo Día" : "Cambiar a Modo Noche"}
        onPress={toggleTheme}
        color={theme.buttonBackground}
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
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default OriginalScreen;