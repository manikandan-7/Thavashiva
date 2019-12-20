var bill;
var people;
var share;
var names=[];
function amount(){
    bill=document.getElementById("billbox").value;
}
function addname(id){

    var buttonid=id.slice(6,id.length);
    var name=document.getElementById("name"+buttonid).value
    names.push(name);

    alert(names);
}
function served(){
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
    for(i=0;i<people;i++){
    element=`
    <div>
    <table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>

  <tr>
    <td>`+names[i]+`</td>
    <td>`+share+`</td>
  </tr>
 
</table>
</div>
`
var node = document.createElement("div");               
var ref=
    }
    alert(element);
}
