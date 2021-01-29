const Gameboard = (() => {
    let cols = 3;
    let cells = ['', '', '', '', '', '', '', '', ''];
    let turn = 'X'; // X or O
    // methods
    const recordTurn = (ind) => {
        cells[ind] = this.turn;
    };
    const changeTurn = () => {
        if (this.turn === 'X') {
            this.turn = 'O';
        } else {
            this.turn = 'X';
        }
    };
    const cellsAddEvents = () => {
        const cellElements = document.querySelectorAll('td');
        for (let i = 0; i < cellElements.length; i++) {
            cellElements[i].addEventListener('click', function(e) {
                console.log(e.target.getAttribute('data-id'));
            })
        } 
    }
    const draw = () => {
        const table = document.createElement('table');
        let row;
        for(let i = 0; i < cells.length; i++) {
            if (i % cols === 0 || i === 0) {
                row = document.createElement('tr');
                table.appendChild(row);
            }
            const cell = document.createElement('td');
            cell.innderText = cells[i];
            cell.setAttribute('data-id', i);
            row.appendChild(cell);
        }
        document.querySelector('#main').appendChild(table);
        cellsAddEvents();
    };
    return {recordTurn, changeTurn, draw};
})();