$(document).ready(function() {
    getallmovies(); ///ajax.js
    goTop();
    addColor();
    getfilter();
});

//ajax
function getimages(id, pic, name) { ///增加数据到页面上面  得到的是id 电影图片  电影名称
    let html = '';
    //console.log(id);
    html += "<div class='get1'><a  target='_blank' href=" + `${id}` + '>';
    // Image tag (preview in Wookmark are 200px wide, so we calculate the height based on that).
    html += `<img src=${pic}>`;
    // Image title.
    html += `<p>${name}</p>`;
    html += '</a></div>';
    $('#pubu').append(html);
}

function clearMovie() {
    //console.log('清除');
    $('#pubu').html('');
}