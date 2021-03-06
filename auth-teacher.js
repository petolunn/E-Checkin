//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    }
});

//signup
const signupForm = document.querySelector('#registerForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var status = true;

    //get user info
    var fname = document.querySelector("#firstname").value;
    if (isNaN(fname) && fname.length > 1){
        const firstName = signupForm['firstname'].value;
    }else {
        alert("กรุณากรอกชื่อจริงให้ถูกต้อง");
        e.preventDefault();
        status = false;
    }

    var lname = document.querySelector("#lastname").value;
    if (isNaN(lname) && lname.length > 1){
        const lastName = signupForm['lastname'].value;
    }else {
        alert("กรุณากรอกนามสกุลให้ถูกต้อง");
        e.preventDefault();
        status = false;
    }

    var em = document.querySelector("#email").value;
    if (em.includes('@gmail.com') || em.includes('@hotmail.com') || em.includes('@outlook.com') || em.includes('.ac.th')){
        const email = signupForm['email'].value;
    }else {
        alert("กรุณากรอกอีเมลให้ถูกต้อง");     
        e.preventDefault();
        status = false;
    }

    var pw = document.querySelector("#password").value;
    var pwcf = document.querySelector("#password-cf").value;
    if (pw.length >= 6 && pw == pwcf){
        const password = signupForm['password'].value;
        status = true;
    }else if (pw != pwcf) {
        alert("กรุณากรอกรหัสให้ตรงกัน");
        e.preventDefault();
        status = false;
    }else {
        alert("กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร");
        e.preventDefault();    
        status = false;
    }

    var role = 'Teacher';

    //sign up the user
    if(status){
        auth.createUserWithEmailAndPassword(em, pw).then(cred => {
            return db.collection('users').doc(signupForm['email'].value).set({
                firstname: signupForm['firstname'].value,
                lastname: signupForm['lastname'].value,
                role: 'Teacher'
            });
        });
        setTimeout(function(){window.location.href = 'home-teacher.html';}, 3000);
    }
});