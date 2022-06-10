var nname="aruna"
var age=21
var hashobbies=true
const userdetails=(username,userage,userhobbies)=>
{
    return ("name is "+username+", user age is "+userage+", user has hobbies "+userhobbies);


}


const add=(a,b)=>{ return ("ghh "+a+" "+b); }
const add1=(a)=>"one aru "+'a';
const add2=() => 'no arguments '+(2+3);
console.log(add2());

console.log(add1(3));
console.log(add(3,7));
console.log(userdetails(nname,age,hashobbies));

const person={
    lname:"aruna",
    lage:21,
    greet:()=> {
        console.log("hello i am "+this.lname);// like variable

    }

};
person.greet();
//console.log(person());

const person1={
    lname:"aruna",
    lage:21,
    greet(){
        console.log("hello i am "+this.lname);//like method

    }

}
person1.greet();
const coppyarr={...person};
console.log(coppyarr);
