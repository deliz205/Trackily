document.addEventListener('DOMContentLoaded', function() {
document.getElementById('loginform').addEventListener('submit', async function(event) 
{
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':"*",
          'Access-Control-Allow-Headers':"Content-Type"
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      
      const data = await response.json();
      const token = data.token;
      
      // Store JWT token in local storage
      localStorage.setItem('token', token);
      
      alert('Logged in successfully');
      window.location.href = 'location.html';
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Failed to login');
    }
});
});