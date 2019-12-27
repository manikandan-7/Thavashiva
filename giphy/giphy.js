var limits = 10;
var offset = 10;
var count=0;
localStorage.setItem("count",count);
localStorage.setItem("search","");

searchgif("trending");

function fetchimage(id,url){
window.open(url,'Image');

}



function searchgif(search) {
    if(search.length==0){
        search="trending";
        document.getElementById("imagebox").innerHTML="";

    }
    if(search==""){
        document.getElementById("imagebox").innerHTML="";

    }

  
    count=localStorage.getItem("count");
    if(count==0&&search!="trending"){
        document.getElementById("imagebox").innerHTML="";
        localStorage.setItem("count",count);
    }
    localStorage.setItem("search",search);
    async function call(url)  {
        try {
            const response = await fetch(url);
            const items = await response.json();
            return items;

        } catch (error) {
            console.log(error);
        }

    }
    try{
    call(`https://api.giphy.com/v1/gifs/search?api_key=`+giphykey+`&q=`+search+`&limit=`+limits+`&offset=`+offset+``)
        .then(
            response => console.log(response.data.forEach(gif => {
                var imgdiv = document.createElement("div");
                console.log(gif);
                imgdiv.id = 1;
                document.getElementById("imagebox").appendChild(imgdiv);
                var img = document.createElement('img');
                img.src = gif.images.downsized.url;
                img.id=gif.id;
                img.setAttribute("onclick","fetchimage(this.id,this.src)");
                document.getElementById("1").appendChild(img);

            }))
        );
}

catch (error) {
    console.log(error);
}
}

window.onscroll = () => {
  var search=localStorage.getItem("search");
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight){
        offset += 10;
        searchgif(search);
    }
    
   
};
var search=localStorage.getItem("search");
if(search.length==0){
    localStorage.setItem("search","trending");
    var search=localStorage.getItem("search");

searchgif(search);
}

