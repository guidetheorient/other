function setRouter(app){ 
 var router = app; 

app.get('/loadMore',function(req,res){
	var index = req.query.index
	var length = req.query.length
    
    var workImgAndInfo = []
    workImgAndInfo[0] = ['src/img/portfolio/xmen2000.jpg','X-MEN',2000]
    workImgAndInfo[1] = ['src/img/portfolio/xmen2003-1.jpg','X2',2003]
    workImgAndInfo[2] = ['src/img/portfolio/xmen2006.jpg','X-Men: The Last Stand',2006]
    workImgAndInfo[3] = ['src/img/portfolio/xmen2009.jpg','X-Men Origins: Wolverine',2009]
    workImgAndInfo[4] = ['src/img/portfolio/xmen2011.jpg','X-Men: First Class',2011]
    workImgAndInfo[5] = ['src/img/portfolio/xmen2013.jpg','The Wolverine',2013]
    workImgAndInfo[6] = ['src/img/portfolio/xmen2014.jpg','X-Men: Days of Future Past',2014] 
    workImgAndInfo[7] = ['src/img/portfolio/deadpool.jpg','Deadpool',2016]
    workImgAndInfo[8] = ['src/img/portfolio/xmen2016.jpg','X-Men: Apocalypse',2016]
    workImgAndInfo[9] = ['src/img/portfolio/xmen2017.jpg','Logan',2017]

	var data = []

	for(var i=0;i<length;i++){
        var work = workImgAndInfo[i+Number(index)]
		data.push([work[0],work[1],work[2]])
	}
    res.send(data)
})}
 module.exports.setRouter = setRouter