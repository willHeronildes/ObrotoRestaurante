
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext }from '../contexts/auth';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}){

    const { signed, loading } = useContext(AuthContext);


    if(loading){
        return(
            <div></div>
        )
    }
    //caso o usuario não esteja logado redireciona-lo para tela de login 
    if(!signed && isPrivate){
        return<Redirect to="/" />
    }
    //caso o usuario esteja logado sempre redireciona-lo sempre para tela de dashboard
    if(signed && !isPrivate){
        return <Redirect to="/dashboard" />
    }
    return(
        //retornando todos os componentes e propriedades da Route
        <Route
          {...rest}
          render={props => (
            <Component {...props} />
          )}
        />
    )
}