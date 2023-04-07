const cells = Array.from(document.querySelectorAll('[data-cell]'))
let xTurn = true
const O_CLASS = 'o'
const X_CLASS = 'x'
const WINNINGCOMBO = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[6,4,2]
]
cells.forEach(cell => {
    cell.addEventListener('click', ()=>{
        handleClick(cell)
    }, {once:true} )

});
function handleClick(cell){
    const currentClass = xTurn == true ? X_CLASS : O_CLASS;
    addMarker(cell)
    if(checkWinner(currentClass)){
        console.log(currentClass,' class wins')
    }
    else if(checkDraw(cells)){
        console.log('check draw')
    }
    else{
        changeTurn()
    }
    console.log(checkDraw(cells))

    // apply class
    // swap turn 
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
    console.log(cells)
    return cells.every( cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}