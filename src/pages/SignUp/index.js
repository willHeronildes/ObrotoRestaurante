import { useState, useContext } from 'react';
import logo from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

function SignUp() {
  
  const [nome, setNome]= useState('');
  const[email, setEmail] = useState('');
  const[senha, setSenha] = useState('');

  const {signUp} = useContext(AuthContext);

  async function handleSubmit(e){

    e.preventDefault();
   

    if(nome !== '' && email !== '' && senha !== ''){

      signUp(email, senha, nome)

    }
  }

  return (
    <div className="container-center">
    <div className="login">
      <div className="login-area">
        <img src={logo} alt="Logo do Sistema"/>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Cadastrar</h1>
        <input type="text" value={nome} placeholder="Digite Seu Nome" onChange={(e) => setNome(e.target.value)} />
        <input type="text" value={email} placeholder="Digite Seu E-mail" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={senha} placeholder="Digite Sua Senha" onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Criar uma conta</button>
      </form> 
    
    <Link to="/">Já possui uma conta? Clique para logar</Link>
    </div> 
  </div>
  );
}

export default SignUp;
