import 'react-native-url-polyfill/auto'; // Asegúrate de que este polyfill esté al principio
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Importa tus pantallas (las crearemos en la siguiente fase)
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import ListScreen from './src/screens/App/ListScreen';
import OriginalScreen from './src/screens/App/OriginalScreen';
import ProfileScreen from './src/screens/App/ProfileScreen';
import LoadingScreen from './src/screens/LoadingScreen'; // Crea esta pantalla simple para la carga inicial

const Stack = createStackNavigator();

function AppStack() {
  const { session, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBackground },
        headerTintColor: theme.headerText,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      {session ? (
        <>
          <Stack.Screen name="Listar" component={ListScreen} options={{ title: 'Most Wanted' }} />
          <Stack.Screen name="Original" component={OriginalScreen} options={{ title: 'Detalles Originales' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Mi Perfil' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear Cuenta' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </AuthProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ThemeProvider>
  );
}