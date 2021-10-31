import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, Col, Row } from "reactstrap";
import { BsPen } from "react-icons/bs";

import { getAuth } from "../redux/selectors";
import TaskRepository from "../repositories/TaskRepository";

import AddTaskModal from "../components/AddTaskModal";
import TaskListTable from "../components/TaskListTable";
import EditTaskModal from "../components/EditTaskModal";

const taskStatuses = {
	0: ["не выполнена"],
	1: ["отредактирована админом"],
	10: ["выполнено"],
	11: ["выполнено", "отредактировано администратором"],
};

const HomePage = () => {
	const auth = useSelector(getAuth);
	const [tasks, setTasks] = useState([]);
	const columns = React.useMemo(() => {
		const tableColumns = [
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
				disableSortBy: true,
			},
			{
				Header: "статус",
				accessor: "status",
				Cell: ({ value }) => {
					let statuses = taskStatuses[value].map((status) => {
						return (
							<Badge color="success" key={status}>
								{status}
							</Badge>
						);
					});

					return <>{statuses}</>;
				},
			},
		];

		if (auth.token) {
			tableColumns.push({
				Header: "Actions",
				id: "actions",
				Cell: (props) => {
					console.log(props);
					return (
						<Button
							onClick={() =>
								openEditTaskModal(props.row.original)
							}
						>
							<BsPen />
						</Button>
					);
				},
			});
		}

		return tableColumns;
	}, [auth]);

	const [addTaskModal, setAddTaskModal] = useState(false);
	const toggleAddTaskModal = () => setAddTaskModal(!addTaskModal);

	const [editTaskModal, setEditTaskModal] = useState(false);
	const [task, setTask] = useState(null);
	const toggleEditTaskModal = () => {
		setEditTaskModal(!editTaskModal);
	};

	const openEditTaskModal = (task) => {
		setTask(task);
		setEditTaskModal(true);
	};

	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);
	const [totalCount, setTotalCount] = React.useState(0);

	const fetchData = React.useCallback(
		async ({ pageSize, pageIndex, sortBy }) => {
			// Set the loading state
			setLoading(true);
			let params = {
				page: pageIndex + 1,
			};

			if (sortBy.length) {
				let sortDirection = sortBy[0].desc ? "desc" : "asc";
				Object.assign(params, {
					sort_field: sortBy[0].id,
					sort_direction: sortDirection,
				});
			}

			const response = await TaskRepository.getTasks(params);
			console.log("tasks", response);
			if (response.data.status === "ok") {
				setTasks(response.data.message.tasks);
				setPageCount(
					Math.ceil(response.data.message.total_task_count / pageSize)
				);
				setTotalCount(response.data.message.total_task_count);
				setLoading(false);
			}
		},
		[]
	);

	const addTask = async (data) => {
		const result = await TaskRepository.createTask(data);
		if (result.data.status === "ok") {
			setTotalCount(Number(totalCount) + 1);
		}
	};

	const editTask = async (id, data) => {
		data.token = auth.token;
		const result = await TaskRepository.editTask(id, data);
		if (result.data.status === "ok") {
			setTasks((oldTasks) =>
				oldTasks.map((row) => {
					if (row.id === id) {
						return {
							...row,
							text: data.text,
						};
					}
					return row;
				})
			);
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

			<EditTaskModal
				modal={editTaskModal}
				toggle={toggleEditTaskModal}
				task={task}
				editTask={editTask}
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
