const socket = io()

let messages = []

// -------- Normalizr Schemas --------- //

const authorSchema = new normalizr.schema.Entity('authors')
const textSchema = new normalizr.schema.Entity('texts')
const idSchema = new normalizr.schema.Entity('_id')
const messageSchema = new normalizr.schema.Object({
    author: authorSchema,
    text: textSchema,
    _id: idSchema
})

// ----------------------------------- //


document.querySelector('#submitProduct').addEventListener("click", (e) => {
    e.preventDefault()
})

async function generateProducts(){
    const productsTable = document.getElementById('productsTable')
    productsTable.innerHTML = '' 
    socket.emit('RECEIVE_PRODUCTS')
}

function updateMessages(data){
    let messagesToHtml = ''
    data.forEach(i => {
        messagesToHtml += 
        `
        <div class="d-flex flex-row justify-content-start">
        <img src="${i.author.avatar}"
            alt="avatar 1" style="width: 50px; height: 100%;">
        <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${i.text}
            </p>
            <p class="small ms-3 mb-3 rounded-3 text-muted">${new Date().toISOString()}</p>
        </div>
        </div>
        `
    })
    document.querySelector('#chatBody').innerHTML = messagesToHtml
}

async function sendMessage(){
    const messageBody = {
        author: {
            email: document.querySelector('#formEmail').value,
            nombre: document.querySelector('#formName').value,
            apellido: document.querySelector('#formLastName').value,
            edad: document.querySelector('#formAge').value,
            alias: document.querySelector('#formAlias').value,
            avatar: document.querySelector('#formAvatar').value
        },
        text: document.querySelector('#formMessage').value
    }

    socket.emit('NEW_MESSAGE_TO_SERVER', messageBody)
}

socket.on('UPDATE_PRODUCTS', (data) => {
    const productsTable = document.getElementById('productsTable')
    const productsHtml = data.map( (prod) => {
        return `<tr><td><div class="d-flex align-items-center"><img src="${prod.photo}" alt="${prod.name}" style="width: 45px; height: 45px" class="rounded-circle"/></div></td><td><div class="ms-3"><p class="fw-bold mb-1">${prod.name}</p></div></td><td><p class="fw-normal mb-1">${prod.price}</p></td></tr>`
    })
    productsTable.innerHTML = productsHtml.join('')
})

socket.on('UPDATE_CHAT', (data) => {
    console.log(normalizr.denormalize(data.result , messageSchema, data.entities))
    // updateMessages(messages)
})

socket.on('NEW_MESSAGE_TO_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
})