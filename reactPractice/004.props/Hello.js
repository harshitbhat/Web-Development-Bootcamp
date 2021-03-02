class Hello extends React.Component {
  static defaultProps = {
    from: 'Anonymous',
    bangs: 5,
  };
  render() {
    let bangs = '!'.repeat(this.props.bangs);
    return (
      <div>
        <p>
          <h2>
            Hello {this.props.to} from {this.props.from} {bangs}.
          </h2>
        </p>
        <img src={this.props.img} height="600px" />
      </div>
    );
  }
}
