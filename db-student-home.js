//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        db.collection('classes').onSnapshot(snapshot => {
            setupUI(user);
            setupClasses(snapshot.docs);
        });
    }
});

const classList = document.querySelector('.classes');
//const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
    if (user) {
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().firstname}</div>
            `;
            //accountDetails.innerHTML = html;
        });
    }
};

const setupClasses = (data) => {
    let html = '';
    data.forEach(doc => {
        const c = doc.data();
        const d = `
            <div class="card p-3 mr-3" style="width: 18em;border: 1px solid #b9b9b9" onclick="changePage()">
                <h5 style="color: #303030;">[${c.code}] ${c.title} (${c.semester}/${c.year})</h5>
                <p>${c.description}</p>
                <hr>
                <br>
            </div>
        `;
        html += d;
    });

    classList.innerHTML = html;
};

function refeshText(){
    getName();
    var info = db.collection('code').doc('code');
    info.get().then(function(doc) {
        var info = db.collection('classes').doc(doc.data().tCurrentCode);
        info.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                document.getElementById("code").innerHTML = doc.data().code;
                document.getElementById("subject").innerHTML = doc.data().title;
                document.getElementById("countId").innerHTML = doc.data().count + ' Students';
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        var info = db.collection('code').doc('code');
        info.get().then(function(doc) {
            var info2 = db.collection(doc.data().tCurrentCode).doc(doc.data().studentid);
            info2.get().then(function(doc) {
                document.getElementById('demo').innerHTML = doc.data().week1;
                document.getElementById('demo2').innerHTML = doc.data().week2;
                document.getElementById('demo3').innerHTML = doc.data().week3;
                document.getElementById('demo4').innerHTML = doc.data().week4;
                document.getElementById('demo5').innerHTML = doc.data().week5;
            })
        })
    })
}

function logOut(){
    auth.signOut();
    window.location.href = 'index.html';    
}

function getName(){
    setTimeout(function(){
        var user = firebase.auth().currentUser;
        var email;
        
        if (user != null) {
          email = user.email;
          var info = db.collection('users').doc(email);
          info.get().then(function(doc) {
              if (doc.exists) {
                  document.getElementById('username').innerHTML = doc.data().firstname + ' ' + doc.data().lastname;
              }
          })
        }
    }, 500)   
}

function changePage(){
    window.location.href = 'class-student.html';
}