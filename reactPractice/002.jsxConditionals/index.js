const getNum = () => Math.floor(Math.random() * 10) + 1;
const isPrime = (num) => {
  if (num === 2 || num === 3 || num === 5 || num === 7) {
    return true;
  }
  return false;
};

class NumPicker extends React.Component {
  render() {
    const num = getNum();
    return (
      <div>
        <h1>Your number is {num}</h1>
        <h3>
          {isPrime(num) ? (
            <img src="https://media.giphy.com/media/MRG6k5gsTfASjBzTQr/giphy.gif" />
          ) : null}
        </h3>
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<NumPicker />, root);
