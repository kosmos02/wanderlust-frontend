
let mymap = L.map('mapid').setView([31.819331, -32.309761], 2);
let popup = L.popup()

const $lat = document.querySelector('#Lat')
const $lng = document.querySelector('#Lng')
const $name = document.querySelector('#name-field')
const $postCards = document.querySelector('#post-cards')
const $form= document.querySelector('#input-form')
const $deleteButtons = document.querySelectorAll('.delete-card')

const baseURL="http://localhost:3000/"
const postURL="posts/"
const noteURL= "notes/"

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia29zbW9zMDIiLCJhIjoiY2tqajBnbnQxNHp1ZTJzcGs2eGl2ZTB2OCJ9.sN_ykILGCbjf6ZkobZ80wg'
}).addTo(mymap);

fetch(`${baseURL}${postURL}`)
    .then(response => response.json())
    .then(posts => posts.forEach(post => {
        createCard(post)
    }))

mymap.on('click', onMapClick);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    
    $lat.textContent = e.latlng.lat
    $lng.textContent = e.latlng.lng
}

$form.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name')
    const location = formData.get('location')
    const date = formData.get('date')

    const postData = {
        "name": name,
        "location": location,
        "lat": $lat.textContent,
        "lng": $lng.textContent,
        "date": date
    }

    fetch(`${baseURL}${postURL}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(postData)
    }).then(response => response.json())
        .then(post => {
            createCard(post)
        })
})

function createCard(post){
    const $infoSection = document.createElement('section')
    const $postCard = document.createElement('div')
    const $nameCard = document.createElement('p')
    const $locationCard= document.createElement('p')
    const $dateCard = document.createElement('p')

    $postCard.id = `post${post.id}`

    $infoSection.classList.add('info-section')
    $postCard.classList.add('divCard')
    $nameCard.classList.add('card-info', 'name-info')
    $locationCard.classList.add('card-info')
    $dateCard.classList.add('card-info')

    $nameCard.textContent = post.name
    $locationCard.textContent = post.location
    $dateCard.textContent = post.date

    $postCards.append($postCard)
    $postCard.append($infoSection)
    $infoSection.append($nameCard, $locationCard, $dateCard)

    createPin(post)
    noteForm(post, $postCard)
    deleteCard($nameCard, $postCard, post.id)
}

function createPin(post) {

    const pin = L.icon({
        iconUrl: "https://i.ibb.co/cvXDtCL/stand-pin.png",
    
        iconSize:     [50, 55], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [10, 54], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -63] // point from which the popup should open relative to the iconAnchor
    });

    let marker = L.marker([post.lat, post.lng], {icon: pin}).addTo(mymap);
    marker.bindPopup(`<b>${post.name}</b><br>${post.location}<br>${post.date}`).openPopup();
    marker._icon.id=`marker${post.id}`
}

function deleteCard(appendTo, destroyThis, id){
    const $selectMarker = document.querySelector(`#marker${id}`)
    
    const $deletePost = document.createElement('p')
    $deletePost.classList.add('delete-post-button')
    $deletePost.textContent= "X"

    appendTo.append($deletePost)

    console.log($selectMarker)

    $deletePost.addEventListener('click', () => {
        $selectMarker.remove()
        destroyCard(destroyThis)
        fetch(`${baseURL}${postURL}${id}`, {
            method: 'DELETE',
        })
    })
}

function destroyCard(destroyThis){
    destroyThis.remove()
}

function noteForm(post, $postCard) {
    const $noteFormSection = document.createElement('section')
    const $noteForm = document.createElement('form')
    const $nameInput = document.createElement('input')
    const $messageInput = document.createElement('input')
    const $noteSubmit = document.createElement('input')
    const $notesSection = document.createElement('section')
    
    $noteFormSection.classList.add('note-form-section')
    $notesSection.classList.add('messages')

    $noteSubmit.classList.add('note-submit')
    $notesSection.id = `notes${post.id}`
    $noteForm.id = "note-form"
    
    $nameInput.id = "name-message-field"
    $nameInput.type= "text"
    $nameInput.name = "name"
    $nameInput.placeholder ="name"

    $messageInput.id="message-field"
    $messageInput.type= "text"
    $messageInput.name= "message"
    $messageInput.placeholder= "post a note"

    $noteSubmit.type= "submit"
    $noteSubmit.placeholder = "Post"

    $postCard.append($notesSection, $noteFormSection)
    $noteFormSection.append($noteForm)

    $noteForm.append($nameInput, $messageInput, $noteSubmit)

    postNote(post, $noteForm)
}

function postNote(post, $noteForm) {
    $noteForm.addEventListener('submit', event => {
        event.preventDefault()

        console.log(event.target)

        const noteFormData = new FormData(event.target)
        const name = noteFormData.get('name')
        const message = noteFormData.get('message')

        noteObject = {
            name: name,
            message: message,
            post_id: post.id
        }

        $noteForm.reset()

        console.log(event.target)

        fetch(`${baseURL}${noteURL}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }, body: JSON.stringify(noteObject)
        })
            .then(response => response.json())
            .then(note => {
                console.log(note)
                createNote(note)
                deleteNote(note)
            })
    })
}

fetch(`${baseURL}${noteURL}`)
    .then(response => response.json())
    .then(notes => notes.forEach(note => {
        createNote(note)
        deleteNote(note)

    }))

function createNote(note) {
    const $notesSectionId= document.querySelector(`#notes${note.post_id}`)
    const $noteName = document.createElement('p')
    const $noteMessage = document.createElement('p')

    $noteName.id =`message${note.id}`
    $noteName.classList.add('note-name')
    $noteMessage.classList.add('note-message')

    $noteName.textContent = `${note.name}:`
    $noteMessage.textContent = note.message

    $noteName.append($noteMessage)
    $notesSectionId.append($noteName)
}

function deleteNote(note) {
    const $noteElement = document.querySelector(`#message${note.id}`)
    const $deleteNote = document.createElement('p')
        
    $deleteNote.classList.add('x-note-button')
        
    $deleteNote.textContent="X"

    $noteElement.append($deleteNote)

    $deleteNote.addEventListener('click', () => {
        const $messageNote = document.querySelector(`#message${note.id}`)
        $messageNote.remove()

        fetch(`${baseURL}${noteURL}${note.id}`, {
            method: 'DELETE'
        })
    })
}