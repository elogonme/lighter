$(document).ready(function() {
    const light = new Light('d073d54171f5');

    // light.setState('off');
    // Light power toggle button listener
    $('#power').on('click', () => {
        light.toggleLight();
    });
    
    // Light color control buttons
    $('.light-btn').on('click', function() {
        light.setState( 'on', $(this).val());
    });
});


