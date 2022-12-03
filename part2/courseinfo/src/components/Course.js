const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <p><strong> total of {total} exercises</strong></p>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      )}    
    </div>
  )
}

export default Course;