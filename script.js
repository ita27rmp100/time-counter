
// remove the counter :
function remove(){
    if (confirm("Do you want to remove this counter?")==true) {
        $(".close").parent().parent().remove()
    }
}
