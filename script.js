const firstInput = document.querySelector(".enter-first-input");
const firstEle = document.querySelector(".input1");
const secondEle = document.querySelector(".input2");
const answerEle = document.querySelector(".answer");

//format by 3 or by 5
const formatBy3Ele = document.querySelector(".format-by3");
const formatBy5Ele = document.querySelector(".format-by5");
const formatByAnyValueEle = document.querySelector(".format-by-any-value");

//input values in text area

firstInput.addEventListener("click", (event) => {
  let num1 = firstEle.value;
  let num2 = secondEle.value;
  console.log("numbers before cleaning", num1, ".... ", num2);
  console.log("hello");
  if (num1[0] === "0") num1 = cleanfirstNullDigits(num1);
  if (num2[0] === "0") num2 = cleanfirstNullDigits(num2);

  console.log("numbers after cleaning", num1, ".... ", num2);

  console.log("hello");

  if (formatBy3Ele.checked === true) {
    formatBy5Ele.checked = false;
    console.log("# is checkd");
    firstEle.value = reformatTheNumber(num1, 3);
    secondEle.value = reformatTheNumber(num2, 3);
  } else if (formatBy5Ele.checked === true) {
    formatBy3Ele.checked = false;
    firstEle.value = reformatTheNumber(num1, 5);
    secondEle.value = reformatTheNumber(num2, 5);
  } else {
    const formatParameter = formatByAnyValueEle.value;
    // formatByAnyValueEle
    console.log("paramter P:", formatParameter);
    if (formatParameter > 1) {
      firstEle.value = reformatTheNumber(num1, formatParameter);
      secondEle.value = reformatTheNumber(num2, formatParameter);
    }
  }
  console.log("**************************************");
  console.log(num1, typeof num1);
  const num1Array = stringNumberToArray(num1);
  const num2Array = stringNumberToArray(num2);

  console.log(num1Array);
  console.log(num2Array);

  console.log("............P s e u d o  S u m.............................");
  const firstValue = fromStringArrayToNumberArray(num1Array);
  const secondValue = fromStringArrayToNumberArray(num2Array);
  const pseudoSumValue = pseudoSum(firstValue, secondValue);
  console.log(".... Pseudo value: ", pseudoSumValue);
  const result = carryPropagation(pseudoSumValue);
  console.log("...... so the sum is: ", result);

  const additionResult = fromNumberArrayToString(result); //This is not necessary
  console.log(
    "............. Final Result ........ ",
    additionResult,
    typeof additionResult
  );

  if (formatBy3Ele.checked === true) {
    answerEle.value = reformatTheNumber(String(additionResult), 3);
  } else if (formatBy5Ele.checked === true) {
    answerEle.value = reformatTheNumber(String(additionResult), 5);
  } else if (formatByAnyValueEle.value > 1) {
    // const formatParameter = formatByAnyValueEle.value;
    answerEle.value = reformatTheNumber(
      String(additionResult),
      formatByAnyValueEle.value
    );
  } else {
    answerEle.value = additionResult;
    firstEle.value = num1;
    secondEle.value = num2;
    console.log(" -----> num1: ", num1, "num2", num2);
  }

  // // const formatParameter = formatByAnyValueEle.value;
  // answerEle.value = reformatTheNumber(
  //   String(additionResult),
  //   formatParameter

  event.preventDefault();
});

const stringNumberToArray = (a) => a.split("").filter((x) => x != " ");
const fromNumberArrayToNumber = (a) => Number(a.map((x) => String(x)).join(""));
const fromNumberArrayToString = (a) => a.map((x) => String(x)).join("");
//*************************************************************
// map an array of string to an arrays of numbers
// ['1', '2', '3'] ==> [1, 2, 3]
//*************************************************************
const fromStringArrayToNumberArray = (a) => a.map((x) => Number(x));

function reformatTheNumber(a, d) {
  const b = stringNumberToArray(a);

  console.log(" *** b : ", b);
  const b_length = b.length;
  const firstPart = b_length % d;
  console.log(b_length, firstPart);
  let num = "";
  if (firstPart > 0) {
    for (let i = 0; i < firstPart; i++) num += `${b[i]}`;
    num += " ";
  }

  for (let i = firstPart; i < b_length; i++) {
    num += `${b[i]}`;
    if ((i - firstPart) % d === d - 1) num += " ";
  }
  console.log(num);
  return num;
}

//Resize the 2 arrays at the same size
function reSize(a, m) {
  let c = Array(m).fill(0);
  return c.concat(a);
}

//*************************************************************
// Adding 2 arrays
//*************************************************************
function add2Arrays(a, b) {
  return a.map((x, i) => x + b[i]);
}

//*************************************************************
//This is a pseudo sum. It adds 2 arrrays (inputs) and returns
// an array as output. Ex [9, 9] + [7, 3] = [16, 12].
// But before, it call a function reSize(array, m) to make the 2
// input arrays same size
// ex: a = [1, 2, 5, 0, 7], b = [9, 9] m = 5-2 = 3,
//so b will be resized as: b = [0, 0, 0, 9, 9]
//*************************************************************
function pseudoSum(arr1, arr2) {
  let m = arr1.length - arr2.length;
  //resize the smallest(size) array

  arr = m > 0 ? reSize(arr2, m) : reSize(arr1, Math.abs(m));
  return m > 0 ? add2Arrays(arr1, arr) : add2Arrays(arr, arr2);
}

//*************************************************************
// Propagate the carry and return an array:
// Input is the array from pseudoSum and propagate the carry
//*************************************************************
// Propagate the carry
function carryPropagation(a) {
  let carry = 0;
  let result = [];
  for (let i = a.length - 1; i >= 0; i--) {
    // console.log(` ** ${i}:  ${carry}`);
    result[i] = ((a[i] % 10) + carry) % 10;
    carry = ~~((a[i] + carry) / 10);
  }
  console.log(" >>>>>>>>> inside carry Propagation before unshift", result);
  if (carry !== 0) result.unshift(carry);
  console.log(" >>>>>>>>> inside carry Propagation after unshift", result);
  return result;
}

"00 0 11 0 2"
  .split("")
  .filter((x) => typeof Number(x) === "number" && x !== " ");
// ['0', '0', '0', '1', '1', '0', '2']

function cleanInputNumber(n) {
  return n.split("").filter((x) => x !== " " && x + 1 !== "0");
}

function cleanfirstNullDigits(a) {
  let index = 0;
  let j = 0;
  while (a[index] === "0" && a[index + 1] === "0") {
    j = index + 1;
    index += 1;
  }
  return a.slice(j + 1);
}
