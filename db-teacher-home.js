//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    }
});

db.collection('classes').get().then(snapshot => {
    setupClasses(snapshot.docs);
});

const classList = document.querySelector('.classes');

const setupClasses = (data) => {
    let html = '';
    data.forEach(doc => {
        const c = doc.data();
        const d = `
            <div class="card p-3 mr-3" style="width: 18em;border: 1px solid #b9b9b9">
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

const logout = document.querySelector('#');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
});