// Class based Component
class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello There!!!</h1>
        <h1>Hello There!!!</h1>
        <h1>Hello There!!!</h1>
      </div>
    );
  }
}

// Function based Component
function Hello2() {
  return (
    <div>
      <h1>Hello There!!!</h1>
      <h1>Hello There!!!</h1>
      <h1>Hello There!!!</h1>
      <h1>Hello There!!!</h1>
      <h1>Hello There!!!</h1>
      <h1>Hello There!!!</h1>
    </div>
  );
}

ReactDOM.render(<Hello2 />, document.getElementById('root'));
