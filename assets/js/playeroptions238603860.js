



var playerSetting = JSON["parse"]($_("[data-player]")["dataset"]["player"]);

var topRight =  0;
if (playerSetting["videoTopRight"]["is_active"] && playerSetting["videoTopRight"]["link"]["length"]) {
    topRight = `<div class="custom-ads"><a href="" + playerSetting["videoTopRight"]["link"] + "" target="_blank"><img src="/file/top/" + playerSetting["videoTopRight"]["imageUrl"] + ""></a></div>`;
} else {
    if (playerSetting["videoTopRight"]["is_active"] && playerSetting["videoTopRight"]["imageUrl"]["length"]) {
        topRight = `<div class="custom-ads"><img src="/file/top/${ playerSetting["videoTopRight"]["imageUrl"]}"></div>`;
    } else {
        topRight = "";
    }
}
console.log(playerSetting);
var watermark =  0;
if (playerSetting["watermark"]["is_active"] && playerSetting["watermark"]["imageUrl"]["length"]) {
    watermark = `<div class="watermark ${playerSetting["watermark"]["position"]}">
        ${(playerSetting["watermark"]["link"]["length"] ? '<a href="' + playerSetting["watermark"]["link"] + '" target="_blank">' : "")}
        <img src="${playerSetting["watermark"]["imageUrl"]}" alt="YayÄ±n Logosu">
        ${(playerSetting["watermark"]["link"]["length"] ? "</a>" : "")}</div>`;
} else {
    watermark = "";
}


var hlsOptions = {
    "maxBufferSize": 5,
    "manifestLoadingTimeOut": 5E3,
    "manifestLoadingMaxRetry": 4,
    "manifestLoadingRetryDelay": 1E3,
    "manifestLoadingMaxRetryTimeout": 1E4,
    "debug": ![]
};
var hls = new Hls(hlsOptions);

var video = $_(".live-video-player");



