// create the counter-card tag :
customElements.define('counter-card', class extends HTMLElement {
    connectedCallback() {
        let date = new Date()
        let DateDisplay;
        let dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
        DateDisplay = `DownCounter | Event day : ${this.getAttribute("date")}` 
        ? (this.hasAttribute("type")=="down") 
        : `UpCounter | started : ${this.getAttribute("date")}` 
        this.innerHTML = `
            <div class="card p-2 m-2">
                <div class="class-header d-flex justify-content-between align-items-center flex-row">
                    <section class="pl-2 pt-2">
                        <h4 class="card-title p-0 m-0">${this.getAttribute("title")}</h4>
                        <small>UpCounter | started : ${this.getAttribute("date")}</small>
                    </section>
                    <button class="btn p-2 mt-1 mr-1 close bg-light" onclick="remove('Do you want to remove this counter?')">&times;</button>
                </div>
                <div class="card-body d-inline-block text-muted">
                    <h2 class="card-text d-inline">51 Days , 20 hours</h2> + <small class="font-weight-bold">49:34.98</small>
                </div>
            </div>`
    }
});
// remove the counter :
function remove(msg){
    $(document).on("click", ".close", function(){
        if (confirm(msg)==true) {$(this).closest(".card").remove()}
    })
}
