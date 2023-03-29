import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProveder } from './context/SearchContext';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <SearchContextProveder>
        <AuthContextProvider>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
          {/* </PersistGate> */}
        </AuthContextProvider>
      </SearchContextProveder>
    </Provider>
  </>,
);
