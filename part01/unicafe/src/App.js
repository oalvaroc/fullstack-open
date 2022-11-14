import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.name}</button>;

const FeedbackSection = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" onClick={props.handlers.good}/>
      <Button name="neutral" onClick={props.handlers.neutral}/>
      <Button name="bad" onClick={props.handlers.bad}/>
    </div>
  );
}

const StatsRow = (props) => <div>{props.name} {props.value}</div>

const StatsSection = (props) => {
  const sum = () => props.counters.good + props.counters.neutral + props.counters.bad;
  const average = () => (props.counters.good - props.counters.bad) / sum();
  const positive = () => 100 * props.counters.good / sum();

  return (
    <div>
      <h1>statistics</h1>
      <StatsRow name="good" value={props.counters.good} />
      <StatsRow name="neutral" value={props.counters.neutral} />
      <StatsRow name="bad" value={props.counters.bad} />
      <StatsRow name="all" value={sum()} />
      <StatsRow name="average" value={average()} />
      <StatsRow name="positive" value={positive() + ' %'} />
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
      <FeedbackSection handlers={handlers} />
      <StatsSection counters={counters} />
    </div>
  );
}

export default App;
