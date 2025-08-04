const metaData = JSON.parse(localStorage.getItem('userData'));
const welcomeSection = document.querySelector('.welcome');
const emailSection = document.querySelector('.email-info');
const userImage = document.querySelector('.user-img');
const userName = document.querySelector('.name');
const userGithub = document.querySelector('.github-name');
const right = document.querySelector('.right');
const number = Math.floor(Math.random() * 100000);

if (metaData && welcomeSection && emailSection && userImage && userName && userGithub && right) {
  welcomeSection.innerHTML = `
    <h1>Congrats, <span id="name">${metaData.name}</span>!</h1>
    <h1>Your ticket is ready.</h1>
  `;

  emailSection.innerHTML = `
    We've emailed your ticket to <span id="mail">${metaData.email}</span> and will send updates in the run up to the event.
  `;

  userImage.innerHTML = `
    <img src="${metaData.image}" alt="user-img">
  `;

  userName.innerHTML = `
    ${metaData.name}
  `;

  userGithub.innerHTML = `
    <img src="./assets/images/icon-github.svg" alt="github-icon">
    ${metaData.github}
  `;

  right.innerHTML = `
    <span id="number">#${number.toString().padStart(5, '0')}</span>
  `;

} else {
  console.warn("Brakuje danych lub któregoś z elementów HTML.");
}


