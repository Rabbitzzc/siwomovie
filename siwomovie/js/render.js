function renderDetail(data) { /// by ajax getDetail
    let mp = $('#abstract').children();
    //console.log(mp);
    //console.log(data[0])
    console.log(typeof data)

    console.log(data[0]);
    mp[0].childNodes[1].innerHTML = data[0].name;
    mp[1].childNodes[1].innerHTML = data[0].directors;
    mp[2].childNodes[1].innerHTML = data[0].actors;
    //mp[3].childNodes[1].innerHTML = data[0].language;
    mp[4].childNodes[1].innerHTML = '中文 英文';
    mp[3].childNodes[1].innerHTML = data[0].year;
    mp[5].childNodes[1].innerHTML = data[0].area;
    mp[6].childNodes[1].innerHTML = data[0].type;


    let pic = data[0].pic;
    //let pic = 'https://upload.wikimedia.org/wikipedia/zh/thumb/c/c5/Where_are_we_going_Dad_Post.jpg/250px-Where_are_we_going_Dad_Post.jpg';
    let sometext = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + data[0].summary;
    $('#movierating').html(data[0].score);
    $('#storyAbstract').html(sometext);
    $('#movieimg').attr('src', pic);

    let type = data[0].type.split(' ');
    console.log(type[0]);
    getRecommendation(type[0]); //添加推荐内容  ajax.js
}



function getimages2(id, pic, name) { ///增加数据到页面上面  得到的是id 电影图片  电影名称 推荐内容
    let html = '';
    //console.log(id);
    html += `<div class="movie_img"><div class="grig_2"><a href="${id}">`;
    // Image tag (preview in Wookmark are 200px wide, so we calculate the height based on that).
    html += `<img src=${pic} class="img-responsive" alt="" style="width:250px; height:230px;">`;
    // Image title.
    html += `<div class="caption1">`;
    html += '</div></a></div></div>';
    html += `<div style="margin-top:-15px;"><p style="text-align:center; color:black; font-size:20px; font-weight:30pt; font-family: 'Sedgwick Ave Display', cursive;"> ${name}</p></div><br>`;
    $('#tuijian').append(html);
}

function rederReconmmendation(data) {
    $('#tuijian').empty();
    for (let i = 1; i < 4; i++) {
        let id = './single.html?id=' + data[i].id; ///将id改变
        let pic = data[i].pic; //电影图片
        let name = data[i].name; //电影名称
        getimages2(id, pic, name);
    }

}