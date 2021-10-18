import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, Col, Row } from "reactstrap";
import AddTaskModal from "../components/AddTaskModal";
import TaskListTable from "../components/TaskListTable";
import { getAuth } from "../redux/selectors";
import TaskRepository from "../repositories/TaskRepository";

const taskStatuses = {
	0: ["не выполнена"],
	1: ["не выполнена"],
	10: ["выполнено"],
	11: ["выполнено", "отредактировано администратором"],
};

// Create an editable cell renderer
const EditableCell = ({
	value: initialValue,
	row: { index },
	column: { id },
	updateMyData, // This is a custom function that we supplied to our table instance
}) => {
	// We need to keep and update the state of the cell normally
	const [value, setValue] = React.useState(initialValue);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	// We'll only update the external data when the input is blurred
	const onBlur = () => {
		updateMyData(index, id, value);
	};

	// If the initialValue is changed external, sync it up with our state
	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const HomePage = () => {
	const auth = useSelector(getAuth);
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
				//Cell: EditableCell,
				disableSortBy: true,
			},
			{
				Header: "статус",
				accessor: "status",
				Cell: ({ value }) => {
					let statuses = taskStatuses[value].map((status) => {
						return <Badge color="success">{status}</Badge>;
					});

					return <>{statuses}</>;
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

	const editTask = async (data) => {
		const result = await TaskRepository.editTask(data);
		console.log(result);
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
