import { StackNavigator } from 'react-navigation'

import NavTabs from '../screen/Tabs'

export default StackNavigator({
    'Tabs': {
        screen: NavTabs
    }
},{
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
            //设置页面跳转的动画
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [layout.initWidth, 0, 0]
            });
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                outputRange: [0, 1, 1, 0.3, 0]
            });
            return { opacity, transform: [{ translateX }] };
        }
    }),
    navigationOptions: {
        header: null
    }

})