import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then((response) => response.json())
            .then((json) => setData(json.results))
            .catch((error) => console.error(error));
    }, []);

    const handlePokemonPress = (pokemon) => {
        navigation.navigate('PokemonDetail', { pokemon });
    };

    const filteredData = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name or type..."
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
            />

            <FlatList
                data={filteredData}
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
    searchInput: {
        width: '90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
