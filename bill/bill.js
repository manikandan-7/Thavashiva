var bill;
var people;
var share;
var names=[];
function addname(id){

    var buttonid=id.slice(6,id.length);
    var name=document.getElementById("name"+buttonid).value
    names.push(name);
}
function served(){
    bill=document.getElementById("billbox").value;
    people=document.getElementById("peoplebox").value;
    share=bill/people;
    document.getElementById("sharebox").value=share;
    for(i=1;i<=people;i++)
    {
        element=`
        <div class="namebody" id="person`+i+`">
                        <div class="names">
                            <div class="name">
                                <p>Name `+i+`</p>
                            </div>
                            <div class="type">
                                <input type="text" id="name`+i+`"/>
                                <button onclick="addname(this.id)" id="button`+i+`">Proceed</button>
                            </div>
                        </div>
                    </div>
        
                    `
                    var post=document.getElementsByClassName('namebody');
                    last=post.length-1;
                    var reqele=post[last];
                    reqele.insertAdjacentHTML("afterend",element);
    }
}
function showtable(){
    for(i=1;i<=people;i++){
            document.getElementsByClassName('namebody')[i].style.display="none";

    }
    for(i=0;i<people;i++){
    var element=`
    <div class="tablename">
        `+names[i]+`
    </div>
    <div classs="tableamount">
        `+share+`
    </div>
    `
    var footer=document.getElementById("footer");
    var z=document.createElement('div');
    z.setAttribute("class","table");
    z.innerHTML=element;
    footer.appendChild(z);
    }
    alert("Checkout your bill :)");
    document.getElementsByClassName("receipt")[0].style.display="flex"
}
