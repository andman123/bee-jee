import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
} from "reactstrap";
import { logout } from "../redux/actions/authActions";
import { getAuth } from "../redux/selectors";

const Header = () => {
	const auth = useSelector(getAuth);
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const dispatch = useDispatch();
	return (
		<div>
			<Navbar color="light" light expand="md">
				<Container>
					<NavbarBrand tag={Link} to="/">
						Bee Jee
					</NavbarBrand>
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								{!!auth.token && (
									<NavLink
										href="/logout"
										onClick={(e) => {
											e.preventDefault();
											dispatch(logout());
										}}
									>
										Logout
									</NavLink>
								)}

								{!auth.token && (
									<NavLink to="/login" tag={Link}>
										Login
									</NavLink>
								)}
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default Header;
