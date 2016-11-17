import Demo from './ProgressBarDemo';
import ReactDOM from 'react-dom';
import ProgressBar from '../src';

const now = 60;
function demo1() {
    return( 
    	<ProgressBar now = {now} />
	)
}

function demo2() {
    return( 
    	<div className="demo-progress-bar">
    		<ProgressBar now = {now} label = {`${now}%`} />
    	</div>
	)
}

function demo3() {
    return( 
    	<div className="demo-progress-bar">
    		<ProgressBar striped now = {now}/> 
    	</div>
	)
}

function demo4() {
    return( 
    	<div className="demo-progress-bar">
    		<ProgressBar active now = {now}/> 
    	</div>
	)
}

function demo5() {
    return( 
    	<div className="demo-progress-bar">
    		<ProgressBar colors="info" now = {20} />
			<ProgressBar colors="danger" now = {50} />
			<ProgressBar colors="success" now = {40} />
			<ProgressBar colors="warning" now = {30} />
    	</div>
	)
}

function demo6() {
    return( 
    	<div className="demo-progress-bar">
    		<ProgressBar>
				<ProgressBar colors="danger" now = {10} />
				<ProgressBar colors="success" now = {20} />
				<ProgressBar colors="warning" now = {30} />
			</ProgressBar>
    	</div>
	)
}

ReactDOM.render(demo1(), document.getElementById('ReactProgressBarDemo1'));
ReactDOM.render(demo2(), document.getElementById('ReactProgressBarDemo2'));
ReactDOM.render(demo3(), document.getElementById('ReactProgressBarDemo3'));
ReactDOM.render(demo4(), document.getElementById('ReactProgressBarDemo4'));
ReactDOM.render(demo5(), document.getElementById('ReactProgressBarDemo5'));
ReactDOM.render(demo6(), document.getElementById('ReactProgressBarDemo6'));