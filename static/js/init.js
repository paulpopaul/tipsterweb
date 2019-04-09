(function ($) {
    $(function () {
        var window_width = $(window).width();

        // convert rgb to hex value string
        function rgb2hex(rgb) {
            if (/^#[0-9A-F]{6}$/i.test(rgb)) {
                return rgb;
            }

            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

            if (rgb === null) {
                return "N/A";
            }

            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }

            return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        $(".console-container").show(1);
        $(".autocomplete-container").hide(1);
        $(".muestra-ciudades").hide();
        $('.event-modal.modal').modal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 300, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '4%', // Ending top style attribute
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    console.log(modal, trigger);
                }
            }
        );
        $('.menu-directorio > .button-collapse').sideNav({
                menuWidth: 500, // Default is 300
                edge: 'right', // Choose the horizontal origin
                closeOnClick: false,
                draggable: true
            }
        );

        $('.button-collapse').sideNav();
        $('.parallax').parallax();
        $('.panoramas.slider').slider({
            indicators: true,
            height: 500,
            transition: 300,
            interval: 5000
        });
        $('.recomendados.slider').slider({
            indicators: true,
            height: 700,
            transition: 300,
            interval: 5000
        });
        $('.evento.slider').slider({
            indicators: true,
            height: 200,
            transition: 300,
            interval: 5000
        });
        $('.tienda.slider').slider({
            indicators: true,
            height: 550,
            transition: 300,
            interval: 5000
        });
        $('.carousel.carousel-slider').carousel({
            indicators: true,
            fullWidth: true
        });

        $("#btn-ciudad").click(function(){
            $(".muestra-ciudades").removeClass("hide").show(800);
            $("#btn-ciudad").hide(1);
            $("#search-city").hide(1)
        });
        $("#id-ciudad").click(function(){
            $(".muestra-ciudades").hide(800);
            $("#btn-ciudad").show(800);
            $("#search-city").show(800)
        });

        $(".console-container").click(function(){
            $(".console-container").hide(0);
            $(".autocomplete-container").removeClass("hide").show(200);
            $("#autocomplete-input").focus()
        });


        var bla = $("#autocomplete-input").val();

        $( "#form-busquedas" ).submit(function( event ) {
            if (bla.val()) {
                Materialize.toast(bla, 4000);
            }
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#autocomplete-input', {
        stringsElement: '#strings-autocomplete',
        typeSpeed: 20,
        backSpeed: 20,
        startDelay: 1000,
        loop: false,
        onComplete: function (self) {
            prettyLog('onComplete ' + self)
        },
        preStringTyped: function (pos, self) {
            prettyLog('preStringTyped ' + pos + ' ' + self);
        },
        onStringTyped: function (pos, self) {
            prettyLog('onStringTyped ' + pos + ' ' + self)
        },
        onLastStringBackspaced: function (self) {
            prettyLog('onLastStringBackspaced ' + self)
        },
        onTypingPaused: function (pos, self) {
            prettyLog('onTypingPaused ' + pos + ' ' + self)
        },
        onTypingResumed: function (pos, self) {
            prettyLog('onTypingResumed ' + pos + ' ' + self)
        },
        onReset: function (self) {
            prettyLog('onReset ' + self)
        },
        onStop: function (pos, self) {
            prettyLog('onStop ' + pos + ' ' + self)
        },
        onStart: function (pos, self) {
            prettyLog('onStart ' + pos + ' ' + self)
        },
        onDestroy: function (self) {
            prettyLog('onDestroy ' + self)
        }
    });

    document.querySelector('.toggle').addEventListener('click', function () {
        typed.toggle();
    });
    document.querySelector('.stop').addEventListener('click', function () {
        typed.stop();
    });
    document.querySelector('.start').addEventListener('click', function () {
        typed.start();
    });
    document.querySelector('.reset').addEventListener('click', function () {
        typed.reset();
    });
    document.querySelector('.destroy').addEventListener('click', function () {
        typed.destroy();
    });
    document.querySelector('.loop').addEventListener('click', function () {
        toggleLoop(typed);
    });

});
// function([string1, string2],target id,[color1,color2])
consoleText(['Disfruta nuevas experencias','Conoce nuevos lugares','Comparte momentos únicos'], 'text',['#000','#000', '#000']);



function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.setAttribute('style', 'color:' + colors[0]);
    window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = words[0].substring(0, letterCount);
            window.setTimeout(function() {
                var usedColor = colors.shift();
                colors.push(usedColor);
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                target.setAttribute('style', 'color:' + colors[0]);
                letterCount += x;
                waiting = false;
            }, 200)
        } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000)
        } else if (waiting === false) {
            target.innerHTML = words[0].substring(0, letterCount);
            letterCount += x;
        }
    }, 90);
    window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;

        } else {
            con.className = 'console-underscore';
            visible = true;
        }
    }, 200)
}