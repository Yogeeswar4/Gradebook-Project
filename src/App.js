import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialStudents = [
    {
      name: 'John Doe',
      ticketNumber: 'T123',
      ratingGrade: 8,
      examGrade: 7,
    },
    {
      name: 'Jane Smith',
      ticketNumber: 'T456',
      ratingGrade: 5,
      examGrade: 6,
    },
    {
      name: 'Alice Johnson',
      ticketNumber: 'T789',
      ratingGrade: 2,
      examGrade: 3,
    },
    {
      name: 'Bob Brown',
      ticketNumber: 'T101',
      ratingGrade: 6,
      examGrade: 7,
    },
    {
      name: 'Emily Davis',
      ticketNumber: 'T111',
      ratingGrade: 2,
      examGrade: 1,
    },
    {
      name: 'Michael Wilson',
      ticketNumber: 'T222',
      ratingGrade: 8,
      examGrade: 9,
    },
    {
      name: 'Sophia Martinez',
      ticketNumber: 'T333',
      ratingGrade: 7,
      examGrade: 5,
    },
    {
      name: 'Daniel Anderson',
      ticketNumber: 'T444',
      ratingGrade: 3,
      examGrade: 2,
    },
    {
      name: 'Olivia Thomas',
      ticketNumber: 'T555',
      ratingGrade: 7,
      examGrade: 8,
    }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [showStatistics, setShowStatistics] = useState(false);
  const [statistics, setStatistics] = useState(null);
  const [showOption, setShowOption] = useState('all'); // 'all', 'passed', or 'failed'
  const [sortOption, setSortOption] = useState('none'); // 'none', 'alphabetical', 'gradeAsc', or 'gradeDesc'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const sortStudents = (studentsToSort, option) => {
    switch (option) {
      case 'alphabetical':
        return studentsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'gradeAsc':
        return studentsToSort.sort((a, b) => a.finalGrade - b.finalGrade);
      case 'gradeDesc':
        return studentsToSort.sort((a, b) => b.finalGrade - a.finalGrade);
      default:
        return studentsToSort;
    }
  };

  useEffect(() => {
    // Calculate final grades and update student list
    const updatedStudents = students.map(student => {
      const finalGrade = parseFloat((0.6 * parseFloat(student.examGrade) + 0.4 * parseFloat(student.ratingGrade)).toFixed(2));
      const status = finalGrade >= 4 ? "Passed" : "Failed";
      return { ...student, finalGrade, status };
    });
    setStudents(updatedStudents);
  }, []);

  useEffect(() => {
    // Filter students based on the entered name and selected show option
    let filteredList = students.filter(student => student.name.toLowerCase().includes(nameFilter.toLowerCase()));
    if (showOption === 'passed') {
      filteredList = filteredList.filter(student => student.status === 'Passed');
    } else if (showOption === 'failed') {
      filteredList = filteredList.filter(student => student.status === 'Failed');
    }

    // Sort the filtered students based on the selected sort option
    const sortedList = sortStudents(filteredList, sortOption);

    setFilteredStudents(sortedList);
  }, [nameFilter, students, showOption, sortOption]);

  useEffect(() => {
    // Calculate statistics
    const totalStudents = students.length;
    const grades = students.map(student => student.finalGrade);
    const averageGrade = totalStudents > 0 ? (grades.reduce((total, grade) => total + grade, 0) / totalStudents).toFixed(2) : 0;
    const maxGrade = Math.max(...grades);
    const minGrade = Math.min(...grades);
    const passedStudents = students.filter(student => student.status === 'Passed').length;
    const failedStudents = totalStudents - passedStudents;

    // Count the number of students that received a certain grade
    const gradeCounts = {};
    grades.forEach(grade => {
      const count = gradeCounts[grade] || 0;
      gradeCounts[grade] = count + 1;
    });

    setStatistics({
      totalStudents,
      averageGrade,
      maxGrade,
      minGrade,
      passedStudents,
      failedStudents,
      gradeCounts
    });
  }, [students]);

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const ticketNumber = formData.get('ticketNumber');
    const ratingGrade = parseFloat(formData.get('ratingGrade'));
    const examGrade = parseFloat(formData.get('examGrade'));
    const finalGrade = parseFloat((0.6 * examGrade + 0.4 * ratingGrade).toFixed(2));
    const status = finalGrade >= 4 ? "Passed" : "Failed";
    const newStudent = {
      name,
      ticketNumber,
      ratingGrade,
      examGrade,
      finalGrade,
      status
    };
    addStudent(newStudent);
    event.target.reset(); // Reset form fields
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
    setSelectedStudent(null); // Reset selected student when toggling statistics
  };

  const handleShowOptionChange = (option) => {
    setShowOption(option);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleRowClick = (index) => {
    setSelectedStudent(index);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="exam-header">
  <h1>Exam Information</h1>
  <div className="exam-details">
    <p><strong>Date:</strong> 06/04/24</p>
    <p><strong>Professor's Name:</strong>M Jogendra Kumar</p>
    <p><strong>College:</strong> KL University</p>
    <p><strong>Department:</strong> Btech</p>
    <p><strong>Semester:</strong> Even</p>
  </div>
</header>

      {/* Main block */}
      <main>
        {/* Input form for adding new student data */}
        <form onSubmit={handleSubmit} id="studentForm">
          <input type="text" placeholder="Name" name="name" required />
          <input type="text" placeholder="Ticket's Number" name="ticketNumber" required />
          <input type="number" placeholder="Rating Grade" name="ratingGrade" min="0" max="100" required />
          <input type="number" placeholder="Exam Grade" name="examGrade" min="0" max="100" required />
          <button type="submit">Add Student</button>
        </form>

        {/* Options for showing and sorting */}
        <div className="options">
          <div>
            <label>Show:</label>
            <select value={showOption} onChange={(e) => handleShowOptionChange(e.target.value)}>
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label>Sort:</label>
            <select value={sortOption} onChange={(e) => handleSortOptionChange(e.target.value)}>
              <option value="none">None</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="gradeAsc">Grade (Asc)</option>
              <option value="gradeDesc">Grade (Desc)</option>
            </select>
          </div>
        </div>

        {/* Table to display student data */}
        <table id="studentTable">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Ticket's Number</th>
              <th>Rating Grade</th>
              <th>Exam Grade</th>
              <th>Final Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} onClick={() => handleRowClick(index)} className={selectedStudent === index ? 'selected' : ''}>
                <td>{index + 1}</td>
                <td>{selectedStudent === index ? student.name.toUpperCase() : student.name}</td>
                <td>{student.ticketNumber}</td>
                <td>{student.ratingGrade}</td>
                <td>{student.examGrade}</td>
                <td>{student.finalGrade}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginBottom: '50px' }}></div> {/* Adding space with margin */}

        {/* Show statistics button */}
        <button id="showStatisticsBtn" onClick={toggleStatistics}>
          {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
        </button>
      </main>

      {/* Statistics block */}
      {showStatistics && (
        <div id="statisticsBlock" className="statistics-block">
          <h2>Statistics</h2>
          <table>
            <tbody>
              <tr>
                <td>Total Students:</td>
                <td>{statistics.totalStudents}</td>
              </tr>
              <tr>
                <td>Average Grade:</td>
                <td>{statistics.averageGrade}</td>
              </tr>
              <tr>
                <td>Maximum Grade:</td>
                <td>{statistics.maxGrade}</td>
              </tr>
              <tr>
                <td>Minimum Grade:</td>
                <td>{statistics.minGrade}</td>
              </tr>
              <tr>
                <td>Passed Students:</td>
                <td>{statistics.passedStudents}</td>
              </tr>
              <tr>
                <td>Failed Students:</td>
                <td>{statistics.failedStudents}</td>
              </tr>
              <tr>
                <td>Grade Distribution:</td>
                <td>
                  <ul>
                    {Object.entries(statistics.gradeCounts).map(([grade, count]) => (
                      <li key={grade}>{grade}: {count}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
    </div>
  );
}

export default App;
