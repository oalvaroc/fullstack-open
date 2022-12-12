const Status = (props) => {
  if (props.msg) {
    return (
      <div className="status">
        {props.msg}
      </div>
    );
  }
  else {
    return null;
  }
}

export default Status;
