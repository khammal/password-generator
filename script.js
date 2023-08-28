const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

//  Create an ordered array of ASCII values within a range
function charArray(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

const UPPERCASE_CHAR_CODES = charArray(65, 90)
const LOWERCASE_CHAR_CODES = charArray(97, 122)
const NUMBER_CHAR_CODES = charArray(48, 57)
const SYMBOL_CHAR_CODES = charArray(33, 47).concat(
    charArray(58, 64)
).concat(
    charArray(91, 96)
).concat(
    charArray(123, 126)
)

// Sync the character amount range and number when one changes in value
function syncCharacterAmount(e) {       
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

// Generate password using ASCII character values
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
    // The default will always have lowercase characters
    let charCodes = LOWERCASE_CHAR_CODES
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
    
    const passwordCharacters = []
    for (let i = 0; i < characterAmount; i++) {
        // Generate a random number up to the length of the array and select the element from charCodes with that index
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        // Convert the ASCII code selected above to a  string character and push to the new array
        passwordCharacters.push(String.fromCharCode(characterCode))
    }
    return passwordCharacters.join('')
}

form.addEventListener('submit', e => {
    e.preventDefault() // Prevents the page from refreshing
    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.innerText = password
})


 
