import { useState, useEffect } from 'react';
import { Small, Original } from './styles';
import { Animated } from 'react-native';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export const LazyImage = ({
    smallSource,
    source,
    aspectRatio,
    shouldLoad
}) => {

    const [loaded, setLoaded] = useState(false);
    const opacity = new Animated.Value(0);

    const handleAnimate = () => {
        Animated.timing(opacity, {
            toValue: 1,
            diration: 500,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (shouldLoad) {
            // setTimeout(() => setLoaded(true), 500);
            setLoaded(true);
        }
    }, [shouldLoad]);

    return (
        <Small
            source={smallSource}
            ratio={aspectRatio}
            resizeMode='contain'
            blurRadius={2}
        >
            {loaded && <OriginalAnimated
                style={{ opacity }}
                source={source}
                ratio={aspectRatio}
                resizeMode='contain'
                onLoadEnd={handleAnimate}
            />}
        </Small>
    );
}