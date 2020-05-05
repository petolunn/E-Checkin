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
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    window.location.href = 'index.html';
});

function changePage(){
    window.location.href = 'class-teacher.html';
}

function refeshText(){
    var info = db.collection('classes').doc('00000000');
    info.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            document.getElementById('code').innerHTML = doc.data().code;
            document.getElementById('subject').innerHTML = doc.data().title;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}