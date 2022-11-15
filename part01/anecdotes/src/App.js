import { useState } from 'react'

const RandomAnecdote = (props) => {
  const [selected, setSelected] = useState(0);

  const selectRandomAnecdote = () => {
    const random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(random);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]} <br /> has {props.votes[selected]} votes</p>
      <button onClick={props.voteUpdater(selected)}>vote</button>
      <button onClick={selectRandomAnecdote}>next anecdote</button>
    </div>
  );
}

const PopularAnecdote = (props) => {
  const votes = props.votes.reduce((a, b) => Math.max(a, b));
  const index = props.votes.indexOf(votes);

  return votes !== 0 && (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[index]} <br /> has {votes} votes</p>
    </div>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const voteUpdater = (index) => () => {
    const copy = [...votes];
    copy[index] += 1;
    setVotes(copy);
  }

  return (
    <div>
      <RandomAnecdote
        anecdotes={anecdotes}
        votes={votes}
        voteUpdater={voteUpdater} />
      <PopularAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
