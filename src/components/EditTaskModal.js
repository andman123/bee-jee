import React, { useEffect } from "react";
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
import classNames from "classnames";
import { useForm } from "react-hook-form";

const EditTaskModal = ({ modal, toggle, task, editTask }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {},
	});

	useEffect(() => {
		reset({ text: task?.text || "" });
	}, [task]);

	const closeModal = () => {
		reset();
		toggle();
	};

	const onSubmit = (data) => {
		closeModal();
		editTask(task.id, data);
	};

	return (
		<Modal isOpen={modal} toggle={closeModal}>
			<ModalHeader toggle={closeModal}>Редактирование задачи</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit(onSubmit)}>
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
					Изменить
				</Button>{" "}
			</ModalFooter>
		</Modal>
	);
};

export default EditTaskModal;
