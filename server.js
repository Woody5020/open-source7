const express=require("express");
const app=express();

const { MongoClient }=require("mongodb");

let db;

const url="mongodb+srv://tyu3116:Drypmz0414!@chahee.kqlfsnn.mongodb.net/?retryWrites=true&w=majority&appName=chahee";

new MongoClient(url).connect().then(client => {
	db=client.db("opensource");

	app.listen(8080, () => {
		console.log("http://localhost:8080");
	});
}).catch(error => {
	console.log(error);
});

app.use(express.static(__dirname+"/public"));

app.set("view engine", "ejs");

const data=[
	{
		title: "Academy",
		path: "academy.png",
		alt: "academy",
		p: "비트코인 비주얼리제이션 워크숍",
		span: "2018.01.21(Sun) / 10:00-17:00"
	},
	{
		title: "Upcoming Project",
		path: "upcoming.png",
		alt: "upcoming",
		p: "Artist Talk Kyle Mcdonald",
		span: "2018.02.23(Fri) / 19:00-21:30"
	},
	{
		title: "Archive",
		path: "archive.png",
		alt: "archive",
		p: "People / Creator Database",
		span: "2018.02.23(Fri) / 19:00-21:30"
	}
];

app.get("/", async (request, response) => {
	let result=await db.collection("data1").find().toArray();

	if(result.length === 0){
		db.collection("data1").insertMany(data);

		response.send(`
			<script>
				location.reload();
			</script>
		`);
	}
	else{
		response.render("index.ejs", {items: result});
	}
});