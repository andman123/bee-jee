import React from "react";
import {
	Button,
	Form,
	FormFeedback,
	FormGroup,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const AddTaskModal = ({ modal, toggle, addTask }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const closeModal = () => {
		reset();
		toggle();
	};

	const onSubmit = (data) => {
		closeModal();
		addTask(data);
	};

	return (
		<Modal isOpen={modal} toggle={closeModal}>
			<ModalHeader toggle={closeModal}>Новая Задача</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<Label>имя пользователя</Label>
						<input
							type="text"
							className={classNames("form-control", {
								"is-invalid": errors.username,
							})}
							placeholder="имя пользователя"
							{...register("username", {
								required:
									"Поле является обязательным для заполнения",
							})}
						/>
						<FormFeedback>
							{errors?.username?.message || ""}
						</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label>email</Label>
						<input
							type="text"
							className={classNames("form-control", {
								"is-invalid": errors.email,
							})}
							placeholder="email"
							{...register("email", {
								required:
									"Поле является обязательным для заполнения",
								pattern: {
									value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
									message: "Невалидный email",
								},
							})}
						/>
						<FormFeedback>
							{errors?.email?.message || ""}
						</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label>текст задачи</Label>
						<input
							type="text"
							className={classNames("form-control", {
								"is-invalid": errors.text,
							})}
							placeholder="текст задачи"
							{...register("text", {
								required:
									"Поле является обязательным для заполнения",
							})}
						/>
						<FormFeedback>
							{errors?.text?.message || ""}
						</FormFeedback>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={closeModal}>
					Закрыть
				</Button>
				<Button color="primary" onClick={handleSubmit(onSubmit)}>
					Добавить
				</Button>{" "}
			</ModalFooter>
		</Modal>
	);
};

export default AddTaskModal;
