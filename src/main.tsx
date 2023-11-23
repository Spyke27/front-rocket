import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { register } from 'swiper/element'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContex.tsx'

register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <UserProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </UserProvider>
)
