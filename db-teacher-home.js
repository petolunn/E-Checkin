//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        db.collection('classes').onSnapshot(snapshot => {
            setupClasses(snapshot.docs);
        });
    }
});

const classList = document.querySelector('.classes');

const setupClasses = (data) => {
    let html = '';
    data.forEach(doc => {
        const c = doc.data();
        const d = `
            <div class="card p-3 mr-3" style="width: 18em;border: 1px solid #b9b9b9" onclick="changePage('${c.code}')" id="${c.code}">
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

const lists = document.querySelector('.lists');

const listnames = document.querySelector('.listname');
var info = db.collection('code').doc('code');
info.get().then(function(doc) {
    db.collection(doc.data().tCurrentCode).get().then(function(querySnapshot) {
        let html = '';
        let count = 1;
        querySnapshot.forEach(function(doc) {
            const c = doc.data();
            const d = `
                <tr>
                    <td>${count}</td>
                    <td>${c.studentid}</td>
                    <td>${c.firstname} ${c.lastname}</td>
                    <td>${c.week1}</td>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                    <td>x</td>
                </tr>
            `;        
            html += d;
            count += 1;
        });
        lists.innerHTML = html;
    })
})

const addStudent = document.querySelector('#login-Form');
addStudent.addEventListener('submit', (e) => {
    e.preventDefault();
    var info = db.collection('code').doc('code');
    info.get().then(function(doc) {
        db.collection(doc.data().tCurrentCode).doc(addStudent['Student_id'].value).set({
            studentid: addStudent['Student_id'].value,
            firstname: addStudent['firstname'].value,
            lastname: addStudent['lastname'].value,
            week1: 'x',
            week2: 'x',
            week3: 'x',
            week4: 'x',
            week5: 'x'
        });
    })
    setTimeout(function(){window.location.href = 'class-teacher.html';}, 3000);
});

const deleteStudent = document.querySelector('#delete_button');
deleteStudent.addEventListener('submit', (e) => {
    e.preventDefault();
    var info = db.collection('code').doc('code');
    info.get().then(function(doc) {
        db.collection(doc.data().tCurrentCode).doc(deleteStudent['Student_id'].value).delete();
    })
    setTimeout(function(){window.location.href = 'class-teacher.html';}, 3000);
});

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

function changePage(x){
    db.collection('code').doc('code').update({
        tCurrentCode: x
    });
    setTimeout(function(){window.location.href = 'class-teacher.html';}, 1500);
}

function changePage2(){
    setTimeout(function(){window.location.href = 'class-teacher.html';}, 1500);
}

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

function makeId(){
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 3; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("tagId").value = result;

    setInterval(function() {
        var result = '';
        for ( var i = 0; i < 3; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        document.getElementById("tagId").value = result;
        db.collection('code').doc('code').update({
            tCode: result,
        });
    },5000);
    setInterval(function() {
        let count = 0;
        let html = ' ';
        var info = db.collection('code').doc('code');
        info.get().then(function(doc) {
            if(doc.data().tCode == doc.data().sCode){
                console.log('Match!');
                update(count);
                var info = db.collection('users').doc(doc.data().email);
                info.get().then(function(doc) {
                    const c = doc.data();
                    const d = `
                        <div class="col-md-3 col-sm-4 col-xs-6 col-12">
                            ${c.firstname} ${c.lastname}
                        </div>
                    `;        
                    html += d;
                    listnames.innerHTML = html;
                    var info = db.collection('code').doc('code');
                    info.get().then(function(doc) {
                        db.collection(doc.data().tCurrentCode).doc(doc.data().studentid).update({
                            week1: '✔'
                        });
                    })
                });
            }
        });
    },2500);
}

function update(x){
    x += 1;
    document.getElementById("sCount").innerHTML = x + ' Students';
}

function check(x){
    console.log(x);
}