import { Route, Switch } from "react-router";
import { Container } from "reactstrap";
import Header from "./components/Header";
import HomePage from "./pages";
import LoginPage from "./pages/login";

function App() {
	return (
		<>
			<Header />
			<Container className="py-5">
				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>

					<Route path="/login" exact>
						<LoginPage />
					</Route>
				</Switch>
			</Container>
		</>
	);
}

export default App;
