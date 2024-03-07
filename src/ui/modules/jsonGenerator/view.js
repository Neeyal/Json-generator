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

//AJAX call for all express API
async function callForJson ({ repeatCount , inputValues }) {
    const ajaxPostCall = fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ repeatCount , inputValues })
    })
    const response = await ajaxPostCall.then(data => data.text())
    return response
}

//listner for generating JOSN
generateJsonId.addEventListener('click', function () {
    let { repeatCount , inputValues } = generateJson()
    // AJAX call for API 
    callForJson({ repeatCount , inputValues })
    .then(data => {
        // Display response on the page
        responseDiv.textContent =  data
    })
    .catch(error => {
        console.error('Error:', error)
    })
})

const inputTypes = ['','number','string','boolean','alphanumeric','email','date','uuid']

function createSelector (count) {
const div = document.createElement('div')
div.setAttribute('class','browser-default col s6')

const select = document.createElement('select')
select.setAttribute('id', `selector${count}`)
select.style.display = 'block'
for (let i=0; i<inputTypes.length; i++){
    const option = document.createElement('option')
    const value = inputTypes[i] === '' ? '' : inputTypes[i]
    const optionInnerText = inputTypes[i] === '' ? 'Choose your type' : `${inputTypes[i]}`
    inputTypes[i] === '' ? option.setAttribute('disabled', 'true') : ''
    inputTypes[i] === '' ? option.setAttribute('selected', 'true') : ''
    option.setAttribute('value', `${value}`)
    option.innerText = `${optionInnerText}`

    select.appendChild(option)
}

const label = document.createElement('label')
label.innerText = 'Select Key Type'
div.appendChild(label)
div.appendChild(select)

return div
}

// execution function for logic
let count = 0
function createInput () {
    count+=1
    const select = createSelector(count)
    const div = document.getElementById('container')
    const divRow = document.createElement('div')
    divRow.setAttribute('class','row')
    const divCol = document.createElement('div')
    divCol.setAttribute('class','col s6')
    const label = document.createElement('label')
    label.setAttribute('for', `key${count}`)
    label.innerText = 'Key Name'

    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('id', `key${count}`)
    
    label.appendChild(input)
    divCol.appendChild(label)
    divRow.appendChild(divCol)
    divRow.appendChild(select)
    div.appendChild(divRow)
}


function getInputValues () {
    let getDataObject = {}
    for(let i=1; i<=count; i++) {
        let keyName = document.getElementById(`key${i}`).value 
        let value = document.getElementById(`selector${i}`).value
        getDataObject[keyName]=value
    }
    return JSON.stringify(getDataObject)
}

function generateJson() {
    let repeatCount = document.getElementById('count')?.value || 1
    let inputValues = getInputValues()
    return {repeatCount , inputValues}
}

})
