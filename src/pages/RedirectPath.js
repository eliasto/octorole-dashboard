function RedirectPath(props) {

  const {to} = props;

  return (
    window.location.href = to
  );
  
}

export default RedirectPath;