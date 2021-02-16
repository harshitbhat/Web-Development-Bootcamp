setTimeout(() => {
  document.body.style.backgroundColor = 'violet';
  setTimeout(() => {
    document.body.style.backgroundColor = 'indigo';
    setTimeout(() => {
      document.body.style.backgroundColor = 'blue';
      setTimeout(() => {
        document.body.style.backgroundColor = 'green';
        setTimeout(() => {
          document.body.style.backgroundColor = 'yellow';
          setTimeout(() => {
            document.body.style.backgroundColor = 'orange';
            setTimeout(() => {
              document.body.style.backgroundColor = 'red';
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
