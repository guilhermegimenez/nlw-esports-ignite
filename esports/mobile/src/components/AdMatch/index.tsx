import { Modal, ModalProps, View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';


interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function AdMatch({ discord, onClose, ...rest }: Props) {

    const [isCoppping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipBoard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord);
        Alert.alert('Discord copiado!', 'Usuário copiado para área de transferencia. Agora só buscar no Discord ;)');
        setIsCopping(false)
    }

    return (
        <Modal
            transparent
            statusBarTranslucent
            animationType='fade'
            {...rest}
        >

            <View style={styles.container}>
                <View style={styles.content}>

                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                    />
                    <Heading
                        title='Let’s play!'
                        subtitle='Agora é só começar a jogar!'
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipBoard}
                        disabled={isCoppping}
                    >
                        <Text style={styles.discord}>
                            {isCoppping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}