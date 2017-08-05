function getallmovies() { ///获取所有电影列表
    let url = 'http://127.0.0.1:8081/getAllMovie';

    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            //将Jdata转化为对象数组
            for (let i = 0; i < data.length; i++) {
                //增加电影到页面上面
                let id = './single.html?id=' + data[i].id; ///将id改变
                let pic = data[i].pic;
                let name = data[i].name;
                //console.log(id);
                getimages(id, pic, name); //bupuliu.js
            }

        },
        complete: function() {
            console.log('complete');
        },
        error: function(error) {
            console.log(error);
        }
    });

}

function gethomemovies() { //获取首页三个电影
    let url = '/siwo/movies/';
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {

        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });
}


function getsearchmovie() { //通过搜索名称返回数据
    clearMovie(); ///删除原来的页面
    let name = $('.search #input')[0].value; //返回一个数组
    console.log(name);
    let url = 'http://127.0.0.1:8081/getMovieByName/?name=' + name;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {

            console.log(data);
            if (data == []) { //如果查找内容为空
                alert(`电影${name}未找到`)
            } else {
                console.log('get data ...'); ///获得查找的内容
                data = JSON.parse(data);
                for (let i = 0; i < data.length; i++) {
                    let id = './single.html?id=' + data[i].id; ///将id改变
                    let pic = data[i].pic;
                    let name = data[i].name;
                    getimages(id, pic, name); ///bululiu.js
                }
            }
        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });
}


function getfiltermovie(filterArr) { //通过标签进行选择电影
    console.log(filterArr);
    let url = `http://127.0.0.1:8081/get/Movie/ByYearTypeArea?type=${filterArr[0]}&area=${filterArr[1]}&year=${filterArr[2]}`;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            //console.log(data);
            clearMovie();
            if (data == '') { //如果查找内容为空
                alert(`电影${name}未找到`);
            } else {
                for (let i = 0; i < data.length; i++) {
                    let id = './single.html?id=' + data[i].id; ///将id改变
                    let pic = data[i].pic; //电影图片
                    let name = data[i].name; //电影名称
                    //console.log('找到数据');
                    getimages(id, pic, name); ///bululiu.js
                }
            }
        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });
}

function getMovieDetail(id) { ///得到的数据是通过传输获得的电影的id,
    let url = 'http://127.0.0.1:8081/getMovieById?id=' + id;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) { ///得到一个电影对象
            //do something
            //console.log(data);
            renderDetail(data); ///render.js
        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });
}

function getRecommendation(type) {
    let url = 'http://127.0.0.1:8081/getMovieByType?type=' + type;
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) { ///得到一个电影对象
            //renderDetail(data); ///render.js
            //渲染推荐内容
            rederReconmmendation(data);
        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });
}