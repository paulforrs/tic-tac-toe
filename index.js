const cell = document.querySelectorAll('.cell')

cell.forEach(cell => {
    cell.addEventListener('click', ()=>{
        console.log('clicked')}, {once:true} )
});