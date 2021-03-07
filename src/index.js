import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import ReactDOM from './kreact/react-dom';
import Component from './kreact/component';
import DomProvider from './DomProvider';
import TreeRoot from './TreeRoot';

function FunctionComponet(props) {
  return (
    <div className='contianer'>
      <h1>函数组件--{props.name}</h1>
    </div>
  )
}

class ClassComponet extends Component {
  render() {
    return (
      <div className='contianer'>
        <h1>函数组件--{this.props.name}</h1>
      </div>
    )
  }
}

const JSX = (
  <div className='contianer'>
    <div className='block'>
      <h1>Hello React 17!</h1>
      {/* <FunctionComponet name="function" />
    <ClassComponet name="class" /> */}
      <span>Copy right.</span>
    </div>
    <div className='block'>
    </div>
    <div className='block'>
    </div>
  </div>
);

const root = (
  <DomProvider>
    <TreeRoot />
  </DomProvider>
)

ReactDOM.render(
  root,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
