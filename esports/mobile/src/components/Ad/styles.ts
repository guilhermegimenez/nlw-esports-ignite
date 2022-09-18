import { THEME } from './../../theme/index';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: 210,
        height: 310,
        backgroundColor: THEME.COLORS.SHAPE,
        // flex: 1,
        alignItems: 'center',
        padding: 20,
        marginRight: 16,
        // marginBottom: 80,
        marginTop: 16,
        borderRadius: 8,
    },
    button: {
        width: '100%',
        height: 36,
        borderRadius: 6,
        backgroundColor: THEME.COLORS.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: THEME.COLORS.TEXT,
        fontSize: THEME.FONT_SIZE.SM,
        fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
        marginLeft: 8
    }
});