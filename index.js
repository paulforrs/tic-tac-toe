// Board cells
const cells = Array.from(document.querySelectorAll('[data-cell]'))
const board = document.querySelector('.board')
let xTurn = true
const O_CLASS = 'o'
const X_CLASS = 'x'
const WINNINGCOMBO = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[6,4,2]
]
// Winner Message
const winnerMessage = document.querySelector('#winner-message-container')
const resetButton = document.querySelector('#reset-button')
resetButton.addEventListener('click', ()=>{
    winnerMessage.classList.toggle('show')
    resetGame()
})
function resetGame(){
    cells.forEach(cell=>{
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.removeEventListener('click', handleClick)
    })
    startUp()
}

// Board Cells
function addClickEvent(){
    cells.forEach(cell => {
        cell.addEventListener('click',
            handleClick
        , {once:true} )
    
    });
}

function handleClick(e){
    const cell = e.target
    const currentClass = xTurn == true ? X_CLASS : O_CLASS;
    addMarker(cell)
    if(checkWinner(currentClass)){
        const winner = `${currentClass.toUpperCase()} wins !`
        endGame(winner)
    }
    else if(checkDraw(cells)){
        const draw = "It's a Draw!"
        endGame(draw)
    }
    else{
        changeTurn()
        addBoardClass()
    }
}
function addMarker(cell){
    console.log('added')
    cell.classList.add( xTurn == true ? X_CLASS : O_CLASS)
}
function changeTurn(){
    xTurn = !xTurn
}
function checkWinner(currentClass){
    return WINNINGCOMBO.some(combinations =>{
        return combinations.every( index =>{
            return cells[index].classList.contains(currentClass)
        })
    })
}
function checkDraw(cells){
    return cells.every( cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}
function endGame(result){
    winnerMessage.classList.toggle('show')
    const winnerText = document.querySelector('#winner')
    winnerText.textContent = result
}
function addBoardClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    board.classList.add(xTurn ==true ? X_CLASS : O_CLASS)
}
function startUp(){
    addBoardClass()
    addClickEvent()
}
startUp()