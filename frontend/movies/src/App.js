import './App.css';
import ListMovie from './components/MoviesList';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import MovieForm from './components/MovieForm';

function App()
{
	return (
		<div>
			<BrowserRouter>
				<div className='container'>
					<Routes>
						<Route exact element={<ListMovie />} path="/" />
						<Route exact element={<ListMovie />} path="/movies" />
						<Route element={<MovieForm />} path="/movie" />
						<Route element={<MovieForm />} path="/movie/:movieId" />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
