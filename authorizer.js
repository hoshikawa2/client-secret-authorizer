function authorizeClientSecret(token) {
    //const expiryInterval = 3600000 // one hour expressed in miliseconds
    const expiryInterval = 60000 // one minute expressed in miliseconds
    const expiry = new Date(Date.now() + expiryInterval);
    let json
    // if the last character in the token is a number and the number is even, then authorization succeeds
    const lastCharacter = token.slice(-1)
    if (!isNaN(lastCharacter) && ((parseInt(lastCharacter) % 2) == 0)) {
        json = {
            "active": true,
            "principal": "hoshikawa@hotmail.com",
            "scope": ["list:showhtml", "read:showhtml", "create:showhtml", "update:showhtml", "delete:showhtml", "someScope"],
            "clientId": "clientIdFromHeader",
            "expiresAt": expiry.toISOString(),
            "context": {
                "key": "value", "email": "hoshikawa2@hotmail.com", "input": token
            }
        }
        json =
            {
                "active": true,
                "expiresAt": expiry.toISOString(),
                "context": {
                    "email": "james.doe@example.com"
                },
                "wwwAuthenticate": "Bearer realm=\"lucas.jellema.com\""
            }
    }
    else
        // simulate authorization error
        json =
            {
                "active": false,
                "expiresAt": expiry.toISOString(),
                "context": {
                    "email": "james.doe@example.com"
                },
                "wwwAuthenticate": "Bearer realm=\"lucas.jellema.com\""
            }
    return json
}

module.exports = {
    authorizeClientSecret: authorizeClientSecret
}

// invoke on the command line with :
// node authorizer '{"type":"TOKEN","token":"secret2"}'
run = async function () {
    if (process.argv && process.argv[2]) {
        const input = JSON.parse(process.argv[2])
        let response = authorizeClientSecret(input.type=='TOKEN'?input.token:input.header)
        console.log("response: " + JSON.stringify(response))
    }
}

run()
