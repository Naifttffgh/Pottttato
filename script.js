// الباسوردات السرية 🤫
const SECRET_PASS = "البطاطس سخانه خالص";
const ADMIN_DELETE_PASS = "البطاطس بارده خالص"; 

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    
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
    
    if (url.trim() !== "") {
        saveVideo(url);
        document.getElementById('videoUrlInput').value = '';
        toggleAdmin();
        location.reload(); // تحديث لعرض الفيديو الجديد بترتيبه الصحيح
    } else {
        alert("حط رابط فيديو (مثلاً من Catbox) يا بطل! 🙃");
    }
}

function displayVideo(url, index) {
    const grid = document.getElementById('videoGrid');
    const card = `
        <div class="video-card">
            <video src="${url}" controls></video>
            <p style="color: #888; font-size: 14px;">تمت الإضافة لجيش البطاطس ✅</p>
            <button onclick="deleteVideoWithAuth(${index})" style="background: #ff4444; margin-top: 10px; width: auto; padding: 5px 15px; font-size: 12px;">حذف للفيديو 🗑️</button>
        </div>`;
    grid.innerHTML += card;
}

function deleteVideoWithAuth(index) {
    const pass = prompt("أدخل باسورد المطور لحذف الفيديو: 🤫");
    
    if (pass === ADMIN_DELETE_PASS) {
        let videos = JSON.parse(localStorage.getItem('potatoVideos')) || [];
        videos.splice(index, 1); // حذف الفيديو المختار
        localStorage.setItem('potatoVideos', JSON.stringify(videos));
        alert("تم طرد الفيديو من المخزن بنجاح! 🔥");
        location.reload(); 
    } else {
        alert("الباسورد غلط! لا تحاول تهكر المخزن يا بطل 🙃");
    }
}

function saveVideo(url) {
    let videos = JSON.parse(localStorage.getItem('potatoVideos')) || [];
    videos.push(url);
    localStorage.setItem('potatoVideos', JSON.stringify(videos));
}

function loadSavedVideos() {
    let videos = JSON.parse(localStorage.getItem('potatoVideos')) || [];
    document.getElementById('videoGrid').innerHTML = ''; // تنظيف الشبكة قبل العرض
    videos.forEach((url, index) => displayVideo(url, index));
}
