document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginform').addEventListener('submit', async function(event) 
    {
        event.preventDefault();
      
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        
        try {
          const response = await fetch('http://localhost:3000/childlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':"*",
              'Access-Control-Allow-Headers':"Content-Type"
            },
            body: JSON.stringify({ name, password })
          });
          
          if (!response.ok) {
            throw new Error('Failed to login');
          }
          
          const data = await response.json();
          const token = data.token;
          
          localStorage.setItem('child_id', data.childid);
          localStorage.setItem('childparent_id', data.parentid);
          
          alert('Logged in successfully');
          window.location.href = 'location.html'; // Redirect to home page or any other page
        } catch (error) {
          console.error('Error logging in:', error.message);
          alert('Failed to login');
        }
    });
    });