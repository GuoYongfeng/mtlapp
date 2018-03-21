

# MTL-APP

```
$ npm i
$ npm run ios
```

## 项目实践

### 1、使用图标字体遇到的问题。

- 使用的图标字体库：https://github.com/oblador/react-native-vector-icons
- 写的代码：
```
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)

```
- 遇到的问题
```
error: bundling failed: Error: While resolving module `react-native-vector-icons/FontAwesome`, the Haste package `react-native-vector-icons` was found. However the module `FontAwesome` could not be found within the package. Indeed, none of these files exist:
```
- 解决方案
```
rm -rf ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json
```
- 去哪找图标呢
    - https://oblador.github.io/react-native-vector-icons/ 

### 2、如何在浏览器中打开调试窗口

- cmd + d 出现选项后，选择”remote js debugging“
- 访问：http://localhost:8081/debugger-ui/
- 打开控制台，切换到 console

### 3、组件

- 轮播组件：https://github.com/leecade/react-native-swiper
- 提示组件：react-native-root-toast

### 4、适配 & 分辨率

- ./app/utils/response.js

### 5、IOS 打包 APK

- 打出jsbundle 资源包：http://blog.csdn.net/sinat_34380438/article/details/76614309
- 按照 IOS 的流程打包：http://blog.csdn.net/sinat_34380438/article/details/52485342

### 6、
