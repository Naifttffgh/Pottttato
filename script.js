import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// إعداداتك الخاصة (Firebase Config)
const firebaseConfig = {
    apiKey: "AIzaSyDeH8mGWwnR7exOP81TJYUKs-rUm-E2A-o",
    authDomain: "pottttato-855f1.firebaseapp.com",
    projectId: "pottttato-855f1",
    storageBucket: "pottttato-855f1.firebasestorage.app",
    messagingSenderId: "858248261142",
    appId: "1:858248261142:web:21c6c7173c09dfe3d78f37",
    measurementId: "G-QXSL9WQQM5"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const videoCol = collection(db, "potatoVideos");

// الباسوردات
const SECRET_PASS = "البطاطس سخانه خالص";
const ADMIN_DELETE_PASS = "البطاطس بارده خالص";

// --- الدوال والتحكم بالأحداث ---

// تسجيل الدخول
document.getElementById('loginBtn').onclick = () => {
    const input = document.getElementById('passwordInput').value;
    if (input === SECRET_PASS) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        loadSavedVideos(); 
    } else {
        alert("الهكر ممنوع! الباسورد غلط 🙃");
    }
};

// فتح وإغلاق لوحة التحكم
const toggleAdmin = () => {
    const panel = document.getElementById('adminPanel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
};
document.getElementById('openAdminBtn').onclick = toggleAdmin;
document.getElementById('closeAdminBtn').onclick = toggleAdmin;

// إضافة فيديو للسحاب
document.getElementById('addVideoBtn').onclick = async () => {
    const url = document.getElementById('videoUrlInput').value;
    if (url.trim() !== "") {
        await addDoc(videoCol, { url: url, createdAt: new Date() });
        document.getElementById('videoUrlInput').value = '';
        toggleAdmin();
    } else {
        alert("حط رابط فيديو يا بطل!");
    }
};

// تحميل وعرض الفيديوهات (لحظياً)
function loadSavedVideos() {
    const q = query(videoCol, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const grid = document.getElementById('videoGrid');
        grid.innerHTML = ''; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            displayVideo(data.url, doc.id);
        });
    });
}

function displayVideo(url, id) {
    const grid = document.getElementById('videoGrid');
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <video src="${url}" controls></video>
        <p style="color: #888; font-size: 14px;">مخزن سحابي آمن ✅</p>
        <button id="del-${id}" style="background: #ff4444; margin-top: 10px; width: auto; padding: 5px 15px; font-size: 12px;">حذف للفيديو 🗑️</button>
    `;
    grid.appendChild(card);
    
    // ربط زر الحذف
    document.getElementById(`del-${id}`).onclick = () => deleteVideo(id);
}

// حذف فيديو
async function deleteVideo(docId) {
    const pass = prompt("أدخل باسورد المطور للحذف: 🤫");
    if (pass === ADMIN_DELETE_PASS) {
        await deleteDoc(doc(db, "potatoVideos", docId));
        alert("تم طرده بنجاح!");
    } else {
        alert("غلط!");
    }
}
