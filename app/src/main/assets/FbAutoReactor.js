//Facebook AutoReactor - only works in m.facebook.com site

var posts;
var currentPost = null;
var cancel;
var delay = 3000;//change this parameter to change speed, 1000+
var autoscroll = false;//change this parameter to true if running on pc and you need autoscrolling
var userHasScrolled = false;
window.onscroll = async function (e){
    //Ad remover
    var allpost = document.getElementsByClassName('_55wo _5rgr _5gh8 async_like')
    for(var i = 0 ; i<allpost.length;i++){
        var ads = allpost[i].getElementsByTagName('iframe')
        var suggested = allpost[i].getElementsByClassName('_52jh _5rgs _78cx _5sg5')
        if(ads.length>0 || suggested.length>0){
            console.log("ad removed")
            allpost[i].remove();
        }
    }
    if(!userHasScrolled){
        userHasScrolled = true;
        await new Promise(r => setTimeout(r, delay/3));
        posts = document.getElementsByClassName("_2ip_ _4b44");
        main();
        userHasScrolled=false;
    }
}
async function main(){
    var antiban = document.getElementsByClassName("btn btnC mfss touchable");
    for(var i=0;i<antiban.length;i++)
    {
        antiban[i].click();
    }
    for(var i=0;i<posts.length;i++)
{
    cancel=false;
    await new Promise(r => setTimeout(r, delay-500));
	var footer = posts[i].getElementsByClassName("_qfz");
    var Like = posts[i].getElementsByClassName("_15ko _77li touchable _77la");
    if(Like.length>0)continue;
    var Like = posts[i].getElementsByClassName("_15ko _77li touchable _77ld");
    if(Like.length>0)continue;
    for(var j=0;j<footer.length;j++)
{
    var reacts = footer[j].getElementsByClassName("_1g05 _77lc");
    console.log(reacts[0]);
    var react = reacts[0].getElementsByClassName("img img _2sxw");
    if(autoscroll)reacts[0].scrollIntoView();
    currentPost = posts[i].getElementsByClassName("_15ko _77li touchable");
    if(react.length>0){
        console.log('type 1 ');
        console.log(react[0]);
        var text = react[0].getAttribute('aria-label');
        switch(text){
            case "Like":
                await new Promise(r => setTimeout(r, 500));
                if(currentPost!=null){
                    currentPost[0].click();
                }else{
                    console.log("currentpost null");
                    continue;
                }
                break;
            default:
                doWork(currentPost[0],text);
            }
    }else{
        console.log('type 2 ');
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_3a00ef");//Like
        if(react.length>0&&(!cancel)){
            cancel=true;
            await new Promise(r => setTimeout(r, 500));
            currentPost[0].click();
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_716310");//Like
        if(react.length>0&&(!cancel)){
            cancel=true;
            await new Promise(r => setTimeout(r, 500));
            currentPost[0].click();
        }
        react = reacts[0].getElementsByClassName("img sp_lxf6_rG7r2M_3x sx_46c3dd");//Like
        if(react.length>0&&(!cancel)){
            cancel=true;
            await new Promise(r => setTimeout(r, 500));
            currentPost[0].click();
        }
        react = reacts[0].getElementsByClassName("img sp_sGhACmhJ9lV_3x sx_601d24");//Like
        if(react.length>0&&(!cancel)){
            cancel=true;
            await new Promise(r => setTimeout(r, 500));
            currentPost[0].click();
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_f21116");//Love
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Love";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_a32706");//Love
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Love";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_lxf6_rG7r2M_3x sx_1d3d1d");//Love
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Love";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_sGhACmhJ9lV_3x sx_86d392");//Love
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Love";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_d8e63d");//Care
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Care";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_0eda15");//Care
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Care";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_lxf6_rG7r2M_3x sx_8a97ee");//Care
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Care";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_ce3068");//Haha
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Haha";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_0c2c05");//Haha
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Haha";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_lxf6_rG7r2M_3x sx_748c98");//Haha
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Haha";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_sGhACmhJ9lV_3x sx_42b6a4");//Haha
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Haha";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_d80e3a");//Wow
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Wow";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_24d515");//Wow
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Wow";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_sGhACmhJ9lV_3x sx_396d78");//Wow
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Wow";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_c3ed6c");//Sad
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Sad";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_3edce4");//Sad
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Sad";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn sx_199220");//Angry
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Angry";
            doWork(currentPost[0],text);
        }
        react = reacts[0].getElementsByClassName("img sp_LdwxfpG67Bn_3x sx_9518ce");//Angry
        if(react.length>0&&(!cancel)){
            cancel=true;
            var text = "Angry";
            doWork(currentPost[0],text);
        }
    }
}
if(i==posts.length-1&&autoscroll){
    await new Promise(r => setTimeout(r, delay));
    main();
}
}
}
async function sendTouchEvent(x, y, element, eventType) {
    const touchObj = new Touch({
      identifier: Date.now(),
      target: element,
      clientX: x,
      clientY: y,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5,
    });

    const touchEvent = new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj],
      shiftKey: true,
    });
    element.dispatchEvent(touchEvent);
  }
async function sendReact(type){
    var posts = document.getElementsByClassName("_4g34 _1-kd");
    for(var i=0;i<posts.length;i++)
    {
        if(posts[i].getAttribute('aria-label')==type)
        {
            posts[i].click();
        }
    }
  }
async function doWork(element,text){
    sendTouchEvent(0,0,element,'touchstart');
    await new Promise(r => setTimeout(r, 500));
    sendReact(text);
}
