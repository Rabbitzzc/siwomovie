'use strict'
const express = require('express');
const orm = require('orm')
const mysql = require("mysql");
const app = express();
const bodyParser = require('body-parser');
const SQL_URL = "mysql://root:@localhost:3306/TWsql"
app.use(bodyParser.json({ limit: '1mb' })); //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ extended: true })); //此项必须在 bodyParser.json 下面,为参数编码
app.listen(8081)
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        /让options请求快速返回/
    } else {
        next();
    }
});
app.use(orm.express(SQL_URL, {
    define: function(db, models, next) {
        models.Movieactors = db.define("movieactors", {
            actorid: { type: "integer", key: true, unique: false },
            movieid: { type: "integer", key: true, unique: false }
        });
        models.Movie = db.define("movie", {
            id: Number,
            name: String,
            summary: String,
            area: String,
            pic: String,
            lauguage: String,
            directors: String,
            score: Number,
            year: String
        });
        models.Type = db.define("type", {
            id: Number,
            name: String
        });

        models.Type.hasMany('movies', models.Movie, { why: String }, { reverse: 'types', key: true })

        models.Actors = db.define("actors", {
            id: Number,
            name: String,
            pic: String
        });
        models.Type_movies = db.define("type_movies", {
            type_id: { type: "integer", key: true, unique: false },
        });


        db.sync()
        next();
    }

}));

//获取全部电影信息
app.get("/getAllMovie", function(req, res) {
    req.models.Movie.find(function(err, movie) {
        if (err) {
            res.send(err);
        } else {
            res.send(movie);
        }
    });
});
//根据ID获取电影信息
app.get("/getMovieById", function(req, res) {
    let data = req.query.id;
    req.models.Movie.find({ "id": data }, function(err, movie) {
        if (err) {
            res.send(err);
        } else {
            getTypeByMovieId(movie, req, res)
                //  res.send(JSON.stringify(movie));
        }
    });

});
//模糊查询
app.get("/getMovieByName", function(req, res) {
    let data = req.query.name;
    // console.log(data)
    req.models.Movie.find({ "name": orm.like("%" + data + "%") }, function(err, movie) {
        if (err) {
            res.send(err);
        } else {
            res.send(JSON.stringify(movie));
        }
    });

});
//根据年份/类型/地区查询
app.get("/get/Movie/ByYearTypeArea", function(req, res) {
    let data = req.query;
    let type = data.type;
    let year = data.year;
    let area = data.area;
    console.log(data);
    let yAnda = {};
    if (year != "") {
        yAnda.year = year;
    }
    if (area != "") {
        yAnda.area = orm.like("%" + area + "%");
    }
    if (type == null) {
        getMovieByYearArea(req, res, yAnda)
    } else {
        ByType(req, res, type, yAnda)
    }
});

//根据年份或地区查找
function getMovieByYearArea(req, res, yAnda) {
    req.models.Movie.find(yAnda, function(err, movie) {
        if (err) {
            res.send(err);
        } else {
            res.send(movie)
        }
    })
}

//  req.models.Type(10001).getMovies().order("score").run(function (err,movies) {
// movies;
// })

//根据类型和其他查询
function ByType(req, res, type, yAnda) {
    req.models.Type.find({ name: type }, function(err, id) {
        if (id === undefined) {
            res.send('')
        } else {
            req.models.Type.find({ id: id[0].id }, function(err, types) {
                types[0].getMovies(yAnda, function(err, movies) {
                    console.log(movies)
                    res.send(movies)
                })
            });
        }
    });
}

//获取演员
function getActors(id, req, res) {
    req.models.Movieactors.find({ movieid: id }, function(err, actorid) {
        if (err) {
            res.send(err);
        } else {
            let actorIds = []
            for (let a of actorid) {
                actorIds.push({ id: a.actorid })
            }
            req.models.Actors.find({ or: actorIds }, function(err, actorname) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(actorname)
                }
            })
        }
    })
}

//通过类型查找电影3个推荐电影
app.get("/getMovieByType", function(req, res) {
    let data = req.query.type;
    req.models.Type.find({ name: data }, function(err, id) {
        req.models.Type.find({ id: id[0].id }, function(err, types) {
            types[0].getMovies(4, function(err, movies) {
                res.send(movies)
            })
        });
    });
});

//讲movieid转换为id
function movieidMakeId(movieid, year, area) {
    let ids = []
    for (let mid of movieid) {
        ids.push({ id: mid.movieid });
    }
    ids.push({ year: year });
    ids.push({ area: area });
    return ids;
}
app.get("/getType/ByMovieId", function(req, res) {
    let data = req.query.movieid;
    req.models.Type_movies.find({ movies_id: data }, function(err, type) {
        if (err) {
            res.send(err);
        } else {

            req.models.Type.find({ or: type_idchengid(type) }, function(err, typename) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(typename);
                }
            })
        }
    })
})

function type_idchengid(type) {
    let ids = []
    for (let t of type) {
        ids.push({ id: t.type_id });
    }
    return ids;
}

function getTypeByMovieId(movies, req, res) {
    console.log(movies[0].id)
    req.models.Type_movies.find({ movies_id: movies[0].id }, function(err, type) {
        if (err) {
            res.send(err);
        } else {
            req.models.Type.find({ or: type_idchengid(type) }, function(err, typename) {
                if (err) {
                    res.send(err);
                } else {
                    let a = ""
                    for (let tname of typename) {
                        a += tname.name + " "
                    }
                    //console.log(a);
                    movies[0].type = a;
                    console.log(movies);
                    res.send(movies);
                }
            })
        }
    })


}

function type_idchengid(type) {
    let ids = []
    for (let t of type) {
        ids.push({ id: t.type_id });
    }
    return ids;
}