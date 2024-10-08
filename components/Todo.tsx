'use client';

import React, { FormEvent, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

interface TodoProps {
	todo: {
		id: string;
		title: string;
		isEdit: boolean;
	};
	handleActiveEdit: (id: string) => void;
	handleDelete: (id: string) => void;
	handleEditSubmit: (id: string, newTitle: string) => void;
}

const Todo: React.FC<TodoProps> = (props) => {
	const [editedValue, setEditedValue] = useState<string>(props.todo.title);

	const handleSubmitTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.handleEditSubmit(props.todo.id, editedValue);
	};

	return (
		<li className='border-b border-r border-l px-5 rounded-lg border-gray-200 py-2 flex justify-between'>
			{props.todo.isEdit ? (
				<form className='flex space-x-2' onSubmit={handleSubmitTodo}>
					<input
						type='text'
						className='text-black'
						value={editedValue}
						onChange={(e) => setEditedValue(e.target.value)}
					/>
					<button type='submit'>Save</button>
				</form>
			) : (
				<p className='font-medium tracking-wide'>{props.todo.title}</p>
			)}
			<div className='flex space-x-3'>
				<button onClick={() => props.handleActiveEdit(props.todo.id)}>
					<FaEdit className='text-blue-600' size={20} />
				</button>
				<button onClick={() => props.handleDelete(props.todo.id)}>
					<MdDelete className='text-red-600' size={20} />
				</button>
			</div>
		</li>
	);
};

export default Todo;
