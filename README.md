## Addition of 2 large integer numbers

This small application consists of adding 2 integers numbers no matter their size (no matters how many digits are in the numbers). The answer is the exact value, obtained without rounding to unlimited precision or by using scientific notation form.

Usually calculators are limited to 20 digits which is $2^{64} -1$. And for JavaScript the safe max value is given by $2^{53} - 1$.

The following describes different steps:

### Step 1: Transform the numbers to an array of string

The numbers are stored in array of string.

### Step 2: Pseudo sum

We perform a pseudo addition which consists of adding the two arrays together without taking care of the carry.

### Step 3: Carry Propagation

Propagate the carry in the array obtained from the pseudo sum by starting from the last index to the first index corresponding to last digit to the first digit.

To make it easy to read the large numbers, we reformat the numbers by 3 or by 5 or by any value p (i.e for example by 10 and so on).
