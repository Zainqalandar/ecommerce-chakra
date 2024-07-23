/* const numbers = [11, 12, 13, 14, 15, 16];

const sum = numbers.reduce((accumulator, currentValue) => {
    console.log('accumulator', accumulator)
    console.log('currentValue', currentValue)
    console.log('Calculation: ', accumulator + currentValue , 'accumulator', accumulator, ' + ',  'currentValue', currentValue )
  return accumulator + currentValue;
});

console.log('sum: ', sum); // Output: 15
*/



const fruits = ['apple', 'banana', 'orange', 'apple', 'orange', 'banana', 'banana'];

const countOccurrences = fruits.reduce((accumulator, currentValue, index) => {

    accumulator[index + 1] = currentValue

    return accumulator

}, {})

console.log('countOccurrences', countOccurrences)

// let Person = {
//     name: 'Zain',
//     name: 'Qalndar'
// }

// console.log('Person', Person)

