import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import AuthProvaider from './contexts/auth';
import Routes from './routes';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
    <AuthProvaider>
    <BrowserRouter>
       <ToastContainer autoClose={3000} />
       <Routes/>
    </BrowserRouter>
    </AuthProvaider>
  );
}

export default App;
