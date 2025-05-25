import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { Feather } from '@expo/vector-icons'; // O lucide-react-native si lo prefieres

// Componente Card (adaptado para RN)
const Card = ({ item, theme }) => {
  // Si usas lucide-react-native, adapta la importación del icono
  // import { Heart, HeartOff } from 'lucide-react-native';
  // Y luego <Heart size={24} color={theme.primary} />

  // Lógica de favoritos necesitaría ser adaptada para usar AsyncStorage
  // por ahora, es solo un icono
  return (
    <View style={[cardStyles.card, { backgroundColor: theme.cardBackground, borderColor: theme.inputBorder }]}>
      {item.images && item.images[0] && (
        <Image source={{ uri: item.images[0].original || item.images[0].thumb }} style={cardStyles.cardImage} />
      )}
      <Text style={[cardStyles.cardTitle, { color: theme.text }]}>{item.title}</Text>
      <Text style={[cardStyles.cardDetails, { color: theme.secondary }]}>{item.description}</Text>
      <TouchableOpacity style={cardStyles.favoriteButton}>
        <Feather name="heart" size={24} color={theme.primary} />
      </TouchableOpacity>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDetails: {
    fontSize: 14,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  }
});

function ListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme, isDarkMode } = useTheme(); // Para el botón de tema

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.fbi.gov/wanted/v1/list?page=1&pageSize=10');
        setData(response.data.items);
      } catch (err) {
        setError('Error al cargar los datos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ color: theme.text, marginTop: 10 }}>Cargando datos del FBI...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
        <Feather name={isDarkMode ? "sun" : "moon"} size={24} color={theme.primary} />
        <Text style={{ color: theme.primary, marginLeft: 5 }}>
          {isDarkMode ? "Modo Día" : "Modo Noche"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => <Card item={item} theme={theme} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 10,
  },
  themeToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  }
});

export default ListScreen;