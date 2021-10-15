import React from "react";
import { usePagination, useTable } from "react-table";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";

const TaskListTable = ({
	columns,
	data,
	fetchData,
	loading,
	totalCount,
	pageCount: controlledPageCount,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		// Get the state from the instance
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 3 }, // Pass our hoisted table state
			manualPagination: true, // Tell the usePagination
			// hook that we'll handle our own data fetching
			// This means we'll also have to provide our own
			// pageCount.
			pageCount: controlledPageCount,
		},
		usePagination
	);

	React.useEffect(() => {
		console.log("fetchData");
		fetchData({ pageIndex, pageSize });
	}, [fetchData, pageIndex, pageSize, totalCount]);

	return (
		<>
			<Table striped bordered hover size="sm" {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render("Header")}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
					<tr>
						{loading ? (
							// Use our custom loading state to show a loading indicator
							<td colSpan="10000">Loading...</td>
						) : (
							<td colSpan="10000">
								Showing {page.length} of ~{totalCount} results
							</td>
						)}
					</tr>
				</tbody>
			</Table>
			<Pagination size="lg" aria-label="Page navigation example">
				<PaginationItem disabled={!canPreviousPage}>
					<PaginationLink
						first
						href="#"
						onClick={(e) => {
							e.preventDefault();
							gotoPage(0);
						}}
					/>
				</PaginationItem>
				<PaginationItem disabled={!canPreviousPage}>
					<PaginationLink
						previous
						href="#"
						onClick={(e) => {
							e.preventDefault();
							previousPage();
						}}
					/>
				</PaginationItem>

				<PaginationItem disabled={!canNextPage}>
					<PaginationLink
						next
						href="#"
						onClick={(e) => {
							e.preventDefault();
							nextPage();
						}}
					/>
				</PaginationItem>
				<PaginationItem disabled={!canNextPage}>
					<PaginationLink
						last
						href="#"
						onClick={(e) => {
							e.preventDefault();
							gotoPage(pageCount - 1);
						}}
					/>
				</PaginationItem>
			</Pagination>
			<div className="pagination">
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
			</div>
		</>
	);
};

export default TaskListTable;
