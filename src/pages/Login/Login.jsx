import React, { useState } from 'react'
import "./Login.css"
import Logo from '../../assets/logo.png'
import {login , signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);
    if(signState==="Sign In"){
      await login(email, password);
    }
    else{
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
       <img src={Logo} alt="" />
       <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder='Your Name'/>:<></>}
          <input value={email}  onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='Email'/>
          <input  value={password}  onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='Password'/>
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type='checkbox'/>
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help ?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState==="Sign In" ?<p>New to Netflix ? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:<p>Already have account ? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
         
        </div>
       </div>
    </div>
  )
}

export default Login





// import React, { useState } from 'react';
// import "./Login.css";
// import Logo from '../../assets/logo.png';
// import { login, signup } from '../../firebase';
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [signState, setSignState] = useState("Sign In");

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (signState === "Sign Up") {
//         if (!name) {
//           alert("Please enter your name");
//           return;
//         }
//         await signup(name, email, password);
//       } else {
//         await login(email, password);
//       }

      
//       navigate("/");

//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div className='login'>
//       <img src={Logo} alt="logo" />

//       <div className="login-form">
//         <h1>{signState}</h1>
//         <form onSubmit={handleSubmit}>
          
//           {signState === "Sign Up" && (
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit">{signState}</button>

//           <div className="form-help">
//             <div className="remember">
//               <input type="checkbox" />
//               <label>Remember Me</label>
//             </div>
//             <p>Need Help?</p>
//           </div>
//         </form>

//         <div className="form-switch">
//           {signState === "Sign In" ? (
//             <p>
//               New to Netflix?{" "}
//               <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{" "}
//               <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
