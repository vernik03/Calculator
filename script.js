let a = ''; 
let b = ''; 
let sign = ''; 
let finish  = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '×', '÷', 'xy'];

const out = document.querySelector('.calc-screen p');

function clearAll () {
    a = ''; 
    b = ''; 
    sign = ''; 
    finish = false;
    out.textContent = 0;
}

function root () {
    a = Math.sqrt(a);
    finish = true;
    out.textContent = Math.trunc(a * 100000000) / 100000000;
}

function plus_minus () {
    if (b ==='' && sign === '') {
        let temp = '-'; 
        temp += a;
        a = temp;
        out.textContent = a.toFixed(10);
    }
    else if (a!=='' && sign === '') {
        b += '-';
        out.textContent = b;
    }
    else {
        let temp = '-'; 
        temp += b;
        b = temp;
        out.textContent = b;
    }
}

document.querySelector('.c').onclick = clearAll;
document.querySelector('.root').onclick = root;
document.querySelector('.plus-minus').onclick = plus_minus;

document.querySelector('.buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('c')) return;
    if(event.target.classList.contains('root')) return;
    if(event.target.classList.contains('plus-minus')) return;

    out.textContent = '';
    const key = event.target.textContent;

    if (digit.includes(key)) {
        if (b ==='' && sign === '') {
            if(finish){
                a = '';
                finish = false;
            }
            a += key;
            out.textContent = a;
        }
        else if (a!=='' && finish) {
            b += key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b , sign);
        return;
    }

    
    if (action.includes(key) || key === '=') {
        if(sign === ''){
        sign = key;
        if(sign === "xy"){
            out.textContent = "^";
        }
        else {
            out.textContent = sign;
        }        
        console.table(a, b , sign);
        return;
        }
        else {
            if (b ==='') b = a;
            switch (sign) {
                case "+":
                    a = (+a) + (+b);
                    break;
                case "-":
                    a = a - b;
                    break;
                case "×":
                    a = a * b;
                    break;
                case "÷":
                    if (b === '0') {
                        out.textContent = '😵';
                        a = '';
                        b = '';
                        sign = '';
                        return;
                    }
                    a = a / b;
                    break;
                case "xy":
                    a = Math.pow((+a),(+b)) ;
                    break;
            }
            finish = true;
            if(key === '='){
                sign = '';
            }
            b = '';
            out.textContent = Math.trunc(a * 100000000) / 100000000;
            console.table(a, b , sign);
        }
    }
}