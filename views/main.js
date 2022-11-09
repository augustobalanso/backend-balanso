const socket = io("https://backend-balanso-2dacursada-production.up.railway.app/")

let messages = []
let products = []

function sendProduct(){
    socket.emit('NEW_PRODUCT_TO_SERVER')
}

function sendMessage(){
    const message = document.querySelector('#submit-message').value
    const username = document.querySelector('#submit-username').value
    socket.emit('NEW_MESSAGE_TO_SERVER', {username: username ,message: message,timestamp: new Date().toLocaleString()})
}
 
function updateProducts(data){
    let productsToHtml = ''
    data.forEach(i => {
        productsToHtml += `<tr>
        <td>${i.title}</td>
        <td>$${i.price}</td>
        <td><img src="${i.thumbnail}" alt="${i.thumbnail}" /></td>
        </tr>`
    })
    document.querySelector('#productsPlaceholder').innerHTML = productsToHtml
}

function updateMessages(data){
    let messagesToHtml = ''
    data.forEach(i => {
        messagesToHtml += `<li>[${i.timestamp}] <b>${i.username}</b>: <i>${i.message}</i></li>`
    })
    document.querySelector('#chatPlaceholder').innerHTML = messagesToHtml
}

socket.on('UPDATE_PRODUCTS', (data) => {
    products = data
    updateProducts(products)
})

socket.on('UPDATE_CHAT', (data) => {
    messages = data
    updateMessages(messages)
})

socket.on('NEW_MESSAGE_TO_SERVER', (data) => {
    messages.push(data)
    updateMessages(messages)
})

socket.on('NEW_PRODUCT_TO_SERVER', (data) => {
    products.push(data)
    updateProducts(products)
})