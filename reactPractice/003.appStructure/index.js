class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <NumPicker />
      </div>
    );
  }
}
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
