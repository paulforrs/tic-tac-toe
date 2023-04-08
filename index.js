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
            showGame()
            hideHome()
            startUp()
        }
        else{
            showGame()
            hideHome()
            startUp()
        }
    })
})

// Winner Message
const endGameButtons = Array.from(document.querySelectorAll('.end-game-button'))
console.log(endGameButtons)
endGameButtons.forEach(button=>{
    button.addEventListener('click', (e)=>{
        if(e.target.id == 'end-home'){
            hideMessage()
            hideGame()
            showHome()
            resetGame()
        }
        else{
            hideMessage()
            resetGame()
        }
    })
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