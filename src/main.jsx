import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './Redux/store.js'
import { Provider } from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "react-toastify/dist/ReactToastify.css";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
