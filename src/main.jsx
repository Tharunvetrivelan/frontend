import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import 'antd/dist/reset.css'; 
import { ConfigProvider } from 'antd';

const darkTheme = {
 
    token: {
      colorPrimary: '#646cff',
      colorTextBase: 'rgba(255, 255, 255, 0.87)',
      colorBgBase: '#242424',
      // border: '2px solid whitesmoke',
      colorBgContainer: '#1a1a1a',
      borderRadius: 8,
    },
  
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={darkTheme}>
    <App />
  </ConfigProvider>
);
