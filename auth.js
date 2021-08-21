var signup_submit=document.getElementById("signup-submit");

const login_submit=document.getElementById("login-submit");
const reset_signup=document.getElementById("signup-reset");
const reset_login=document.getElementById("login-reset");
function changeStatus(){
  auth.onAuthStateChanged(user=>{
    if(user){
      const loggedoutmessage=`
      <p style="color: red; font-size:25px; text-align: center; margin-top: 50px; font-weight: 900; ">Logged out successfully</p>
       `;
      document.getElementById("login-Signup-Container").innerHTML=loggedoutmessage;
       return true;
    }
    else{
      return false;
    }
    
});

}

function signout(){
  if(changeStatus())auth.signOut();
 
};
function get_gender(){
  const male=document.getElementById('male');
    const female=document.getElementById('female');
    
    if(male.value==='male')return "male";
    else if(female.value==="female")return "female";
    else return "other";
}
document.getElementById('signup-submit').addEventListener('click',e=>{
    e.preventDefault();
    const fname = document.getElementById('fname');
    const username = document.getElementById('username');
    const email = document.getElementById('email').value;
    const sec_pass = document.getElementById("confirm-Password");
    
    const dob=document.getElementById('dob');
    const password=document.getElementById('pass').value;
    if(password!=sec_pass.value){
        alert("Password didn't match..\n Please enter same password");
        return false;
    }
  else{
      auth.createUserWithEmailAndPassword(email,password).then(cred=>{    
            if(confirm("Account created successfully ..\n \t login  to continue")){
              auth.signInWithEmailAndPassword(email,password).then(cred=>{
                const user = auth.currentUser;
                db1.ref('userInfo/'+user.uid).set({
                   fname:document.getElementById('fname').value,
                   username:document.getElementById('username').value,
                   dob:document.getElementById('dob').value,
                   gender:get_gender(),
                },false);
              });
            }
            else{
              auth.signOut();
            }
      }).catch(err=>{
         document.getElementById('err-mess-id').innerHTML='*'+err.message;
      });
  }
   
});
document.getElementById('login-submit').addEventListener('click',(e)=>{
  e.preventDefault();
  const emailLogin=document.getElementById('email1').value;
  const passwordLogin=document.getElementById('pass1').value;
  auth.signInWithEmailAndPassword(emailLogin,passwordLogin).then(cred=>{
     document.getElementById('form-login').reset();
     location.replace("chat-box.html");
  }).catch(err=>{
    if(err.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
      document.getElementById('err-mess-id1').innerHTML="You do not have an account. Please create one to continue";
    }
    else if(err.message=="The password is invalid or the user does not have a password."){
      document.getElementById('err-mess-id1').innerHTML="Wrong Password";
    }
    else{
      document.getElementById('err-mess-id1').innerHTML='*'+err.message;
      
    }
    document.getElementById('form-login').reset();
  });
});

