import React from 'react';
import { Route, useHistory } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Vérifier si l'utilisateur est connecté
  const isAuthenticatedjwt = !!localStorage.getItem('jwt'); // Vérifier si l'utilisateur est connecté
  const history = useHistory(); // Hook pour accéder à l'historique

  if (isAuthenticated || isAuthenticatedjwt) {
    history.push('/'); // Rediriger vers la page d'accueil si l'utilisateur est connecté
    return null;
  }

  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} />} // Si non connecté, afficher la route publique
    />
  );
};

export default PublicRoute;
