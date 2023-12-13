// import axios from "axios";
// import { URL_PREFIX } from "../config";

// export async function newUserCall(dispatch, receivedData) {
//   var { actionType, ...data } = receivedData;
//   axios
//     .post("https://localhost:9000/user/signup", data)
//     .then((response) => {
//       console.log("response new ", response);
//       if (response.status === 200) {
//         dispatch({
//           type: actionType,
//           payload: { signup: true, signupMessage: "Signup Successful" },
//         });
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: actionType,
//         payload: {
//           signup: false,
//           signupMessage: "Please enter valid credentials",
//         },
//       });
//     });
// }

// export function loginUser(username, email, password) {
//   //api
//   //localStorage.setItem("username", username);
//   //localStorage.setItem("userId", );
//   var { actionType, ...data } = receivedData;
//   axios
//     .post("https://localhost:9000/user/login", data)
//     .then((response) => {
//       console.log("response new ", response);
//       if (response.status === 200) {
//         dispatch({
//           type: actionType,
//           payload: { signup: true, signupMessage: "Signup Successful" },
//         });
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: actionType,
//         payload: {
//           signup: false,
//           signupMessage: "Please enter valid credentials",
//         },
//       });
//     });
//   window.location = "/";
// }
