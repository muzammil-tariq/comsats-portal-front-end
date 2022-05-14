import axios from "axios";

const API_URL = "http://localhost:8000/api";
const token = localStorage.getItem("token");
const id = localStorage.getItem("facultyId");

// http://localhost:8000/api/template/all
// Asynchronous thunk action
// getting all templates
export async function getStudents() {
  try {
    const data = await axios.get(`${API_URL}/faculty_student_relationship/get/${id}`, {
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
    debugger;
    const data = await axios.post(`${API_URL}/faculty_student_relationship/create`, {
      payload: { students },
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
// export async function deleteStudents(students: any) {
//   try {
//     const data = await axios.delete(`${API_URL}/faculty_student_relationship/delete/${id}`, {
//       students,
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }
