const btn = document.getElementById('getName')

const clickHandler = () => alert('The cat name is: Lord Whiskerfluff Gigglepaws')

btn.addEventListener('click', clickHandler)

const addForm = document.querySelector('form');
const nameInput = document.querySelector('input');
const container = document.querySelector('section');

function putTheThingInTheView(res) {
    container.innerHTML = ''
    nameInput.value = ''

    res.data.forEach((catName, index) => {
        container.innerHTML += `<p name=${index}>${catName}</p>`
    })

    document.querySelectorAll('p').forEach(element => {
        const theIndexValue = element.getAttribute('name');

        element.addEventListener('click', () => {
            axios
                .delete(`/api/cats/${theIndexValue}`)
                .then(res => {
                    putTheThingInTheView(res)
                })
        })
    })
}

function submitHandler(evt) {
    evt.preventDefault();

    axios
        .post('/api/cats', { name: nameInput.value })
        .then(res => {
            putTheThingInTheView(res)
        })
        .catch(err => {
            nameInput.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class="close">close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}