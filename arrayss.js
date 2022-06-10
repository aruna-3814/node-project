const hobbies=['sports', 'cooking' , 1, true];
console.log(hobbies);
const hobbies1=['sports', 'cooking'];
console.log(hobbies1.map(hobby => 'hobby: '+hobby));
console.log(hobbies);


hobbies.push("programming");
console.log(hobbies);
//...................spread
const coppiedarray=hobbies.slice();//coppy
console.log(coppiedarray);
const ca1=[hobbies];
console.log(ca1);
const ca2={...hobbies};//coppy with spread
console.log(ca2);
//.....................rest
const rest1=(...args)=>{
return args;
};
console.log(rest1(1,3,6,7));


//...............destructing
const person={
    lname:"aruna",
    lage:21,
    greet(){
        console.log("hello i am "+this.lname);// like 

    }

};
person.greet();
const printame= (person) => {
    console.log("jj"+person.lname);//by method name
}
printame(person);


const pn=({lname}) => {
    console.log(lname);// with particular variable of a method
}
pn(person);

const {lname,lage}=person;// destructuing by method with variables
console.log(lname,lage);
  const [hobby1,hobby2]=hobbies;//by variables
  console.log(hobby1,hobby2);


[a,b,...d]=[10,20,30,40,90];//variable and rest
console.log(a);
console.log(b);
console.log(...d);
