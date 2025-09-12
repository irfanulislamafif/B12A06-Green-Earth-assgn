# README  

### Q1: What is the difference between var, let, and const?  
- `var` is old, can re-declare and update.  
- `let` is new, can update but not re-declare in same scope.  
- `const` is also new, cannot update or re-declare, value fixed.  

---

### Q2: What is the difference between map(), forEach(), and filter()?  
- `map()` → return new array after work.  
- `forEach()` → only loop, no new array return.  
- `filter()` → return new array, only elements pass condition.  

---

### Q3: What are arrow functions in ES6?  
Arrow function is short way of function using `=>`.  
Example:  
```js
const add = (a, b) => a + b;
```  

---

### Q4: How does destructuring assignment work in ES6?  
It help to take value from array or object easy.  
```js
const arr = [1,2,3];
const [a,b] = arr;   // a=1, b=2

const user = {name:"Afif", age:22};
const {name, age} = user;
```  

---

### Q5: Explain template literals in ES6. How are they different from string concatenation?  
Template literals use backtick (`). It support multiline and variable insert `${}`.  
```js
let name = "Afif";
console.log(`Hello ${name}, how are you?`);
```  
String concatenation need `+` but template literals not need.  
