$(document).ready(function() {
    // Template source for handlebars
    const templateSource = $('#light-control').html();
    let template = Handlebars.compile(templateSource);
    // Predefinded colors array for light state
    const colors = {
        buttons: [{ name: 'white', value: 'white'}, { name: 'red', value: 'red'}, 
        { name: 'orange', value: 'orange'}, { name: 'yellow', value: 'yellow'}, 
        { name: 'cyan', value: 'cyan'}, { name: 'green', value: 'green'},
        { name: 'blue', value: 'blue' }, { name: 'purple', value: 'purple'}, { name: 'pink', value: 'pink'}]
      };
    // Predefinded effects array for buttons
    const effects = {
        buttons: [{ name: 'chin-chin', value: 'pulse'}, { name: 'breathe', value: 'breathe'}, { name: 'move', value: 'move'}]
      };

    let sceneSource = {};
    // Initial message prompt
    setTimeout(() => $('.error').animate({opacity: '0'}, "slow"), 3000);
    // Compile color buttons html with handlebars
    const compiledHtml = template(colors);
    $('#light-buttons').html(compiledHtml);
      // Compile effect buttons html with handlebars
    const effectsHtml = template(effects);
    $('#effect-buttons').html(effectsHtml);
    // Create new instance of light - insert your light id
    const light = new Light('d073d54171f5');
    // Get predefined light scenes and output buttons
    light.listScenes().then(scenes => {
        return scenes.map(element => {
            return { name: element.name.toLowerCase(), value: element.uuid };
        });
    }).then(scenesArr => {
        sceneSource.buttons = scenesArr;
        const html = template(sceneSource);
        $('#scene-buttons').html(html);
        $('#scene-buttons').children().on('click', function() {
            light.setScene($(this).val()).then(result => displayMessage(result));
        });
    });

    // Light power toggle button handler
    $('#power').on('click', () => {
        light.toggleLight().then(result => displayMessage(result));
    });
    
    // Light color control buttons
    $('#light-buttons').children().on('click', function() {
        light.setState($(this).val()).then(result => displayMessage(result));
    });

    // Dimmer control slider handler
    $('#dimmer').on('click', function(){
        const brightness = Math.round($(this).val() / 10) / 10;
        light.setState(null, brightness).then(result => displayMessage(result));
    });

    // Effect buttons handler
    $('#effect-buttons').children().on('click', function() {
        const effect = $(this).val();
        switch (effect) {
            case 'pulse':
                light.setEffect('pulse', {
                    cycles: 2,
                    color: 'white',
                }).then(result => displayMessage(result));
                break;
            case 'breathe':
                light.setEffect('breathe', {
                    color: "yellow",
                    period: 3,
                    cycles: 100,
                }).then(result => displayMessage(result));
                break;
            case 'move':
                light.setEffect('move', {
                    direction: "forward",
                    period: 2,
                }).then(result => displayMessage(result));
                break;
        }
    });

    // Display error or success message
    const displayMessage = (result) => {
        let message = result.results[0].status;
        let msgClass = '';
        if (message === 'ok') {
            message = 'light set successfully'
            msgClass = 'green-text';
        } else {
            msgClass = 'red-text';
            message = 'light is ' + message;
        };
        // Set class to display red or green text depending on success or error
        $('.error').removeClass('red-text green-text');
        $('.error').addClass(msgClass);
        $('.error').text(message);
        $('.error').animate({opacity: '1'}, "slow");
        // Hide message after 5 sec
        setTimeout(() => $('.error').animate({opacity: '0'}, "slow"), 5000);
    }
});
