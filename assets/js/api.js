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

async function getDataRequest(path = '', data = {}) {
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
    return response
}

async function getData(path = '', data = {}) {
    return getDataRequest(path, data).json()
}

function myCopyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(function () {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
}

function timeFormatted(d, inCzech=true) {
    // Prepare formatted date in EN and CS
    res = d.toLocaleString();
    if (inCzech) {
        minutes = d.getMinutes()
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        res = `${d.getDate()}. ${(d.getMonth() + 1)}. ${d.getFullYear()} v ${d.getHours()}:${minutes}`;
    }
    return res
}

var API = {
    endpoint: "https://api.cutetix.com",
    ticket: {
        easy: function (
            firstname,
            lastname,
            email,
            time
        ) {
            return postData(
                '/tickets/easy',
                {
                    firstname: firstname.trim(),
                    lastname: lastname.trim(),
                    email: email.trim(),
                    group_id: time,
                }
            )
        },


        cancel: function (
            id,
            email
        ) {
            return postData(
                '/tickets/cancel',
                {
                    id,
                    email: email.trim(),
                }
            )
        },
    },

    times: {
        active: function(){
            return getData(
                '/ticket_groups/by-event/1'
            )
        }
    },

    year: {
        active: function(){
            return getData(
                '/events/1'
            )
        },

        capacity_summary: function(){
            return getDataRequest(
                '/events/capacity_summary/1'
            )
        },
    },
}