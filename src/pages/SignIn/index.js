import { useState, useContext } from 'react';
import './signIn.css';
import logo from '../../assets/logo.png'
import firebase from '../../services/firebaseConnection';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';



function SignIn() {

  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e){
  
    e.preventDefault();
    
    if(email !== '' && senha !== ''){

      signIn(email, senha)
  
    }

    
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do Sistema"/>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" value={email} placeholder="Digite Seu E-mail" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={senha} placeholder="Digite Sua Senha" onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Aguarde...' : 'Acessar'}</button>
        </form> 
      
      <Link to="/register">Criar uma conta</Link>
      </div> 
    </div>
  );
}

export default SignIn;
