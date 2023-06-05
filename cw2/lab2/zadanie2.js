"use strict";


var expect = chai.expect;
function sum(x, y) {
  return x + y;
}
describe('The sum() function', function () {
  it('Returns 4 for 2+2', function () {
    expect(sum(2, 2)).to.equal(4);
  });
  it('Returns 0 for -2+2', function () {
    expect(sum(-2, 2)).to.equal(0);
  });
});


function cyfry(napis) {
  var arr = [0, 0]
  for (let letter of napis) {
    let num = parseInt(letter);
    if (isNaN(num)) {
      continue;
    }
    if (letter % 2 == 0) {
      arr[0] = num + arr[0]
    }
    if (letter % 2 != 0) {
      arr[1] = num + arr[1]
    }
  }
  return arr;
}


function litery(napis) {
  var arr = [0, 0]
  for (let letter of napis) {
    if (parseInt(letter) >= 0) continue;
    if (letter == letter.toUpperCase() && letter != letter.toLowerCase()) {
      arr[1] += 1
      continue
    }
    else if (letter == letter.toLowerCase() && letter != letter.toUpperCase()) {
      arr[0] += 1
      continue
    }
  }
  return arr;
}

function suma(napis) {
  if (isNaN(parseInt(napis[0]))) {
    return 0;
  }
  return parseInt(napis);
}

function getData() {
  var res = window.prompt("Wczytaj napis");
  var prev = 0;
  while (res != null) {
    console.log(res);
    var r1 = cyfry(res);
    var r2 = litery(res);
    var r3 = prev + suma(res);
    prev = r3;
    console.log(r2)
    console.dir("\t" + r1 + "\t" + r2 + "\t" + r3);
    res = window.prompt("Wczytaj napis");
  }
}

describe('cyfry(), litery(), suma() test on "digits"', function () {
  it('cyfry("1234") = 10 -> [6,4] ', function () {
    expect(cyfry("1234")).deep.to.equal([6, 4]);
  });
  it('litery("1234") = [0,0] -> [0,0] ', function () {
    expect(litery("1234")).deep.to.equal([0, 0]);
  });
  it('suma("1234") = 1234 -> 1234 ', function () {
    expect(suma("1234")).to.equal(1234);
  });
});

describe('cyfry(), litery(), suma() test on "letters"', function () {
  it('cyfry("abcd") = [0,0] -> [0,0] ', function () {
    expect(cyfry("abcd")).deep.to.equal([0, 0]);
  });
  it('litery("abcd") = 4 -> [4, 0]', function () {
    expect(litery("abcd")).deep.to.equal([4, 0]);
  });
  it('suma("abcd") = 0 -> 0 ', function () {
    expect(suma("abcd")).to.equal(0);
  });
});

describe('cyfry(), litery(), suma() test on "letters and numbers behind"', function () {
  it('cyfry("abcd1234") = 10 -> [6,4] ', function () {
    expect(cyfry("abcd1234")).deep.to.equal([6, 4]);
  });
  it('litery("aBCd1234") = 4 -> [2, 2]', function () {
    expect(litery("aBCd1234")).deep.to.equal([2, 2]);
  });
  it('suma("abcd1234") = 0 -> does not start with digit ', function () {
    expect(suma("abcd1234")).to.equal(0);
  });
});

describe('cyfry(), litery(), suma() test on "numbers and letters behind"', function () {
  it('cyfry("1234abcd") = 10 -> [6,4] ', function () {
    expect(cyfry("1234abcd")).deep.to.equal([6, 4]);
  });
  it('litery("1234abcd") = 4 -> [4, 0]', function () {
    expect(litery("1234abcd")).deep.to.equal([4, 0]);
  });
  it('suma("1234abcd") = 1234 -> starts with 1234 ', function () {
    expect(suma("1234abcd")).to.equal(1234);
  });
});

describe('cyfry(), litery(), suma() test on "empty string"', function () {
  it('cyfry("") = [0,0] -> [0,0] ', function () {
    expect(cyfry("")).to.deep.equal([0, 0]);
  });
  it('litery("1234abcd") = [0,0] -> [0,0] letters', function () {
    expect(litery("")).to.deep.equal([0, 0]);
  });
  it('suma("") = 0 -> 0 ', function () {
    expect(suma("")).to.equal(0);
  });
});