const chatData= document.getElementById('chat');
function get_time_now(){
    const date = new Date();
    var hours = date.getHours();
    var endd="AM";
    if(hours>=12)endd="PM";
    if(hours>=13)hours-=12;
    var hr = hours.toString();
    if(hr.length<2)hr='0'+hr;
    var   mins = date.getMinutes().toString();
    if(mins.length<2)mins='0'+mins;
    var timeNow= hr+":"+mins+" "+endd;
    return timeNow;
}
function getName(){
    const user = auth.currentUser;
    var nameoftheuser="";
    db1.ref('userInfo/'+user.uid).on('value',function(snapshot){
        nameoftheuser= snapshot.val().fname;
    });
    return nameoftheuser;
}

db1.ref('chats').on("child_added",function(snapshot){
    const user = auth.currentUser;
    if(user)
    { getName();
     let html='';
     db1.ref('chats').on('value',function(snapshot){
         snapshot.forEach(element => {
             if(element.val().email===user.email){
                 const currdata=`
                 <div class="scale">
                 <div class="dialogue-box1">
                     <div class="chat-text1">
                         <div class="message-container1">
                            <div class="text1">${element.val().message}</div>
                            <div class="time1"><p>${element.val().time}</p></div>
                         </div>
                    
                     </div>
                 </div>
             </div>
                 `;
                 html+=currdata;
             }
             else{
                 const currdata=`
                 <div class="scale">
                 <div class="dialogue-box">
                     <div class="chat-text">
                         <div class="nameOfSender">${getName()}</div>
                         <div class="message-container">
                            <div class="text">${element.val().message}</div>
                            <div class="time"><p>${element.val().time}</p></div>
                         </div>
                    
                     </div>
                 </div>
             </div>
                 `;
                 html+=currdata;
             }
             
         });
         chatData.innerHTML=html;
     });}
});
function signout(){
    const loggedoutmessage=`
    <p style="color: red; font-size:25px; text-align: center; margin-top: 50px; font-weight: 900;margin-left:33%; ">Logged out successfully</p>
     `;
    document.getElementById("container").innerHTML=loggedoutmessage;
  auth.signOut(); 
  };
function sendMessage(){
    const currdata=document.getElementById('input-data').value;
    const user = auth.currentUser;
    if(user){const messageCurr=`
    <div class="chat-text"> ${currdata}</div>
      `;
      const time = new Date();
     db1.ref('chats').push({
         message:messageCurr,
         time:get_time_now(),
         email:user.email,
     });
   }
}

document.getElementById('btn').addEventListener('click',e=>{
    if(document.getElementById('input-data').value!=""){
        sendMessage();
        document.getElementById('chat').scrollTo(0,document.getElementById('chat').scrollHeight);
    
         document.getElementById('input-data').value="";
    }
});
document.getElementById('input-data').addEventListener('keypress',function(event){
   if(event.key==='Enter'){
       document.getElementById('btn').click();
   }
});