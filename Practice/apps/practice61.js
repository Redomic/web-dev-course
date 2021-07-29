// Leave the next line, the form must be assigned to a variable named 'form' in order for the exercise test to pass
const form = document.querySelector('form');

const ul = document.querySelector('#list');

form.addEventListener('submit', function (e) {
    e.preventDefault();
   
   const productValue = form.elements.product.value;
   const qtyValue = form.elements.qty.value;
   
   let newLi = document.createElement('li');
   newLi.append(`${qtyValue} ${productValue}`);
   
   ul.append(newLi);
});