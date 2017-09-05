const imgLink = document.querySelector('#img-link');
const btnFind = document.querySelector('#find');
const result = document.querySelector('.result');
const resultLink = document.querySelector('#result-link');
const imgLinkRegex = /(\w+)\.\w+$/;

btnFind.addEventListener('click', e => {

    result.classList.remove('show');
    resultLink.href = '#';

    const link = imgLink.value;
    if (!link) {
        alert('Image link cannot be empty.');
        return;
    }
    if (!imgLinkRegex.test(link)) {
        alert('Image link format error.');
        return;
    }

    const accountEncoded = link.match(imgLinkRegex)[1];
    let radix = 16;
    let decoded = 0;
    if (/^00/.test(accountEncoded)) {
        radix = 62;
    }
    decoded = toDec(accountEncoded.slice(0, 8), radix);
    
    if (decoded) {
        result.classList.add('show');
        resultLink.href = `http://weibo.com/u/${decoded}`;
        console.log(`http://weibo.com/u/${decoded}`);
    }
    
});

imgLink.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        btnFind.click();
    }
});

function toDec (number, originalRadix) {
    const radix = parseInt(originalRadix, 10);
    if (radix >= 2 && radix <= 36) {
        return parseInt(number, radix);
    }
    const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let sum = 0, i = 0;
    number.split('').reverse().forEach((letter, index) => {
        sum += letters.indexOf(letter) * Math.pow(radix, i++) ;
    });
    return sum;
}