var player = new Plyr(video, {
    "title": "",
    "controls": `${watermark}
                <div class="channel-name">${($_("[data-stream].active") ? $_("[data-stream].active")["dataset"]["name"] : "")}</div>
                ${topRight}
                <div class="plyr__controls">
                <div class="player-flex">
                <div class="live-button">
                    <div class="live-blink"></div>
                    <div class="live-text">CANLI</div>
                </div>
                    <button type="button" class="plyr__control" data-plyr="rewind">
                        <svg role="presentation" viewBox="0 0 512 512">
                        <g class="fa-group"><path fill="currentColor" d="M129 383a12 12 0 0 1 16.37-.56A166.77 166.77 0 0 0 256 424c93.82 0 167.24-76 168-166.55C424.79 162 346.91 87.21 254.51 88a166.73 166.73 0 0 0-113.2 45.25L84.69 76.69A247.12 247.12 0 0 1 255.54 8C392.35 7.76 504 119.19 504 256c0 137-111 248-248 248a247.11 247.11 0 0 1-166.18-63.91l-.49-.46a12 12 0 0 1 0-17z" class="fa-secondary"></path><path fill="currentColor" d="M49 41l134.06 134c15.09 15.15 4.38 41-17 41H32a24 24 0 0 1-24-24V57.94C8 36.56 33.85 25.85 49 41z" class="fa-primary"></path></g> 
                        </svg>
                        <span class="plyr__tooltip" role="tooltip">{seektime} saniye geriye sar</span>
                    </button>
                    <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
                        <svg class="icon--pressed" role="presentation" viewBox="0 0 448 512">
                        
                        <g class="fa-group">
                        <path fill="currentColor" d="M144 31H48A48 48 0 0 0 0 79v352a48 48 0 0 0 48 48h96a48 48 0 0 0 48-48V79a48 48 0 0 0-48-48zm-16 368a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V111a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16zM400 31h-96a48 48 0 0 0-48 48v352a48 48 0 0 0 48 48h96a48 48 0 0 0 48-48V79a48 48 0 0 0-48-48zm-16 368a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V111a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16z" class="fa-secondary"></path>
                        <path fill="transparent" d="M112 95H80a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V111a16 16 0 0 0-16-16zm256 0h-32a16 16 0 0 0-16 16v288a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V111a16 16 0 0 0-16-16z" class="fa-primary"></path></g>

                        </svg>
                        <svg class="icon--not-pressed" role="presentation" viewBox="0 0 448 512">
                        <g class="fa-group"><path fill="currentColor" d="M424.41 214.66L72.41 6.55C43.81-10.34 0 6.05 0 47.87V464c0 37.5 40.69 60.09 72.41 41.3l352-208c31.4-18.54 31.5-64.14 0-82.64zM321.89 283.5L112.28 407.35C91 420 64 404.58 64 379.8V132c0-24.78 27-40.16 48.28-27.54l209.61 123.95a32 32 0 0 1 0 55.09z" class="fa-secondary"></path><path fill="transparent" d="M112.28 104.48l209.61 123.93a32 32 0 0 1 0 55.09L112.28 407.35C91 420 64 404.58 64 379.8V132c0-24.76 27-40.14 48.28-27.52z" class="fa-primary"></path></g>
                        </svg>
                        <span class="label--pressed plyr__tooltip" role="tooltip">Durdur</span>
                        <span class="label--not-pressed plyr__tooltip" role="tooltip">Oynat</span>
                    </button>

                    <button type="button" class="plyr__control" data-light="on">
                    <svg id="light-icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><g class="fa-group"><path fill="currentColor" d="M319.45,0C217.44.31,144,83,144,176a175,175,0,0,0,43.56,115.78c16.52,18.85,42.36,58.22,52.21,91.44,0,.28.07.53.11.78H400.12c0-.25.07-.5.11-.78,9.85-33.22,35.69-72.59,52.21-91.44A175,175,0,0,0,496,176C496,78.63,416.91-.31,319.45,0ZM320,96a80.09,80.09,0,0,0-80,80,16,16,0,0,1-32,0A112.12,112.12,0,0,1,320,64a16,16,0,0,1,0,32Z" class="fa-secondary"></path><path fill="currentColor" d="M240.06,454.34A32,32,0,0,0,245.42,472l17.1,25.69c5.23,7.91,17.17,14.28,26.64,14.28h61.7c9.47,0,21.41-6.37,26.64-14.28L394.59,472A37.47,37.47,0,0,0,400,454.34L400,416H240ZM112,192a24,24,0,0,0-24-24H24a24,24,0,0,0,0,48H88A24,24,0,0,0,112,192Zm504-24H552a24,24,0,0,0,0,48h64a24,24,0,0,0,0-48ZM131.08,55.22l-55.42-32a24,24,0,1,0-24,41.56l55.42,32a24,24,0,1,0,24-41.56Zm457.26,264-55.42-32a24,24,0,1,0-24,41.56l55.42,32a24,24,0,0,0,24-41.56Zm-481.26-32-55.42,32a24,24,0,1,0,24,41.56l55.42-32a24,24,0,0,0-24-41.56ZM520.94,100a23.8,23.8,0,0,0,12-3.22l55.42-32a24,24,0,0,0-24-41.56l-55.42,32a24,24,0,0,0,12,44.78Z" class="fa-primary"></path></g></svg>
                        <span class="label--not-pressed plyr__tooltip" role="tooltip">IÅŸÄ±klarÄ± Kapat</span>
                    </button>
                
                </div>


                <div class="player-flex">
                    <button type="button" class="plyr__control" aria-label="Mute" data-plyr="mute">
                        <svg class="icon--pressed" role="presentation" viewBox="0 0 640 512">
                        
                        <g class="fa-group"><path style="opacity:.7" fill="currentColor" d="M393.11 107.22a23.9 23.9 0 0 1 33.12-7.46A185.33 185.33 0 0 1 488.74 346l-38.65-29.9a136.7 136.7 0 0 0-49.57-175.52 24.29 24.29 0 0 1-7.41-33.36zm60.68-46.79a233.7 233.7 0 0 1 73 315l38.52 29.78A282.1 282.1 0 0 0 480.35 20a24.2 24.2 0 1 0-26.56 40.46zM347.07 221.19a40 40 0 0 1 20.75 31.32l42.92 33.18A86.79 86.79 0 0 0 416 256a87.89 87.89 0 0 0-45.78-76.86 24 24 0 1 0-23.16 42.06zM288 190.82V88c0-21.46-26-32-41-17l-49.7 49.69zM32 184v144a24 24 0 0 0 24 24h102.06L247 441c15 15 41 4.47 41-17v-71.4L43.76 163.84C36.86 168.05 32 175.32 32 184z" class="fa-secondary"></path><path fill="currentColor" d="M594.54 508.63L6.18 53.9a16 16 0 0 1-2.81-22.45L23 6.18a16 16 0 0 1 22.47-2.81L633.82 458.1a16 16 0 0 1 2.82 22.45L617 505.82a16 16 0 0 1-22.46 2.81z" class="fa-primary"></path></g>
                        
                        </svg>
                        <svg class="icon--not-pressed" role="presentation" viewBox="0 0 576 512">
                        
                        <g class="fa-group"><path fill="currentColor" d="M0 328V184a24 24 0 0 1 24-24h102.06l89-88.95c15-15 41-4.49 41 17V424c0 21.44-25.94 32-41 17l-89-88.95H24A24 24 0 0 1 0 328z" class="fa-secondary"></path><path fill="currentColor" d="M338.23 179.13a24 24 0 1 0-23.16 42.06 39.42 39.42 0 0 1 0 69.62 24 24 0 1 0 23.16 42.06 87.43 87.43 0 0 0 0-153.74zM480 256a184.64 184.64 0 0 0-85.77-156.24 23.9 23.9 0 0 0-33.12 7.46 24.29 24.29 0 0 0 7.41 33.36 136.67 136.67 0 0 1 0 230.84 24.28 24.28 0 0 0-7.41 33.36 23.94 23.94 0 0 0 33.12 7.46A184.62 184.62 0 0 0 480 256zM448.35 20a24.2 24.2 0 1 0-26.56 40.46 233.65 233.65 0 0 1 0 391.16A24.2 24.2 0 1 0 448.35 492a282 282 0 0 0 0-472.07z" class="fa-primary"></path></g>
                        
                        </svg>
                        <span class="label--pressed plyr__tooltip" role="tooltip">Sesi AÃ§</span>
                        <span class="label--not-pressed plyr__tooltip" role="tooltip">Sesi Kapat</span>
                    </button>

                    <div class="plyr__volume">
                        <input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
                    </div>
                    


                    <button type="button" class="plyr__control" data-plyr="wide">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrows-alt-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill="currentColor" d="M508.485 247.515l-99.03-99.029c-7.56-7.56-20.485-2.206-20.485 8.485V228H123.03v-71.03c0-10.691-12.926-16.045-20.485-8.485l-99.03 99.029c-4.686 4.686-4.686 12.284 0 16.971l99.03 99.029c7.56 7.56 20.485 2.206 20.485-8.485V284h265.941v71.03c0 10.691 12.926 16.045 20.485 8.485l99.03-99.029c4.686-4.687 4.686-12.285-.001-16.971z" class=""></path></svg>
                        <span class="label--not-pressed plyr__tooltip" role="tooltip">GeniÅŸlet</span>
                    </button>

                    <button type="button" class="plyr__control" data-plyr="fullscreen">
                        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
                        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
                        <span class="label--pressed plyr__tooltip" role="tooltip">Tam Ekrandan Ã‡Ä±k</span>
                        <span class="label--not-pressed plyr__tooltip" role="tooltip">Tam Ekran Yap</span>
                    </button>

                </div>
                </div>`,
    "settings": ["quality"],
    "blankVideo": "https://cdn.plyr.io/static/blank.mp4",
    "seekTime": 15,
    "autoplay": !![],
    "clickToPlay": !![],
    "disableContextMenu": !![],
    "displayDuration": ![],
    "ratio": "4:3",
    "quality": {
        "default": 720,
        "options": [1080, 720, 480, 360, 240]
    },
    "fullscreen": {
        "enabled": !![],
        "iosNative": !![]
    },
    "captions": {
        "active": !![],
        "update": !![],
        "language": "tr"
    },
    "i18n": {
        "restart": "Yeniden Oynat",
        "rewind": "{seektime} saniye geri al",
        "play": "Oynat",
        "pause": "Durdur",
        "fastForward": "{seektime} saniye ilerlet",
        "seek": "Seek",
        "seekLabel": "{currentTime} of {duration}",
        "played": "Durduruldu",
        "buffered": "Buffered",
        "currentTime": "Åuanki sÃ¼re",
        "duration": "SÃ¼re",
        "volume": "Ses",
        "mute": "Sesi Kapat",
        "unmute": "Sesi AÃ§",
        "enterFullscreen": "Tam Ekran Yap",
        "exitFullscreen": "Tam Ekrandan Ã‡Ä±k",
        "frameTitle": "{title} OynatÄ±lÄ±yor",
        "captions": "AltyazÄ±lar",
        "settings": "Ayarlar",
        "menuBack": "Ã–nceki menÃ¼ye dÃ¶n",
        "speed": "HÄ±z",
        "normal": "Normal",
        "quality": "Kalite",
        "loop": "Loop",
        "start": "BaÅŸlat",
        "end": "Bitir",
        "all": "Hepsi",
        "reset": "SÄ±fÄ±rla",
        "disabled": "KapalÄ±",
        "enabled": "AÃ§Ä±k",
        "debug": !![],
        "advertisement": "Sponsor",
        "qualityBadge": {
            2160: "4K",
            1440: "HD",
            1080: "HD",
            720: "HD",
            576: "SD",
            480: "SD"
        }
    }
});

