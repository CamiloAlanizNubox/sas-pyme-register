// constants
const MIXPANEL_TOKEN = '1234';
const INTERCOM_APP_ID = 'xptivtq2';
const APPCUES_APP_ID = 80068;
const HUBSPOT_APP_ID = 2081075;
const HOTJAR_APP_ID = 2769400;
const MAIL_EXISTS_ENDPOINT = 'https://api.test-nubox.com/bffauthregister-develop/mailExists';
const REGISTER_ENDPOINT = 'https://api.test-nubox.com/bffauthregister-develop/register';

//util
const getQueryParam = (url, param) => {
  // Expects a raw URL
  param = param.replace(/[[]/, '[').replace(/[]]/, ']');
  var regexS = '[?&]' + param + '=([^&#]*)',
    regex = new RegExp(regexS),
    results = regex.exec(url);
  if (
    results === null ||
    (results && typeof results[1] !== 'string' && results[1].length)
  ) {
    return '';
  } else {
    return decodeURIComponent(results[1]).replace(/\W/gi, ' ');
  }
};

const nbxAnalytics = {
  //mix panel init
  _mixpanelInit: function (f, b) {
    if (!b.__SV) {
      var e, g, i, h;
      window.mixpanel = b;
      b._i = [];
      b.init = function (e, f, c) {
        function g(a, d) {
          var b = d.split('.');
          2 == b.length && ((a = a[b[0]]), (d = b[1]));
          a[d] = function () {
            a.push([d].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        var a = b;
        'undefined' !== typeof c ? (a = b[c] = []) : (c = 'mixpanel');
        a.people = a.people || [];
        a.toString = function (a) {
          var d = 'mixpanel';
          'mixpanel' !== c && (d += '.' + c);
          a || (d += ' (stub)');
          return d;
        };
        a.people.toString = function () {
          return a.toString(1) + '.people (stub)';
        };
        i =
          'disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove'.split(
            ' '
          );
        for (h = 0; h < i.length; h++) g(a, i[h]);
        var j = 'set set_once union unset remove delete'.split(' ');
        a.get_group = function () {
          function b(c) {
            d[c] = function () {
              call2_args = arguments;
              call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
              a.push([e, call2]);
            };
          }
          for (
            var d = {},
              e = ['get_group'].concat(
                Array.prototype.slice.call(arguments, 0)
              ),
              c = 0;
            c < j.length;
            c++
          )
            b(j[c]);
          return d;
        };
        b._i.push([e, f, c]);
      };
      b.__SV = 1.2;
      e = f.createElement('script');
      e.type = 'text/javascript';
      e.async = !0;
      e.src =
        'undefined' !== typeof MIXPANEL_CUSTOM_LIB_URL
          ? MIXPANEL_CUSTOM_LIB_URL
          : 'file:' === f.location.protocol &&
            '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(/^\/\//)
          ? 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'
          : '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';
      g = f.getElementsByTagName('script')[0];
      g.parentNode.insertBefore(e, g);
    }
  },
  /*nbxAnalitycs.mixpanelInit public function*/
  mixpanelInit: function (token) {
    nbxAnalytics._mixpanelInit(document, window.mixpanel || []);
    mixpanel.init(token, { batch_requests: true });
  },
  init: function ({ mixpanelActive, mixpanelToken }) {
    if (mixpanelActive && mixpanelToken)
      nbxAnalytics.mixpanelInit(mixpanelToken);
  },
  identify: function (USER_ID, identifyProps) {
    //TODO Add intercom and appcues
    /* MixPanel */
    if (window.mixpanel !== undefined) {
      window.mixpanel.identify(USER_ID);
    }
  },
  track: function (eventName, eventProps) {
    if (window.mixpanel !== undefined) {
      if (eventProps === undefined) {
        eventProps = new Object();
      }
      var eventDate1 = new Date(Date.now());
      eventProps.fecha = eventDate1.toISOString();
      window.mixpanel.track(eventName, eventProps);
    }
  },
  mixpanelPropertyRegister: function (superProps) {
    if (window.mixpanel !== undefined) {
      window.mixpanel.register(superProps);
    }
  },

  mixpanelPropertyRegisterOnce: function (superProps) {
    if (window.mixpanel !== undefined) {
      window.mixpanel.register_once(superProps);
    }
  },
  mixpanelUserSetProperties: function (peopleProps) {
    if (window.mixpanel !== undefined) {
      if (peopleProps === undefined) {
        peopleProps = new Object();
      }
      var eventDate1 = new Date(Date.now());
      peopleProps.$last_seen = eventDate1.toISOString();
      window.mixpanel.people.set(peopleProps);
    }
  },
  mixpanelGroupRegister: function (groupKey, groupId) {
    if (window.mixpanel !== undefined) {
      window.mixpanel.set_group(groupKey, groupId);
    }
  },
  mixpanelGroupSetProperties: function (groupKey, groupId, groupProps) {
    if (window.mixpanel !== undefined) {
      if (groupProps === undefined) {
        groupProps = new Object();
      }
      var eventDate1 = new Date(Date.now());
      groupProps.$last_seen = eventDate1.toISOString();
      window.mixpanel.get_group(groupKey, groupId).set(groupProps);
    }
  },
  setCampaignThatReachesToUser: function () {
    var campaign_keywords =
        'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
      kw = '',
      params = {},
      first_params = {};
    var index;
    for (index = 0; index < campaign_keywords.length; ++index) {
      kw = getQueryParam(document.URL, campaign_keywords[index]);
      if (kw.length) {
        params[campaign_keywords[index] + ' [last touch]'] = kw;
      }
    }
    for (index = 0; index < campaign_keywords.length; ++index) {
      kw = getQueryParam(document.URL, campaign_keywords[index]);
      if (kw.length) {
        first_params[campaign_keywords[index] + ' [first touch]'] = kw;
      }
    }

    window.mixpanel.people.set(params);
    window.mixpanel.people.set_once(first_params);
    window.mixpanel.register(params);
  },
};

// Analitycs Init
if (MIXPANEL_TOKEN) {
  nbxAnalytics.init({
    mixpanelActive: true,
    mixpanelToken: MIXPANEL_TOKEN,
  });
}

// Intercom Init
if (INTERCOM_APP_ID) {
  window['intercomSettings'] = {
    app_id: INTERCOM_APP_ID,
  };
  (function () {
    const w = window;
    const ic = w['Intercom'];
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', w['intercomSettings']);
    } else {
      const d = document;
      const i = function (...args) {
        i.c(args);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };

      w['Intercom'] = i;
      const l = function () {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + INTERCOM_APP_ID;
        const x = d.getElementsByTagName('script')[0];
        x?.parentNode.insertBefore(s, x);
      };
      if (document.readyState === 'complete') {
        l();
      } else if (w['attachEvent']) {
        w['attachEvent']('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }
  })();

  window['Intercom']('boot', {
    app_id: INTERCOM_APP_ID,
  });

  window['Intercom']('update', {
    hide_default_launcher: true,
  });
}

// Appcues Init
const isScriptLoaded = (url) => {
  if (!url) {
    return false;
  } else {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length; i--; ) {
      if (scripts[i].src === url) {
        return true;
      }
    }
    return false;
  }
};

function addScript(url, id = null) {
  if (url) {
    if (!isScriptLoaded(url)) {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.defer = true;
      if (id) scriptElement.id = id;
      document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }
  }
}

if (APPCUES_APP_ID) {
  addScript(`//fast.appcues.com/${APPCUES_APP_ID}.js`);
}

if (HUBSPOT_APP_ID) {
  addScript(`//js.hs-scripts.com/${HUBSPOT_APP_ID}.js`, 'hs-script-loader');
}

// hotjar Init
(function (h, o, t, j, a, r) {
  h['hj'] =
    h['hj'] ||
    function () {
      // eslint-disable-next-line prefer-rest-params 
      (h['hj'].q = h['hj'].q || []).push(arguments);
    };
  h['_hjSettings'] = { hjid: HOTJAR_APP_ID, hjsv: 6 };
  a = o.getElementsByTagName('head')[0];
  r = o.createElement('script');
  r.async = 1;
  r.src = t + h['_hjSettings'].hjid + j + h['_hjSettings'].hjsv;
  a.appendChild(r);
})(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

function processRegister(data, email, fullname) {
  const { userId, token } = data.register;
  const { nextUrl, companyId } = data.globalStatus;

  // hotjar
  window.hj('identify', userId, {
    email,
  });

  // mixpanel
  nbxAnalytics.identify(userId);
  nbxAnalytics.mixpanelUserSetProperties({
    rol_usuario_sistema: 'Master Admin',
  });
  nbxAnalytics.mixpanelGroupRegister('CompanyId', companyId);
  nbxAnalytics.setCampaignThatReachesToUser();

  //hubspot
  const _hsq = (window._hsq = window._hsq || []);
  _hsq.push([
    'identify',
    {
      email: email,
    },
  ]);
  _hsq.push(['trackPageView']);

  const messageToParent = {
    url: `${location.origin}/verify`,
    sessionStorage: [
      {
        key: 'pyme_company_id',
        value: companyId,
      },
      {
        key: 'pyme_user_id',
        value: userId,
      },
    ],
  };

  window.Intercom('update', {
    email: email,
    user_id: userId,
  });

  // new session vars
  localStorage.setItem('pyme_token', token);
  sessionStorage.setItem('pyme_company_id', companyId);
  sessionStorage.setItem('pyme_user_id', userId);

  // legacy session vars (for compatibility)
  localStorage.setItem('token', token);
  localStorage.setItem('sasUserToken', `"${userId}"`);
  localStorage.setItem('companyId', companyId);
  localStorage.setItem('pyme_not_verify_email', email);
  localStorage.setItem('pyme_not_verify_next_url', nextUrl);

  const isEmbed =
    new URLSearchParams(window.location.search).get('isEmbed') === 'true';

  if (isEmbed) {
     parent.window.postMessage(JSON.stringify(messageToParent), '*');
   } else {
     window.location = '/verify';
  }
}
