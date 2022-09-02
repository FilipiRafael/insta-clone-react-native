import { View, Image } from 'react-native';
import styles from './styles';
import logo from '../../assets/instagram.png';

export const Header = () => {
    return (
        <View style={styles.container}>
            <Image
                source={logo}
            />
        </View>
    );
}