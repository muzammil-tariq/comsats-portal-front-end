import axios from "axios";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");
const id = localStorage.getItem("facultyId");

// http://localhost:8000/api/template/all
// Asynchronous thunk action
// getting all templates
export async function getStudents(facId?: any) {
  try {
    let facultyId = id;
    if (facId) facultyId = facId;
    const data = await axios.get(`${API_URL}/faculty_student_relationship/get/${facultyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function addStudents(students: any[]) {
  try {
    const data = await axios.post(`${API_URL}/faculty_student_relationship/create`, students, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteStudents(students: any) {
  try {
    const data = await axios.post(
      `${API_URL}/faculty_student_relationship/delete/${id}`,
      students,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
