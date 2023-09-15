import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import typeColors from './PokemonTypes';

export default function PokemonCard({ pokemon }) {
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                setPokemonDetails(data);
            })
            .catch((error) => console.error(error));
    }, [pokemon.url]);

    if (!pokemonDetails) {
        return <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
        <View style={styles.card}>
            <View style={styles.title}>
                <Text style={styles.name}>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</Text>
            </View>
            <Image source={{ uri: pokemonDetails.sprites.front_default }} style={styles.imagePokemon} />
            <View style={styles.types}>
                {pokemonDetails.types.map((typeData, index) => (
                    <View key={index} style={[styles.typeContainer, { backgroundColor: typeColors[typeData.type.name] }]}>
                        <Text style={styles.typeText}>{typeData.type.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5f5',
        margin: '2%',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imagePokemon: {
        width: 150,
        height: 150,
    },
    types: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    typeContainer: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
    },
    typeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
