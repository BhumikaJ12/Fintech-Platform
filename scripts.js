document.addEventListener('DOMContentLoaded', function() {
  const mainContent = document.getElementById('main-content');
  const registerButton = document.getElementById('register-button');
  const loginButton = document.getElementById('login-button');

  registerButton.addEventListener('click', function() {
    mainContent.innerHTML = `
    <div id="register-form-container">
      <form id="register-form">
        <h2>Register</h2>
        <label for="register-username">Username:</label>
        <input type="text" id="register-username" class="form-control" required>
        <label for="register-password">Password:</label>
        <input type="password" id="register-password" class="form-control" required>
        <button type="submit" class="btn btn-primary mt-2">Register</button>
      </form>              
    </div>
    `;

   // Handle Register Form submission
   document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert(`Error: ${errorData.error}`);
      } else {
        const result = await response.json();
        console.log('Success:', result);
        alert('Registration successful');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('A network error occurred');
    }
   });
  })

  loginButton.addEventListener('click', function() {
    mainContent.innerHTML = `
    <div id="login-form-container">
      <form id="login-form">
        <h2>Login</h2>
        <label for="login-username">Username:</label>
        <input type="text" id="login-username" class="form-control" required>
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" class="form-control" required>
        <button type="submit" class="btn btn-primary mt-2">Login</button>
      </form>                        
    </div>
    `;

   // Handle Login Form submission
   document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData.error);
        alert(`Error: ${errorData.error}`);
      } else {
        const result = await response.json();
        console.log('Success:', result);
        alert('Login successful');

        mainContent.innerHTML = `
        <div id="transaction-forms-container">
          <form id="deposit-form">
            <h2>Deposit</h2>
            <label for="deposit-amount">Amount:</label>
            <input type="number" id="deposit-amount" step="0.01" required>
            <button type="submit">Deposit</button>
          </form>
          <form id="withdraw-form">
            <h2>Withdraw</h2>
            <label for="withdraw-amount">Amount:</label>
            <input type="number" id="withdraw-amount" step="0.01" required>
            <button type="submit">Withdraw</button>
          </form>
        </div>
        `;

        // Handle Deposit Form submission
        document.getElementById('deposit-form').addEventListener('submit', async (event) => {
          event.preventDefault();
          
          const amount = document.getElementById('deposit-amount').value;
      
          try {
            const response = await fetch('http://localhost:3000/deposit', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, amount }),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Error:', errorData.error);
              alert(`Error: ${errorData.error}`);
            } else {
              const result = await response.json();
              console.log('Success:', result);
              alert('Deposit successful');
            }
          } catch (error) {
            console.error('Network Error:', error);
            alert('A network error occurred');
          }
        });

        // Handle Withdraw Form submission
        document.getElementById('withdraw-form').addEventListener('submit', async (event) => {
          event.preventDefault();
          
          const amount = document.getElementById('withdraw-amount').value;
      
          try {
            const response = await fetch('http://localhost:3000/withdraw', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, amount }),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              console.error('Error:', errorData.error);
              alert(`Error: ${errorData.error}`);
            } else {
              const result = await response.json();
              console.log('Success:', result);
              alert('Withdrawal successful');
            }
          } catch (error) {
            console.error('Network Error:', error);
            alert('A network error occurred');
          }
        });

      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('A network error occurred');
    }
    });
  })
});
