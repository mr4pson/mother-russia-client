

/* Object.assign polyfill */

if (typeof Object.assign != 'function') {
    Object.assign = function(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
  
      var to = Object(target);
  
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
  
        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }
  
  
  var wlConfig = wlConfig || {};
  wlConfig.media = wlConfig.media || {};
  
  wlConfig.blockerList = {
      "adblock" : {
          title : "AdBlock",
          useragents : ["cr","sf","op","ie","ed"]
      },
      "adblock_plus" : {
          title : "AdBlock Plus",
          useragents : ["cr","ff","sf","op","ie","ed"]
      },
      "ublock_origin" : {
          title : "uBlock Origin",
          useragents : ["cr","ff","op"]
      },
      "adguard" : {
          title : "Adguard AdBlocker",
          useragents : ["cr","ff","sf","op","ie","ed"]
      },
      "adblock_pro" : {
          title : "AdBlock Pro",
          useragents : ["cr"]
      },
      "ublock" : {
          title : "uBlock",
          useragents : ["cr","ff"]
      }
  }
  
  wlConfig.media.en = {
      "cr" : ["adblock","adblock_plus","adblock_pro","adguard","ublock","ublock_origin"],
      "ed" : ["adblock","adblock_plus","adguard"],
      "ie" : ["adblock","adblock_plus","adguard"],
      "op" : ["adblock","adblock_plus","adguard","ublock_origin"],
      "ff" : ["adblock_plus","adguard","ublock","ublock_origin"],
      "sf" : ["adblock","adblock_plus","adguard"]
  };
  
  wlConfig.version = 3;
  wlConfig.buildNr = 308;
  
  var lastSelectedBlocker = null,
      detectedBlocker = null,
      containerEl = null,
      currentPanel = null,
      previousPanel = null,
      artefact_ABC = null,
      prevEventName = null,
      nrEvents = 0,
      timerStart = performance.now(),
      timerLast = null;
  
  wlConfig.ui.locale = wlConfig.ui.locale || "en";
  
  // UA detection
  
  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';
  // Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  // Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  // Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;
  // At least Safari 3+: "[object HTMLElementConstructor]"
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || !isChrome && !isOpera && window.webkitAudioContext !== undefined;
  
  var instructionsUA = ( isOpera ? "op" : (isSafari ? "sf" : ( isFirefox ? "ff" : ( isEdge ? "ed" : ( isIE ? "ie" : "cr" ) ) ) ) );
  var browsers = { "cr" : "Chrome" , "ff" : "Firefox" , "sf" : "Safari", "op" : "Opera" , "ie" : "Internet Explorer" , "ed" : "Microsoft Edge"};
  
  initInstructions();
  
  window.onbeforeunload = function () {
     trackEvent('whitelist.leave');
  };
  
  function initInstructions(){
  
      // extract parameters from Query String
  
      if (getParameterByName("veil"))
          wlConfig.veilEnabled = ( getParameterByName("veil") == 1 ? true : false );
  
      if (getParameterByName("close"))
          wlConfig.closeEnabled = ( getParameterByName("close") == 1 ? true : false );
  
      if (getParameterByName("video"))
          wlConfig.videoEnabled = ( getParameterByName("video") == 1 ? true : false );
  
      if (getParameterByName("theme"))
          wlConfig.theme = ( getParameterByName("theme") != "" ? getParameterByName("theme") : false );
  
  
      // load stylesheet for theme
  
      if (wlConfig.theme !== false)
          $('head').append('<link rel="stylesheet" type="text/css" href="css/themes/'+wlConfig.theme+'.css">');
  
  
  
      // force veil if enabled
      if (wlConfig.veilEnabled == true)
          $("body").css("background-color","rgba(0, 0, 0, 0.701961)");
  
      if (wlConfig.closeEnabled == true)
          $(".sp_wl_btn_close").show();
  
      trackEvent("whitelist.show.page");
  
      setTextLabels();
  
      $(".sp_wl_btn_support").click( function() { showPanel("supportOverview") } );
      $(".sp_wl_select_show_all").click( function() { $(".sp_wl_blocker_list li").show(); $(this).hide(); });
  
      if (wlConfig.typeDetection)
      {
  
          window._sp_.getAdblockers( function (adblocker) {
  
              if (typeof adblocker !== "undefined" )
                  detectedBlocker = adblocker._type;
  
              if (!!detectedBlocker  && ( isChrome && ["adguard","ublock"].indexOf(detectedBlocker) >= 0)
                  || ( isFirefox && ["adguard","ublock_origin","adblock_plus"].indexOf(detectedBlocker) >= 0)
                  || ( isSafari && ["adblock","adblock_plus","adguard"].indexOf(detectedBlocker) >= 0))
                  showPanel("blockerInstructions", { blockerName : adblocker._type } );
              else if (!!detectedBlocker && (isChrome && detectedBlocker == "adblock"))
              {
                  detectABC();
                  var abc_detect_tries = 0;
                  var abc_checks = setInterval( function() {
                          if (!!artefact_ABC || ++abc_detect_tries > 5)
                          {
                              if(wlConfig.getAdblockDetection && artefact_ABC !== null)
                                  showPanel("blockerInstructions", { blockerName : (artefact_ABC ? "adblock" : "adblock_plus")});
                              else
                                  showPanel("blockerList");
  
                              clearInterval(abc_checks);
                          }
                      } , 100);
              }
              else
                  showPanel("blockerList");
  
          } );
  
      }else
      {
          showPanel("blockersList");
      }
  
      if (wlConfig.theme !== false) {
          setTimeout(function(){
              $(".sp_wl_container").show();
          }, 500);
      } else {
          $(".sp_wl_container").show();
      }
  }
  
  function reloadParent(){
      trackEvent("whitelist.click.reload", { lastSelectedBlockerName : lastSelectedBlocker });
      parentWindowResponse = window.parent.postMessage('sp_msg_reload_page', '*');
  
      if (typeof parentWindowRepsonse === "undefined")
          window.location.reload();
  }
  
  // simple whitelisting
  function showWhitelistingBlockers(){
  
      trackEvent("whitelist.show.blockersList");
  
      var listEl = $(".sp_wl_blocker_list").empty();
  
      var blockers = Object.keys(wlConfig.blockerList);
  
      for ( i in blockers )
      {
  
          if (wlConfig.blockerList[blockers[i]].useragents.indexOf(instructionsUA) >= 0)
          {
              var d1 = $("<li>");
              d1.data('blocker', blockers[i]);
              d1.html("<img src='images/icon_"+blockers[i]+".png' class='icon'> <span>" + wlConfig.blockerList[blockers[i]].title + "</span>");
              d1.attr( { 	'data-toggle': 'tooltip',
                          'data-placement': 'bottom',
                          'title': wlConfig.blockerList[blockers[i]].title } );
              d1.click(function() {
                  trackEvent("whitelist.click.blocker", { blockerName : $(this).data('blocker') });
                  showPanel("blockerInstructions", { blockerName : $(this).data('blocker') } );
              });
              d1.css('display' , ( detectedBlocker == 'adblock' ?
                                      ( ["adblock","adblock_plus"].indexOf(d1.data("blocker")) >= 0 ? "block" : "none" ) :
                                          ( detectedBlocker == 'ublock_origin' ?
                                              ( ["ublock_origin","adblock_pro"].indexOf(d1.data("blocker")) >= 0 ? "block" : "none" ) :
                                              "block" ) ) );
  
              listEl.append(d1);
          }
  
      }
  
      if (["ublock_origin","adblock"].indexOf(detectedBlocker) >= 0 && !previousPanel)
      {
          $(".sp_wl_select_show_all").show();
      }
      else
      {
          $(".sp_wl_blocker_list li").show();
          $(".sp_wl_select_show_all").hide();
      }
  
      // show whitelisting panel
      $("#sp_wl_select_panel_id").show();
  
  }
  
  // whitelisting with autodetect
  function showWhitelistingInstructions( blocker ){
  
      trackEvent("whitelist.show.blockerInstructions", { blockerName : blocker });
  
  
      if (wlConfig.videoEnabled)
      {
          // determine video url
  
          var foundTranslationMain = ( wlConfig.media[wlConfig.ui.locale]["cr"] && wlConfig.media[wlConfig.ui.locale]["cr"].indexOf(blocker) >= 0 ? true : false);
          var foundTranslationBrowser = ( wlConfig.media[wlConfig.ui.locale][instructionsUA] && wlConfig.media[wlConfig.ui.locale][instructionsUA].indexOf(blocker) >= 0 ? true : false);
  
          var videoURL = 'videos/'+(foundTranslationMain ? wlConfig.ui.locale : "en") +'/'+blocker+"_"+ (foundTranslationMain ? ( foundTranslationBrowser ? instructionsUA : "cr" ) : instructionsUA ) +".mp4"
  
          // hide instructions video - show loader
          $("video source[type='video/mp4']").attr('src',videoURL);
          // $("video source[type='video/webm']").attr('src','videos/scr_'+blocker+"_"+instructionsUA+".webm");
          var vidEl = $("video").show().get(0);
          vidEl.load();
          vidEl.play();
  
      }
  
      $(".sp_wl_video_container").toggle( wlConfig.videoEnabled );
  
  
      var stepsEl = $(".sp_wl_instructions_steps").empty();
  
      for (i in Object.keys(wlConfig.ui.copy.instructions[blocker]['default']))
      {
          var key = Object.keys(wlConfig.ui.copy.instructions[blocker]['default'])[i];
          var stepUA = ( wlConfig.ui.copy.instructions[blocker][instructionsUA] && wlConfig.ui.copy.instructions[blocker][instructionsUA][key] ? instructionsUA : "default");
  
          var stepCopy = wlConfig.ui.copy.instructions[blocker][ stepUA ][key];
  
          stepsEl.append( $("<li>").html( stepCopy ) );
      }
  
      // show whitelisting panel
      $("#sp_wl_instructions_panel_id").show();
  
  }
  
  function showSupportOverview (){
      $('.sp_wl_btn_support').tooltip('hide');
      $("#sp_wl_support_overview_panel_id").show();
  }
  
  function showPanel(panelName, params){
  
      if ( currentPanel === null || currentPanel.panelName != panelName )
      {
  
          if (panelName != "previous")
          {
              previousPanel = currentPanel;
              currentPanel = {"panelName" : panelName , "params" : params};
          }
  
          // hide all Panels
          $(".sp_wl_panel").hide();
  
          switch (panelName)
          {
              case "blockersList":
                  showWhitelistingBlockers();
                  break;
              case "blockerInstructions":
                  lastSelectedBlocker = params.blockerName;
                  showWhitelistingInstructions(params.blockerName);
                  break;
              case "supportOverview":
                  showSupportOverview ();
                  break;
              case "previous":
                  showPanel(previousPanel.panelName, previousPanel.params);
                  break;
              default:
                  showWhitelistingBlockers();
                  break;
          }
  
          if (panelName != "previous")
              updatePanelUI( panelName );
  
      }
  
  }
  
  function updatePanelUI( panelName ){
      $(".sp_wl_back_button").toggle( (previousPanel !== null ? true : false) );
      $(".sp_wl_reload").toggle( (panelName == "blockerInstructions" ? true : false) );
      $(".sp_wl_footer").toggle( previousPanel !== null || panelName == "blockerInstructions" ? true : false);
  
      $("label.browserName").each(function( index ) { $(this).text(browsers[instructionsUA]); });
  
      if (lastSelectedBlocker !== null)
      {
          $("label.blockerName").text(wlConfig.blockerList[lastSelectedBlocker].title);
          $(".sp_wl_ab_icon").removeClass().addClass("sp_wl_ab_icon").addClass("sp_wl_ab_icon_"+lastSelectedBlocker);
      }
  
      $(".sp_wl_btn_support").css("right", (panelName == "blockerInstructions" ? "230px" : "10px" ));
      $(".sp_wl_container").css("width", (panelName == "blockerInstructions" && wlConfig.videoEnabled ? "650px" : "500px"));
      $(".sp_wl_container").css("height", (panelName == "blockerInstructions" && wlConfig.videoEnabled ? "295px" : "auto"));
  
      $('[data-toggle="tooltip"]').tooltip();
  }
  
  function selectDifferentBlocker(){
      trackEvent("whitelist.click.blockerList", { blockerName : lastSelectedBlocker });
      showWhitelistingBlockers();
  }
  
  function setTextLabels(){
      for (var label in wlConfig.ui.copy.primary)
          $(".sp_wl_"+label).html(wlConfig.ui.copy.primary[label]);
  }
  
  
  function detectABC(){
  
      if (wlConfig.getAdblockDetection)
      {
          try
          {
              var url = "chrome-extension://gighmmpiobklfepjocnamgkkbiglidom/adblock-jquery-ui.custom.css";
              var oReq = new XMLHttpRequest();
              oReq.addEventListener("load", function(){ artefact_ABC = true; });
              oReq.addEventListener("error", function(){ artefact_ABC = false; });
              oReq.open("GET", url);
              oReq.send();
          }
          catch(err) {
              console.log(err);
          }
      }
      else
          artefact_ABC = false;
  }
  
  function trackEvent (eventName, eventData) {
  
      var defaultData = {
          version : wlConfig.version,
          buildNr : wlConfig.buildNr,
          uiLocale : wlConfig.ui.locale,
          closeEnabled: wlConfig.closeEnabled,
          videoEnabled: wlConfig.videoEnabled,
          theme : wlConfig.theme,
          prevEventName : prevEventName,
          nrEvents : ++nrEvents,
          timeElapsedSinceStart : Math.round( (performance.now() - timerStart) / 1000),
          timeElapsedSinceLastEvent : Math.round ( (performance.now() - (timerLast !== null ? timerLast : timerStart ) ) / 1000)
      };
  
      //mixpanel.track(eventName, Object.assign(defaultData, eventData));
  
      prevEventName = eventName;
      timerLast = performance.now();
  }
  