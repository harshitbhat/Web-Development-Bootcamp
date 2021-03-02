class Machine extends React.Component {
  render() {
    const props = this.props;
    const x = props.firstComponent;
    const y = props.secondComponent;
    const z = props.thirdComponent;
    const winner = x === y && y === z;
    const colors = {
      fontSize: '50px',
      border: '5px solid #7209b7',
      padding: '10px',
    };
    return (
      <div className="Machine">
        <h1 style={colors}>
          {x} {y} {z}
        </h1>
        <h3 className={winner ? 'Machine-Winner' : 'Machine-Loser'}>
          {winner ? 'You Win' : 'You Lose'}
        </h3>
      </div>
    );
  }
}
