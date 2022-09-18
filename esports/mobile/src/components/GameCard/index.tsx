import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, ImageBackground, Text, TouchableOpacityProps } from 'react-native';
import { GameProps } from '../../interfaces/GameProps';
import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps extends GameProps {
    _count: {
        ads: number;
    }
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>

            <ImageBackground
                style={styles.cover}
                source={{ uri: data.bannerUrl }}>

                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}>

                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.ads} anúncios
                    </Text>

                </LinearGradient>

            </ImageBackground>
        </TouchableOpacity>
    );
}