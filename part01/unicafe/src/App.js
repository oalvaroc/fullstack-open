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

const StatsRow = (props) => <p>{props.name} {props.value}</p>

const StatsSection = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <StatsRow name="good" value={props.stats.good} />
      <StatsRow name="neutral" value={props.stats.neutral} />
      <StatsRow name="bad" value={props.stats.bad} />
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

  const stats = {
    good: goodCounter,
    neutral: neutralCounter,
    bad: badCounter
  };

  return (
    <div>
      <FeedbackSection handlers={handlers} />
      <StatsSection stats={stats} />
    </div>
  );
}

export default App;
