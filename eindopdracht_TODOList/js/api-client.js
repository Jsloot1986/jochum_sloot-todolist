//put the url in a variable.
const url = 'https://jsonbox.io/box_9b96563e383102b82598';


//make the function POST to add things in the TO DO list
async function postTaskToList() {
    try { method = {
        method: "POST",
        body: JSON.stringify({ description: description, done: false}),
        headers:{
            "Content-Type":"application/json",
        },
    };
    await fetch(url, method)
    }catch (err){console.log(err)}
    };

//make the function PUT to change things in the TO DO list
// for changing you have to use the id of the item

async function putTaskToList(id, done, description) {
    try { method = {
        method: "PUT",
        body: JSON.stringify({description: description, done: done}),
        headers: {
            "Content-Type":"application/json",
        },
    };
    str = url + "/" + id;
    await fetch(str, method)
    } catch (err) {console.log(err)}
};

//make a function to DELETE things from the TO DO list

async function deleteTaskFromList(id) {
    try{ method ={
        method: "DELETE"
    };
    str = url + "/" + id;
    await fetch(str, method);
    }catch (err) {console.log (err)}
};


// collect the new tasks

async function collectTasks(){
    try{
        let text = await fetch(url);
        let result = await text.json();
        return result;
    } catch (err) {console.log(err)}
};