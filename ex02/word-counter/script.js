const filterWords = (array) => array.filter((item) => ((item !== '' && item.length > 1) ? true : false));

const getWords = (input) => {
    const clearValue = input.replace(/[`~!@#$%^&*()_|+=?;:'",.<>\r\n\{\}\[\]\\\/]/gi, '');
    const cells = clearValue.split(' ');
    const words = filterWords(cells);

    return words;
}

const createResponseItem = (wordItem) => {
    const div = document.createElement('div');
    div.className = 'response';

    const value1 = document.createElement('span');
    const value2 = document.createElement('span');

    value1.innerText = `${wordItem.word} `;
    value2.innerText = `- ${wordItem.count}x`;

    div.appendChild(value1);
    div.appendChild(value2);

    return div;
}

const showQuantities = (wordList) => {
    quantities.innerHTML = '';

    wordList.forEach((wordItem) => {
        quantities.appendChild(createResponseItem(wordItem));
    });
}

const showCounter = (quantity) => {
    total.innerHTML = '';

    const h1 = document.createElement('h1');
    const p = document.createElement('p');

    h1.innerText = quantity;

    if (quantity === 0) {
        p.innerText = 'Nenhuma palavra inserida';
    } else {
        p.innerText = `palavra${quantity > 1 ? 's distintas' : ''}`;
    }

    total.appendChild(h1);
    total.appendChild(p);
}

const createWordList = (words) => {
    const wordList = [];

    words.forEach((word) => {
        if (wordList.length === 0) {
            wordList.push({ word, count: 1 });
        } else {
            const addedWordIndex = wordList.findIndex((wordItem) => wordItem.word === word);

            if (addedWordIndex !== -1) {
                wordList[addedWordIndex].count = wordList[addedWordIndex].count + 1;
            } else {
                wordList.push({ word, count: 1 });
            }
        }
    });

    return wordList;
}

const sortByCount = (array) => {
    array.sort((a, b) => {
        if (a.count < b.count) {
          return -1;
        }
    
        if (a.count > b.count) {
          return 1;
        }
    
        return 0;
      });

    return array;
}

const startCount = () => {
    const inputValue = input.value;

    const words = getWords(inputValue);

    const wordList = createWordList(words);
    
    const orderedWordList = sortByCount(wordList);

    showCounter(orderedWordList.length);
    showQuantities(orderedWordList);
}

run.addEventListener('click', startCount);
