$(document).ready(function() {
    const templateSource = $('#light-control').html();
    let template = Handlebars.compile(templateSource);
    const source = {
        buttons: [{ name: 'white', uuid: 'white'}, { name: 'red', uuid: 'red'}, 
        { name: 'orange', uuid: 'orange'}, { name: 'yellow', uuid: 'yellow'}, 
        { name: 'cyan', uuid: 'cyan'}, { name: 'green', uuid: 'green'},
        { name: 'blue', uuid: 'blue' }, { name: 'purple', uuid: 'purple'}, { name: 'pink', uuid: 'pink'}]
      };

    let sceneSource = {};
      
    const compiledHtml = template(source);
    $('#light-buttons').html(compiledHtml);
    
    const light = new Light('d073d54171f5');
    // Get predefined light scenes and output buttons
    light.listScenes().then(scenes => {
        return scenes.map(element => {
            return { name: element.name.toLowerCase(), uuid: element.uuid };
        });
    }).then(scenesArr => {
        sceneSource.buttons = scenesArr;
        const html = template(sceneSource);
        $('#scene-buttons').html(html);
        $('#scene-buttons').children().on('click', function() {
            light.setScene($(this).val());
        });
    });

    // Light power toggle button listener
    $('#power').on('click', () => {
        light.toggleLight();
    });
    
    // Light color control buttons
    $('.light-btn').on('click', function() {
        light.setState($(this).val());
        console.log($(this).val());
    });

    // Dimmer control slider
    $('#dimmer').on('click', function(){
        const brightness = Math.round($(this).val() / 10) / 10;
        light.setState(null, brightness);
    });

    // Light scenes buttons
    
});


