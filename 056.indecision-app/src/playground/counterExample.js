let count = 0;
const increment = () => {
  count++;
  renderCounterApp();
};

const decrement = () => {
  count--;
  renderCounterApp();
};

const reset = () => {
  count = 0;
  renderCounterApp();
};

const appRoot = document.querySelector('#app');
const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Clear</button>
    </div>
  );
  ReactDOM.render(templateTwo, appRoot);
};

renderCounterApp();
