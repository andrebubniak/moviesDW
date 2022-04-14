import './App.css';
import ListMovie from './components/MoviesList';
import { Routes, BrowserRouter, Route, Link, useParams } from 'react-router-dom'
import MovieForm from './components/MovieForm';
import { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props)
	}

	render() {

		//wrapper to pass movieId to MovieForm component
		const Wrapper = (props) => {
			const params = useParams()
			return (
				<MovieForm
					{...{...props, match: {params}}}>
				</MovieForm>
			)
		}

		return (
			<div>
				<BrowserRouter>
					<div className='container'>
						<Routes>
							<Route exact element={<ListMovie />} path="/" />
							<Route exact element={<ListMovie />} path="/movies" />
							<Route element={<Wrapper />} path="/movie" />
							<Route element={<Wrapper />} path="/movie/:movieId" />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		);
	}

}

export default App;
