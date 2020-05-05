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

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
    window.location.href = 'index.html';
});

function changePage(){
    window.location.href = 'class-teacher.html';
}