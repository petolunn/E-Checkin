const sendCode = document.querySelector('#sendForm');
sendCode.addEventListener('submit', (e) => {
    e.preventDefault();

    var user = firebase.auth().currentUser;
    if (user != null) {
        email = user.email;
        var info = db.collection('users').doc(email);
        info.get().then(function(doc) {
            db.collection('code').doc('code').update({
                sCode: sendCode['password'].value,
                email: email,
                studentid: doc.data().studentid
            });
        })
      }
    setTimeout(function(){window.location.href = 'class-student.html';}, 3000);
})