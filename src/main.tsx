import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@/components/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/sonner.tsx';
import { AuthProvider } from './config/AuthContext.tsx';
import { appStore } from './config/Api.ts';
import { setTokenGetter } from '@/redux/services/axios.ts';
import { auth } from './config/Firebase.ts';

setTokenGetter(async () => {
  const user = auth.currentUser;
  return user ? await user.getIdToken() : null;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider defaultTheme="system" storageKey="slottify-theme">
      <Provider store={appStore}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </AuthProvider>
);
