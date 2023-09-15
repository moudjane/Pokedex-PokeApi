import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PokemonDetailScreen({ route }) {
    const { pokemon } = route.params;
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(pokemon.url)
            .then((response) => response.json())
            .then((data) => {
                setDetails(data);
            })
            .catch((error) => console.error(error));
    }, [pokemon.url]);

    if (!details) {
        return <Text>Loading...</Text>;
    }

    return (
        <View> 
            <Text style={styles.name}>{details.name}</Text>
            <Text style={styles.stats}>Height: {details.height}</Text>
            <Text style={styles.stats}>Weight: {details.weight}</Text>
            <Text style={styles.stats}>Types: {details.types.map((type) => type.type.name).join(', ')}</Text>
            <Image source={{ uri: details.sprites.front_default }} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    stats: {
        fontSize: 15,
        textAlign: 'center',
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});
