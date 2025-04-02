import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import MainPage from './pages/MainPage';

export default function App() {
  return (
    <PaperProvider>
      <MainPage />
    </PaperProvider>
  );
}
