document.addEventListener('DOMContentLoaded', function () {

//getting document id and element on the HTML page
const addInput = document.getElementById('addInput')
const generateJsonId = document.getElementById('generateJson')
const responseDiv = document.getElementById('response')
//event listner =============================================

//listner for adding input
addInput.addEventListener('click', function () {
    createInput()
})

//listner for generating JOSN
generateJsonId.addEventListener('click', function () {
    let { repeatCount , inputValues } = generateJson()
    console.log({ repeatCount , inputValues })
    // AJAX call for API 
    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repeatCount , inputValues })
    })
    .then(response => response.text())
    .then(data => {
        // Display response on the page
        responseDiv.textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
    })
})


// execution function for logic
let count = 0
function createInput () {
    count+=1
    const div = document.getElementById('container')

    for(let i=0; i<2; i++) {
        const label = document.createElement('label')
        label.setAttribute('for', `${i===0 ? `key${count}` : `Value${count}`}`)
        label.innerText = i===0 ? 'Key Name' : 'Value Type'

        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('id', `${i===0 ? `key${count}` : `Value${count}`}`)

        label.appendChild(input)
        div.appendChild(label)
    }
}

function getInputValues () {
    let getDataObject = {}
    for(let i=1; i<=count; i++) {
        let keyName = document.getElementById(`key${i}`).value 
        let value = document.getElementById(`Value${i}`).value
        getDataObject[keyName]=value
    }
    return JSON.stringify(getDataObject)
}

function generateJson() {
    let repeatCount = document.getElementById('count')?.value || 1
    let inputValues = getInputValues()
    console.log("hey I was called")
    return {repeatCount , inputValues}
}

})
