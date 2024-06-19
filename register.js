document.addEventListener('DOMContentLoaded', function(){
document.getElementById("registerform").addEventListener('submit', async function(event){
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;

    if(password !== confirmpassword){
        alert("Passwords do not match")
    }

    try{
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Access-Control-Allow-Origin':"*",
                'Access-Control-Allow-Headers':"Content-Type"
        },
            body: JSON.stringify({name, email, password})
        });
        const data = await response.json();
        const id = data.unique_id;
        localStorage.setItem("id", id);
        alert("User registered Successfully");
        window.location.href = 'register_child.html';
    }
    catch(error)
    {
        console.error('Error registering User: ', error.message);
        alert('Failed to register User');
    }
});


});