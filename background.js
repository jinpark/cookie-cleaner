// google analytics
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=UA-204551599-1';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-204551599-1');

// main function
async function removeCookies(tab) {
  const u = new URL(tab.url)
  const p = psl.parse(u.host)
  if (['google', 'gmail'].includes(p.sld)) {
    return false;
  }
  console.log("p")
  console.log(p)

  chrome.cookies.getAll({domain: p.domain}, (cookies) => {
    cookies.forEach((co) => {
      console.log(co)
      removeCookie(co)
    })
  })

  chrome.tabs.sendMessage(tab.id, {start: 'clearStorage'}, function(response) {
    console.log(response);
    gtag('event', 'triggered', {
      'event_label': u.host
    })
  
    chrome.tabs.reload(tab.id)
  });

}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name}, function(res) {console.log('deleted', res)});
}

chrome.browserAction.onClicked.addListener((tab) => {
  removeCookies(tab)
})

