// الباسورد بالمسافات - لمصلحتك 🙃
const SECRET_PASS = "البطاطس سخانه خالص"; 

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    
    // التحقق من الباسورد (بدون حذف المسافات)
    if (input === SECRET_PASS) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        loadSavedVideos(); 
    } else {
        alert("الهكر ممنوع! الباسورد غلط 🙃");
    }
}

function toggleAdmin() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
}

function addPotatoVideo() {
    const url = document.getElementById('videoUrlInput').value;
    
    // التأكد أن الرابط ليس فارغاً
    if (url.trim() !== "") {
        displayVideo(url);
        saveVideo(url);
        document.getElementById('videoUrlInput').value = '';
        toggleAdmin(); // إخفاء اللوحة بعد الإضافة
    } else {
        alert("حط رابط فيديو (مثلاً من Catbox) يا بطل! 🙃");
    }
}

function displayVideo(url) {
    const grid = document.getElementById('videoGrid');
    const card = `
        <div class="video-card">
            <video src="${url}" controls></video>
            <p style="color: #888; font-size: 14px;">تمت الإضافة لجيش البطاطس ✅</p>
        </div>`;
    grid.innerHTML += card;
}

function saveVideo(url) {
    let videos = JSON.parse(localStorage.getItem('potatoVideos')) || [];
    videos.push(url);
    localStorage.setItem('potatoVideos', JSON.stringify(videos));
}

function loadSavedVideos() {
    let videos = JSON.parse(localStorage.getItem('potatoVideos')) || [];
    videos.forEach(url => displayVideo(url));
}
