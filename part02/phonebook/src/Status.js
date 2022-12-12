const Status = (props) => {
  if (!props.status) {
    return null;
  }

  const isError = props.status.isError;

  return (
    <div className={`status ${isError ? 'error' : ''}`}>
      {props.status.msg}
    </div>
  );

}

export default Status;
