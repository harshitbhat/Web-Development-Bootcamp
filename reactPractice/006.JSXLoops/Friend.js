class Friend extends React.Component {
  render() {
    const { name, cities } = this.props;
    console.log(name, cities);
    return (
      <div>
        <div>
          <h1>Name: {name}</h1>
          <h2>
            <ul>
              {cities.map((el) => (
                <li>{el}</li>
              ))}
            </ul>
          </h2>
        </div>
      </div>
    );
  }
}
