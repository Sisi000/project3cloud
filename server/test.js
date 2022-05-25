const n = 29351
function descendingOrder(n) {
    // console.log("n is", n)
    let myFunc = num => Number(num);
      var intArr = Array.from(String(n), myFunc);
       // console.log("arrayN is", arrayN)
    const highestnumber = intArr.sort()
    const reverseN = highestnumber.reverse()
    // console.log("reversed n", reverseN)
    const singleNUm = Number(reverseN.join(''))
    // console.log(singleNUm)
}
descendingOrder(n)