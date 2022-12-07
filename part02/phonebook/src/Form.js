const Form = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Name: <input value={props.name} onChange={(e) => props.setName(e.target.value)} />
      </div>
      <div>
        Phone: <input value={props.phone} onChange={(e) => props.setPhone(e.target.value)} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
}

export default Form;