player["on"]("ready", function() {
    player["currentTime"] = player["duration"];
    player["play"]();
    $_(".player-attributes")["style"]["setProperty"]("--color", playerSetting["color"]);
});
player["on"]("pause", function(canCreateDiscussions) {
    $_(".live-video-player")["removeAttribute"]("poster");
    if ($_(".video-loader")) {
        $_(".video-loader")["remove"]();
    } else {
        null;
    }
    if ($_(".plyr__poster")) {
        $_(".plyr__poster")["remove"]();
    } else {
        null;
    }

    var artistTrack = document["createElement"]("DIV");
    artistTrack["classList"]["add"]("pause-button");
    artistTrack["innerHTML"] = `<svg class="" role="presentation" viewBox="0 0 448 512">
        <g class="fa-group"><path fill="currentColor" d="M424.41 214.66L72.41 6.55C43.81-10.34 0 6.05 0 47.87V464c0 37.5 40.69 60.09 72.41 41.3l352-208c31.4-18.54 31.5-64.14 0-82.64zM321.89 283.5L112.28 407.35C91 420 64 404.58 64 379.8V132c0-24.78 27-40.16 48.28-27.54l209.61 123.95a32 32 0 0 1 0 55.09z" class="fa-secondary"></path><path fill="transparent" d="M112.28 104.48l209.61 123.93a32 32 0 0 1 0 55.09L112.28 407.35C91 420 64 404.58 64 379.8V132c0-24.76 27-40.14 48.28-27.52z" class="fa-primary"></path></g>
        </svg>`;
    artistTrack["onclick"] = function(){
        video["play"]();
    }

    $_(".plyr--video")["append"](artistTrack);
});
player["on"]("playing", function() {
    if ($_(".video-loader")) {
        $_(".video-loader")["remove"]();
    }
    if ($_(".pause-button")) {
        Array["from"]($$_(".pause-button"))["forEach"](function(canCreateDiscussions) {
            return canCreateDiscussions["remove"]();
        });
    }
    if ($_(".lastTime")) {
        Array["from"]($$_(".lastTime"))["forEach"](function(canCreateDiscussions) {
            return canCreateDiscussions["remove"]();
        });
    }
    if ($_(".watermark")) {
        $_(".watermark")["classList"]["add"]("show");
    } else {
        "";
    }
});
player["on"]("ended", function(canCreateDiscussions) {
    return console["log"]("Kaynak bitti yenilenecek"), window["location"]["reload"](!![]);
});
player["on"]("timeupdate", function() {
    if (playerSetting["adsBannerSmall"]["is_active"]) {
        var _0x39cc20 = player["currentTime"]["toFixed"](0);
        if (_0x39cc20 % (60 * playerSetting["adsOptions"]["timing"]) == 0 && _0x39cc20 != 0) {
            var artistTrack = player["fullscreen"]["active"] == !![] ? "fullscreen" : "smallscreen";
            var bodyContentWidth = void 0;
            var xlw = void 0;
            if (artistTrack == "fullscreen") {
                bodyContentWidth = "728";
                xlw = "90";
            } else {
                if (artistTrack == "smallscreen") {
                    bodyContentWidth = "468";
                    xlw = "60";
                }
            }
            if (!$_(".stream-ads")) {
                var element = document["createElement"]("a");
                if (playerSetting["adsBannerSmall"]["link"]["length"]) {
                    element["href"] = playerSetting["adsBannerSmall"]["link"];
                    element["target"] = "_blank";
                }
                element["classList"]["add"]("stream-ads");
                element["classList"]["add"](artistTrack);
                element["style"]["width"] = bodyContentWidth + "px";
                element["style"]["height"] = xlw + "px";
                element["style"]["left"] = "calc(50% - " + bodyContentWidth / 2 + "px)";
                element["style"]["display"] = "block";
                $_(".plyr")["append"](element);
                setTimeout(function() {
                    if ($_(".stream-ads")) {
                        $_(".stream-ads")["remove"]();
                    }
                }, playerSetting["adsOptions"]["duration"] * 1E3);
                setTimeout(function() {
                    if ($_(".stream-ads")) {
                        $_(".stream-ads")["classList"]["add"]("ads-close");
                    }
                }, (playerSetting["adsOptions"]["duration"] - 0.5) * 1E3);
            }
        }
    }
});
player["on"]("enterfullscreen", function() {
    $_("[data-light]")["classList"]["add"]("displaynone");
    if ($_(".watermark")) {
        $_(".watermark")["classList"]["add"]("fullscreen");
    } else {
        "";
    }
    if ($_(".custom-ads")) {
        $_(".custom-ads")["classList"]["add"]("fullscreen");
    } else {
        "";
    }
    if ($_(".stream-ads")) {
        $_(".stream-ads")["className"] = "stream-ads fullscreen";
    }
});
player["on"]("exitfullscreen", function() {
    if ($_(".stream-ads")) {
        $_(".stream-ads")["className"] = "stream-ads smallscreen";
    }
    $_("[data-light]")["classList"]["remove"]("displaynone");
    if ($_(".watermark")) {
        $_(".watermark")["classList"]["remove"]("fullscreen");
    } else {
        "";
    }
    if ($_(".custom-ads")) {
        $_(".custom-ads")["classList"]["remove"]("fullscreen");
    } else {
        "";
    }
});
var sonAn = function render() {
    if ($_(".lastTime")) {
        return;
    }
    var navButtonDiv = document["createElement"]("DIV");
    navButtonDiv["classList"]["add"]("lastTime");
    navButtonDiv["innerHTML"] = '<div class="title">LÃ¼tfen bekleyin..</div><div class="loader"><div></div><div></div><div></div></div>';
    $_(".plyr--video")["append"](navButtonDiv);
};
$_(".live-button")["addEventListener"]("click", function(canCreateDiscussions) {
    if ($_(".next-match-splash")) {
        $_(".next-match-splash")["remove"]();
    }
    sonAn();
    player["currentTime"] = player["duration"];
});


