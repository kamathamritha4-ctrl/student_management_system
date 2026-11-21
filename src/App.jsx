
import { useEffect, useState } from 'react';
import Navbar from './components/NavbarComp';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import StudentFormPage from './pages/StudentFormPage';
import './App.css';

const STORAGE_KEY = 'student-management-students';

function App() {
  // Load saved students from localStorage.
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEY);
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  // Keep localStorage synchronized with the students list.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Get the current URL path.
  const path = window.location.pathname;

  // Match URLs such as /edit/123456789.
  const editMatch = path.match(/^\/edit\/([^/]+)$/);

  // Find the student being edited.
  const studentToEdit = editMatch
    ? students.find((student) => student.id === editMatch[1])
    : null;

  // Add a new student.
  function addStudent(studentDetails) {
    const updatedStudents = [
      ...students,
      {
        ...studentDetails,
        id: Date.now().toString(),
      },
    ];

    setStudents(updatedStudents);
    window.location.href = '/students';
  }

  // Update an existing student.
  function updateStudent(updatedStudent) {
    const updatedStudents = students.map((student) =>
      student.id === updatedStudent.id
        ? updatedStudent
        : student
    );

    setStudents(updatedStudents);
    window.location.href = '/students';
  }

  // Delete a student after confirmation.
  function deleteStudent(id) {
    if (window.confirm('Delete this student?')) {
      const updatedStudents = students.filter(
        (student) => student.id !== id
      );

      setStudents(updatedStudents);
    }
  }

  // Display the appropriate page.
  let page;

  if (path === '/students') {
    page = (
      <StudentsPage
        students={students}
        onDelete={deleteStudent}
      />
    );
  } else if (path === '/add-student') {
    page = <StudentFormPage onSave={addStudent} />;
  } else if (editMatch && studentToEdit) {
    page = (
      <StudentFormPage
        student={studentToEdit}
        onSave={updateStudent}
      />
    );
  } else {
    page = <HomePage studentCount={students.length} />;
  }

  // Shared navbar and selected page.
  return (
    <>
      <Navbar />
      {page}
    </>
  );
}

export default App;
