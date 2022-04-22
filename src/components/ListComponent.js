import Localbase from 'localbase';
import * as BsIcons from "react-icons/bs";

const ListComponent = ({todo, reloadTodo}) => {

	const removeTodo = (e) => {
		let db = new Localbase('db');
		db.config.debug = false;
		db.collection('react_todo').doc({ random_id:todo.random_id }).delete().then(() => {
			reloadTodo();
		})
	}

	return(
		<li>
			<span>{todo.title}</span>
			<button
				className="list__button"
				onClick={removeTodo}>
				<BsIcons.BsTrash onClick={removeTodo} />
			</button>
		</li>
	)
}

export default ListComponent;