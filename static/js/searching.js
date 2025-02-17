var enableLinkSimulation = true;
if (enableLinkSimulation) document.body.appendChild(document.createElement("script")).src = "assets/js/linksSimulation.min.js";
var tag, tv, vid, randomVid, currVid, firstScriptTag, createdVideoDiv, ytLoaded = 0, playerDefaults = {
    autoplay: 1,
    autohide: 1,
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 0,
    iv_load_policy: 3
};
var videoStartTime, videoEndTime;
if (typeof v_start !== "number") videoStartTime = 0; else
    videoStartTime = v_start;
if (typeof v_end !== "number") videoEndTime = 999999; else
    videoEndTime = v_end;
if (typeof yt_video !== "undefined") {
    if (yt_video !== undefined && yt_video !== "" && yt_video !== " ") {
        tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/player_api';
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        vid = [{
            'videoId': yt_video,
            'startSeconds': videoStartTime,
            'endSeconds': videoEndTime,
            'suggestedQuality': 'default'
        }];
        randomVid = Math.floor(Math.random() * vid.length);
        currVid = randomVid;
    }
}
function onYouTubePlayerAPIReady() {
    var initPlayer = setInterval(function () {
        if (createdVideoDiv === 1) {
            tv = new YT.Player('tv', {
                events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange},
                playerVars: playerDefaults
            });
            clearInterval(initPlayer);
        }
    }, 200);
}
function onPlayerReady() {
    tv.loadVideoById(vid[currVid]);
    tv.mute();
    ytLoaded = 1;
}
function onPlayerStateChange(e) {
    if (e.data === 1) {
        $('#tv').addClass('active');
    } else if (e.data === 2) {
        $('#tv').removeClass('active');
        if (currVid === vid.length - 1) {
            currVid = 0;
        } else {
            currVid++;
        }
        tv.loadVideoById(vid[currVid]);
        tv.seekTo(vid[currVid].startSeconds);
    }
    if (e.data === YT.PlayerState.ENDED) {
        tv.playVideo();
    }
}
(function () {
    "use strict";
    $(function () {
        var checkLoading = setInterval(function () {
            if (document.readyState === "complete") {
                setTimeout(function () {
                }, 1000);
                clearInterval(checkLoading);
            }
        }, 10);

        function checkBrowser() {
            var c = window.navigator.userAgent.search("Chrome"), f = window.navigator.userAgent.search("Firefox"),
                i = window.navigator.userAgent.search("MSIE"), e = window.navigator.userAgent.search("Edge"),
                browser = "";
            if (c > -1) {
                browser = "Chrome";
            } else if (f > -1) {
                browser = "Firefox";
            } else if (i > -1 || !!navigator.userAgent.match(/Trident\/7\./)) {
                browser = "MSIE";
            } else if (e > -1) {
                browser = "MSIE";
            }
            return browser;
        }

        function isMobile() {
            var isMobile = ('ontouchstart' in document.documentElement || navigator.userAgent.match(/Mobi/) ? true : false);
            return isMobile;
        }

        function checkNavbarToggle() {
            if (viewport().width > 767 && $('.navbar-toggle').is(':hidden')) {
                $(selected).removeClass('slide-active');
            }
        }

        function stopScrolling(action) {
            if (action === 1) $("body").addClass("stop-scrolling"); else
                $("body").removeClass("stop-scrolling");
        }

        function checkScrolling() {
            if (viewport().width > 767) {
                if ($("#slidemenu").css("left") === "0px") {
                    $(".navbar-toggle").trigger("click");
                }
            }
        }

        function resetElements() {
            checkNavbarToggle();
            mobileMenuMaxHeight();
            filterButtonMaxWidth();
            setTooltips();
            setUserFormsPosition();
            checkGrid();
            checkHeroFeatPosts();
            startTypingEffect();
            typingOnLanding();
            bodyWrapperOverflow();
            setHeroVideo();
            setHeroSlideshow();
            resizeCanvases();
            checkScrolling();
        }

        function setUserFormsPosition() {
            var screenHeight = viewport().height, formRecipient, formRecipientHeight = 0, passFormHeight = 0,
                reviewFormHeight = 0, topbarheight = 82, totalHeight = 0;
            if ($("header").length) topbarheight = $("header").height();
            if ($("#login-form").length) {
                formRecipient = $("#login-form").parent().parent().parent().parent();
                formRecipientHeight = formRecipient.height();
                if (screenHeight - topbarheight - 120 > formRecipientHeight) {
                    formRecipient.css({
                        display: "inline-block",
                        top: "50%",
                        marginTop: -(formRecipientHeight / 2) + topbarheight / 2
                    });
                    formRecipient.parent().css({height: screenHeight, marginTop: 0, "overflow-y": "hidden"});
                } else {
                    if (topbarheight != 82) formRecipient.css({
                        display: "inline-block",
                        top: 0,
                        marginTop: "55px"
                    }); else
                        formRecipient.css({display: "inline-block", top: 0, marginTop: 0});
                    formRecipient.parent().css({
                        height: screenHeight - topbarheight,
                        marginTop: topbarheight,
                        "overflow-y": "auto"
                    });
                }
                formRecipient.parent().parent().css({
                    width: "100%",
                    position: "relative",
                    display: "table",
                    "text-align": "center"
                });
            }
            if ($("#password-form").length) {
                formRecipient = $("#password-form").parent().parent().parent().parent();
                formRecipientHeight = formRecipient.height();
                if (screenHeight - topbarheight - 120 > formRecipientHeight) {
                    formRecipient.css({
                        display: "inline-block",
                        top: "50%",
                        marginTop: -(formRecipientHeight / 2) + topbarheight / 2
                    });
                    formRecipient.parent().css({height: screenHeight, marginTop: 0, "overflow-y": "hidden"});
                } else {
                    if (topbarheight != 82) formRecipient.css({
                        display: "inline-block",
                        top: 0,
                        marginTop: "55px"
                    }); else
                        formRecipient.css({display: "inline-block", top: 0, marginTop: 0});
                    formRecipient.parent().css({
                        height: screenHeight - topbarheight,
                        marginTop: topbarheight,
                        "overflow-y": "auto"
                    });
                }
                formRecipient.parent().parent().css({
                    width: "100%",
                    position: "relative",
                    display: "table",
                    "text-align": "center"
                });
            }
            if ($("#review-form").length) {
                formRecipient = $("#review-form").parent().parent().parent().parent();
                formRecipientHeight = formRecipient.height();
                if (screenHeight - topbarheight - 120 > formRecipientHeight) {
                    formRecipient.css({
                        display: "inline-block",
                        top: "50%",
                        marginTop: -(formRecipientHeight / 2) + topbarheight / 2
                    });
                    formRecipient.parent().css({height: screenHeight, marginTop: 0, "overflow-y": "hidden"});
                } else {
                    formRecipient.css({display: "inline-block", top: 0, marginTop: "55px"});
                    formRecipient.parent().css({
                        height: screenHeight - topbarheight,
                        marginTop: topbarheight,
                        "overflow-y": "auto"
                    });
                }
                formRecipient.parent().parent().css({
                    width: "100%",
                    position: "relative",
                    display: "table",
                    "text-align": "center"
                });
            }
            if ($("#pm-form").length) {
                formRecipient = $("#pm-form").parent().parent().parent().parent();
                formRecipientHeight = formRecipient.height();
                if (screenHeight - topbarheight - 120 > formRecipientHeight) {
                    formRecipient.css({
                        display: "inline-block",
                        top: "50%",
                        marginTop: -(formRecipientHeight / 2) + topbarheight / 2
                    });
                    formRecipient.parent().css({height: screenHeight, marginTop: 0, "overflow-y": "hidden"});
                } else {
                    formRecipient.css({display: "inline-block", top: 0, marginTop: "55px"});
                    formRecipient.parent().css({
                        height: screenHeight - topbarheight,
                        marginTop: topbarheight,
                        "overflow-y": "auto"
                    });
                }
                formRecipient.parent().parent().css({
                    width: "100%",
                    position: "relative",
                    display: "table",
                    "text-align": "center"
                });
            }
            if ($(".search-popup").length) {
                formRecipientHeight = $(".search-popup .categories").height() + 130;
                if (screenHeight - topbarheight - 60 > formRecipientHeight) {
                    $(".search-popup").removeClass("search-short-height");
                } else {
                    $(".search-popup").addClass("search-short-height");
                }
            }
            setTimeout(function () {
                if ($(".hero-header").length) {
                    var _ = $(".hero-header"), categoriesHeight = $(".search-categories .categories").height();
                    if (viewport().width < 768) {
                        if (!_.hasClass("search-popup")) {
                            _.stop().css({height: ""});
                            _.find(".hero-search").stop().animate({marginTop: "40px"}, {duration: 1000});
                        }
                    } else if (!_.hasClass("search-popup") && viewport().width > 767 && viewport().height < categoriesHeight + 320) {
                        _.stop().animate({height: categoriesHeight + 325}, {duration: 1000});
                        _.find(".hero-search").stop().animate({marginTop: "40px"}, {duration: 1000});
                    } else if (!_.hasClass("search-popup")) {
                        _.stop().css({height: ""});
                        _.find(".hero-search").stop().animate({marginTop: "100px"}, {duration: 1000});
                    }
                }
            }, 1500);
        }

        function viewport() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {width: e[a + 'Width'], height: e[a + 'Height']};
        }

        function filterButtonMaxWidth() {
            var v;
            if (viewport().width >= 480) {
                v = viewport().width - $(".results-count").width() - 245;
                $(".listing-results .bootstrap-select").css({"min-width": "auto", "max-width": v});
            } else {
                v = viewport().width - 200;
                $(".listing-results .bootstrap-select").css({"min-width": v, "max-width": v, width: v});
            }
        }

        function mobileMenuMaxHeight() {
            $("#slidemenu").css({"max-height": viewport().height});
        }

        var hasGrid2 = 0, hasGrid3 = 0;

        function checkGrid() {
            if (viewport().width < 600) {
                if (!$(".listing").hasClass("hold-grid")) {
                    if ($(".listing").hasClass("grid2")) {
                        hasGrid2 = 1;
                        $(".listing").removeClass("grid2");
                    }
                    if ($(".listing").hasClass("grid3")) {
                        hasGrid3 = 1;
                        $(".listing").removeClass("grid3");
                    }
                }
            } else if (hasGrid2) {
                $(".listing").addClass("grid2");
            } else if (hasGrid3) {
                $(".listing").addClass("grid3");
            }
        }

        function bodyWrapperOverflow() {
            if (isMobile()) $(".body-wrapper").addClass("is-mobile"); else
                $(".body-wrapper").removeClass("is-mobile");
        }

        function setTooltips() {
            if (isMobile()) {
                $('[data-toggle="tooltip"]').tooltip('disable');
            } else {
                $('[data-toggle="tooltip"]').tooltip('enable');
            }
        }

        var typedAnimatedTexts = "";

        function startTypingEffect() {
            var field = '.hero-search input[type="text"]';
            if (typedAnimatedTexts === "") typedAnimatedTexts = $(".typingEffect").prop("outerHTML");
            if ($(field).val() === "" && viewport().width > 480) {
                $(field).attr("placeholder", "");
                $(field).removeClass("inFocus");
                $(".typingEffect,.typed-cursor").remove();
                $('.hero-search fieldset').append(typedAnimatedTexts);
                if ($.isFunction($.fn.typed)) {
                    $(".typingEffect").typed({
                        strings: $(".typingEffect").attr("data-title").split("//"),
                        typeSpeed: 100,
                        loop: true
                    });
                }
            } else {
                $(field).attr("placeholder", $(field).attr("data-placeholder"));
            }
            if ($(field).val() !== "") {
                $(".typingEffect,.typed-cursor").remove();
                $(field).addClass("inFocus");
            }
        }

        var landingTexts = "";

        function typingOnLanding() {
            if ($(".typeLanding").length) {
                var field = '.typingEffect';
                if (landingTexts === "") landingTexts = $(".typingEffect").prop("outerHTML");
                if ($.isFunction($.fn.typed)) {
                    $(".typeLanding").typed({
                        strings: $(".typeLanding").attr("data-title").split("//"),
                        typeSpeed: 100,
                        loop: true
                    });
                }
            }
        }

        function addHeroVideo() {
            $(".hero-header").each(function () {
                if ($(this).hasClass("h-video")) {
                    $(this).prepend('<div class="hero-video"></div>');
                }
            });
        }

        function setHeroVideo() {
            if ($(".h-video").length && !isMobile()) {
                if (typeof local_video !== "undefined") {
                    if (local_video !== undefined && local_video !== "" && local_video !== " ") {
                        $(".hero-video").remove();
                        $(".hero-header").each(function () {
                            if ($(this).hasClass("h-video")) {
                                addHeroVideo();
                                $(".hero-video").css({opacity: 1}).append('<div id="video-container"><video id="background_video" loop muted></video><div id="video_cover"></div>');
                                var bv = new Bideo();
                                bv.init({
                                    videoEl: document.querySelector('#background_video'),
                                    container: document.querySelector('.hero-video'),
                                    resize: true,
                                    isMobile: isMobile(),
                                    src: local_video
                                });
                            }
                        });
                        $('#video_cover').css({opacity: 0});
                        if ($('#video-container').css("opacity") === "0") {
                            $('#video-container').css("opacity", "0.01");
                            $('#video-container').stop().delay(600).animate({opacity: 1}, {duration: 3000});
                        }
                        checkPolifill();
                        if (isMobile()) $('#video_cover').css({display: "block"}).animate({opacity: 1});
                    }
                }
                videoRescale();
            }
        }

        function videoRescale() {
            vmVidRescale();
            ytVidRescale();
        }

        function ytVidRescale() {
            if (typeof yt_video !== "undefined") {
                if (yt_video !== undefined && yt_video !== "" && yt_video !== " ") {
                    var c = setInterval(function () {
                        var w = $(".hero-video").width() + 200, h = $(".hero-video").height() + 200;
                        if (w / h > 16 / 9) {
                            if (tv !== undefined) tv.setSize(w, w / 16 * 9);
                            $('.hero-video .screen').css({'left': '0px'});
                        } else {
                            if (tv !== undefined) tv.setSize(h / 9 * 16, h);
                            $('.hero-video .screen').css({'left': -($('.hero-video .screen').outerWidth() - w) / 2});
                        }
                        if (ytLoaded) {
                            if ($(".hero-video").css("opacity") === "0") {
                                $(".hero-video").css("opacity", "0.01");
                                $(".hero-video").stop().animate({opacity: 1}, {duration: 6000});
                            }
                        }
                    }, 1);
                    setTimeout(function () {
                        clearInterval(c);
                    }, 4000);
                }
            }
        }

        function vmVidRescale() {
            if (typeof vm_video !== "undefined") {
                if (vm_video !== undefined && vm_video !== "" && vm_video !== " ") {
                    var c = setInterval(function () {
                        var theWidth = $(".hero-video").width();
                        var theHeight = $(".hero-video").height();
                        var newWidth = (theHeight * 1.77777778);
                        var newHeight = (theWidth / 1.77777778);
                        if ((theWidth > 1280) && (newHeight > theHeight)) {
                            $('.fullvid').css({'width': theWidth + 5, 'height': newHeight + 5});
                        }
                        if ((theHeight > 720) && (newWidth > theWidth)) {
                            $('.fullvid').css({'height': theHeight + 5, 'width': newWidth + 5});
                        }
                    }, 1);
                    if ($(".hero-video").css("opacity") === "0") {
                        $(".hero-video").css("opacity", "0.01");
                        $(".hero-video").stop().delay(2000).animate({opacity: 1}, {duration: 3000});
                    }
                    setTimeout(function () {
                        clearInterval(c);
                    }, 4000);
                }
            }
        }

        var objectFitVideos = function () {
            var testImg = new Image(), supportsObjectFit = 'object-fit' in testImg.style,
                supportsObjectPosition = 'object-position' in testImg.style,
                propRegex = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;
            if (!supportsObjectFit || !supportsObjectPosition) {
                initialize();
                throttle('resize', 'optimizedResize');
            }
            function getStyle($el) {
                var style = getComputedStyle($el).fontFamily, parsed = null, props = {};
                while ((parsed = propRegex.exec(style)) !== null) {
                    props[parsed[1]] = parsed[2];
                }
                if (props['object-position'])return parsePosition(props);
                return props;
            }

            function initialize() {
                var videos = document.querySelectorAll('video'), index = -1;
                while (videos[++index]) {
                    var style = getStyle(videos[index]);
                    if (style['object-fit'] || style['object-position']) {
                        style['object-fit'] = style['object-fit'] || 'fill';
                        fitIt(videos[index], style);
                    }
                }
            }

            function fitIt($el, style) {
                if (style['object-fit'] === 'fill')return;
                var setCss = $el.style, getCss = window.getComputedStyle($el);
                var $wrap = document.createElement('object-fit');
                $wrap.appendChild($el.parentNode.replaceChild($wrap, $el));
                var wrapCss = {
                    height: '100%',
                    width: '100%',
                    boxSizing: 'content-box',
                    display: 'inline-block',
                    overflow: 'hidden'
                };
                'backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight left opacity margin position right top visibility'.replace(/\w+/g, function (key) {
                    wrapCss[key] = getCss[key];
                });
                for (var key in wrapCss)$wrap.style[key] = wrapCss[key];
                setCss.border = setCss.margin = setCss.padding = 0;
                setCss.display = 'block';
                setCss.opacity = 1;
                $el.addEventListener('loadedmetadata', doWork);
                window.addEventListener('optimizedResize', doWork);
                if ($el.readyState >= 1) {
                    $el.removeEventListener('loadedmetadata', doWork);
                    doWork();
                }
                function doWork() {
                    var videoWidth = $el.videoWidth, videoHeight = $el.videoHeight,
                        videoRatio = videoWidth / videoHeight;
                    var wrapWidth = $wrap.clientWidth, wrapHeight = $wrap.clientHeight,
                        wrapRatio = wrapWidth / wrapHeight;
                    var newHeight = 0, newWidth = 0;
                    setCss.marginLeft = setCss.marginTop = 0;
                    if (videoRatio < wrapRatio ? style['object-fit'] === 'contain' : style['object-fit'] === 'cover') {
                        newHeight = wrapHeight * videoRatio;
                        newWidth = wrapWidth / videoRatio;
                        setCss.width = Math.round(newHeight) + 'px';
                        setCss.height = wrapHeight + 'px';
                        if (style['object-position-x'] === 'left') setCss.marginLeft = 0; else if (style['object-position-x'] === 'right') setCss.marginLeft = Math.round(wrapWidth - newHeight) + 'px'; else
                            setCss.marginLeft = Math.round((wrapWidth - newHeight) / 2) + 'px';
                    } else {
                        newWidth = wrapWidth / videoRatio;
                        setCss.width = wrapWidth + 'px';
                        setCss.height = Math.round(newWidth) + 'px';
                        if (style['object-position-y'] === 'top') setCss.marginTop = 0; else if (style['object-position-y'] === 'bottom') setCss.marginTop = Math.round(wrapHeight - newWidth) + 'px'; else
                            setCss.marginTop = Math.round((wrapHeight - newWidth) / 2) + 'px';
                    }
                }
            }

            function parsePosition(style) {
                if (~style['object-position'].indexOf('left')) style['object-position-x'] = 'left'; else if (~style['object-position'].indexOf('right')) style['object-position-x'] = 'right'; else
                    style['object-position-x'] = 'center';
                if (~style['object-position'].indexOf('top')) style['object-position-y'] = 'top'; else if (~style['object-position'].indexOf('bottom')) style['object-position-y'] = 'bottom'; else
                    style['object-position-y'] = 'center';
                return style;
            }

            function throttle(type, name, obj) {
                obj = obj || window;
                var running = false, evt = null;
                try {
                    evt = new CustomEvent(name);
                } catch (e) {
                    evt = document.createEvent('Event');
                    evt.initEvent(name, true, true);
                }
                var func = function () {
                    if (running)return;
                    running = true;
                    requestAnimationFrame(function () {
                        obj.dispatchEvent(evt);
                        running = false;
                    });
                };
                obj.addEventListener(type, func);
            }
        };

        function checkPolifill() {
            if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = objectFitVideos;
            setTimeout(function () {
                if ($("#background_video").length) {
                    objectFitVideos();
                    $('#background_video').get(0).play();
                }
            }, 1500);
        }

        function setHeroSlideshow() {
            $(".hero-slideshow").remove();
            if ($(".h-slideshow").length) {
                if (!isMobile() && typeof hero_slideshow === "object") {
                    if (typeof hero_slideshow[0] === "string") {
                        var s = 0;
                        $(".h-slideshow").prepend('<div class="hero-slideshow"></div>');
                        for (s = 0; s < hero_slideshow.length; s++) {
                            $(".hero-slideshow").append('<div class="hero-slide" style="background-image: url(' + hero_slideshow[s] + ');"></div>');
                        }
                        var imgs = $(".hero-slideshow .hero-slide");
                        var i = -1;
                        (function slideshow() {
                            setTimeout(function () {
                                i = (i + 1) % imgs.length;
                                $(imgs).not(imgs[i]).removeClass("current-slide");
                                $(imgs[i]).addClass("current-slide");
                                setTimeout(slideshow, 6000);
                            }, 500);
                        })();
                    }
                }
            }
        }

        function checkHeroFeatPosts() {
            setTimeout(function () {
                if (!$(".hero-header .feat-posts").length) {
                    var hs = $(".hero-search").parent().width();
                    if (viewport().width > 767) {
                        $(".hero-search,.search-categories").stop().animate({width: hs * 0.8, left: hs * 0.1});
                    } else {
                        $(".hero-search,.search-categories").stop().animate({width: hs * 0.9, left: hs * 0.05});
                    }
                }
            }, 1000);
        }

        var image, appending, imageCanvas, imageCanvasContext, lineCanvas, lineCanvasContext, pointLifetime,
            points = [];

        function start() {
            document.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', resizeCanvases);
            appending.appendChild(imageCanvas);
            resizeCanvases();
            tick();
        }

        function onMouseMove(event) {
            var scroll = 0;
            if (!$(".search-popup").length) scroll = $(document).scrollTop();
            points.push({time: Date.now(), x: event.clientX, y: event.clientY + scroll});
        }

        function resizeCanvases() {
            setTimeout(function () {
                var c = setInterval(function () {
                    if ($(".hero-header canvas").length) {
                        imageCanvas.width = lineCanvas.width = $(".hero-header canvas").parent().width();
                        imageCanvas.height = lineCanvas.height = $(".hero-header canvas").parent().height();
                    }
                }, 1);
                setTimeout(function () {
                    clearInterval(c);
                }, 200);
            }, 2000);
        }

        function tick() {
            points = points.filter(function (point) {
                var age = Date.now() - point.time;
                return age < pointLifetime;
            });
            drawLineCanvas();
            drawImageCanvas();
            requestAnimationFrame(tick);
        }

        function drawLineCanvas() {
            var minimumLineWidth = 40;
            var maximumLineWidth = 100;
            var lineWidthRange = maximumLineWidth - minimumLineWidth;
            var maximumSpeed = 50;
            lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
            lineCanvasContext.lineCap = 'round';
            lineCanvasContext.shadowBlur = 20;
            lineCanvasContext.shadowColor = '#000';
            for (var i = 1; i < points.length; i++) {
                var point = points[i];
                var previousPoint = points[i - 1];
                var distance = getDistanceBetween(point, previousPoint);
                var speed = Math.max(0, Math.min(maximumSpeed, distance));
                var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
                lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;
                var age = Date.now() - point.time;
                var opacity = (pointLifetime - age) / pointLifetime;
                lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
                lineCanvasContext.beginPath();
                lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
                lineCanvasContext.lineTo(point.x, point.y);
                lineCanvasContext.stroke();
            }
        }

        function getDistanceBetween(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }

        function drawImageCanvas() {
            var top = 0, left = 0;
            var width = imageCanvas.width;
            var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;
            if (height < imageCanvas.height) {
                width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
                height = imageCanvas.height;
                left = -(width - imageCanvas.width) / 2;
            } else {
                top = -(height - imageCanvas.height) / 2;
            }
            imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            imageCanvasContext.globalCompositeOperation = 'source-over';
            imageCanvasContext.drawImage(image, left, top, width, height);
            imageCanvasContext.globalCompositeOperation = 'destination-in';
            imageCanvasContext.drawImage(lineCanvas, 0, 0);
        }

        function addCanvasEffect() {
            image = document.querySelector('.clear-image');
            appending = document.querySelector('.bg-container');
            imageCanvas = document.createElement('canvas');
            imageCanvasContext = imageCanvas.getContext('2d');
            lineCanvas = document.createElement('canvas');
            lineCanvasContext = lineCanvas.getContext('2d');
            pointLifetime = 1000;
            points = [];
            if (image.complete) {
                start();
            } else {
                image.onload = start;
            }
        }

        function setCanvasEffect() {
            var href = window.location.href;
            var dir = href.substring(0, href.lastIndexOf('/')) + "/";
            var bgImage;
            var cElement;
            if ($(".h-video").length) cElement = $(".h-video"); else if ($(".h-slideshow").length) cElement = $(".h-slideshow"); else if ($(".hero-header").not(".login-popup,.review-popup,.pm-popup").length) cElement = $(".hero-header").not(".login-popup,.review-popup,.pm-popup");
            bgImage = cElement.find(".hero-image").css("background-image");
            if (bgImage !== "none") {
                bgImage = bgImage.replace(dir, "");
                bgImage = bgImage.replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "").replace(' ', "");
                bgImage = bgImage.replace('url(\"', "").replace("url(\'", "").replace("url(", "").replace('")', "");
                bgImage = bgImage.replace("')", "").replace(")", "");
                cElement.append('<div class="bg-container bg-media"><img class="clear-image" src="' + bgImage + '"></div>');
                addCanvasEffect();
            }
        }

        function showColors() {
            var colorsContainer = $(".template-colors");
            var colors = $(".template-colors a").length, colorCounter = 0;
            colorsContainer.animate({height: colorsContainer[0].scrollHeight}, {
                duration: 2000, complete: function () {
                    colorsContainer.css({overflow: "visible", height: "auto"});
                    $(".change-color-button").css({right: "-60000px"});
                }
            });
            var initLandingColors = setInterval(function () {
                var c = $(".template-colors a").eq(colorCounter);
                c.css({visibility: "visible"}).animate({opacity: 1}, {duration: 2000});
                if (c.css("background-color") === color_skin) c.addClass("current-color");
                colorCounter++;
                if (colorCounter === colors) clearInterval(initLandingColors);
            }, 80);
            resizeCanvases();
            videoRescale();
        }

        var he = ".hero-header ", temp, he_ = $(".hero-header"),
            color_skin = $("<div class='dumb'>").appendTo("body").addClass("color_skin").css("background-color");
        $(".dumb").remove();
        if ($.isFunction($.fn.dragScroll)) $('.gallery').before('<div class="wave-top-gallery"></div>').dragScroll({});
        $(".navbar-inverse .container").prepend('<div class="navbar-header"></div>');
        $(".navbar-inverse .navbar-header").append('<a class="navbar-toggle"></a>');
        $(".navbar-inverse .navbar-header .navbar-toggle").append('<span class="sr-only">Toggle</span>').append('<span class="icon-bar"></span>').append('<span class="icon-bar"></span>').append('<span class="icon-bar"></span>');
        he_.prepend('<div class="hero-image"></div>');
        he_.prepend('<div class="overlay"></div>');
        he_.prepend('<div class="dot-overlay"></div>');
        if ($(".masked").length) $(".masked").prepend('<div class="hero-mask"></div>');
        if ($(".texture").length) $(".texture").prepend('<div class="hero-texture"></div>');
        $(he).not(".search-popup").find(".overlay").css({display: "block"});
        $(".search-categories").append('<i class="more-categories fa fa-plus"></i>');
        $(".search-categories").append('<i class="minus-categories fa fa-minus"></i>');
        $(".listing-item-link").append('<div class="listing-black-overlay"></div>');
        if ($(".search-categories .categories").length)if ($(".search-categories .categories")[0].scrollHeight > 80) $(".search-categories .more-categories").css({display: "block"});
        $('#slide-nav.navbar-inverse').after($('<div class="inverse" id="navbar-height-col"></div>'));
        $('#slide-nav.navbar-default').after($('<div id="navbar-height-col"></div>'));
        $(".search-popup,.review-popup,.pm-popup,.login-popup").prepend('<div class="back-site icon-arrow-left"></div>');
        $(".listing-filter input[type='submit']").attr("value", "ï…¸");
        $(".accord-close").attr("href", "#accordion");
        $(".search-cities-toggle").delay(3000).animate({opacity: 1});
        if ($(".gallery").length || $("a[data-lightbox='gallery']").length) $(".lightbox").css({marginLeft: 0});
        var toggler = '.navbar-toggle';
        var pagewrapper = '#page-content';
        var navigationwrapper = '.navbar-header';
        var menuwidth = '100%';
        var slidewidth = '300px';
        var menuneg = '-300px';
        var slideneg = '-300px';
        var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
        $(".gallery .gallery-item a").each(function () {
            var _ = $(this);
            var title = _.attr("data-title");
            if (title !== undefined && title !== "undefined" && title !== "" && title !== " ") {
                _.after('<div class="gallery-item-caption">' + title + '</div>');
            }
            if (!_.parent().find("img").length) {
                _.after('<img alt="" src="' + _.attr("href") + '" \/>');
            } else if (_.attr("href") === "" || _.attr("href") === " " || _.attr("href") === "#") {
                _.attr("href", _.parent().find("img").attr("src"));
            }
        });
        if (!$("header").length) $("body").append('<div class="full-dimming-overlay"></div>'); else
            $("header").append('<div class="full-dimming-overlay"></div>');
        $(".accordion-item a").each(function () {
            var _ = $(this);
            _.after(_.prop("outerHTML").replace(/open/g, 'close').replace("href", 'class="accord-close" href'));
        });
        $(".accord-close").attr("href", "#accordion");
        var showForm = setInterval(function () {
            if ($("body").height() > 200) {
                $(".panel-form").stop().animate({opacity: 1}, {duration: 2000});
                clearInterval(showForm);
            }
        }, 500);
        setTimeout(function () {
            filterButtonMaxWidth();
            setTooltips();
        }, 2000);
        var landing = setInterval(function () {
            if ($(".h-video.landing").height() !== 500) {
                $(".hero-header.landing .header-centralizer").css({height: "100%"});
                $("body").css({width: "99.9%"});
                setTimeout(function () {
                    $("body").css({width: "100%"});
                }, 100);
                clearInterval(landing);
            }
        }, 500);
        if (typeof vm_video !== "undefined") {
            if (vm_video !== undefined && vm_video !== "" && vm_video !== " ") {
                addHeroVideo();
                $(".hero-video").append('<iframe class="fullvid" id="myVid" width="1280" height="720" src="https://player.vimeo.com/video/' + vm_video + '?background=1" frameborder="0"  volume="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }
        }
        if (typeof yt_video !== "undefined") {
            if (yt_video !== undefined && yt_video !== "" && yt_video !== " ") {
                addHeroVideo();
                $(".hero-video").append('<div class="screen mute" id="tv"></div>');
                $(".hero-video").css({opacity: 0});
                createdVideoDiv = 1;
            }
        }
        setCanvasEffect();
        if ($.isFunction($.fn.tooltip)) {
            $('.pg-user [data-toggle="tooltip"],.more-listing[data-toggle="tooltip"],.more-map-listing[data-toggle="tooltip"], .template-colors [data-toggle="tooltip"]').tooltip();
            $('[data-toggle="tooltip"]').not('[data-original-title]').tooltip({container: 'body'});
        }
        if ($.isFunction($.fn.mousewheel)) $(".gallery").mousewheel(function (event, delta) {
            this.scrollLeft -= (delta * 30);
            event.preventDefault();
        });
        resetElements();
        $(window).on("resize", function () {
            resetElements();
        });
        $('.hero-search input[type="text"]').on("click", function () {
            var _ = $(this);
            if (_.val() === "") {
                $(".typingEffect,.typed-cursor").remove();
                $(this).addClass("inFocus");
            }
        });
        $('.search-cities-toggle').on("click", function () {
            $(this).closest('.hero-header').addClass("open-cities-list");
            $(".search-cities").css({top: "-1000px"});
            $(".search-cities").stop().animate({top: [0, 'easeOutExpo']}, {duration: 1500});
        });
        $('body').on("click", ".search-cities a", function (e) {
            var _ = $(this);
            if (!$(".hero-header").hasClass("open-cities-list")) {
                setTimeout(function () {
                    _.closest('.hero-header').addClass("open-cities-list");
                    $(".search-cities").css({top: "-1000px"});
                    $(".search-cities").stop().animate({top: [0, 'easeOutExpo']}, {duration: 1500});
                }, 50);
            } else {
                if ($(e.target).is(".current") || $(e.target).parent().is(".current")) {
                    e.preventDefault();
                    e.stopPropagation();
                    $(this).closest('.hero-header').removeClass("open-cities-list");
                } else if ($(e.target).is(".go-more-cities") || $(e.target).parent().is(".go-more-cities")) {
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                    var lastCurrent = $(".search-cities .current");
                    lastCurrent.removeAttr("class");
                    _.addClass("current");
                    $(".chosen-city").val(_.attr("data-city-id"));
                    $(this).closest('.hero-header').removeClass("open-cities-list");
                    var _HTML = _.prop("outerHTML"), lastCurrentHTML = lastCurrent.prop("outerHTML");
                    _.before(lastCurrentHTML);
                    lastCurrent.before(_HTML);
                    lastCurrent.remove();
                    _.remove();
                }
            }
        });
        $("body").on("click", function (e) {
            var field = '.hero-search input[type="text"]';
            if (!$(e.target).is(".hero-search input[type='text']") && $(field).val() === "") {
                if ($(field).hasClass("inFocus")) {
                    $(field).removeClass("inFocus");
                    $(".typingEffect,.typed-cursor").remove();
                    $('.hero-search fieldset').append(typedAnimatedTexts);
                    startTypingEffect();
                }
            }
        });
        $(".hero-header .search-submit").on({
            'mouseenter': function (e) {
                $(".hero-search-icon").addClass("hover");
            }, 'mouseleave': function (e) {
                $(".hero-search-icon").removeClass("hover");
            }
        });
        $(".show-categories").on("click", function () {
            var _ = $(this);
            setTimeout(function () {
                if (_.hasClass("opt-hidden")) {
                    $(".show-categories, .search-categories").removeClass("opt-hidden");
                    $(".hero-search").css({display: "none"});
                }
            }, 5);
        });
        $(".feat-posts .toggle").on("click", function () {
            if ($(".feat-posts").width() > 30) {
                $(".hero-search,.feat-posts").addClass("hide-feat");
                $(".hero-search").siblings('.search-categories').addClass("hide-feat");
            } else {
                $(".hero-search,.feat-posts").removeClass("hide-feat");
                $(".hero-search").siblings('.search-categories').removeClass("hide-feat");
            }
            videoRescale();
            resizeCanvases();
        });
        $(".background-caption").on({
            'mouseenter': function (e) {
                var _ = $(this).find(".bg-title");
                $(".hero-arrow").addClass("hover").stop().animate({
                    left: $(this).width() / 2 + 10,
                    bottom: $(this).height() + 5
                }, {duration: 300});
                _.html(_.html() + " <span>+</span>");
            }, 'mouseleave': function (e) {
                var _ = $(this).find(".bg-title");
                $(".hero-arrow").removeClass("hover").stop().animate({left: 10, bottom: 45}, {duration: 300});
                _.html(_.html().replace(" <span>+</span>", ""));
            }
        });
        $(".logo a").not(".logo-landing").on({
            'mouseenter': function (e) {
                $(this).stop().animate({opacity: 0.7});
            }, 'mouseleave': function (e) {
                $(this).stop().animate({opacity: 1});
            }
        });
        var catScrolQtd = 0;
        if ($(".search-categories .categories").length) catScrolQtd = $(".search-categories .categories")[0].scrollHeight;
        $(".search-categories .more-categories").on({
            'click': function (e) {
                var __ = $(".search-categories .categories"), _ = $(".search-categories");
                _.stop().animate({"max-height": 800}, {duration: 600});
                $(this).css({display: "none"});
                $(".search-categories .minus-categories").css({display: "block"});
                $(".search-cities-toggle,.search-cities").css({display: "none"});
                videoRescale();
                resizeCanvases();
            }
        });
        $(".search-categories .minus-categories").on({
            'click': function (e) {
                var __ = $(".search-categories .categories"), _ = $(".search-categories");
                if (_.height() > 120) {
                    _.stop().animate({"max-height": [93, 'easeOutExpo']}, {duration: 200});
                    $(this).css({display: "none"});
                    $(".search-categories .more-categories").css({display: "block"});
                } else {
                    __.stop().animate({marginTop: parseInt(__.css('margin-top').replace(/[^-\d\.]/g, ''), 10) + 76});
                    catScrolQtd = catScrolQtd + 76;
                    $(".search-categories .more-categories").css({display: "block"});
                    if (__[0].scrollHeight - catScrolQtd < 70) {
                        $(this).css({display: "none"});
                    }
                }
                $(".search-cities-toggle,.search-cities").css({display: "block"});
                videoRescale();
                resizeCanvases();
            }
        });
        $(".app-links a").on({
            "mouseenter": function () {
                $(".app-img img").addClass("hover");
            }, "mouseleave": function () {
                $(".app-img img").removeClass("hover");
            }
        });
        $("body").on("click", ".full-dimming-overlay", function () {
            if ($("#slidemenu").css('left').replace(/[^-\d\.]/g, '') === "0") {
                $(toggler).trigger("click");
            }
        });
        $("#slide-nav").on("click", toggler, function (e) {
            var selected = $(this).hasClass('slide-active');
            if (!selected) {
                stopScrolling(1);
                $(".full-dimming-overlay").css({display: "block"}).stop().animate({opacity: 0.88}, {duration: 1000});
            } else {
                if ($(".search-popup").css("left") !== "0px" && $(".login-popup").css("left") !== "0px" && $(".review-popup").css("left") !== "0px" && $(".pm-popup").css("left") !== "0px") {
                    stopScrolling(0);
                }
                $(".full-dimming-overlay").stop().animate({opacity: 0}, {
                    duration: 1000, complete: function () {
                        $(".full-dimming-overlay").css({display: "none"});
                    }
                });
            }
            $('#slidemenu').stop().animate({left: selected ? menuneg : '0px'});
            $('#navbar-height-col').stop().animate({left: selected ? slideneg : '0px'});
            $(pagewrapper).stop().animate({left: selected ? '0px' : slidewidth});
            $(navigationwrapper).stop().animate({left: selected ? '0px' : '225px'});
            $(this).toggleClass('slide-active', !selected);
            $('#slidemenu').toggleClass('slide-active');
            $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
        });
        $(".listing-item-link").on({
            "mouseenter": function () {
                var _ = $(this);
                if (_.parent().parent().parent().hasClass("grid2") || _.parent().parent().parent().hasClass("grid3")) {
                    _.siblings('a, .listing-item-rating').not(".listing-item-author").stop().animate({
                        top: "-10px",
                        opacity: 0
                    });
                    _.siblings('.listing-item-author').stop().animate({top: "110px", opacity: 0});
                    _.siblings('.listing-item-date').stop().animate({top: "-60px", opacity: 0});
                } else if (_.parent().parent().parent().parent().hasClass("grid6") && _.parent().parent().parent().parent().hasClass("rounded-pic")) {
                    _.siblings('a').not(".listing-item-author").stop().animate({top: "-20px", opacity: 0});
                    _.find('.listing-item-rating').stop().animate({top: "-20px", opacity: 0});
                    _.siblings('.listing-item-author').stop().animate({top: 0, opacity: 0});
                    _.siblings('.listing-item-date').stop().animate({top: "-60px", opacity: 0});
                } else {
                    _.siblings('a, .listing-item-rating').not(".listing-item-author").stop().animate({
                        top: "-10px",
                        opacity: 0
                    });
                    _.siblings('.listing-item-author').stop().animate({top: 0, opacity: 0});
                    _.siblings('.listing-item-date').stop().animate({top: "-60px", opacity: 0});
                }
            }, "mouseleave": function () {
                var _ = $(this);
                if (_.parent().parent().parent().hasClass("grid2") || _.parent().parent().parent().hasClass("grid3")) {
                    _.siblings('.listing-item-rating').stop().animate({top: "10px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-rating').css({top: ""});
                        }
                    });
                    _.siblings('.category-icon').stop().animate({top: "25px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.category-icon').css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-author').stop().animate({top: "84px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-author').css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-date').stop().animate({top: "-5px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-date').css({top: ""});
                        }
                    });
                } else if (_.parent().parent().parent().parent().hasClass("grid6") && _.parent().parent().parent().parent().hasClass("rounded-pic")) {
                    _.find('.listing-item-rating').stop().animate({top: "-8px", opacity: 1}, {
                        complete: function () {
                            _.find('.listing-item-rating').css({top: ""});
                        }
                    });
                    _.siblings('a').not(".listing-item-author").stop().animate({
                        top: "35px",
                        opacity: 1
                    }, {
                        complete: function () {
                            _.siblings('a').not(".listing-item-author").css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-author').stop().animate({top: "-44px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-author').css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-date').stop().animate({top: "-5px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-date').css({top: ""});
                        }
                    });
                } else if (_.parent().parent().parent().hasClass("squared") || (_.parent().parent().parent().hasClass("squared-mobile") && viewport().width <= 600)) {
                    _.siblings('a, .listing-item-rating').not(".listing-item-author").stop().animate({
                        top: "6%",
                        opacity: 1
                    }, {
                        complete: function () {
                            _.siblings('a, .listing-item-rating').not(".listing-item-author").css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-author').stop().animate({top: "-44px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-author').css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-date').stop().animate({top: "-5px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-date').css({top: ""});
                        }
                    });
                } else {
                    _.siblings('a, .listing-item-rating').not(".listing-item-author").stop().animate({
                        top: "12%",
                        opacity: 1
                    }, {
                        complete: function () {
                            _.siblings('a, .listing-item-rating').not(".listing-item-author").css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-author').stop().animate({top: "-44px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-author').css({top: ""});
                        }
                    });
                    _.siblings('.listing-item-date').stop().animate({top: "-5px", opacity: 1}, {
                        complete: function () {
                            _.siblings('.listing-item-date').css({top: ""});
                        }
                    });
                }
            }
        });
        $(".gallery-item a").on("mouseenter", function () {
            $(this).parent().addClass("dark-overlay");
            $(this).parent().find(".gallery-item-caption").stop().animate({opacity: 0}, {duration: 1000});
        });
        $(".gallery-item a").on("mouseleave", function () {
            $(".gallery-item a").parent().removeClass("dark-overlay");
            $(this).parent().find(".gallery-item-caption").stop().animate({opacity: 1}, {duration: 1000});
        });
        $("body").on("click", ".header-search-button,.search-pop-button", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!$(".search-popup").hasClass("showing-search")) {
                stopScrolling(1);
                $(".search-popup").addClass("showing-search").css({left: "-100%", zindex: 999}).stop().animate({
                    left: 0,
                    opacity: 1
                }, {duration: 500});
                $(".review-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                $(".pm-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                $(".login-popup").css({zIndex: 998}).stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                setTimeout(function () {
                    $(".review-popup").removeClass("showing-review");
                    $(".pm-popup").removeClass("showing-pm");
                    $(".login-popup").removeClass("showing-login");
                }, 500);
            } else {
                stopScrolling(0);
                $(".search-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                setTimeout(function () {
                    $(".search-popup").removeClass("showing-search");
                }, 500);
            }
        });
        $("body").on("click", ".search-popup .back-site", function () {
            stopScrolling(0);
            $(".search-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
            setTimeout(function () {
                $(".search-popup").removeClass("showing-search");
            }, 500);
        });
        $('#login-form-link').on("click", function (e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').on("click", function (e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $(".quick-menu a").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var _ = $(this);
            var qMenu = $(".quick-menu a");
            var show = $(".quick-menu a.show-menu");
            var hidde = $(".quick-menu a.hidde-menu");
            if (_.hasClass("hide-menu")) {
                qMenu.addClass("hidden");
                show.removeClass("hidden");
                qMenu.parent().addClass("hidden-menu");
            } else if (_.hasClass("show-menu")) {
                qMenu.removeClass("hidden");
                show.addClass("hidden");
                qMenu.parent().removeClass("hidden-menu");
            }
            if (_.hasClass("gal")) {
                $('html, body').stop().animate({scrollTop: $("#gal").offset().top - 112}, 600);
            }
            if (_.hasClass("desc")) {
                $('html, body').stop().animate({scrollTop: $("#desc").offset().top - 124}, 600);
            }
            if (_.hasClass("rev")) {
                $('html, body').stop().animate({scrollTop: $("#rev").offset().top - 124}, 600);
            }
            if (_.hasClass("mp")) {
                $('html, body').stop().animate({scrollTop: $("#mp").offset().top - 124}, 600);
            }
            if (_.hasClass("rel")) {
                $('html, body').stop().animate({scrollTop: $("#rel").offset().top - 124}, 600);
            }
            if (_.hasClass("pvt")) {
                setTimeout(function () {
                    $(".pvt").trigger("mouseleave");
                }, 2000);
                stopScrolling(1);
                $(".pm-popup").addClass("showing-pm").css({left: "-100%"}).stop().animate({
                    left: 0,
                    opacity: 1
                }, {duration: 500});
            }
            if ($.isFunction($.fn.tooltip)) {
                $('[data-toggle="tooltip"]').tooltip('hide');
            }
        });
        $(".listing-item-rating").on("click", function () {
            $('html, body').stop().animate({scrollTop: $("#rev").offset().top - 124}, 600);
        });
        $("body").on("click", ".write-review a", function (e) {
            e.preventDefault();
            e.stopPropagation();
            stopScrolling(1);
            $(".review-popup").addClass("showing-review").css({left: "-100%"}).stop().animate({
                left: 0,
                opacity: 1
            }, {duration: 500});
        });
        $("body").on("click", ".review-popup .back-site", function () {
            stopScrolling(0);
            $(".review-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
            setTimeout(function () {
                $(".review-popup").removeClass("showing-review");
            }, 500);
        });
        $("body").on("click", ".user-login,.sign-in", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (!$(".login-popup").hasClass("showing-login")) {
                stopScrolling(1);
                $(".login-popup").addClass("showing-login").css({left: "-100%", zIndex: 999}).stop().animate({
                    left: 0,
                    opacity: 1
                }, {duration: 500});
                $(".review-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                $(".pm-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                $(".search-popup").css({zIndex: 998}).stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                setTimeout(function () {
                    $(".search-popup").removeClass("showing-search");
                    $(".review-popup").removeClass("showing-review");
                    $(".pm-popup").removeClass("showing-pm");
                }, 500);
            } else {
                stopScrolling(0);
                $(".login-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
                setTimeout(function () {
                    $(".login-popup").removeClass("showing-login");
                }, 500);
            }
        });
        $("body").on("click", ".login-popup .back-site", function () {
            stopScrolling(0);
            $(".login-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
            setTimeout(function () {
                $(".login-popup").removeClass("showing-login");
            }, 500);
        });
        $("body").on("click", ".pm-popup .back-site", function () {
            stopScrolling(0);
            $(".pm-popup").stop().animate({left: "-200%", opacity: 0.99}, {duration: 500});
            setTimeout(function () {
                $(".pm-popup").removeClass("showing-pm");
            }, 500);
        });
        $("body").on("click", ".change-color-button", function (e) {
            e.preventDefault();
            e.stopPropagation();
            var _ = $(this);
            _.animate({right: "-500px", opacity: 0});
            showColors();
        });
        $(".logo-landing").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        var onMap = 0;

        function showMap() {
            onMap = 1;
            $(".body-wrapper").css({height: "100%"});
            $(".map-buttom").stop().animate({opacity: 0});
            $(".more-listing").css({display: "none"});
            $("#map").removeClass("mapHidden");
            $(".map-buttom").removeClass("hover");
            $(".mapList").stop().animate({right: 0}, {duration: 800});
            $(".map-listing").stop().animate({height: $(window).height() - 60}, {duration: 1000});
            $(".current-page-info,.header-search").addClass("hide-page-info");
            listingMapResize(1);
            setTimeout(function () {
                map.invalidateSize();
                map.fitBounds(bounds);
            }, 800);
            setTimeout(function () {
                $(".map-listing").removeClass("map-hidden");
                $(".page-head").css({display: "none"});
            }, 1000);
            setMapDefaultVisibility();
        }

        function setMapDefaultVisibility() {
            if ($("body").hasClass("map-and-page")) {
                $(".listing-block").css({opacity: 1});
                $(".listing-block, footer").css({display: "block"});
            } else {
                $(".listing-block").stop().animate({opacity: 0}, {
                    duration: 500, complete: function () {
                        $(".listing-block, footer").css({display: "none"});
                    }
                });
            }
        }

        function hasVerticalScrollbar() {
            if ($(document).height() > $(window).height())return true; else
                return false;
        }

        function listingMapResize(init, w) {
            if ($(".mapList").length) {
                if (viewport().width > 767) {
                    var listRight = parseInt($(".mapList").css("right").replace(/[^-\d\.]/g, ''), 10),
                        ww = $(window).width(), dif;
                    if (hasVerticalScrollbar()) dif = 270; else
                        dif = 285;
                    if (typeof init !== "undefined") {
                        if (init === 1) {
                            w = ww - dif;
                        } else {
                            if (typeof w === "undefined") {
                                if (listRight < 0) w = ww;
                                if (listRight === 0) w = ww - dif;
                            }
                        }
                    } else {
                        if (listRight < 0) w = ww;
                        if (listRight === 0) w = ww - dif;
                    }
                    $("#map").height($(window).height() - 60).width(w);
                    $(".mapList").css({display: "block"});
                } else {
                    $("#map").height($(window).height() - 60).width($(window).width());
                    $(".mapList").css({display: "none"});
                }
                $(".mapList").height("100%").width(285);
            }
        }

        function contactMapResize() {
            $(".map-contact #map").height(350).width($(window).width());
        }

        function singleListingMapResize() {
            $(".listing-map #map").height(450).width($(".listing-map #map").parent().width());
        }

        listingMapResize(1);
        contactMapResize();
        singleListingMapResize();
        if ($(".mapList").length) {
            $(".mapList").append('<div class="close-map-listing icon-cross2"></div>').append('<div class="feat-posts"></div>');
            $(".mapList .feat-posts").append('<div class="helper"></div>');
            $(".mapList .helper").append('<div class="feat-posts-list"></div>');
            setTimeout(function () {
                $(".feat-posts-list").prepend($(".results-count").prop("outerHTML"));
            }, 500);
        }
        if ($("body").hasClass("map-view")) showMap();
        var osmUrl = 'http://tile.jawg.io/sunny/{z}/{x}/{y}.png?api-key=community',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a>', osm, lat = 50.5,
            lng = 30.51, map, markers = {}, divMarker, listingItem = {}, bounds = [], popupToggling = 0, mapCreated = 0;
        if (typeof mapMarkers !== "undefined" && $("#map").length) {
            var latlng = new L.LatLng(lat, lng);
            osm = L.tileLayer(osmUrl, {minZoom: 3, maxZoom: 18, attribution: osmAttrib});
            map = new L.Map('map', {center: latlng, zoom: 14, layers: [osm]});
            for (var i = 0; i < mapMarkers.length; i++) {
                mapMarkers[i].id = '_' + Math.random().toString(36).substr(2, 9);
                listingItem[mapMarkers[i].id] = mapMarkers[i];
                var templistingItem = listingItem[mapMarkers[i].id];
                var latLng = new L.LatLng(templistingItem.lat, templistingItem.lng);
                var icon;
                if (typeof templistingItem.icon === "undefined") icon = "icon-map-marker"; else
                    icon = templistingItem.icon;
                divMarker = L.divIcon({iconSize: new L.Point(50, 50), html: '<i class="' + icon + '"></i>'});
                markers[templistingItem.id] = new L.marker(latLng, {icon: divMarker}).addTo(map);
                markers[templistingItem.id]._icon.id = templistingItem.id;
                bounds[i] = [templistingItem.lat, templistingItem.lng];
                if ($(".mapList").length) {
                    $(".mapList .feat-posts-list").append('<div class="feat-post temp-div"></div>');
                    $(".temp-div").addClass(templistingItem.id);
                    if (typeof templistingItem.link !== "undefined") $(".temp-div").append('<a href="' + templistingItem.link + '"></a>'); else
                        $(".temp-div").append('<a href="#"></a>');
                    if (isMobile()) $(".temp-div").append('<div class="map-icon icon-map2"></div>');
                    $(".temp-div a").append('<div class="feat-post-icon ' + icon + '"></div>');
                    if (typeof templistingItem.featText !== "undefined") $(".temp-div a").append('<div class="ribbon">' + templistingItem.featText + '</div>');
                    if (typeof templistingItem.rating !== "undefined") $(".temp-div a").append('<div class="listing-item-rating">' + templistingItem.rating + '</div>').append('<div class="feat-post-pic"></div>').append('<div class="feat-post-data"></div>');
                    if (typeof templistingItem.img !== "undefined") $(".temp-div .feat-post-pic").append('<div style="background-image:url(\'' + templistingItem.img + '\')"></div>');
                    $(".temp-div .feat-post-data").append('<div class="feat-post-title"></div>').append('<div class="feat-post-category"></div>');
                    if (typeof templistingItem.title !== "undefined") $(".temp-div .feat-post-title").append(templistingItem.title);
                    if (typeof templistingItem.category !== "undefined") $(".temp-div .feat-post-category").append(templistingItem.category);
                    $(".feat-post").removeClass("temp-div");
                }
            }
            if ($(".mapList").length) {
                $("#map").addClass("mapHidden");
                $("#map").append('<div class="back-listing-button icon-arrow-left">Listing View</div>');
                $(".mapList .feat-posts-list").append('<a href="#"class="more-map-listing icon-plus" title="More Listings" data-toggle="tooltip" data-placement="top"></a>');
                listingMapResize(0, "100%");
            }
            map.fitBounds(bounds);
            setTimeout(function () {
                map.invalidateSize();
            }, 1000);
        }
        $(".map-buttom .map-button-text").on({
            "mouseenter": function () {
                if (!onMap) {
                    $(".current-page-info,.header-search").addClass("hide-page-info");
                    $(".map-buttom").addClass("hover");
                }
            }, "mouseleave": function () {
                if (!onMap) {
                    $(".current-page-info,.header-search").removeClass("hide-page-info");
                    $(".map-buttom").removeClass("hover");
                }
            }, "click": function () {
                showMap();
            }
        });
        $("body").on("click", ".back-listing-button", function () {
            onMap = 0;
            $(".body-wrapper").css({height: ""});
            setTimeout(function () {
                $(".current-page-info,.header-search").stop().removeClass("hide-page-info");
            }, 500);
            $(".more-listing").css({display: "block"});
            $(".page-head").css({display: "table"});
            $(".page-head,.map-buttom").stop().animate({opacity: 1});
            $(".map-listing").stop().animate({height: 250}, {duration: 1000});
            listingMapResize(0, "100%");
            setTimeout(function () {
                map.invalidateSize();
            }, 800);
            setTimeout(function () {
                $(".map-listing").addClass("map-hidden");
            }, 1000);
            $("#map").addClass("mapHidden");
            $(".mapList").stop().animate({right: -350}, {duration: 1500});
            $(".listing-block, footer").css({display: "block"});
            $(".listing-block").stop().animate({opacity: 1}, {duration: 2000});
            $(".close-map-listing").addClass("icon-cross2").removeClass("icon-map-marker");
        });
        $("body").on("click", ".close-map-listing", function (e) {
            if ($(".mapList").css("right") === "0px") {
                $(".close-map-listing").removeClass("icon-cross2").addClass("icon-map-marker");
                listingMapResize(0, "100%");
                setTimeout(function () {
                    map.invalidateSize();
                }, 1000);
                $(".mapList").stop().animate({right: -290}, {duration: 1500});
            } else {
                $(".close-map-listing").addClass("icon-cross2").removeClass("icon-map-marker");
                $(".mapList").stop().animate({right: 0}, {duration: 1500});
                setTimeout(function () {
                    listingMapResize(1);
                }, 1000);
                setTimeout(function () {
                    map.invalidateSize();
                }, 1500);
            }
        });
        $("body").on("click", ".leaflet-div-icon", function (e) {
            var _ = this, __ = $(this), id = __.attr('id'), html;
            if (typeof listingItem[id].link !== "undefined") {
                if (listingItem[id].link !== "undefined" && listingItem[id].link !== undefined && listingItem[id].link !== "#" && listingItem[id].link !== "" && listingItem[id].link != " ") html = '<div class="maplink ' + id + '" data-link="' + listingItem[id].link + '">'; else {
                    html = '<div class="maplink no-hover ' + id + '" data-link="#" style="cursor: default;">';
                }
            } else {
                html = '<div class="maplink no-hover ' + id + '" data-link="#" style="cursor: default;">';
            }
            popupToggling = 1;
            setTimeout(function () {
                if (!__.hasClass("selected") && !__.hasClass("recentlyClosed")) {
                    $(".leaflet-div-icon").removeClass("recentlyClosed");
                    $(".leaflet-div-icon").not(_).removeClass("selected");
                    $(".leaflet-div-icon").removeClass("highZ");
                    __.addClass("selected").addClass("highZ");
                    popupToggling = 0;
                    if (typeof listingItem[id].rating !== "undefined") html += '<div class="pop-rating">' + listingItem[id].rating + '</div>';
                    if (typeof listingItem[id].img !== "undefined") html += '<div class="pop-img" style="background-image:url(\'' + listingItem[id].img + '\')">';
                    html += '<div class="pop-coor-icon"></div>';
                    if (typeof listingItem[id].featText !== "undefined") html += '<div class="ribbon">' + listingItem[id].featText + '</div>';
                    html += '</div>';
                    html += '<div class="pop-coors">';
                    if (typeof listingItem[id].lat !== "undefined") html += '<div><span>Lat</span> ' + listingItem[id].lat + '</div><br>';
                    if (typeof listingItem[id].lng !== "undefined") html += '<div><span>Lng</span> ' + listingItem[id].lng + '</div>';
                    html += '</div>';
                    if (typeof listingItem[id].title !== "undefined") html += '<div class="pop-title">' + listingItem[id].title + '</div>';
                    if (typeof listingItem[id].category !== "undefined") html += '<div class="pop-category">' + listingItem[id].category + '</div>';
                    if (typeof listingItem[id].address !== "undefined") html += '<div class="pop-address">' + listingItem[id].address + '</div>';
                    html += '</div>';
                    markers[id].bindPopup(html);
                    markers[id].openPopup();
                } else {
                    popupToggling = 0;
                    $(".leaflet-div-icon").removeClass("selected recentlyClosed");
                    $(".leaflet-popup").stop().animate({marginBottom: "0px"}, {duration: 300});
                    markers[id].closePopup();
                }
            }, 3);
        });
        $("body").on("click", "#map", function (e) {
            if ($(e.target).hasClass("leaflet-pane") || $(e.target).hasClass("leaflet-container") && dragging === 0) {
                $(".leaflet-div-icon").removeClass("selected recentlyClosed");
                $(".leaflet-popup").stop().animate({marginBottom: "0px"}, {duration: 300});
            }
        });
        $("body").on("mouseenter", ".mapList .feat-post", function (e) {
            var _ = $(e.target).parent(), id;
            if (_.hasClass("feat-post")) {
                id = _.attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
                setTimeout(function () {
                    $(".leaflet-div-icon").removeClass("selected");
                    $("#" + id).addClass("selected");
                }, 15);
            } else if (_.parent().hasClass("feat-post")) {
                id = _.parent().attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
                setTimeout(function () {
                    $(".leaflet-div-icon").removeClass("selected");
                    $("#" + id).addClass("selected");
                }, 15);
            } else if (_.parent().parent().hasClass("feat-post")) {
                id = _.parent().parent().attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
                setTimeout(function () {
                    $(".leaflet-div-icon").removeClass("selected");
                    $("#" + id).addClass("selected");
                }, 15);
            }
        });
        $("body").on("click", ".mapList .feat-post .map-icon", function (e) {
            var _ = $(e.target).parent().parent(), id;
            if (_.hasClass("feat-post")) {
                id = _.attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
            } else if (_.parent().hasClass("feat-post")) {
                id = _.parent().attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
            } else if (_.parent().parent().hasClass("feat-post")) {
                id = _.parent().parent().attr("class").replace("feat-post ", "");
                if (!$("#" + id).hasClass("selected")) $("#" + id).trigger("click");
            }
        });
        $("body").on("click", ".pop-coor-icon", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($(this).parent().siblings('.pop-coors').css("display") === "none") $(this).parent().siblings('.pop-coors').css({display: "block"}); else
                $(this).parent().siblings('.pop-coors').css({display: "none"});
        });
        $("body").on("click", ".pop-coors", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $("body").on("click", ".maplink", function (e) {
            if ($(this).attr("data-link") === "#") {
                e.preventDefault();
                e.stopPropagation();
            } else
                window.location.href = $(this).attr('data-link');
        });
        var dragging = 0;
        if (typeof mapMarkers !== "undefined" && $("#map").length) {
            map.on('movestart', function (e) {
                dragging = 1;
            });
            map.on('moveend', function (e) {
                setTimeout(function () {
                    dragging = 0;
                }, 10);
            });
            map.on('popupopen', function (e) {
                var px = map.project(e.popup._latlng);
                px.y -= e.popup._container.clientHeight / 2;
                map.panTo(map.unproject(px), {animate: true});
                $(".leaflet-popup").css({marginBottom: "0px"}).stop().animate({marginBottom: "32px"}, {duration: 100});
            });
            map.on('popupclose', function (e) {
                if (!popupToggling) {
                    $(".leaflet-div-icon").each(function () {
                        if ($(this).hasClass("selected")) $(this).removeClass("selected").addClass("recentlyClosed");
                    });
                    $(".leaflet-popup").stop().animate({marginBottom: "0px"}, {duration: 300});
                }
                setTimeout(function () {
                    $(".leaflet-div-icon").removeClass("recentlyClosed");
                }, 6);
            });
        }
        $(window).on("resize", function () {
            if (typeof mapMarkers !== "undefined" && $("#map").length) {
                if (!$(".map-listing.map-hidden").length) $(".map-listing").stop().animate({height: $(window).height() - 60}, {duration: 300});
                setTimeout(function () {
                    listingMapResize();
                    contactMapResize();
                    singleListingMapResize();
                }, 300);
                setTimeout(function () {
                    map.fitBounds(bounds);
                }, 500);
                setTimeout(function () {
                    map.invalidateSize();
                }, 1100);
            }
        });
    });
})();