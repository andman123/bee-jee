import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { login } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/selectors";
import { Redirect } from "react-router";

const LoginPage = () => {
	const auth = useSelector(getAuth);

	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		dispatch(login(data));
	};
	if (!!auth.token) {
		return <Redirect to="/" />;
	}
	return (
		<div className="login-form-wrapper">
			<div className="login-form">
				<h3 className="text-center">Login</h3>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<input
							type="text"
							className="form-control"
							placeholder="Username"
							{...register("username", {
								required: "Username is required",
							})}
						/>
					</FormGroup>

					<FormGroup>
						<input
							className="form-control"
							type="password"
							placeholder="Password"
							{...register("password", {
								required: "Password is required",
							})}
						/>
					</FormGroup>

					<Button color="primary">Login</Button>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
