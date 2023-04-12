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
const history = {
    moves : [],
    moveCounter : 0,
    recordMove : function(index, currentClass){
        // this.moveCounter = this.moveCounter +1;
        this.moves.push({[index]: currentClass})
        console.log(history.moves);
    }
}
// Pages
const homeMenu = document.querySelector('.home-menu')
const gameContainer = document.querySelector('.game-container')
const winnerMessage = document.querySelector('#winner-message-container')
function showHome(){
    homeMenu.classList.remove('hidden')
}
function hideHome(){
    homeMenu.classList.add('hidden')
}
function showGame(){
    gameContainer.classList.remove('hidden')
}
function hideGame(){
    gameContainer.classList.add('hidden')
}
function hideMessage(){
    winnerMessage.classList.add('hidden')
}
function showMessage(){
    winnerMessage.classList.remove('hidden')
}
// Home menu
const homeButton = Array.from(document.querySelectorAll('.home-button'))
homeButton.forEach(button =>{
    button.addEventListener('click', (e)=>{
        if(e.target.id =='single-player-button'){
            resetBoard()
            showGame()
            hideHome()
            startUp()
        }
        else{
            resetBoard()
            showGame()
            hideHome()
            startUp()
        }
    })
})
// Replay
const nextBtn = document.querySelector('#replay-next')
const previousBtn = document.querySelector('#replay-previous')
function replayBtnStatus(){
    if(turnCounter == history.moves.length){
        nextBtn.setAttribute('disabled',null)
    }
    else{
        nextBtn.removeAttribute('disabled')
    }
    if(turnCounter == 0){
        previousBtn.setAttribute('disabled', null)
    }
    else{
        previousBtn.removeAttribute('disabled')
    }
}
var turnCounter = 0;
function handleReplay(e){
    console.log(history.moves.length)
    id = e.target.id
    if(id === 'replay-previous' && turnCounter != 0){
        turnCounter --

        console.log(turnCounter)
        const currentMoveIndex = history.moves[turnCounter]
        for( var cellIndex in currentMoveIndex){
            const cell = document.querySelector(`[data-cell= "${cellIndex}"]`)
            cell.classList.remove( currentMoveIndex[cellIndex])
        }
    }
    else if(id ==='replay-next'&& turnCounter < history.moves.length){
        console.log(turnCounter)
        const currentMoveIndex = history.moves[turnCounter]
        for( var cellIndex in currentMoveIndex){
            const cell = document.querySelector(`[data-cell= "${cellIndex}"]`)
            cell.classList.add( currentMoveIndex[cellIndex])
        }
        turnCounter++

    }
    else if(id=== 'replay-exit'){
        history.moves = []
        turnCounter = 0
        hideGame()
        showHome()
    }
    replayBtnStatus()
}
function replay(){
    replayBtnStatus()
    const replayButtons = Array.from(document.querySelectorAll('.replay-button'))
    replayButtons.forEach( (button) =>{
        console.log(button)
        button.addEventListener('click',
            handleReplay
        )
    })
}

// Winner Message
const endGameButtons = Array.from(document.querySelectorAll('.end-game-button'))
console.log(endGameButtons)
endGameButtons.forEach(button=>{
    button.addEventListener('click', (e)=>{
        if(e.target.id === 'end-home'){
            hideMessage()
            hideGame()
            showHome()
            resetBoard()
        }
        else if(e.target.id === 'end-replay'){
            console.log('replay')
            resetBoard()
            hideMessage()
            replay()
        }
        else{
            hideMessage()
            resetBoard()
            startUp()
        }
    })
})

function resetBoard(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    cells.forEach(cell=>{
        cell.classList.remove('x')
        cell.classList.remove('o')
        cell.removeEventListener('click', handleClick)
    })
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
    const cellIndex = e.target.getAttribute('data-cell')
    addMarker(cell)
    history.recordMove(cellIndex, currentClass)
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
    const winnerText = document.querySelector('#winner')
    winnerText.textContent = result
    showMessage()
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