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

    const getStatValue = (statName) => {
        const stat = details.stats.find((s) => s.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };

    return (
        <View>
            <Text style={styles.name}>{details.name}</Text>
            <Text style={styles.stats}>HP: {getStatValue('hp')}</Text>
            <Text style={styles.stats}>Attack: {getStatValue('attack')}</Text>
            <Text style={styles.stats}>Defense: {getStatValue('defense')}</Text>
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
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
});
