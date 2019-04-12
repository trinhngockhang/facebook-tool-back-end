var express = require('express');
const autoCmt = require('./auto-comment/index');
const autoPost = require('./auto-post/index');
var app = express();
var path = require("path");
const bodyParser = require ('body-parser');
app.set("view engine","ejs");
app.set("vỉews","./views");
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
}));

app.get('/',async (req,res) =>{
	var access_token = "EAACNEi1FQSsBAK11O2EaWy0Ao7TD15ljNjeNCcyXw1ZCNqWstop9coT7lbYVgQPzaHasIwH2K6GO4wtaM7it0ZCdrciL29p8eMQHL6uZCRFXnvCU8x61jfq3q0LzVVCKRwMlVGx3bxJPH84nOqvuPVl45QBuBqTsuivgMpFAueTn5HYz4pvQ8IXoxHDUV1SHNBNC4hOPwZDZD";
	var id = await autoCmt.getIdPage(access_token);
	var listPost = await autoCmt.getPostPage(access_token, id);
	setTimeout(() => console.log("abc"),7000);
	console.log(listPost);
	res.send(listPost);
})

app.post('/auto-post', async (req, res) => {
	console.log(req.body);
	const { access_token, message, time } = req.body;
	var id = await autoCmt.getIdPage(access_token);
	setTimeout(async () => {await autoPost.autoPost(id, access_token, message)}, time);
	res.send("ok");
})

app.get('/cv',(req,res) =>{
	//res.sendFile(path.join(__dirname, '../public', 'CV_TrinhKhang.pdf'));
	res.sendFile(`${__dirname}/public/CV_TrinhKhang.pdf`);
})

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server listening on ${PORT}`);
});
