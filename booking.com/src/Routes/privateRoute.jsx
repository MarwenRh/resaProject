import React from 'react';
import { Route, useHistory } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token') || !!localStorage.getItem('jwt'); // Vérifier si l'utilisateur est connecté via un token ou jwt
  const history = useHistory(); // Hook pour gérer l'historique

  console.log("Token:", localStorage.getItem('token'));
console.log("JWT:", localStorage.getItem('jwt'));

  if (!isAuthenticated) {
    history.push('/login'); // Rediriger vers la page de login si non connecté
    return null; // Retourner null pour ne pas afficher la route protégée
  }

  return (
    <Route {...rest}>
      {children} {/* Affiche le contenu de la route privée si l'utilisateur est connecté */}
    </Route>
  );
};

export default PrivateRoute;
