class App extends React.Component {
  render() {
    const components = ['🥭', '🍇', '🍌'];
    return (
      <div>
        <h1>Slot Machines</h1>
        <Machine
          firstComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          secondComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          thirdComponent={
            components[Math.floor(Math.random() * components.length)]
          }
        />
        <Machine
          firstComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          secondComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          thirdComponent={
            components[Math.floor(Math.random() * components.length)]
          }
        />
        <Machine
          firstComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          secondComponent={
            components[Math.floor(Math.random() * components.length)]
          }
          thirdComponent={
            components[Math.floor(Math.random() * components.length)]
          }
        />
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
