import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";

import Subscriptors from "./components/subscriptors/Subscriptors";
import NewSub from "./components/subscriptors/NewSub";
import EditSub from "./components/subscriptors/EditSub";
import ShowSub from "./components/subscriptors/ShowSub";
import Navbar from "./components/layout/Navbar";
import Books from "./components/books/Books";
import ShowBook from "./components/books/ShowBook";
import EditBook from "./components/books/EditBook";
import BookLoan from "./components/books/BookLoan";
import NewBook from "./components/books/NewBook";
import Login from "./components/auth/Login";

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<Route
							exact
							path="/"
							component={UserIsAuthenticated(Books)}
						/>
						<Route
							exact
							path="/books/show/:id"
							component={UserIsAuthenticated(ShowBook)}
						/>
						<Route
							exact
							path="/books/new"
							component={UserIsAuthenticated(NewBook)}
						/>
						<Route
							exact
							path="/books/edit/:id"
							component={UserIsAuthenticated(EditBook)}
						/>
						<Route
							exact
							path="/books/loan/:id"
							component={UserIsAuthenticated(BookLoan)}
						/>

						<Route
							exact
							path="/subscriptors"
							component={UserIsAuthenticated(Subscriptors)}
						/>
						<Route
							exact
							path="/subscriptors/new"
							component={UserIsAuthenticated(NewSub)}
						/>
						<Route
							exact
							path="/subscriptors/show/:id"
							component={UserIsAuthenticated(ShowSub)}
						/>
						<Route
							exact
							path="/subscriptors/edit/:id"
							component={UserIsAuthenticated(EditSub)}
						/>

						<Route
							exact
							path="/login"
							component={UserIsNotAuthenticated(Login)}
						/>
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
