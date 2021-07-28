const ge = s => document.getElementById(s);

function isIp(ip) {
    var arrIp = ip.split(".");
    if (arrIp.length !== 4) return '<span style="color:red">"Текст произвольный"</span>';
    for (let i of arrIp) {

        if (isNaN(i) || Number(i) < 0 || Number(i) > 255)

            return "Текст произвольный";
    }
    return '<span style="color:blue">"Валидный IP"</span>';
}

function sendRequest(method, url) {
    return fetch(url).then(responce => {
        return responce.text()
    });
}

const button = ge('action');
const input = ge('firstValue');
const output = ge('output');
button.addEventListener('click', function () {
    output.innerHTML = isIp(input.value);
});

const requestURL = "https://api-content.dropbox.com/s/0gox8l06fhh742i/blacklist.txt?dl=0#";

const checker = ge('checker');
const checkIp = ge('checkIP');
const button2 = ge('action2')
const SecondInput = ge('name2');
const output2 = ge('output2');

checker.onchange = () => {
    SecondInput.disabled = !SecondInput.disabled;
    input.disabled = !input.disabled;

    button2.addEventListener('click', function () {


        if (checkIp.checked) {

            const value = SecondInput.value.split(".").map(function (item) {
                return parseInt(item);
            });

            sendRequest('GET', requestURL)
                .then(data => {
                    const dataString = data.replace(/\r?\n/g, ".");
                    let array = dataString.split(".").map(function (item) {
                        return parseInt(item);
                    });
                    const array_size = 4;
                    const sliced_array = [];

                    for (let i = 0; i < array.length; i += array_size) {
                        sliced_array.push(array.slice(i, i + array_size));
                    }
                    for (let i = 0; i < sliced_array.length; i++) {
                        if (JSON.stringify(sliced_array[i]) === JSON.stringify(value)) {
                            output2.innerHTML = "IP address found!";
                            output2.style.color = 'red';
                            break
                        } else {
                            output2.innerHTML = "IP address not found!";
                            output2.style.color = 'blue';
                        }
                    }
                })
                .catch(err => console.log(err));

        } else {
            output2.innerHTML = isIp(SecondInput.value)
        }
    });
};
/*10.12.25.40
    10.12.25.99
    192.168.0.1
    102.88.88.88 */