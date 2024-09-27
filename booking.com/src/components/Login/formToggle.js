// toggleForms.js
export const initializeFormToggle = () => {
    const container = document.getElementById('containerSignUp');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');
    
    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });
    
    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  };
  