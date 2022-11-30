const Header = (props) => (
  <h2>{props.course}</h2>
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

const Total = ({ parts }) => (
  <p>
    <strong>total of {parts.reduce((sum, cur) => sum + cur.exercises, 0)} exercises</strong>
  </p>
);

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
