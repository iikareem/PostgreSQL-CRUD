const getStudent = 'SELECT * FROM students ORDER BY id';
const getStudentID = "SELECT * FROM students WHERE id = $1";
const checkEmailExits = "SELECT COUNT(email) FROM students WHERE email = $1"
const checkUserExits = "SELECT COUNT(id) FROM students WHERE id = $1"
const deleteUser = "DELETE FROM students WHERE id = $1"
const addStudents = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
let updateStudent = 'UPDATE students SET ';
const ShowGPA = 'SELECT students.name, students.email, grades.gpa FROM grades INNER JOIN students ON students.id = grades.student_id';


module.exports = {
    getStudent,
    getStudentID,
    checkEmailExits,
    checkUserExits,
    addStudents,
    deleteUser,
    updateStudent,
    ShowGPA

};