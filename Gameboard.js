const Gameboard = (() => {
    const cols = 3;
    let cells = ['', '', '', '', '', '', '', '', ''];
    let turn = 'X'; // X or O
    let isPlay = true;
    // methods
    const recordTurn = (ind) => {
        cells[ind] = turn;
    };
    const changeTurn = () => {
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
    };
    const checkCell = (ind) => {
        if(cells[ind] !== '') {
            return false;
        }
        return true;
    };
    const checkTie = () => {
        for (let i = 0; i < cells.length; i++) {
           // console.log(cells[i]);
            if (cells[i] == '') {
                return false;
            }
        }
        return true;
    };
    const checkWin = () => {
        const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < winCombos.length; i++) {
            if (cells[winCombos[i][0]] === cells[winCombos[i][1]] && cells[winCombos[i][0]] === cells[winCombos[i][2]] && cells[winCombos[i][0]] != '') {
                return true;
            }
        }
        return false;
    };
    const removeListeners = () => {
        const cellsElements = document.querySelectorAll('#main td');
        for (let i = 0; i < cellsElements.length; i++) {
            cellsElements[i].removeEventListener('click', clickListener);
        }
    };

    const displayInfo = (text) => {
        const info = document.querySelector('#info');
        info.innerText = text;
        info.style.display = 'flex';
        const btn = document.createElement('a');
        btn.setAttribute('href', '/index.html');
        btn.setAttribute('class', 'playAgain');
        btn.innerText = 'Play Again?';
        info.appendChild(btn);
    };
    const makeTurn = (ind) => {
        if(checkCell(ind)) {
            recordTurn(ind);
            draw();
            if (checkWin()) {
                displayInfo("Player " + turn + " WON!");
                removeListeners();
                isPlay = false;
            } else if(checkTie()) {
                displayInfo("It's a TIE!");
                removeListeners();
                isPlay = false;
            }
            if(isPlay) {
                changeTurn();
            }
        }
    }
    const findEmptyCell = () => {
        let random = Math.floor(Math.random() * 9);
        while(cells[random] != '') {
            random = Math.floor(Math.random() * 9);
        }
        return random;
    }
    const clickListener = (e) => {
            let ind = e.target.getAttribute('data-id');
            makeTurn(ind);
            if(isPlay) {
                makeTurn(findEmptyCell());
            }
    }
    const cellsAddEvents = () => {
        const cellElements = document.querySelectorAll('td');
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].addEventListener('click', clickListener);
        } 
    };
    const draw = () => {
        if(document.querySelector('#main table')) {
            document.querySelector('#main table').remove();
        }
        const table = document.createElement('table');
        let row;
        for(let i = 0; i < cells.length; i++) {
            if (i % cols === 0 || i === 0) {
                row = document.createElement('tr');
                table.appendChild(row);
            }
            const cell = document.createElement('td');
            cell.innerText = cells[i];
            cell.setAttribute('data-id', i);
            row.appendChild(cell);
        }
        document.querySelector('#main').appendChild(table);
        cellsAddEvents();
    };
    return {recordTurn, makeTurn, changeTurn, draw};
})();