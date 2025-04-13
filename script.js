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
// remove the counter:
function remove(){
    $(document).on("click", ".close", function(){
        if (confirm('Do you want to remove this counter?')==true){
            $(this).closest(".card").remove()
            localStorage.removeItem($(this).closest(".card").children().children().children()[0].innerText)
        }
    })
}
// add a new counter:
function addCounter(type){
    let taskDetails = {
        "date": $("#date").val().replace("/", "-").replace("T"," "),
        "type": type
    }
    localStorage.setItem($("#title").val(), JSON.stringify(taskDetails))
    window.location = window.location.href
}
// changement on document content
$(document).ready(function(){
    // display data from local storage
    for(let i = 0; i < localStorage.length; i++) {
        let task = localStorage.key(i)
        let taskDetails = JSON.parse(localStorage.getItem(task))
        $(".counters-list").prepend(`<counter-card title="${task}" date="${taskDetails.date}" type="${taskDetails.type}"></counter-card>`)
        console.log("added")
    }
    // footer year
    $("#currentyear").text(new Date().getFullYear())
    // counting
    $("counter-card").each(function () {
        const card = $(this);
        const dateAttr = card.attr("date");
        const type = card.attr("type");

        if (!dateAttr || !type) return; // skip if data is missing

        const targetDate = new Date(dateAttr);
        const h2 = card.find("h2.card-text");
        const small = card.find("small.font-weight-bold");

        const interval = setInterval(() => {
            const now = new Date();
            let diffMs = type === "up" ? now - targetDate : targetDate - now;

            if (diffMs <= 0 && type === "down") {
                clearInterval(interval);
                h2.text("0 Days , 0 hours");
                small.text("00:00.00");
                return;
            }

            // Calculate Days and Hours
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            // Calculate Minutes, Seconds, and Milliseconds
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
            const diffMsOnly = Math.floor((diffMs % 1000) / 10); // two digits for ms

            // Format the time (MM:SS.ms)
            const formattedTime = 
                `${String(diffMinutes).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}.${String(diffMsOnly).padStart(2, '0')}`;

            // Update the DOM
            h2.text(`${diffDays} Days , ${diffHours} hours`);
            small.text(formattedTime);
        }, 100); // update every 100ms for smooth countdown
    });
})