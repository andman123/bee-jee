import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import AddTaskModal from "../components/AddTaskModal";
import TaskListTable from "../components/TaskListTable";
import TaskRepository from "../repositories/TaskRepository";

const taskStatuses = {
	0: "задача не выполнена",
	1: "задача не выполнена, отредактирована админом",
	10: "задача выполнена",
	11: "задача отредактирована админом и выполнена",
};

const HomePage = () => {
	const [tasks, setTasks] = useState([]);
	const columns = React.useMemo(
		() => [
			{
				Header: "имя пользователя",
				accessor: "username", // accessor is the "key" in the data
			},
			{
				Header: "email",
				accessor: "email",
			},
			{
				Header: "текст задачи",
				accessor: "text",
			},
			{
				Header: "статус",
				accessor: "status",
				Cell: ({ value }) => {
					return taskStatuses[value];
				},
			},
		],
		[]
	);

	const [addTaskModal, setAddTaskModal] = useState(false);
	const toggleAddTaskModal = () => setAddTaskModal(!addTaskModal);

	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const [totalCount, setTotalCount] = React.useState(0);

	const fetchData = React.useCallback(async ({ pageSize, pageIndex }) => {
		// Set the loading state
		setLoading(true);

		const response = await TaskRepository.getTasks({ page: pageIndex + 1 });
		if (response.data.status === "ok") {
			setTasks(response.data.message.tasks);
			setPageCount(
				Math.ceil(response.data.message.total_task_count / pageSize)
			);
			setTotalCount(response.data.message.total_task_count);
			setLoading(false);
		}
	}, []);

	const addTask = async (data) => {
		const result = await TaskRepository.createTask(data);
		if (result.data.status === "ok") {
			setTotalCount(Number(totalCount) + 1);
		}
	};

	return (
		<div>
			<Row>
				<Col>
					<h2>Задачи</h2>
				</Col>
				<Col className="text-right">
					<Button color="primary" onClick={toggleAddTaskModal}>
						Добавить задачу
					</Button>
				</Col>
			</Row>

			<AddTaskModal
				modal={addTaskModal}
				toggle={toggleAddTaskModal}
				addTask={addTask}
			/>

			<TaskListTable
				columns={columns}
				data={tasks}
				fetchData={fetchData}
				loading={loading}
				pageCount={pageCount}
				totalCount={totalCount}
			/>
		</div>
	);
};

export default HomePage;
