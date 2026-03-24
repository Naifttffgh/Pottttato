// بيانات جيش البطاطس
const superpotata = "البطاطس سخانه خالص";
const myCloudName = 'dzxjmcosr';
const myUploadPreset = 'Fabdaefc-30bb-4e14-bc70-1bf70400918f';

// التحقق من الباسورد
function checkPassword() {
    const input = document.getElementById('passInput').value;
    if (input === superpotata) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'block';
    } else {
        alert("البطاطس باردة.. الباسورد غلط 🙂");
    }
}

// الدخول للمخزن
function enterVault() {
    const user = document.getElementById('userInput').value;
    if (user.length > 2) {
        document.getElementById('step2').style.display = 'none';
        document.getElementById('step3').style.display = 'block';
        document.getElementById('welcomeUser').innerText = "مخزن " + user;
        
        // توليد مسار عشوائي (رقم سري)
        const rand = Math.random().toString(36).substring(2, 10);
        document.getElementById('randomPath').innerText = "/" + rand;
    } else {
        alert("اكتب اسم حسابك بالانجليزي 🙂");
    }
}

// إعداد أداة الرفع Cloudinary
var myWidget = cloudinary.createUploadWidget({
    cloudName: myCloudName, 
    uploadPreset: myUploadPreset
}, (error, result) => { 
    if (!error && result && result.event === "success") { 
        const videoGrid = document.getElementById('videoGrid');
        const videoHtml = `
            <div class="video-card">
                <video src="${result.info.secure_url}" controls></video>
                <p style="font-size:12px; color:#aaa;">تم الرفع بنجاح ✅</p>
            </div>`;
        videoGrid.innerHTML += videoHtml;
    }
});

// فتح نافذة الرفع عند الضغط
document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
}, false);
