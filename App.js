import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,StatusBar as ReactStatusBar, Platform } from 'react-native';
import { color } from './src/utils/colors';
import 'react-native-gesture-handler';
import AppRoutes from './src/features/navigation/router';
import { TodosContextProvider } from './src/context/TodosContext';

const isAndroid = Platform.OS !== 'ios';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TodosContextProvider>
        <AppRoutes />
      </TodosContextProvider>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg.lightDark,
    marginTop: isAndroid ? ReactStatusBar.currentHeight: 0,
  }
});
