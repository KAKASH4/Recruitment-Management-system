var TypeChoosed;
const signUpButton=document.getElementById('signUp');
const signInButton=document.getElementById('signIn');
const container=document.getElementById('container');
const signinsub=document.getElementById('signinsub');
const signupsub=document.getElementById('signupsub');


signUpButton.addEventListener('click',() =>{
   container.classList.add("right-panel-active");
});
signInButton.addEventListener('click',() =>{
   container.classList.remove("right-panel-active");
});
signinsub.addEventListener('click',(event)=>{
   event.preventDefault();
   validate('signin');
})
signupsub.addEventListener('click',(event)=>{
   event.preventDefault();
   validate('signup');
})


function seterror(id,error)
{
   var element=document.getElementById(id);
   element.innerHTML=error;
}

function cleanerror(id)
{
   var element=document.getElementById(id);
   element.innerHTML="";
}
async function validate(sign)
{
   
   console.log(sign)
   var retval=true;
   if(sign==="signin")
   {
      TypeChoosed=document.forms["signinform"]["logintype1"].value;
      console.log(TypeChoosed);
      var retval1=true;
      var signinemail=document.forms["signinform"]["signinemail"].value;
      console.log(signinemail);
      var desiredending="rvce.edu.in";
      var regex=new RegExp(`^[a-zA-Z0-9._-]+@${desiredending}$`);
      console.log(regex);
      retval1=regex.test(signinemail);
      console.log(retval1);
      if(!retval1)
      seterror("trigerroremailsignin","*email should end with rvce.edu.in!");
      else
      {
         cleanerror("trigerroremailsignin");
      }
      var retval2=true;
      var signinpass=document.forms["signinform"]["signinpass"].value;
      console.log(signinpass);
      let check1=false,check2=false;
      for(let i=0;i<signinpass.length;i++)
      {
        if(signinpass[i]>='A' && signinpass[i] <='Z')
        {
             check1=true;
        }
        if(signinpass[i]>='0' && signinpass[i] <='9')
        {
            check2=true;
        }
      }
      if(check1==false || check2==false)
      {
         retval2=false;
         seterror("trigerrorpasssignin","*must have atleast one uppercase letter and one number!")
      }
      else
      {
         cleanerror("trigerrorpasssignin");
      }
      retval=retval1 && retval2; 
      if (retval) {

         var data = {
             typechoose: TypeChoosed,
             signinemail: signinemail,
             password: signinpass,
         };

         var reqoptions = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         };

         try {
            const response = await fetch('/signincheck', reqoptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const responseData = await response.json();
            if(responseData=="INCORRECT PASSWORD")
            {
               alert("INCORRECT CREDENTIALS");
               window.location.replace("/login");
            }
            else{
            console.log(responseData); // Handle JSON response
            if (responseData.redirect) {
                    window.location.href = responseData.redirect; // Redirect user
            }}
        } catch (error) {
            console.error('Error:', error);
        }
     }
 
   }
   else
   {
      TypeChoosed=document.forms["signupform"]["logintype"].value;
      console.log(TypeChoosed);
      var retval1=true;
      var signupemail=document.forms["signupform"]["signupemail"].value;
      console.log(signupemail);
      var desiredending="rvce.edu.in";
      var regex=new RegExp(`^[a-zA-Z0-9._-]+@${desiredending}$`);
      retval1=regex.test(signupemail);
      console.log(retval1);
      if(!retval1)
      seterror("trigerroremail","*email should end with rvce.edu.in!");
      else
      {
         cleanerror("trigerroremail");
      }
      var retval2=true;
      var signuppass=document.forms["signupform"]["signuppass"].value;
      console.log(signuppass);
      let check1=false,check2=false;
      for(let i=0;i<signuppass.length;i++)
      {
        if(signuppass[i]>='A' && signuppass[i] <='Z')
        {
             check1=true;
        }
        if(signuppass[i]>='0' && signuppass[i] <='9')
        {
            check2=true;
        }
      }
      if(check1==false || check2==false)
      {
         retval2=false;
         seterror("trigerrorpass","*must have atleast one uppercase letter and one number!")
      }
      else
      {
         cleanerror("trigerrorpass");
      }

      var retval3=true;
      var signupname=document.forms["signupform"]["signupname"].value;
      console.log(signupname);
      var regex=new RegExp(`^[a-zA-Z ]+$`);
      console.log(regex);
      retval3=regex.test(signupname);
      console.log(retval3);
      if(!retval3)
      {
         seterror("trigerrorname","*name should have only alphabets!!!!!");
      }
      else
      {
         cleanerror("trigerrorname");
      }
     retval = retval1 && retval2 && retval3; 
      
   console.log(retval);
   if (retval) {

      var data = {
          typechoose: TypeChoosed,
          signupemail: signupemail,
          password: signuppass,
          name:signupname
      };

      var reqoptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      };

      try {
         const response = await fetch('/signupsubmit', reqoptions);
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const responseData = await response.json();
         console.log(responseData); // Handle JSON response
         if (responseData.redirect) {
                 window.location.href = responseData.redirect; // Redirect user
         }
     } catch (error) {
         console.error('Error:', error);
     }
  }
}
   return retval;
}




