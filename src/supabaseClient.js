import 'react-native-url-polyfill/auto'; // Importante para la URL polyfill
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistencia de Supabase
import { createClient } from '@supabase/supabase-js';

// Recupera las variables de entorno de Expo (usando EXPO_PUBLIC_ prefijo)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Asegúrate de que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL o Anon Key no están definidos en las variables de entorno. Revisa tu archivo .env.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // Usa AsyncStorage para la persistencia de sesión en React Native
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Desactiva la detección de sesión en URL para React Native
  },
});