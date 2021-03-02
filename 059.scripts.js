const getSquare = (num) => num ** 2;

class JSXDemo extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Square of my random number is:{' '}
          {getSquare(Math.floor(Math.random() * 100) + 1)}
        </h1>
      </div>
    );
  }
}

const container = document.querySelector('#root');
console.log(container);
ReactDOM.render(<JSXDemo />, container);