function Canli(url){
    
    if(Hls["isSupported"]()){
        hls["destroy"]();
        hls = new Hls(hlsOptions); 
        hls["loadSource"](url);
        hls["attachMedia"](video);
        hls["on"](Hls["Events"]["MANIFEST_PARSED"],function() {
                    video["play"]();
                });
   
        $_(".live-player")["scrollIntoView"]({
            "behavior": "smooth",
            "block": "center",
            "inline": "nearest"
        });
        tvLoader();
    }else{
        
        video["src"] = url;
        video["play"]();
        $_(".live-player")["scrollIntoView"]({
            "behavior": "smooth",
            "block": "center",
            "inline": "nearest"
        });
        tvLoader();
        player["play"]();
    }

}


var tvLoader = function filter() {
    if ($_(".matchEndedScreen")) {
        $_(".matchEndedScreen")["remove"]();
    }
    if ($_(".lastTime")) {
        $_(".lastTime")["remove"]();
    }
    $_(".channel-name")["textContent"] = $_("[data-stream].active") ? $_("[data-stream].active")["dataset"]["name"] : "";
    if ($_(".watermark")) {
        $_(".watermark")["classList"]["remove"]("show");
    } else {
        "";
    }
    if ($_(".video-loader")) {
        $_(".video-loader")["remove"]();
    }
  
    var PDIV = document["createElement"]("DIV");
    PDIV["classList"]["add"]("video-loader");
    var _0x3f03b8 = void 0;
    var _0x5c0598 = void 0;
    var _0x116566 = void 0;
    if ($_(".live-list .single-match.active")) {
        _0x3f03b8 = `
            <img src="${ $_(".live-list .single-match.active img")["src"] }" >
            <div class="loader-team-name">${ $_(".single-match.active .teams > div:first-child")["textContent"]}</div>
            `;
        _0x5c0598 = `
            <img src="${$_(".live-list .single-match.active img:last-of-type")["src"]}">
            <div class="loader-team-name">${$_(".single-match.active .teams > div:last-child")["textContent"]}</div>
            `;
        PDIV["innerHTML"] = `
        <div class="loader-text">
            <div class="loader-teams">
                <div class="loader-home">${ _0x3f03b8  }</div>
                <div class="loader-bar"><div></div><div></div><div></div></div>
                <div class="loader-away">${_0x5c0598 }</div>
            </div>
            <div class="loader-loading">YÃ¼kleniyor...</div>
        </div>`;
    } else {
        if ($_(".channel-list [data-stream].active")) {
            PDIV["innerHTML"] = `
            "${$_(".channel-list [data-stream].active")["querySelector"]("picture")["outerHTML"]}
            <div class="loader-bar"><div></div><div></div><div></div></div>
            <div class="loader-loading">${ $_(".channel-list [data-stream].active")["dataset"]["name"]} YÃ¼kleniyor...</div>`;
        }
    }
    $_(".plyr--video")["append"](PDIV);
};