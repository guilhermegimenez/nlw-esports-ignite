import { TouchableOpacity, View, Text } from 'react-native';
import { AdProps } from '../../interfaces/AdProps';
import { THEME } from '../../theme';
import { AdInfo } from '../AdInfo';

import { styles } from './styles';

interface DataAdProps {
    props: AdProps;
    onConnect: () => void;
}

export function Ad({ props, onConnect }: DataAdProps) {
    return (
        <View style={styles.container}>

            <AdInfo
                label='Nickname'
                value={props.name}
            />

            <AdInfo
                label='Tempo de Jogo'
                value={`${props.yearsPlaying} ano(s)`}
            />

            <AdInfo
                label='Disponibilidade'
                value={`${props.weekDays.length} dia(s) \u2022 ${props.hourStart} - ${props.hourEnd}`}
            />

            <AdInfo
                label='Chamada de áudio?'
                value={props.useVoiceChannel ? 'Sim' : 'Não'}
                colorValue={props.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity style={styles.button} onPress={onConnect}>
                <Text style={styles.buttonTitle}>Conectar</Text>
            </TouchableOpacity>

        </View>
    );
}