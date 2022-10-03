const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ course }) => <p>{course.name} {course.exercises}</p>

const Content = (App) => {
  return (
    <div>
      <Part course={App.course.parts[0]}/>
      <Part course={App.course.parts[1]}/>
      <Part course={App.course.parts[2]}/>
    </div>
  )
}

const Total = ({ course }) => {
  return (
    <p>Number of exercises {course.parts[0].exercises + 
      course.parts[1].exercises + course.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamental of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App;
