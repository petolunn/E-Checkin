//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    }
});

//create new class
const createClass = document.querySelector('#registerForm');
createClass.addEventListener('submit', (e) => {
    e.preventDefault;
    db.collection('classes').add({
        code: createClass['code'].value,
        title: createClass['subject'].value,
        semester: createClass['semester'].value,
        year: createClass['year'].value,
        description: createClass['description'].value
    }).then(() => {
        createClasses.reset();
    });
});