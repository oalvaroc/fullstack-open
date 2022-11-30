const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    { parts.map((part) => <Part key={part.id} part={part} />) }
  </div>
);

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        id: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        id: 2,
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        id: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return <Course course={course} />;
}

export default App;
