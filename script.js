

function sleep(miliseconds){
    return new Promise(resolve =>setTimeout(resolve,miliseconds));
  }
  async function firstVis(statusLogin){
    await sleep(3000);
    if(statusLogin==false){
      location.replace("intro.html");
    }
    else{
      location.replace("login.html");
    }
  }
  
auth.onAuthStateChanged(user=>{
  if(user){
     firstVis(true);
  }
  else{
    firstVis(false);
  }
  
});
