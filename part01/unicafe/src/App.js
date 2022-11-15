import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>;

const Feedback = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" onClick={props.handlers.good}/>
      <Button name="neutral" onClick={props.handlers.neutral}/>
      <Button name="bad" onClick={props.handlers.bad}/>
    </div>
  );
}

const StatisticLine = (props) => <div>{props.name} {props.value}</div>

const Statistics = (props) => {
  const sum = () => props.counters.good + props.counters.neutral + props.counters.bad;
  const average = () => (props.counters.good - props.counters.bad) / sum();
  const positive = () => 100 * props.counters.good / sum();

  let body;
  if (sum() === 0) {
    body = <p>No feedback given</p>;
  } else {
    body = (
      <>
        <StatisticLine name="good" value={props.counters.good} />
        <StatisticLine name="neutral" value={props.counters.neutral} />
        <StatisticLine name="bad" value={props.counters.bad} />
        <StatisticLine name="all" value={sum()} />
        <StatisticLine name="average" value={average()} />
        <StatisticLine name="positive" value={positive() + ' %'} />
      </>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      {body}
    </div>
  );
}

const App = () => {
  const [goodCounter, setGoodCounter] = useState(0);
  const [neutralCounter, setNeutralCounter] = useState(0);
  const [badCounter, setBadCounter] = useState(0);

  const clickHandler = (counter, setCounter) => () => setCounter(counter + 1);

  const handlers = {
    good: clickHandler(goodCounter, setGoodCounter),
    neutral: clickHandler(neutralCounter, setNeutralCounter),
    bad: clickHandler(badCounter, setBadCounter)
  };

  const counters = {
    good: goodCounter,
    neutral: neutralCounter,
    bad: badCounter
  };

  return (
    <div>
      <Feedback handlers={handlers} />
      <Statistics counters={counters} />
    </div>
  );
}

export default App;
