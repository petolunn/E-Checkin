//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
});

const loginForm = document.querySelector('#login-Form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password);
    db.collection('users').doc(email).get().then(function(doc) {
        if (doc.data().role == 'Teacher') { 
            setTimeout(function(){window.location.href = 'home-teacher.html';},3500);           
        }else {
            setTimeout(function(){window.location.href = 'home-student.html';},3500);
        }
    });
})