//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    }
});

//create new class
const createClass = document.querySelector('#registerForm');
createClass.addEventListener('submit', (e) => {
    e.preventDefault();
    
    db.collection('classes').doc(createClass['code'].value).set({
        code: createClass['code'].value,
        title: createClass['subject'].value,
        semester: createClass['semester'].value,
        year: createClass['year'].value,
        description: createClass['description'].value
    });

    setTimeout(function(){window.location.href = 'home-teacher.html';}, 3000);
});

const cancleCreate = document.querySelector('#registerForm');
cancleCreate.addEventListener('reset', (e) => {
    e.preventDefault();
    window.location.href = 'home-teacher.html';
});