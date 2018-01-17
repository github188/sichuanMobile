;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shangsheng" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M682.666667 256l98.133333 98.133333-209.066667 209.066667-170.666667-170.666667-315.733333 315.733333 59.733333 59.733333 256-256 170.666667 170.666667 268.8-268.8 98.133333 98.133333 0-256L682.666667 256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiajiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M682.666667 768l97.92-97.92-208.213333-208-170.666667 170.666667L85.333333 316.373333 145.706667 256l256 256 170.666667-170.666667 268.373333 268.586667L938.666667 512l0 256L682.666667 768z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shangsheng1" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M682.666667 256l97.92 97.92-208.213333 208-170.666667-170.666667L85.333333 707.626667 145.706667 768l256-256 170.666667 170.666667 268.373333-268.586667L938.666667 512 938.666667 256 682.666667 256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconxiajiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M397.099 827.246c-15.375-7.67-25.887-11.491-31.632-11.491-7.671 0-11.491 3.82-11.491 11.491 0 5.745 4.767 13.385 14.364 22.98l112.061 123.521c9.566 11.491 20.109 17.236 31.599 17.236s22.001-5.745 31.63-17.236l112.031-123.521c9.564-9.596 14.362-17.236 14.362-22.98 0-7.67-3.852-11.491-11.491-11.491-5.746 0-15.341 3.82-28.726 11.491l-100.57 48.835v-620.471h-34.471v620.471l-97.666-48.835z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shangsheng2" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M313.7 474.931c0 11.3 9.2 20.5 20.5 20.5 5.7 0 10.8-2.3 14.5-6v0l144-144v640.7c0 11.3 9.2 20.5 20.5 20.5 11.3 0 20.5-9.2 20.5-20.5 0 0 0 0 0 0v-641.6l142.6 142.6c3.7 4.2 9.2 6.8 15.2 6.8 11.3 0 20.5-9.2 20.5-20.5 0-5.7-2.3-10.8-6-14.5v0l-171.4-171.2c-4.9-4.9-11.3-8.1-17.9-9-1.3-0.2-2.5-0.3-3.8-0.3-7.1 0-13.9 2.7-18.9 7.7l-174.3 174.4c-3.7 3.7-6 8.8-6 14.4z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-iconup" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M750.838 543.673c-10.626 4.503-21.893 2.205-29.894-5.796l-94.618-94.618-320.007 320.007c-12.613 12.613-33.019 12.656-45.629 0.046-12.613-12.613-12.571-33.018 0.043-45.632l320.007-320.007-94.899-94.899c-8.001-8.001-10.298-19.267-5.795-29.893 4.504-10.629 14.19-17.132 25.637-17.263l237.832-2.732c7.631-0.089 14.103 2.547 19.436 7.881s7.948 11.826 7.859 19.459l-2.706 237.806c-0.133 11.444-6.641 21.135-17.268 25.64z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-graphfall" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M870.43 487.281c-20.481 0-37.079 16.599-37.079 37.079v58.794l-258.056-258.056c-6.712-6.699-15.982-10.852-26.215-10.852s-19.504 4.153-26.215 10.864l-171.539 171.539-171.539-171.539c-6.712-6.712-15.982-10.864-26.215-10.864-20.481 0-37.079 16.599-37.079 37.079 0 10.234 4.153 19.516 10.864 26.215l197.753 197.754c6.712 6.712 15.982 10.864 26.215 10.864s19.504-4.153 26.215-10.864l171.539-171.527 231.829 231.829h-58.794c-20.481 0-37.079 16.599-37.079 37.079s16.599 37.079 37.079 37.079h148.315c20.481 0 37.079-16.599 37.079-37.079v-148.315c0-20.481-16.599-37.079-37.079-37.079z" fill="#2c2c2c" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)