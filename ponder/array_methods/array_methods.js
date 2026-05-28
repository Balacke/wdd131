function convert(grade) {
    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points =3;
            break;
        case 'C':
            points =2;
            break
        case 'D':
            points = 1;
            break
        case 'F':
            points =0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}


const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
console.log(words);
console.log(words[2]);

let grades = [89, 39, 55, 100];
console.log(grades);
console.log(grades[3]);

words[3] = 'orange'
console.log(words)

// Objects
const studentName = [
    { last: 'Andrus', first: 'Aaron' },
    { last: 'Masa', first: 'Manny' },
    { last: 'Tanda', first: 'Tamanda' }
];
//this is an object 
let student = {
    name:"Blake Kenworthy",
    classes:["WDD131", "CSE111"],
    grades:[68,88] 
}
console.log(student.name, student.classes, student.grades)

words.forEach(word => {
   //runs this function 1 for evry element un the array one at a time
   console.log(word); 
});

let newWords = words.map((word) => {
    return word + "pinapple";
});

let filterWord = words.filter((word)=>{
    return word[0] === "a";
    
})

const numbers = [125, 20, 5];

document.getElementById("output").innerHTML = numbers.reduce(myFunc);

function myFunc(total, num) {
    return total - num;
}

const fruits = ["Banana", "Orange", "Apple", "Mango"];
let index = fruits.indexOf("Apple");


const car = { type: "Fiat", model: "500", color: "white" };   

