const APIKey = 'cdfad860e7b39f81605abb07bf16e8b04dcddade62845bde72e002d8c4e71c68';

class Light {
    constructor (id = 'd073d54171f5') {
        this.id = id;
    }
    listLights = async () => { 
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${APIKey}`);
    
        const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        try {
            const response = await fetch("https://api.lifx.com/v1/lights/all", requestOptions);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(`Light ID: ${jsonResponse[0].id}, Power state: ${jsonResponse[0].power}`);
                return jsonResponse;
              } throw new Error('Request failed!')
            } catch(error) {
              console.log(error);
            }
        }
    
        async toggleLight() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${APIKey}`);
        console.log(this.id);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
          };
    
        try {
            const response = await fetch(`https://api.lifx.com/v1/lights/${this.id}/toggle`, requestOptions);
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
              } throw new Error('Request failed!')
            } catch(error) {
              console.log(error);
            }
    }
}