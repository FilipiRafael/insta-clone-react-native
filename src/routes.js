import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Feed } from './screens/Feed';

const Routes = createAppContainer(
    createSwitchNavigator({
        Feed
    })
);

export default Routes;