import React from 'react';

export default class NavTop extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			dates: [],
		};

		this.collection = new wp.api.collections.Categories();

		this.handleCatChange = this.handleCatChange.bind(this);
		this.onFilterButtonClicked = this.onFilterButtonClicked.bind(this);
	}

	componentDidMount() {
		// fetch posts categories
		this.collection.fetch({
			reset: true,
		})
			.done(categories => {
				this.setState({categories: categories});
			});

		// fetch posts date
		window.fetch(`${window.wpApiSettings.root}wprt/v1/posts-date`)
			.then(response => response.json())
			.then(dates => this.setState({dates: dates}));
	}

	handleCatChange(e) {
		this.props.onCatChange(e.target.value);
	}

	onFilterButtonClicked() {
		this.props.onFilterButtonClicked();
	}

	render() {

		return (
			<div className="tablenav top">
				<select name="m" id="filter-by-date">
					<option value="0">All dates</option>
					{this.state.dates
						.map((date, index) => <option key={index}>{date.month}&nbsp;{date.year}</option>)}
				</select>
				<select name="cat" id="cat" className="cat" ref={this.props.catInputRef}>
					<option value="">All Categories</option>
					{this.state.categories
						.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
				</select>
				<input type="submit" name="filter_action" id="post-query-submit" className="button" value="Filter" onClick={this.onFilterButtonClicked}/>
			</div>
		);
	}
}
