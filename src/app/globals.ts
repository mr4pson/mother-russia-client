export const globals = Object.freeze({
    baseURI: 'http://api.motherrussia.net',
    createGifffer: function (content: string) {
      content = content.replace(new RegExp('src="([^"]+)\.gif"', "gm"), 'data-gifffer="$1.gif"');
      setTimeout(()=>{let Gifffer = this.giffferWrap(); Gifffer(); }, 100);
      return content;
    },
    getBgUrl: function (el) {
        var bg = "";
        if (el.currentStyle) { // IE
            bg = el.currentStyle.backgroundImage;
        } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
            bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
        } else { // try and get inline style
            bg = el.style.backgroundImage;
        }
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    },
    compare: function (a,b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
    },
    letters: [
      {
        uLetter: 'А',
        dLetter: 'а',
        uHandwritingJpg: 'А.png',
        uHandwritingGif: 'А.gif',
        name: 'a',
        nameAudio: 'А.wav',
        spelling: 'a',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">a</span> in <span _ngcontent-c3="" style="color: #D50000;">a</span>rtist',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Б',
        dLetter: 'б',
        uHandwritingJpg: 'Б.png',
        uHandwritingGif: 'Б.gif',
        name: 'be',
        nameAudio: 'Б.wav',
        spelling: 'b',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">b</span> in <span _ngcontent-c3="" style="color: #D50000;">b</span>ox',
        vowel: false,
        play: false
      },
      {
        uLetter: 'В',
        dLetter: 'в',
        uHandwritingJpg: 'В.png',
        uHandwritingGif: 'В.gif',
        name: 've',
        nameAudio: 'В.wav',
        spelling: 'v',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">v</span> in <span _ngcontent-c3="" style="color: #D50000;">v</span>ery',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Г',
        dLetter: 'г',
        uHandwritingJpg: 'Г.png',
        uHandwritingGif: 'Г.gif',
        name: 'ge',
        nameAudio: 'Г.wav',
        spelling: 'g',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">g</span> in <span _ngcontent-c3="" style="color: #D50000;">g</span>ood',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Д',
        dLetter: 'д',
        uHandwritingJpg: 'Д.png',
        uHandwritingGif: 'Д.gif',
        name: 'de',
        nameAudio: 'Д.wav',
        spelling: 'd',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">d</span> in <span _ngcontent-c3="" style="color: #D50000;">d</span>og',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Е',
        dLetter: 'е',
        uHandwritingJpg: 'Е.png',
        uHandwritingGif: 'Е.gif',
        name: 'ye',
        nameAudio: 'Е.wav',
        spelling: 'ye',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">ye</span> in <span _ngcontent-c3="" style="color: #D50000;">y</span>es',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Ё',
        dLetter: 'ё',
        uHandwritingJpg: 'Ё.png',
        uHandwritingGif: 'Ё.gif',
        name: 'yo',
        nameAudio: 'Ё.wav',
        spelling: 'yo',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">yo</span> in <span _ngcontent-c3="" style="color: #D50000;">yo</span>ga',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Ж',
        dLetter: 'ж',
        uHandwritingJpg: 'Ж.png',
        uHandwritingGif: 'Ж.gif',
        name: 'zhe',
        nameAudio: 'Ж.wav',
        spelling: 'zh',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">s</span> in u<span _ngcontent-c3="" style="color: #D50000;">s</span>ual',
        vowel: false,
        play: false
      },
      {
        uLetter: 'З',
        dLetter: 'з',
        uHandwritingJpg: 'З.png',
        uHandwritingGif: 'З.gif',
        name: 'ze',
        nameAudio: 'З.wav',
        spelling: 'z',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">z</span> in <span _ngcontent-c3="" style="color: #D50000;">z</span>oo',
        vowel: false,
        play: false
      },
      {
        uLetter: 'И',
        dLetter: 'и',
        uHandwritingJpg: 'И.png',
        uHandwritingGif: 'И.gif',
        name: 'ee',
        nameAudio: 'И.wav',
        spelling: 'ee',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">ee</span> in Fr<span _ngcontent-c3="" style="color: #D50000;">ee</span>man',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Й',
        dLetter: 'й',
        uHandwritingJpg: 'Й.png',
        uHandwritingGif: 'Й.gif',
        name: 'i kratkoe',
        nameAudio: 'Й.wav',
        spelling: 'y',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">y</span> in bo<span _ngcontent-c3="" style="color: #D50000;">y</span>',
        vowel: false,
        play: false
      },
      {
        uLetter: 'К',
        dLetter: 'к',
        uHandwritingJpg: 'К.png',
        uHandwritingGif: 'К.gif',
        name: 'ka',
        nameAudio: 'К.wav',
        spelling: 'k',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">k</span> in li<span _ngcontent-c3="" style="color: #D50000;">k</span>e',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Л',
        dLetter: 'л',
        uHandwritingJpg: 'Л.png',
        uHandwritingGif: 'Л.gif',
        name: 'el',
        nameAudio: 'Л.wav',
        spelling: 'l',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">l</span> in <span _ngcontent-c3="" style="color: #D50000;">l</span>ady',
        vowel: false,
        play: false
      },
      {
        uLetter: 'М',
        dLetter: 'м',
        uHandwritingJpg: 'М.png',
        uHandwritingGif: 'М.gif',
        name: 'em',
        nameAudio: 'М.wav',
        spelling: 'm',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">m</span> in <span _ngcontent-c3="" style="color: #D50000;">m</span>otor',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Н',
        dLetter: 'н',
        uHandwritingJpg: 'Н.png',
        uHandwritingGif: 'Н.gif',
        name: 'en',
        nameAudio: 'Н.wav',
        spelling: 'n',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">n</span> in <span _ngcontent-c3="" style="color: #D50000;">n</span>ow',
        vowel: false,
        play: false
      },
      {
        uLetter: 'О',
        dLetter: 'о',
        uHandwritingJpg: 'О.png',
        uHandwritingGif: 'О.gif',
        name: 'o',
        nameAudio: 'О.wav',
        spelling: 'o',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">o</span> in <span _ngcontent-c3="" style="color: #D50000;">o</span>pera',
        vowel: true,
        play: false
      },
      {
        uLetter: 'П',
        dLetter: 'п',
        uHandwritingJpg: 'П.png',
        uHandwritingGif: 'П.gif',
        name: 'pe',
        nameAudio: 'П.wav',
        spelling: 'p',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">p</span> in <span _ngcontent-c3="" style="color: #D50000;">p</span>lay',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Р',
        dLetter: 'р',
        uHandwritingJpg: 'Р.png',
        uHandwritingGif: 'Р.gif',
        name: 'er',
        nameAudio: 'Р.wav',
        spelling: 'r',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">r</span> in <span _ngcontent-c3="" style="color: #D50000;">r</span>ole',
        vowel: false,
        play: false
      },
      {
        uLetter: 'С',
        dLetter: 'с',
        uHandwritingJpg: 'С.png',
        uHandwritingGif: 'С.gif',
        name: 'es',
        nameAudio: 'С.wav',
        spelling: 's',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">s</span> in <span _ngcontent-c3="" style="color: #D50000;">s</span>ave',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Т',
        dLetter: 'т',
        uHandwritingJpg: 'Т.png',
        uHandwritingGif: 'Т.gif',
        name: 'te',
        nameAudio: 'Т.wav',
        spelling: 't',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">t</span> in <span _ngcontent-c3="" style="color: #D50000;">t</span>ape',
        vowel: false,
        play: false
      },
      {
        uLetter: 'У',
        dLetter: 'у',
        uHandwritingJpg: 'У.png',
        uHandwritingGif: 'У.gif',
        name: 'oo',
        nameAudio: 'У.wav',
        spelling: 'oo',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">oo</span> in w<span _ngcontent-c3="" style="color: #D50000;">oo</span>d',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Ф',
        dLetter: 'ф',
        uHandwritingJpg: 'Ф.png',
        uHandwritingGif: 'Ф.gif',
        name: 'ef',
        nameAudio: 'Ф.wav',
        spelling: 'f',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">f</span> in <span _ngcontent-c3="" style="color: #D50000;">f</span>ire',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Х',
        dLetter: 'х',
        uHandwritingJpg: 'Х.png',
        uHandwritingGif: 'Х.gif',
        name: 'kha',
        nameAudio: 'Х.wav',
        spelling: 'h',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">h</span> in <span _ngcontent-c3="" style="color: #D50000;">h</span>ello',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Ц',
        dLetter: 'ц',
        uHandwritingJpg: 'Ц.png',
        uHandwritingGif: 'Ц.gif',
        name: 'tse',
        nameAudio: 'Ц.wav',
        spelling: 'ts',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">ts</span> in se<span _ngcontent-c3="" style="color: #D50000;">ts</span>',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Ч',
        dLetter: 'ч',
        uHandwritingJpg: 'Ч.png',
        uHandwritingGif: 'Ч.gif',
        name: 'che',
        nameAudio: 'Ч.wav',
        spelling: 'ch',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">ch</span> in <span _ngcontent-c3="" style="color: #D50000;">ch</span>eese',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Ш',
        dLetter: 'ш',
        uHandwritingJpg: 'Ш.png',
        uHandwritingGif: 'Ш.gif',
        name: 'sha',
        nameAudio: 'Ш.wav',
        spelling: 'sh',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">sh</span> in <span _ngcontent-c3="" style="color: #D50000;">sh</span>ort',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Щ',
        dLetter: 'щ',
        uHandwritingJpg: 'Щ.png',
        uHandwritingGif: 'Щ.gif',
        name: 'shcha',
        nameAudio: 'Щ.wav',
        spelling: 'sh’',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">sh’</span> in <span _ngcontent-c3="" style="color: #D50000;">sh</span>ip',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Ъ',
        dLetter: 'ъ',
        uHandwritingJpg: 'ъ.png',
        uHandwritingGif: 'ъ.gif',
        name: 'tviordyy znak',
        nameAudio: 'Ъ.wav',
        spelling: '',
        simEngSound: '',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Ы',
        dLetter: 'ы',
        uHandwritingJpg: 'Ы.png',
        uHandwritingGif: 'Ы.gif',
        name: 'i',
        nameAudio: 'Ы.wav',
        spelling: 'i',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">i</span> in B<span _ngcontent-c3="" style="color: #D50000;">i</span>ll',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Ь',
        dLetter: 'ь',
        uHandwritingJpg: 'ь.png',
        uHandwritingGif: 'ь.gif',
        name: 'myagkiy znak',
        nameAudio: 'Ь.wav',
        spelling: '',
        simEngSound: '',
        vowel: false,
        play: false
      },
      {
        uLetter: 'Э',
        dLetter: 'э',
        uHandwritingJpg: 'Э.png',
        uHandwritingGif: 'Э.gif',
        name: 'e',
        nameAudio: 'Э.wav',
        spelling: 'e',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">e</span> in b<span _ngcontent-c3="" style="color: #D50000;">e</span>t',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Ю',
        dLetter: 'ю',
        uHandwritingJpg: 'Ю.png',
        uHandwritingGif: 'Ю.gif',
        name: 'you',
        nameAudio: 'Ю.wav',
        spelling: 'you',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">you</span> as <span _ngcontent-c3="" style="color: #D50000;">you</span>',
        vowel: true,
        play: false
      },
      {
        uLetter: 'Я',
        dLetter: 'я',
        uHandwritingJpg: 'Я.png',
        uHandwritingGif: 'Я.gif',
        name: 'ya',
        nameAudio: 'Я.wav',
        spelling: 'ya',
        simEngSound: '<span _ngcontent-c3="" style="color: #D50000;">ya</span> in <span _ngcontent-c3="" style="color: #D50000;">ya</span>rd',
        vowel: true,
        play: false
      }
    ],
    giffferWrap: function () {
      var d = document
      var playSize = 60
    
      var Gifffer = function(options) {
        var images,
          i = 0,
          gifs = []
    
        images = d.querySelectorAll('[data-gifffer]')
        for (; i < images.length; ++i) process(images[i], gifs, options)
        // returns each gif container to be usable programmatically
        return gifs
      }
    
      function formatUnit(v) {
        return v + (v.toString().indexOf('%') > 0 ? '' : 'px')
      }
    
      function parseStyles(styles) {
        var stylesStr = ''
        styles.forEach(prop => {
          stylesStr += prop + ':' + styles[prop] + ';'
        });
        /*for (prop in styles) {
          stylesStr += prop + ':' + styles[prop] + ';'
        }*/
        return stylesStr
      }
    
      function createContainer(w, h, el, altText, opts) {
        var alt
        var con = d.createElement('BUTTON')
        var cls = el.getAttribute('class')
        var id = el.getAttribute('id')
        var playButtonStyles =
          opts && opts.playButtonStyles
            ? parseStyles(opts.playButtonStyles)
            : [
                'width:' + playSize + 'px',
                'height:' + playSize + 'px',
                'border-radius:' + playSize / 2 + 'px',
                'background:rgba(0, 0, 0, 0.3)',
                'position:absolute',
                'top:50%',
                'left:50%',
                'margin:-' + playSize / 2 + 'px'
              ].join(';')
        var playButtonIconStyles =
          opts && opts.playButtonIconStyles
            ? parseStyles(opts.playButtonIconStyles)
            : [
                'width: 0',
                'height: 0',
                'border-top: 14px solid transparent',
                'border-bottom: 14px solid transparent',
                'border-left: 14px solid rgba(0, 0, 0, 0.5)',
                'position: absolute',
                'left: 26px',
                'top: 16px'
              ].join(';')
    
        cls ? con.setAttribute('class', el.getAttribute('class')) : null
        id ? con.setAttribute('id', el.getAttribute('id')) : null
        con.setAttribute(
          'style',
          'position:relative;cursor:pointer;background:none;border:none;padding:0;'
        )
        con.setAttribute('aria-hidden', 'true')
    
        // creating play button
        var play = d.createElement('DIV')
        play.setAttribute('class', 'gifffer-play-button')
        play.setAttribute('style', playButtonStyles)
    
        var trngl = d.createElement('DIV')
        trngl.setAttribute('style', playButtonIconStyles)
        play.appendChild(trngl)
    
        // create alt text if available
        if (altText) {
          alt = d.createElement('p')
          alt.setAttribute('class', 'gifffer-alt')
          alt.setAttribute(
            'style',
            'border:0;clip:rect(0 0 0 0);height:1px;overflow:hidden;padding:0;position:absolute;width:1px;'
          )
          alt.innerText = altText + ', image'
        }
    
        // dom placement
        con.appendChild(play)
        el.parentNode.replaceChild(con, el)
        altText ? con.parentNode.insertBefore(alt, con.nextSibling) : null
        return { c: con, p: play }
      }
    
      function calculatePercentageDim(el, w, h, wOrig, hOrig) {
        var parentDimW = el.parentNode.offsetWidth
        var parentDimH = el.parentNode.offsetHeight
        var ratio = wOrig / hOrig
    
        if (w.toString().indexOf('%') > 0) {
          w = parseInt(w.toString().replace('%', ''))
          w = (w / 100) * parentDimW
          h = w / ratio
        } else if (h.toString().indexOf('%') > 0) {
          h = parseInt(h.toString().replace('%', ''))
          h = (h / 100) * parentDimW
          w = h * ratio
        }
    
        return { w: w, h: h }
      }
    
      function process(el, gifs, options) {
        var url,
          con,
          c,
          w,
          h,
          duration,
          play,
          gif,
          playing = false,
          cc,
          isC,
          durationTimeout,
          dims,
          altText
    
        url = el.getAttribute('data-gifffer')
        w = el.getAttribute('data-gifffer-width')
        h = el.getAttribute('data-gifffer-height')
        duration = el.getAttribute('data-gifffer-duration')
        altText = el.getAttribute('data-gifffer-alt')
        el.style.display = 'block'
    
        // creating the canvas
        c = document.createElement('canvas')
        isC = !!(c.getContext && c.getContext('2d'))
        if (w && h && isC) cc = createContainer(w, h, el, altText, options)
    
        // waiting for image load
        el.onload = function() {
          if (!isC) return
    
          w = w || el.width
          h = h || el.height
    
          // creating the container
          if (!cc) cc = createContainer(w, h, el, altText, options)
          con = cc.c
          play = cc.p
          dims = calculatePercentageDim(con, w, h, el.width, el.height)
    
          // add the container to the gif arraylist
          gifs.push(con)
    
          // listening for image click
          con.addEventListener('click', function() {
            clearTimeout(durationTimeout)
            if (!playing) {
              playing = true
              gif = document.createElement('IMG')
              gif.setAttribute('style', 'width:100%;height:100%;')
              gif.setAttribute('data-uri', Math.floor(Math.random() * 100000) + 1)
              setTimeout(function() {
                gif.src = url
              }, 0)
              con.removeChild(play)
              con.removeChild(c)
              con.appendChild(gif)
              if (parseInt(duration) > 0) {
                durationTimeout = setTimeout(function() {
                  playing = false
                  con.appendChild(play)
                  con.removeChild(gif)
                  con.appendChild(c)
                  gif = null
                }, duration)
              }
            } else {
              playing = false
              con.appendChild(play)
              con.removeChild(gif)
              con.appendChild(c)
              gif = null
            }
          })
    
          // canvas
          c.width = dims.w
          c.height = dims.h
          c.getContext('2d').drawImage(el, 0, 0, dims.w, dims.h)
          con.appendChild(c)
    
          // setting the actual image size
          con.setAttribute(
            'style',
            'position:relative;cursor:pointer;width:' +
              dims.w +
              'px;height:' +
              dims.h +
              'px;background:none;border:none;padding:0;'
          )
    
          c.style.width = '100%'
          c.style.height = '100%'
    
          if (w.toString().indexOf('%') > 0 && h.toString().indexOf('%') > 0) {
            con.style.width = w
            con.style.height = h
          } else if (w.toString().indexOf('%') > 0) {
            con.style.width = w
            con.style.height = 'inherit'
          } else if (h.toString().indexOf('%') > 0) {
            con.style.width = 'inherit'
            con.style.height = h
          } else {
            con.style.width = dims.w + 'px'
            con.style.height = dims.h + 'px'
          }
        }
        el.src = url
      }
    
      return Gifffer
    },
});