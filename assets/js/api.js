// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch((API.endpoint + url), {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response;
}

async function getData(path = '', data = {}) {
    const url = new URL(API.endpoint + path)
    const keys = Object.keys(data)
    const values = Object.values(data)
    for (let i = 0; i < values.length; i++) {
        let value = values[i]
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }
        url.searchParams.set(keys[i], value)
    }
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    return response.json()
}

function myCopyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
}

var API = {
    endpoint: "https://api.pohles.rudickamladez.cz",
    ticket: {
        easy: function (
            firstname,
            lastname,
            email,
            time
        ) {
            return postData(
                '/ticket/easy',
                {
                    name: {
                        first: firstname,
                        last: lastname,
                    },
                    email: email,
                    time: time,
                }
            )
        },
    },

    time: {
        active: function () {
            return getData(
                '/time/active'
            )
        },
    }
}