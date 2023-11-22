import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { register } from 'swiper/element'
import { BrowserRouter } from 'react-router-dom'

register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
