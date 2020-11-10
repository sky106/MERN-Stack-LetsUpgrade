
let superheroes = [
    {
        id: 1,
        name: "Thor",
        age: 1500,
        planet: "Asgard",
        weapons: "Stormbreaker"
    },

    {
        id: 2,
        name: "Hulk",
        age: 90,
        planet: "Sakaar",
        weapons: "Superhuman Strength"
    },

    {
        id: 3,
        name: "Ironman",
        age: 45,
        planet: "Earth",
        weapons: "Iron Man Suit"
    },

    {
        id: 4,
        name: "Captain America",
        age: 50,
        planet: "Earth",
        weapons: "Shield"
    },

    {
        id: 5,
        name: "Spider-Man",
        age: 35,
        planet: "Earth",
        weapons: "Web-Shooter"
    }
]

// console.log(superheroes)
const http = require('http');

const url = require('url');


const server = http.createServer((req,res)=>{

    const path = url.parse(req.url,true);
    // console.log(path);
    console.log(req.method);

    res.writeHead(200,{                           // this headers will be applicable to all 
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "*",
        "Content-Type":"application/json"
    });

    if(path.pathname == "/" || path.pathname == "/superheroes"){
        res.end(JSON.stringify(superheroes));
    }

    else if(path.pathname == "/superhero"){

        if(req.method == "OPTIONS"){
            res.end();
        }

        // fetch details of superheroes
        else if(req.method == "GET"){
            
            const id = path.query.id;
            console.log(id);

            const singleHero = superheroes.find((ele)=>{
                return ele.id == id;
            });

            res.end(JSON.stringify(singleHero));
        }

        // create or add a new superhero
        else if(req.method == "POST"){

            let body = "";
            req.on("data",(data)=>{
                body += data;
            })

            req.on("end",()=>{
                let newSuperhero = JSON.parse(body);
                superheroes.push(newSuperhero);
                console.log(superheroes);

                res.end(JSON.stringify({message:"superhero added"}));

            })

        }

        // update the existing superhero
        else if(req.method == "PUT"){

            // product id
            const id = path.query.id;

            //product data
            let body = "";
            req.on("data",(data)=>{
                body += data;
            })

            req.on("end",()=>{
                let updatedSuperhero = JSON.parse(body);
                console.log(updatedSuperhero);

                superheroes.forEach((ele)=>{
                    if(ele.id == id){
                    
                        ele.id = updatedSuperhero.id;
                        ele.name = updatedSuperhero.name;
                        ele.age = updatedSuperhero.age;
                        ele.planet = updatedSuperhero.planet;
                        ele.weapons = updatedSuperhero.weapons;

                    }           
                })
                console.log(superheroes);         
                res.end(JSON.stringify({message:"superhero updated"}));
            })
        }

        // delete a superhero 
        else if(req.method == "DELETE"){

            // product id
            const id = path.query.id;

            superheroes.forEach((ele,index)=>{

                if(ele.id == id){
                    superheroes.splice(index,1);
                }
            })
            console.log(superheroes);
            res.end(JSON.stringify({message:"superhero deleted"}));
        }
    }

    else{
        res.statusCode = 404;
        res.end(JSON.stringify({message:"Not Found Anything for this URL"}));
    }
})


server.listen("3000","127.0.0.2",()=>{

    console.log("server is running");
})