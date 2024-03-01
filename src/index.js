import { faker } from '@faker-js/faker'


const keys = {"id": "number", "name":"string", "lastname":"string" , "contact":"number"}
let jsonArray = []
let createJson = {}
function jsonInput (keys , count) {
    for(let i=0; i<count; i++) {
        Object.entries(keys).forEach(element => {
            let value = valuesGenerator(element)
            createJson[element[0]] = value
        })
        jsonArray.push(JSON.stringify(createJson))
    }
    return jsonArray
}

function valuesGenerator(valueType) {
    let value
    let keyName = valueType[0]
    let keyType = valueType[1] 
        switch (keyType) {
                    case "number":
                        let randomNumber = Math.ceil(Math.random()*999999999999 + 1)
                        value = randomNumber
                        break
                    case "string":
                        if(keyName === 'name' || 'firstName'){
                            value = faker.person.firstName()
                        }
                        else{
                            value = faker.person.lastName()
                        }
                        break
                    default:
                        break
            }   
return value
}

console.log(jsonInput(keys , 5))