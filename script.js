import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDeH8mGWwnR7exOP81TJYUKs-rUm-E2A-o",
    authDomain: "pottttato-855f1.firebaseapp.com",
    projectId: "pottttato-855f1",
    storageBucket: "pottttato-855f1.firebasestorage.app",
    messagingSenderId: "858248261142",
    appId: "1:858248261142:web:21c6c7173c09dfe3d78f37"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const videoCol = collection(db, "potatoVideos");

// الباسوردات
const SECRET_PASS = "البطاطس سخانه خالص";
const ADMIN_DELETE_PASS = "البطاطس بارده خالص";

// تسجيل الدخول
document.getElementById('loginBtn').addEventListener('click', () => {
    const input = document.getElementById('passwordInput').value;
    if (input === SECRET_PASS) {
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        loadVideos();
    } else { alert("غلط 🙃"); }
});

// فتح وإغلاق اللوحة
const toggleAdmin = () => {
    const panel = document.getElementById('adminPanel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
};
document.getElementById('openAdminBtn').addEventListener('click', toggleAdmin);
document.getElementById('closeAdminBtn').addEventListener('click', toggleAdmin);

// إضافة فيديو
document.getElementById('addVideoBtn').addEventListener('click', async () => {
    const url = document.getElementById('videoUrlInput').value.trim();
    if (url !== "") {
        await addDoc(videoCol, { url: url, createdAt: serverTimestamp() });
        document.getElementById('videoUrlInput').value = '';
        toggleAdmin();
    }
});

// جلب وعرض الفيديوهات للكل
function loadVideos() {
    onSnapshot(query(videoCol, orderBy("createdAt", "desc")), (snapshot) => {
        const grid = document.getElementById('videoGrid');
        grid.innerHTML = ''; 
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const card = document.createElement('div');
            card.className = 'video-card';
            card.innerHTML = `
                <video src="${data.url}" controls></video>
                <button class="del-btn" style="background:#ff4444; color:white; border:none; padding:5px 10px; margin-top:10px; cursor:pointer; border-radius:5px;">حذف 🗑️</button>
            `;
            card.querySelector('.del-btn').onclick = async () => {
                const pass = prompt("باسورد الحذف:");
                if (pass === ADMIN_DELETE_PASS) {
                    await deleteDoc(doc(db, "potatoVideos", docSnap.id));
                }
            };
            grid.appendChild(card);
        });
    });
}
