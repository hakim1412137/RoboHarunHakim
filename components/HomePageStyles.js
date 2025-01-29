// src/pages/HomePageStyles.js
import { StyleSheet } from 'react-native';

const homePageStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffebbf'
    },
    textContent: {
        flex: 1,
        flexShrink: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContent: {
        flex: 1,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 30,
        fontWeight: '800', // Note: Use a string for fontWeight
    },
    listItem: {
        fontSize: 20,
        paddingBottom: 10
    }
});

export default homePageStyles;
