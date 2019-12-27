import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";

import Subscriptors from "./components/subscriptors/Subscriptors";
import NewSub from "./components/subscriptors/NewSub";
import EditSub from "./components/subscriptors/EditSub";
import ShowSub from "./components/subscriptors/ShowSub";
import Navbar from "./components/layout/Navbar";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						{/* <Route
							exact
							path="/"
							component={UserIsAuthenticated(Libros)}
						/>
						<Route
							exact
							path="/libros/mostrar/:id"
							component={UserIsAuthenticated(MostrarLibro)}
						/>
						<Route
							exact
							path="/libros/nuevo"
							component={UserIsAuthenticated(NuevoLibro)}
						/>
						<Route
							exact
							path="/libros/editar/:id"
							component={UserIsAuthenticated(EditarLibro)}
						/>
						<Route
							exact
							path="/libros/prestamo/:id"
							component={UserIsAuthenticated(PrestamoLibro)}
						/> */}

						<Route
							exact
							path="/subscriptors"
							component={Subscriptors}
						/>
						<Route
							exact
							path="/subscriptors/new"
							component={NewSub}
						/>
						<Route
							exact
							path="/subscriptors/show/:id"
							component={ShowSub}
						/>
						<Route
							exact
							path="/subscriptors/edit/:id"
							component={EditSub}
						/>

						{/* <Route
							exact
							path="/login"
							// component={UserIsNotAuthenticated(Login)}
						/> */}
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
