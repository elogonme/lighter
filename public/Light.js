class Light {
  constructor (id = 'd073d54171f5') {
      this.id = id;
      this.lastColor = 'white';
  }

  async listLights() { 
      const myHeaders = new Headers();
  
      const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };
  
      try {
          const response = await fetch("/all", requestOptions);
          if (response.ok) {
              const jsonResponse = await response.json();
              console.log(`Light ID: ${jsonResponse[0].id}, Power state: ${jsonResponse[0].power}`);
              return jsonResponse;
            } throw new Error('Request failed!')
          } catch(error) {
            console.log(error);
          }
      };
  
  async toggleLight() {
      const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${APIKey}`);
      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
  
      try {
          const response = await fetch(`lights/${this.id}/toggle`, requestOptions);
          if (response.ok) {
              const jsonResponse = await response.json();
              if(jsonResponse.results[0].status === 'ok') {
                console.log(`Light with id: ${jsonResponse.results[0].id}, label: ${jsonResponse.results[0].label} has been turned ${jsonResponse.results[0].power}...`);
              }
              return jsonResponse;
            } throw new Error('Request failed!')
          } catch(error) {
            console.log(error);
      };
  };

  async setState(color, brightness) {
      const state = {};
      if (color) {
        state.color = color;
        this.lastColor = color;
      };

      if (brightness) state.brightness = brightness;
      state.power = 'on';
      state.fast = false;
      
      const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${APIKey}`);
      myHeaders.append("Content-type", `application/json`);
      const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(state),
          redirect: 'follow'
        };
  
      try {
          const response = await fetch(`lights/${this.id}/state`, requestOptions);
          if (response.ok) {
              const jsonResponse = await response.json(); 
              return jsonResponse;
            } throw new Error('Request failed!')
          } catch(error) {
            console.log(error);
      };
  };

  async setEffect(effect, parameters) {
      parameters.power_on = true;
      parameters.persists = true;
      const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${APIKey}`);
      myHeaders.append("Content-type", `application/json`);
      const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(parameters),
          redirect: 'follow'
        };
  
      try {       
          const response = await fetch(`lights/${this.id}/effects/${effect}`, requestOptions);
          if (response.ok) {
              const jsonResponse = await response.json(); 
              return jsonResponse;
            } throw new Error('Request failed!')
          } catch(error) {
            console.log(error);
      };
  };

  async listScenes() { 
    const myHeaders = new Headers();
    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    try {
        const response = await fetch("/scenes", requestOptions);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
          } throw new Error('Request failed!')
        } catch(error) {
          console.log(error);
        }
    };
  
    async setScene(sceneUuid) {
      const state = {};
      state.scene_uuid = sceneUuid;
      state.fast = false;
      
      const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${APIKey}`);
      myHeaders.append("Content-type", `application/json`);
      const requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: JSON.stringify(state),
          redirect: 'follow'
        };
  
      try {
          const response = await fetch(`scenes/scene_id:${sceneUuid}/activate`, requestOptions);
          if (response.ok) {
              const jsonResponse = await response.json(); 
              return jsonResponse;
            } throw new Error('Request failed!')
          } catch(error) {
            console.log(error);
      };
  };
};
