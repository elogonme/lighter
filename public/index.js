$(document).ready(function() {
    const templateSource = $('#light-control').html();
    let template = Handlebars.compile(templateSource);
    const colors = {
        buttons: [{ name: 'white', value: 'white'}, { name: 'red', value: 'red'}, 
        { name: 'orange', value: 'orange'}, { name: 'yellow', value: 'yellow'}, 
        { name: 'cyan', value: 'cyan'}, { name: 'green', value: 'green'},
        { name: 'blue', value: 'blue' }, { name: 'purple', value: 'purple'}, { name: 'pink', value: 'pink'}]
      };

    const effects = {
        buttons: [{ name: 'chin-chin', value: 'pulse'}, { name: 'breathe', value: 'breathe'}, { name: 'move', value: 'move'}]
      };

    let sceneSource = {};
    
    const compiledHtml = template(colors);
    $('#light-buttons').html(compiledHtml);

    const effectsHtml = template(effects);
    $('#effect-buttons').html(effectsHtml);
    
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
            light.setScene($(this).val());
        });
    });

    // Light power toggle button handler
    $('#power').on('click', () => {
        light.toggleLight();
    });
    
    // Light color control buttons
    $('#light-buttons').children().on('click', function() {
        light.setState($(this).val());
    });

    // Dimmer control slider handler
    $('#dimmer').on('click', function(){
        const brightness = Math.round($(this).val() / 10) / 10;
        light.setState(null, brightness);
    });

    // Effect buttons handler
    $('#effect-buttons').children().on('click', function() {
        const effect = $(this).val();
        switch (effect) {
            case 'pulse':
                light.setEffect('pulse', {
                    cycles: 2,
                    color: 'white',
                });
                break;
            case 'breathe':
                light.setEffect('breathe', {
                    color: "yellow",
                    period: 3,
                    cycles: 100,
                });
                break;
            case 'move':
                light.setEffect('move', {
                    direction: "forward",
                    period: 2,
                });
                break;
        }
    });
});
