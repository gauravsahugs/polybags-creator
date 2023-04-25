import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from './columns';
import useFetch from '../hooks/useFetch';

const BasicTable = () => {
	const columns = useMemo(() => COLUMNS, []);
	const allClientsURL = 'http://localhost:8000/api/clients/';

	// const {
	// 	apiData: allClientsData,
	// 	isLoading,
	// 	errorOccurred,
	// } = useFetch(allClientsURL, 'get');
	// const data = useMemo(() => allClientsData, [allClientsData]);

	// const tableInstance = useTable({ columns: columns, data: data });
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;
	return (
		<>
			<table {...getTableProps()} className='lists'>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default BasicTable;
