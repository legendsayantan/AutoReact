alert('Autoreact is ready. Scroll once to start it.');

//Instagram AutoReactor

var userHasScrolled = false;
var delay = 3000;//change this parameter,500+
var likes = document.getElementsByClassName('_abm0 _abl_');
window.onscroll = async function (e)
{
    if(!userHasScrolled){
        userHasScrolled = true;
        await new Promise(r => setTimeout(r, delay/2));
        main();
        userHasScrolled=false;
    }
}
async function main(){
for(var i = 0;i<likes.length;i++){
    var detect = likes[i].getElementsByClassName("_ab6-");
    likes[i].scrollIntoView();
    if(detect[0].getAttribute('aria-label')=='Like')likes[i].click();
}}