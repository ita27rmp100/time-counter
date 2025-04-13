// create the counter-card tag :
customElements.define('counter-card', class extends HTMLElement {
    connectedCallback() {
        let date = new Date()
        let DateDisplay = "";
        let dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
        if(this.getAttribute("type")=="down"){
            DateDisplay = `DownCounter | Event day : ${this.getAttribute("date")}`
        }
        else{
            DateDisplay = `UpCounter | started : ${this.getAttribute("date")}`
        }
        this.innerHTML = `
            <div class="card p-2 m-2">
                <div class="class-header d-flex justify-content-between align-items-center flex-row">
                    <section class="pl-2 pt-2">
                        <h4 class="card-title p-0 m-0">${this.getAttribute("title")}</h4>
                        <small>${DateDisplay}</small>
                    </section>
                    <button class="btn p-2 mt-1 mr-1 close bg-light" onclick="remove()">&times;</button>
                </div>
                <div class="card-body d-inline-block text-muted">
                    <h2 class="card-text d-inline">51 Days , 20 hours</h2> + <small class="font-weight-bold">49:34.98</small>
                </div>
            </div>`
    }
});
// remove the counter :
function remove(){
    $(document).on("click", ".close", function(){
        if (confirm('Do you want to remove this counter?')==true) {$(this).closest(".card").remove()}
    })
}
// display all counters
$(document).ready(function(){
    for(let i = 0; i < localStorage.length; i++) {
        let task = localStorage.key(i)
        let taskDetails = JSON.parse(localStorage.getItem(task))
        $(".counters-list").prepend(`<counter-card title="${task}" date="${taskDetails.date}" type="${taskDetails.type}"></counter-card>`)
        console.log("added")
    }
})