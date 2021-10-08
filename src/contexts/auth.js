
import { createContext, useEffect, useState } from 'react';
import firebase from '../services/firebaseConnection';
import { ToastContainer, toast } from 'react-toastify';




export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    //verificando se possui algum usuario logado e armazenando no storage
    useEffect(()=>{

        function loadStorage(){
           
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
    
            setLoading(false);

        }

       loadStorage();
       
    }, [])
    
    //Fazendo login do usuario 
    async function signIn(email, senha){
       setLoadingAuth(true);

       await firebase.auth().signInWithEmailAndPassword(email, senha)
       .then(async(value)=>{
           let uid = value.user.uid

           const userProfile = await firebase.firestore().collection('users')
           .doc(uid).get();

           let data = {
               uid: uid,
               nome: userProfile.data().nome,
               avatarUrl: userProfile.data().avatarUrl,
               email: value.user.email
               
           };

           setUser(data);
           storageUser(data);
           setLoadingAuth(false);
           toast.success("Bem-Vindo ao Sistema")  


       })
       
       .catch((error)=>{
           console.log(error);
           toast.error("E-mail ou Senha Incorreto",{
               theme: "colored"
           })
           setLoadingAuth(false);
       
                  
       })

          
    }

    //Cadastrando um novo usuario 
    async function signUp(email, senha, nome){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(async(value)=>{
           let uid = value.user.uid;
           await firebase.firestore().collection('users')
           .doc(uid).set({
               nome: nome,
               avatarUrl: null,
           })
           .then(()=>{
               let data = {
                 uid: uid,
                 nome: nome,
                 email: value.user.email,
                 avatarUrl: null,

               };

               setUser(data);
               storageUser(data);
               setLoadingAuth(false);

           }) 

        })
        .catch((error)=>{
           console.log(error);
           setLoadingAuth(false); 
        })
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }
    //Logout do usuario
    async function signOut(){

        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        toast.success('Sua sessão foi finalizada com sucesso!');
        setUser(null);

    }

    return(
        <AuthContext.Provider 
        value={{
             signed: !!user,
             user,
             loading,
             signUp,
             signOut,
             signIn,
             loadingAuth,
             setUser,
             storageUser,
            
             
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;