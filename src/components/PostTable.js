import React from 'react';
import PostRow from './PostRow';

export default class PostTable extends React.Component {
	render() {
		const rows = [];

		this.props.posts.forEach((post) => {
			rows.push(
				<PostRow post={post} key={post.id}/>
			);
		});

		return (
			<table className="wp-list-table widefat fixed striped posts">
				<thead>
				<tr>
					<td scope="col" className="manage-column">ID</td>
					<td scope="col" className="manage-column">Title</td>
				</tr>
				</thead>
				<tbody>
				{rows}
				</tbody>
			</table>
		);
	}
}