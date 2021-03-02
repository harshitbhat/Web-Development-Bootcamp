class Machine extends React.Component {
  render() {
    const props = this.props;
    const x = props.firstComponent;
    const y = props.secondComponent;
    const z = props.thirdComponent;
    return (
      <div>
        <h1>
          {x} {y} {z}
        </h1>
        <h3>{x === y && y === z ? 'You Win' : 'You Lose'}</h3>
      </div>
    );
  }
}
