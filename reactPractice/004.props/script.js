class App extends React.Component {
  render() {
    return (
      <div>
        <Hello
          to="Abhishek"
          from="Harshit"
          data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          isFunny={true}
          img="https://images.unsplash.com/photo-1520312622401-cac590a0d473"
        />
        <Hello
          to="Anshu"
          bangs={7}
          data={[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
          isFunny={false}
          img="https://images.unsplash.com/photo-1516540507469-9fff64887136"
        />
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
