// import React, { useState, useEffect } from "react";
// import api from "../json-server/api";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBtn,
//   MDBTypography,
// } from "mdb-react-ui-kit";
// export const DashboardProfile = () => {
//   const [users, setUsers] = useState([]);
//   const [events, setEvents] = useState();

//   const fetchDashboard = async (id) => {
//     const events = await api.get(`./events`);
//     const users = await api.get(`./users`);
//     const res_event = events;
//     console.log(res_event);
//     setEvents();
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <>
//       <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
//         <MDBContainer className="py-5 h-100">
//           <MDBRow className="justify-content-center align-items-center h-100">
//             <MDBCol lg="9" xl="7">
//               <MDBCard>
//                 <div
//                   className="rounded-top text-white d-flex flex-row"
//                   style={{ backgroundColor: "#000", height: "200px" }}
//                 >
//                   <div
//                     className="ms-4 mt-5 d-flex flex-column"
//                     style={{ width: "150px" }}
//                   >
//                     <div>
//                       <MDBCardImage
//                         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
//                         alt="Generic placeholder image"
//                         className=" img-thumbnail"
//                         fluid
//                         style={{
//                           width: "150px",
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="ms-3" style={{ marginTop: "130px" }}>
//                     <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
//                     <MDBCardText>New York</MDBCardText>
//                   </div>
//                 </div>
//                 <div
//                   className="p-4 text-black"
//                   style={{ backgroundColor: "#f8f9fa" }}
//                 >
//                   <div
//                     className="d-flex  text-center py-1"
//                     style={{ justifyContent: "space-between" }}
//                   >
//                     <MDBBtn
//                       outline
//                       color="dark"
//                       style={{ height: "36px", overflow: "visible" }}
//                     >
//                       Edit profile
//                     </MDBBtn>

//                     <div>
//                       <MDBCardText className="mb-1 h5">3</MDBCardText>
//                       <MDBCardText className="small text-muted mb-0">
//                         Event
//                       </MDBCardText>
//                     </div>
//                     <div></div>
//                     <div></div>
//                   </div>
//                 </div>
//                 <MDBCardBody className="text-black p-4">
//                   <div className="mb-5">
//                     <p className="lead fw-normal mb-1">About</p>
//                     <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
//                       <MDBCardText className="font-italic mb-1">
//                         Web Developer
//                       </MDBCardText>
//                       <MDBCardText className="font-italic mb-1">
//                         Lives in New York
//                       </MDBCardText>
//                       <MDBCardText className="font-italic mb-0">
//                         Photographer
//                       </MDBCardText>
//                     </div>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mb-4">
//                     <MDBCardText className="lead fw-normal mb-0">
//                       Recent photos
//                     </MDBCardText>
//                     <MDBCardText className="mb-0">
//                       <a href="#!" className="text-muted">
//                         Show all
//                       </a>
//                     </MDBCardText>
//                   </div>
//                   <MDBRow>{}</MDBRow>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     </>
//   );
// };
