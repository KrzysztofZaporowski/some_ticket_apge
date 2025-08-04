const uploadImg = document.getElementById('upload-img');
const dropZone = document.querySelector('.drop-zone');
const fileInput = document.getElementById('img-input');
const removeBtn = document.getElementById('remove-btn');
const changeBtn = document.getElementById('change-btn');
const controls = document.querySelector('.remove-change-file');
const uploadInfo = document.querySelector('.drag-drop-info');
const fileInfo = document.querySelector('.file-info');
const infoMsg = document.getElementById('info-msg');
const submitBtn = document.querySelector('.submit-btn')
const defaultUploadImg = './assets/images/icon-upload.svg';
const inputs = document.querySelectorAll('.input');
const form = document.querySelector('form');
const bottomLines = document.getElementById('line-bottom');

// Text inputs
const fname = document.getElementById('fname');
const email = document.getElementById('email');
const githubName = document.getElementById('github');

// Drag and drop 
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    updateImagePreview(fileInput.files[0]);
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const maxSize = 500 * 1024;

    if (file) {
        const isVaildSize = file.size <= maxSize;

        if (!isVaildSize) {
            fileInfo.classList.add('error');
            infoMsg.textContent = 'File too large. Please upload a photo under 500KB.';
            fileInput.value = '';
            return;
        }

        fileInfo.classList.remove('error');
        infoMsg.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
        updateImagePreview(file);
    }
});

changeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    uploadImg.src = defaultUploadImg;
    fileInput.value = '';
    controls.classList.add('hidden');
    uploadInfo.classList.remove('hidden');
    fileInfo.classList.remove('error');
    infoMsg.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
});

function updateImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadImg.src = e.target.result;
        controls.classList.remove('hidden');
        uploadInfo.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

function setError(element, message) {
    const parent = element.closest('.input');
    parent.classList.add('error');
    const errorDisplay = parent.querySelector('.error-info');

    if (errorDisplay) {
        const paragraph = errorDisplay.querySelector('p');
        paragraph.textContent = message;
        errorDisplay.classList.remove('hidden')
    }
}

function clearError(element) {
    const parent = element.closest('.input');
    parent.classList.remove('error');
    const errorDisplay = parent.querySelector('.error-info');

    if (errorDisplay) {
        const paragraph = errorDisplay.querySelector('p');
        paragraph.textContent = '';
        errorDisplay.classList.add('hidden');
    }
}

fname.addEventListener('change', () => {
    const firstName = fname.value.trim();
    if(firstName === '') {
        setError(fname, 'Please enter your name.');
    } else {
        clearError(fname);
    }
});

email.addEventListener('change', () => {
    const userEmail = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        setError(email, 'Please enter a vaild email address.');
    } else {
        clearError(email);
    }
});

githubName.addEventListener('change', () => {
    const userGithub = githubName.value.trim();
    const githubRegex = /^@[\w.-]+$/;
    if (!githubRegex.test(userGithub)) {
        setError(githubName, 'Please enter vaild GitHub name.');
    } else {
        clearError(githubName);
    }
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allValid = Array.from(inputs).every(div => !div.classList.contains('error'));

    if (!allValid || fileInput.value === '') {
        return;
    } else {
        const userData = {
            name: fname.value,
            email: email.value,
            github: githubName.value,
            image: uploadImg.src
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        form.submit();
    }
})

function updateImage() {
    if (window.matchMedia('(max-width: 1024px)').matches) {
        bottomLines.src = './assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg';
    } else {
        bottomLines.src = './assets/images/pattern-squiggly-line-bottom-desktop.svg';
    }
}

window.addEventListener('DOMContentLoaded', updateImage);
window.addEventListener('resize', updateImage);