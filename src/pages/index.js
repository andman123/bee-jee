import React, { useState } from "react";
import TaskListTable from "../components/TaskListTable";
import axios from "../configs/axios";

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
					console.log(value);
					return taskStatuses[value];
				},
			},
		],
		[]
	);

	const [loading, setLoading] = React.useState(false);
	const [pageCount, setPageCount] = React.useState(0);

	const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
		// Set the loading state
		setLoading(true);

		axios
			.get(`/?page=${pageIndex + 1}`)
			.then((response) => {
				console.log(response);
				if (response.data.status === "ok") {
					setTasks(response.data.message.tasks);
					setPageCount(
						Math.ceil(
							response.data.message.total_task_count / pageSize
						)
					);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<div>
			<h2>Tasks</h2>
			<TaskListTable
				columns={columns}
				data={tasks}
				fetchData={fetchData}
				loading={loading}
				pageCount={pageCount}
			/>
		</div>
	);
};

export default HomePage;
