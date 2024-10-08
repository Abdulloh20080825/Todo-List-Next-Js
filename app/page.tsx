'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { v4 as uuid } from 'uuid';
import Todo from '@/components/Todo';

interface Todo {
	id: string;
	title: string;
	isEdit: boolean;
}

const Page: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [value, setValue] = useState<string>('');
	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (value.trim() === '') return;

		const newTodo = {
			id: uuid(),
			title: value,
			isEdit: false,
		};

		localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));

		setTodos((prev) => [...prev, newTodo]);
		setValue('');
	};

	const handleActiveEdit = (id: string) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, isEdit: !todo.isEdit } : todo
			)
		);
	};

	const handleEditSubmit = (id: string, newTitle: string) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, title: newTitle, isEdit: false } : todo
			)
		);
	};

	const handleDeleteTodo = (id: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
	};

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<div className='shadow-lg rounded-lg p-8 max-w-lg w-full'>
				<h1 className='text-2xl font-bold text-center mb-6'>
					Todo List Next.js
				</h1>
				<form className='flex flex-col space-y-4' onSubmit={handleAddTodo}>
					<div className='flex flex-col'>
						<label htmlFor='add' className='mb-2 font-medium'>
							Add Todo
						</label>
						<input
							type='text'
							id='add'
							name='add'
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder='Add Todo'
							className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black'
						/>
					</div>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300'
					>
						Add Todo
					</button>
				</form>

				<ul className='mt-6 space-y-5'>
					{todos.map((todo) => (
						<Todo
							key={todo.id}
							todo={todo}
							handleActiveEdit={handleActiveEdit}
							handleDelete={handleDeleteTodo}
							handleEditSubmit={handleEditSubmit}
						/>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Page;
