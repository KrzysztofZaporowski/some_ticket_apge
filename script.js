const userData = document.querySelector('.userData');
const metaData = JSON.parse(localStorage.getItem('userData'))

userData.textContent = `${metaData.name}, ${metaData.email}, ${metaData.github}`;