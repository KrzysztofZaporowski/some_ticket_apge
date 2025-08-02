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

// Text inputs
const fname = document.getElementById('fname');
const email = document.getElementById('email');
const githubName = document.getElementById('github');


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
})

function updateImagePreview(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const dataImage = e.target.result;
        uploadImg.src = dataImage;
        localStorage.setItem('profile-img', dataImage);
        controls.classList.remove('hidden');
        uploadInfo.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

