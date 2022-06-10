/*setTimeout(()=>{
    console.log("timer is done!");
},2000);
console.log("done!");
console.log("timer");


const fetchdata= callback => {
    setTimeout(()=>{
        callback('done!');
    },10000);
}

setTimeout( () =>{
    console.log("timer is done!");
    fetchdata(text=>{
    console.log(text);
    });
},2000);
console.log("hello!");
console.log("timer");*/




const fetchdata= callback => {
    const promise = new Promise((resolve,reject ) => {
    setTimeout(()=>{
        resolve('done!:::::');
    },10000);
});
return promise;
};

setTimeout( () =>{
    
    console.log("timer is done!");
    fetchdata()
    .then(text=>{
    console.log(text);
    return fetchdata();
    })  
    .then (text2=>{
        console.log(text2);  
    });
},2000);
console.log("hello!");
console.log("timer");





 