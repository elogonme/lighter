$(document).ready(function() {
    const templateSource = $('#light-control').html();
    let template = Handlebars.compile(templateSource);
    const source = {
        colors: ['white', 'red', 'orange', 'yellow', 'cyan', 'green', 'blue', 'purple', 'pink']
      }
    const compiledHtml = template(source);
    $('#light-buttons').html(compiledHtml);

    const light = new Light('d073d54171f5');
    let powerState = false;
    let state = 'off';
    // light.setState('off');
    // Light power toggle button listener
    $('#power').on('click', () => {
        // powerState = !powerState;
        // powerState ? state = 'on' : state = 'off';
        light.toggleLight();
    });
    
    // Light color control buttons
    $('.light-btn').on('click', function() {
        light.setState( $(this).val());
    });

    $('#dimmer').on('click', function(){
        const brightness = Math.round($(this).val() / 10) / 10;
        light.setState(null, brightness);
    });
});


