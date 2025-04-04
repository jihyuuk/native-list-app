import { PaperProvider } from 'react-native-paper';
import MainPage from './pages/MainPage';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <MainPage />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
