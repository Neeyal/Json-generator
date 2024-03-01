
function createInput(){
    const div = document.getElementById('container')
    for(let i=0;i<2;i++){
    const label = document.createElement('label')
    label.setAttribute('for', 'key')
    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'key')
    label.appendChild(input)
    div.appendChild(label)
    }
}

