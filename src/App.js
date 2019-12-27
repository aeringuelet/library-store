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
							component={Books}
						/>
						<Route
							exact
							path="/books/show/:id"
							component={ShowBook}
						/>
						<Route
							exact
							path="/books/new"
							component={NewBook}
						/>
						<Route
							exact
							path="/books/edit/:id"
							component={EditBook}
						/>
						<Route
							exact
							path="/books/loan/:id"
							component={BookLoan}
						/>

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
