function getPageHistory() {
    return localStorage.getItem('pageHistory') ? localStorage.getItem('pageHistory').split(';') : [];
}

function loadPage(page) {
    savePageHistory(page);
    $('#loadContent').load(page);
}

function savePageHistory(path) {
    let pageHistory = getPageHistory();
    if (pageHistory.length === 0 || pageHistory[pageHistory.length - 1] !== path) {
        pageHistory.push(path);
        localStorage.setItem('pageHistory', pageHistory.join(';'));
    }
}

function goBack() {
    let pageHistory = getPageHistory();
    if (pageHistory.length > 1) {
        pageHistory.pop();
        localStorage.setItem('pageHistory', pageHistory.join(';'));
        let previousPage = pageHistory[pageHistory.length - 1];
        loadPage(previousPage);
    }
}

function changeBackground() {
    let pageHistory = getPageHistory();
    if (pageHistory.length > 0) {
        let lastPage = pageHistory[pageHistory.length - 1];

        if (lastPage.includes('expand.html') || localStorage.getItem('pageHistory') == 0) {
            $('body').css('background-image', 'url(' + localStorage.getItem('backgroundImage') + ')');
            $('body').css('background-color', '');
        } else {
            $('body').css('background-image', 'none');
            $('body').css('background-color', '#fff');
        }
    }
}

function playResponsiveVoice(text) {
    responsiveVoice.cancel();
    responsiveVoice.speak(text, "Vietnamese Male");
}

function replaceCharacters(inputString, firstHalf, reversedFirstHalf, secondHalf, reversedSecondHalf, number, special) {
    let resultString = '';
    for (let char of inputString) {
        if (char === ' ') {
            resultString += ' ';
        } else if (firstHalf.includes(char)) {
            let index = firstHalf.indexOf(char);
            resultString += reversedFirstHalf[index];
        } else if (secondHalf.includes(char)) {
            let index = secondHalf.indexOf(char);
            resultString += reversedSecondHalf[index];
        } else if (number.includes(char)) {
            let index = number.indexOf(char);
            resultString += special[index];
        } else if (special.includes(char)) {
            let index = special.indexOf(char);
            resultString += number[index];
        } else {
            resultString += char; 
        }
    }
    return resultString;
}

function replaceCharacters2(inputString, alphabet,reversedAlphabet, number, special) {
    let resultString = '';
    for (let char of inputString) {
        if (char === ' ') {
            resultString += ' ';
        } else if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            resultString += reversedAlphabet[index];
        } else if (number.includes(char)) {
            let index = number.indexOf(char);
            resultString += special[index];
        } else if (special.includes(char)) {
            let index = special.indexOf(char);
            resultString += number[index];
        } else {
            resultString += char; 
        }
    }
    return resultString;
}

