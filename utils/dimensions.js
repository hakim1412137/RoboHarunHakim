import { Dimensions } from 'react-native';

export function width() {
    return Dimensions.get('window').width;
}

export function height() {
    return Dimensions.get('window').height;
}
