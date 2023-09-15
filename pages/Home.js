import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=20') // Ajoutez des paramètres comme limit pour obtenir les premiers Pokémon
            .then((response) => response.json())
            .then((json) => setData(json.results)) // Les résultats contiennent une liste de Pokémon
            .catch((error) => console.error(error));
    }, []);

    const handlePokemonPress = (pokemon) => {
        navigation.navigate('PokemonDetail', { pokemon });
    };

    return (
        <View style={styles.container}>    
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePokemonPress(item)}>
                        <PokemonCard pokemon={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
                numColumns={2}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
