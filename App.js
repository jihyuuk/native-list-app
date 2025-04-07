import { PaperProvider } from 'react-native-paper';
import MainPage from './pages/MainPage';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#fff" />
        <PaperProvider>
          <MainPage />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}