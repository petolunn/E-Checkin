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

const lists = document.querySelector('.lists');

const listnames = document.querySelector('.listname');

db.collection('00000000').get().then(function(querySnapshot) {
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

const addStudent = document.querySelector('#login-Form');
addStudent.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('00000000').doc(addStudent['Student_id'].value).set({
        studentid: addStudent['Student_id'].value,
        firstname: addStudent['firstname'].value,
        lastname: addStudent['lastname'].value,
        week1: 'x'
    });

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

function changePage(){
    window.location.href = 'class-teacher.html';
}

function refeshText(){
    var info = db.collection('classes').doc('00000000');
    info.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            document.getElementById("code").innerHTML = doc.data().code;
            document.getElementById("subject").innerHTML = doc.data().title;
            document.getElementById("countId").innerHTML = count + ' Students';
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    var info2 = db.collection('00000000').doc('60070010');
    info2.get().then(function(doc) {
        document.getElementById('demo').innerHTML = doc.data().week1;
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
                var infoUpdate = db.collection('users').doc('60070010');
                infoUpdate.get().then(function(doc) {
                    const c = doc.data();
                    const d = `
                        <div class="col-md-3 col-sm-4 col-xs-6 col-12">
                            ${c.firstname} ${c.lastname}
                        </div>
                    `;        
                    html += d;
                    listnames.innerHTML = html;
                    db.collection('00000000').doc('60070010').update({
                        week1: '✔'
                    });
                });
            }
        });
    },5000);
}

function update(x){
    x += 1;
    document.getElementById("sCount").innerHTML = x + ' Students';
}

function check(x){
    console.log(x);
}