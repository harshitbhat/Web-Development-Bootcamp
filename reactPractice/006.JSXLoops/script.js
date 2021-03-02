class App extends React.Component {
  render() {
    return (
      <div>
        <Friend
          name="Harshit"
          cities={['jammu', 'kurukshetra', 'pune', 'delhi']}
        />
        <Friend
          name="Abhishek"
          cities={[
            'ghaziabad',
            'kurukshetra',
            'chandigarh',
            'thailand',
            'tallinn',
          ]}
        />
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
