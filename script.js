import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// إعدادات Firebase الخاصة بك
const firebaseConfig = {
    apiKey: "AIzaSyDeH8mGWwnR7exOP81TJYUKs-rUm-E2A-o",
    authDomain: "pottttato-855f1.firebaseapp.com",
    projectId: "pottttato-855f1",
    storageBucket: "pottttato-855f1.firebasestorage.app",
    messagingSenderId: "858248261142",
    appId: "1:858248261142:web:21c6c7173c09dfe3d78f37",
    measurementId: "G-QXSL9WQQM5"
};

// تشغيل الفايربيس
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const videoCol = collection(db, "potatoVideos");

const ADMIN_DELETE_PASS = "البطاطس بارده خالص";

// دالة لفتح وإغلاق لوحة الإضافة
const toggleAdmin = () => {
    const panel = document.getElementById('adminPanel');
    panel.style.display = (panel.style.display === 'none') ? 'block' : 'none';
};

document.getElementById('openAdminBtn').onclick = toggleAdmin;
document.getElementById('closeAdminBtn').onclick = toggleAdmin;

// إضافة فيديو جديد للسحاب
document.getElementById('addVideoBtn').onclick = async () => {
    const url = document.getElementById('videoUrlInput').value;
    if (url.trim() !== "") {
        try {
            await addDoc(videoCol, {
                url: url,
                createdAt: serverTimestamp()
            });
            document.getElementById('videoUrlInput').value = '';
            toggleAdmin();
        } catch (e) {
            alert("خطأ في الإضافة: " + e);
        }
    } else {
        alert("حط رابط فيديو أولاً!");
    }
};

// جلب الفيديوهات لحظياً
function loadVideos() {
    const q = query(videoCol, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        const grid = document.getElementById('videoGrid');
        grid.innerHTML = ''; 
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            displayVideo(data.url, docSnap.id);
        });
    });
}

function displayVideo(url, id) {
    const grid = document.getElementById('videoGrid');
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <video src="${url}" controls></video>
        <button id="del-${id}" style="background: #ff4444; margin-top: 10px; width: auto; padding: 5px 15px; font-size: 12px;">حذف 🗑️</button>
    `;
    grid.appendChild(card);
    document.getElementById(`del-${id}`).onclick = () => deleteVideo(id);
}

// حذف فيديو
async function deleteVideo(docId) {
    const pass = prompt("باسورد الحذف للمطور:");
    if (pass === ADMIN_DELETE_PASS) {
        await deleteDoc(doc(db, "potatoVideos", docId));
        alert("تم الحذف بنجاح!");
    } else {
        alert("الباسورد خطأ!");
    }
}

// تشغيل الجلب فور فتح الموقع
loadVideos();
