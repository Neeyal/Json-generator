import { faker } from '@faker-js/faker'

function jsonInput (keys , count) {
    let jsonArray = []
    let createJson = {}
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
                    case "alphanumeric":
                        value = generateRandomAlphaNumeric()
                        break
                    case "uuid":
                        value = faker.string.uuid()
                        break
                    case "boolean":
                        value = faker.helpers.arrayElement([true, false])
                        break
                    case "date":
                        value = faker.date.birthdate()
                        break
                    case "email":
                        value = faker.internet.email()
                        break
                    default:
                    break
            }   
return value
}

function generateRandomAlphaNumeric() {
    let firstThree = ''
    for (let i = 0; i < 3; i++) {
        firstThree+=Math.floor(Math.random()*10)
    }
    let remainingLength = 15 - firstThree.length
    let alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let remainingChars = ''
    for (let i = 0; i < remainingLength; i++) {
        remainingChars += alphanumericChars.charAt(Math.floor(Math.random() * alphanumericChars.length))
    }
    let finalString = firstThree + "PS" + remainingChars.substring(2)

    return finalString
}

export default function jsonGenerator (data) {
    const keys = data.inputValues
    const count = data.repeatCount
    return jsonInput(JSON.parse(keys),parseInt(count))
}
