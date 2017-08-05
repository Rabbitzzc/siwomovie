//commentlist  = id
function GetComments() {
    let imgurl = ''; //图片地址
    $comment = $('#mycomment');
    $name = $('#myname');
    let myDate = new Date();
    let time = myDate.toLocaleString();
    //console.log($name.val());
    if ($comment.val() === 'Comments') alert('随便说点什么吧');
    if ($name.val() === 'yourname:') alert('请填写您的昵称');

    let html = `<div><div class="pimg"><img src="./images/1/title.jpg"><h4>${$name.val()} : <i style="font-size:10px;">${time}</i></h4></div><div class="ptext"><p>${$comment.val()}</p></div></div><br>`
    $('#commentlist').prepend(html);
    // commentlist.innerHTML = htmlstring;
}