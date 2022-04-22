import { useState, useEffect } from "react";
import ListComponent from "./components/ListComponent";
import Localbase from 'localbase';
import * as ImIcons from "react-icons/im";

const App = () => {

	let db = new Localbase('db');
	db.config.debug = false;

	const [todos, setTodos] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [titleInput, setTitleInput] = useState("");

	useEffect(() => {
		db.collection('react_todo').orderBy('date_added', 'desc').get().then(todos => {
			if (todos.length!==0){setTodos(todos)}else{setTodos(null)}
		});
	}, [])

	const reloadTodo = () => {
		db.collection('react_todo').orderBy('date_added', 'desc').get().then(todos => {
			if (todos.length!==0){setTodos(todos)}else{setTodos(null)}
		});
	}

	const addTodo = (e) => {
		e.preventDefault();
		setProcessing(true);
		db.collection('react_todo').add({
			title: titleInput,
			random_id: String(Math.random()),
			date_added: new Date().toISOString()
		}).then(() => {
			setTitleInput("");
			db.collection('react_todo').orderBy('date_added', 'desc').get().then(todos => {
				if (todos.length!==0){setTodos(todos)}else{setTodos(null)}
				setProcessing(false);
			});
		})
	}

    return (
		<div className="container-fluid app__container" id="app__container">
			<div className="row justify-content-center">
				<div className="col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12">
					<section className="app__section">
						<h1 className="header-title">Todo List Application</h1>

						<div className="card todo-card">
							<form id="todo_form" onSubmit={addTodo}>
								<div className="form-group d-flex">
									<input
										type="text"
										name="reacttodo-input"
										id="todoinput"
										className="form-control custom__input"
										placeholder="Enter A Task Here..."
										required={true}
										value={titleInput}
										onChange={(e) => setTitleInput(e.target.value)}
									/>
									<button
										type="submit"
										className="custom__button"
										disabled={processing}>
										{processing?<ImIcons.ImSpinner8 />:'Add'}
									</button>
								</div>
							</form>
							<br />

							<div className="list-content">
							{
								todos===null?
								<p>Add a new todo to your list</p>
								:
								<ul id="list-array">
									{
										todos.map((single_todo, index) => {
											return (
												<ListComponent
													key={index}
													todo={single_todo}
													reloadTodo={reloadTodo}
												/>
											)
										})
									}
								</ul>
							}
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
    )
}

export default App;