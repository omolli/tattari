'use strict';
const {dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');
const {google} = require('googleapis');
const Utils = require('./src/utils')
const Reprompts = require('./src/reprompts')
const app = dialogflow({debug: true});
const host = 'https://tattar-oudbew.web.app/';
const {WebhookClient} = require('dialogflow-fulfillment');
const fbc = 3;
const repc = 1;
const valmis = '100K.mp3';

//INTENTS
app.intent('Default Welcome Intent', (conv, {response}) => {
    //Muuttujia
    conv.data.fallbackCount = 0;
    conv.data.day = 1;
    conv.data.vpoints = 0;
    conv.data.bpoints = 0;
    conv.data.minipeli = -1;
    conv.data.checkpoint = [];
    conv.data.points = [];
    conv.data.rethink = [];
    conv.data.experts = '';
    conv.data.testi = '';
    conv.data.visits = '';
    conv.data.kyyhky = false;
    conv.data.sreveal = false;
    conv.data.julkaise = false;
    conv.data.nice = false;
    conv.data.previous = ['Welcome','start again','welcome'];
    conv.data.peliansw = [0,0,0];
    const audiourl = host + '101.mp3';
    conv.data.kysurl = '';
    var testday = 0;
    if (conv.user.verification === 'VERIFIED') {
      //testday = conv.user.storage.day;
    }
    if (conv.user.last.seen) {
      conv.ask('Welcome back to the dead are speaking!')
      conv.contexts.set('loadgame',5,{})
      if (testday > 0) {
        conv.contexts.set('loadgame',5,{})
        conv.ask('If you wish to continue a saved game, say load game. For a new game say ready.')
      } else {
        conv.ask(Utils.playSimple(audiourl));
      }
    } else {
      conv.ask('Welcome to the dead are speaking!')
      conv.ask(Utils.playSimple(audiourl));
    }
});
//app.intent('pause', (conv) => { });

app.intent('NewGame', (conv) => {
  const audiourl = host + '101.mp3';
  conv.data.previous = ['newgame','new game','DefaultWelcomeIntent-followup'];
  conv.ask(Utils.playSimple(audiourl));
});

app.intent('Load', (conv) => {
    conv.data.previous = ['1_1event','ready','DefaultWelcomeIntent-followup'];
    if (conv.user.verification === 'VERIFIED') {
      const theday = conv.user.storage.day;
      if (conv.user.storage.day > 0 && conv.user.storage.day < 5) {
        conv.data.sum = conv.user.storage.sum;
        conv.data.fallbackCount = conv.user.storage.fallbackCount;
        conv.data.day = conv.user.storage.day;
        conv.data.vpoints = conv.user.storage.vpoints;
        conv.data.bpoints = conv.user.storage.bpoints;
        conv.data.minipeli = conv.user.storage.minipeli;
        conv.data.checkpoint = conv.user.storage.checkpoint;
        conv.data.points = conv.user.storage.points;
        conv.data.experts = conv.user.storage.experts;
        conv.data.testi = conv.user.storage.testi;
        conv.data.visits = conv.user.storage.visits;
        conv.data.kyyhky = conv.user.storage.kyyhky;
        conv.data.rethink = conv.user.storage.rethink;
        conv.data.sreveal = conv.user.storage.sreveal;
        conv.data.previous = conv.user.storage.previous;
        conv.data.peliansw = conv.user.storage.peliansw;
        conv.data.kysurl = conv.user.storage.kysurl;
        conv.data.julkaise = conv.user.storage.kysurl;
        conv.data.nice = conv.user.storage.nice;
      }
      conv.followup('repeat', {
        response: 'repeat'
      });
  } else {
    conv.ask('Loading is possible only for verified users.')
  }
});

app.intent('Save', (conv) => {
  if (conv.user.verification === 'VERIFIED') {
    conv.user.storage.sum = conv.data.sum;
    conv.user.storage.fallbackCount = conv.data.fallbackCount;
    conv.user.storage.day = conv.data.day;
    conv.user.storage.vpoints = conv.data.vpoints;
    conv.user.storage.bpoints = conv.data.bpoints;
    conv.user.storage.minipeli = conv.data.minipeli;
    conv.user.storage.checkpoint = conv.data.checkpoint;
    conv.user.storage.points = conv.data.points;
    conv.user.storage.experts = conv.data.experts;
    conv.user.storage.testi = conv.data.testi;
    conv.user.storage.visits = conv.data.visits;
    conv.user.storage.kyyhky = conv.data.kyyhky;
    conv.user.storage.rethink = conv.data.rethink;
    conv.user.storage.sreveal = conv.data.sreveal;
    conv.user.storage.previous = conv.data.previous;
    conv.user.storage.peliansw = conv.data.peliansw;
    conv.user.storage.kysurl = conv.data.kysurl;
    conv.user.storage.julkaise = conv.data.julkaise;
    conv.user.storage.nice = conv.data.nice;
   //conv.close(`The game is now saved!`);
    conv.close('The game is now saved!');
  } else {
    conv.ask('Only verified users can save progress. Say quit if you wish to exit and repeat if you wish to continue');
  }
});

app.intent('SaveSilent', (conv) => {
  if (conv.user.verification === 'VERIFIED') {
    conv.data.testi = 'VERIFIEEEEEDD';
    conv.user.storage.sum = conv.data.sum;
    conv.user.storage.fallbackCount = conv.data.fallbackCount;
    conv.user.storage.day = conv.data.day;
    conv.user.storage.vpoints = conv.data.vpoints;
    conv.user.storage.bpoints = conv.data.bpoints;
    conv.user.storage.minipeli = conv.data.minipeli;
    conv.user.storage.checkpoint = conv.data.checkpoint;
    conv.user.storage.points = conv.data.points;
    conv.user.storage.experts = conv.data.experts;
    conv.user.storage.testi = conv.data.testi;
    conv.user.storage.visits = conv.data.visits;
    conv.user.storage.kyyhky = conv.data.kyyhky;
    conv.user.storage.rethink = conv.data.rethink;
    conv.user.storage.sreveal = conv.data.sreveal;
    conv.user.storage.previous = conv.data.previous;
    conv.user.storage.peliansw = conv.data.peliansw;
    conv.user.storage.kysurl = conv.data.kysurl;
    conv.user.storage.julkaise = conv.data.julkaise;
    conv.user.storage.nice = conv.data.nice;
  }
  const cevent = conv.data.previous[0];
  const cparam = conv.data.previous[1];
  const ccontext = conv.data.previous[2];
  conv.contexts.set(ccontext,1,{})
  conv.ask('Your game has been saved, say ready to continue!')
   // conv.followup(cevent, {
   //   response: cparam
   // });
});

app.intent('SaveContinue', (conv) => {
  const cevent = conv.data.previous[0];
  const cparam = conv.data.previous[1];
  const ccontext = conv.data.previous[2];
  conv.contexts.set(ccontext,1,{})
   conv.followup(cevent, {
     response: cparam
   });
});

app.intent('Exit', (conv) => {
    conv.user.storage.testi = conv.data.testi;
    conv.close('Goodbye for now!');
});

app.intent('Forget', (conv) => {
    conv.ask('Are you sure you want to delete all information?')
});

app.intent('Forgot', (conv, {binarr}) => {
    if (binarr === 'yes') {
    conv.user.storage = {};
    conv.close('Your information has been cleared');
  } else {
    conv.close(`That's okay. Let's not do it now.`);
  }
});

app.intent('repeat', (conv) =>{
  //helper intent for replaying the current event (intent) with the current choice
  const cevent = conv.data.previous[0];
  const cparam = conv.data.previous[1];
  const ccontext = conv.data.previous[2];
  conv.contexts.set(ccontext,1,{})
  //const param = Reprompts.getParam(cevent);
  const param = Reprompts.getType(cparam);
  if (param === 'binarr') {
    conv.followup(cevent, {
      binarr: cparam
    });
  } else if (cevent === '2_2event') {
    conv.followup(cevent, {
      ent2_1: cparam
    });
  } else if (cevent === '3D_2event' || cevent === '3D_3event' || cevent === '3D_4event') {
    conv.followup(cevent, {
      number: cparam
    });
  } else if (cevent === '23_2event') {
    conv.followup(cevent, {
      ent23_2: cparam
    });
  } else if (cevent === '24_3event' || cevent === '24_4event' || cevent === '24_5event') {
    conv.followup(cevent, {
      ent24: cparam
    });
  } else {
  conv.followup(cevent, {
    response: cparam
  });
  }
});

//Default NoInput intent
app.intent('NoInput', (conv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  const cevent = conv.data.previous[0];
  const prompt = Reprompts.getURL(cevent);
  const audiourl = host + prompt[0] + '.mp3';
  conv.contexts.set(prompt[1],1,{})
  if (repromptCount === 0 && prompt[0] !== 'repeater') {
  conv.ask(Utils.playSimple(audiourl));
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
    conv.close('Let us try this some other time!')
  } else {
    conv.followup('repeat', {
      response: 'repeat'
    });
  }
});
//Noinput intent for intents that go to the next directly
app.intent('AnyNoInput', (conv) => {
  const cevent = conv.data.previous[0];
  const prompt = Reprompts.getURL(cevent);
  const ctx = prompt[1];
  const eve = prompt[2];
  const cparam = prompt[3];
  conv.contexts.set(ctx,1,{})
  conv.followup(eve, {
    response: cparam
  });
});
//Default fallback, i.e when no specific fallback is declared
app.intent('Default Fallback Intent', (conv) => {
  conv.data.fallbackCount++;
  const cevent = conv.data.previous[0];
  const prompt = Reprompts.getURL(cevent);
  const audiourl = host + prompt[0] + '.mp3';
  const ctx = prompt[1];
  var eve = prompt[2];
  var cparam = prompt[3];
  conv.contexts.set(ctx,1,{})
  if (prompt[0] === 'repeater') {
    eve = 'repeat';
    cparam = 'repeat';
    conv.data.fallbackCount = fbc;
  }
  if (conv.data.fallbackCount < fbc) {
  conv.ask(Utils.playSimple(audiourl));
  } else {
    conv.data.fallbackCount = 0;
    conv.followup(eve, {
      response: cparam
    });
  }
});
//Fallback for intents that accept any input
app.intent('AnyFallback', (conv) => {
  const cevent = conv.data.previous[0];
  const prompt = Reprompts.getURL(cevent);
  const ctx = prompt[1];
  const eve = prompt[2];
  const cparam = prompt[3];
  conv.contexts.set(ctx,1,{})
  conv.followup(eve, {
    response: cparam
  });
});
app.intent('CheckTest', (conv) => {
    const teest = 'test is ' + conv.user.storage.testi;
    const prev = 'previous is ' + conv.user.storage.previous;
    const str = teest + ' and ' + prev;
    conv.ask(Utils.speak(str));

});
app.intent('1_1Start', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['1_1event','ready','DefaultWelcomeIntent-followup'];
    const audiourl = host + '102.mp3';
    const ssml = Utils.playSimple(audiourl);
    const txt = 'Bloody hellfire, are you listening to me?';
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));

});

app.intent('1_2boss', (conv) => {
    conv.data.previous = ['1_2event','ready','int1_1'];
    const audiourl = host + '197.mp3';
    conv.ask(Utils.playSimple(audiourl));
});

app.intent('1_3bossresponse', (conv, {response,ent1_3}) => {
    var answ = '';
    var audiourl = host;
    if (response === 'one' || ent1_3 === 'better') {
        answ = 'one';
        audiourl += '104.mp3';
    } else if (answ === 'two' || ent1_3 === 'work') {
        audiourl += '105.mp3';
        answ = 'two';
    } else {
      if (!conv.data.points.includes('1_3event')) {
        conv.data.bpoints++;
        conv.data.points.push('1_3event')
      }
        audiourl += '106.mp3';
        answ = 'three';
    }
    conv.data.previous = ['1_3event',answ,'int1_2'];
    conv.ask(Utils.playSimple(audiourl));
});

  app.intent('1_4entervanamo', (conv, {response,ent1_4}) => {
    var answ = 'two';
    var audiourl = host+ '108.mp3';
    if (response === 'one' || ent1_4 === 'pleased') {
        audiourl = host+ '107.mp3';
        answ = 'one';
        if (!conv.data.points.includes('1_4event')) {
          conv.data.vpoints++;
          conv.data.points.push('1_4event')
        }
    }
    conv.data.previous = ['1_4event',answ,'int1_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_5phone', (conv) => {
    conv.data.previous = ['1_5event','ready','int1_4'];
    const audiourl = host+ '109.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_6koski', (conv, {response, ent1_6}) => {
    const audiourl = host + '110.mp3';
    var answ = 'two';
    if (response === 'one' || ent1_6 === 'fill') {
      conv.data.nice = true;
      answ = 'one';
      if (!conv.data.points.includes('1_6event')) {
        conv.data.vpoints++;
        conv.data.points.push('1_6event')
      }
    }
    conv.data.previous = ['1_6event',answ,'int1_5'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_7matka', (conv, {response,ent1_7}) => {
    conv.data.fallbackCount = 0;
    var answ = 'three';
    const param = conv.data.nice;
    var audiourl = host + '111T.mp3';
    var urlc = '';
    if (param) {
      urlc = host + '111';
    } else {
      urlc = host + '112';
    }
    if (response === 'one' || ent1_7 === 'cab') {
      audiourl = urlc + 'T.mp3';
      answ = 'one';
    } else if (response ==='two' || ent1_7 === 'bus') {
      audiourl = urlc + 'A.mp3';
      answ = 'two';
    } else {
      audiourl = urlc + 'V.mp3';
    }
    conv.data.previous = ['1_7event',answ,'int1_6'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_1kuski', (conv, {response, ent2_1}) => {
    conv.data.fallbackCount = 0;
    var audiourl = '';
    var answ = 'four';
    if (response === 'one' || ent2_1 === 'why') {
      audiourl = host + '113.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'A'});
      answ = 'one';
    } else if (response === 'two' || ent2_1 === 'see') {
      audiourl = host + '114.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'B'});
      answ = 'two';
    } else if (response === 'three' || ent2_1 === 'when') {
      audiourl = host + '115.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'C'});
      answ = 'three';
    } else {
      audiourl = host + '116.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'D'});
    }
    conv.data.previous = ['2_1event',answ,'int1_7'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_2kuski2', (conv, {response,ent2_1}) => {
    conv.data.fallbackCount = 0;
    var audiourl = '';
    var answ = response;
    const ctx = conv.contexts.get('kysykuski').parameters['kys'];
    var answ2 = Utils.switcher(answ,ctx);
    if (answ2 === 'kysy') {
      answ2 = ent2_1;
    }
    conv.contexts.set('kysykuski', 5, {kys: ctx})

    if (answ2 === 'why') {
      audiourl = host + '117.mp3';
    } else if (answ2 === 'see') {
      audiourl = host + '118.mp3';
    } else if (answ2 === 'when') {
      audiourl = host + '119.mp3';
    } else {
      audiourl = host + '120.mp3';
    }
    conv.data.previous = ['2_2event',answ2,'int2_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_3handuja', (conv, {response, ent2_3}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    var audiourl = '';
    if (response === 'one' || ent2_3 === 'bootlegger') {
      answ = 'one';
      audiourl = host + '121.mp3';
      conv.data.sreveal = true;
    } else {
      audiourl = host + '122.mp3';
    }
    conv.data.previous = ['2_3event',answ,'int2_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_4kelo', (conv) => {
    conv.data.previous = ['2_4event','one','int2_3'];
    const audiourl = host + '123.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_5choice', (conv, {response, ent2_5}) => {
    var answ = 'two';
    if (response === 'one' || ent2_5 === 'go') {
      if (!conv.data.points.includes('2_5event')) {
        conv.data.bpoints++;
        conv.data.points.push('2_5event')
      }
      conv.contexts.set('leave3B', 1, {});
      return conv.followup('3B_Eevent', {
        response: "ready"
      });
    } else {
        conv.contexts.set('stay3A', 1, {});
        return conv.followup('3A_1event', {
          response: "ready"
        });
    }
  });

  app.intent('3A_1stay', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3A_1event','ready','stay3A'];
    const audiourl = host + '124.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3A_2stay', (conv, {response,ent3A_2}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    conv.data.previous = ['3A_2event',answ,'int3A_1'];
    var audiourl = '';
     if (response === 'one' || ent3A_2 === 'comb') {
        answ = 'one';
        conv.contexts.set('int3A_W', 2, {});
        audiourl = host+ '125.mp3';
    } else {
         audiourl = host + '126.mp3';
         conv.contexts.set('3Around', 2, {});
    }
    conv.data.previous = ['3A_2event',answ,'int3A_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3A_3round', (conv, {response,binarr}) => {
    conv.data.kyyhky = true;
    conv.data.fallbackCount = 0;
    var answ = 'no';
    conv.contexts.set('3Around', 0, {});
    var audiourl = '';
    if (response === 'one' || binarr === 'yes') {
        answ = 'yes';
        audiourl = host + '127.mp3';
    } else {
        audiourl = host + '128.mp3';
    }
    conv.data.previous = ['3A_3event',answ,'3Around'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3A_4wrap', (conv) => {
    conv.data.previous = ['3A_4event','ready','int3A_W'];
    conv.contexts.set('int3A_W', 0, {});
    const audiourl = host + '129.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_Eleave', (conv) => {
    conv.data.previous = ['3B_Eevent','ready','leave3B'];
    const audiourl = host + '134.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_1leave', (conv, {response,ent3B_1}) => {
    var answ = 'two';
    var audiourl = '';
     if (response === 'one' || ent3B_1 === 'murder') {
         audiourl = host+ '135.mp3';
         answ = 'one';
    } else {
         audiourl = host+ '136.mp3';
    }
    conv.data.previous = ['3B_1event',answ,'int3B_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_2sanoma', (conv) => {
    conv.data.previous = ['3B_2event','ready','int3B_1'];
    const audiourl = host + '137.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_3call', (conv) => {
    conv.data.previous = ['3B_3event','ready','int3B_2'];
    const audiourl = host + '138.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_4call', (conv) => {
    conv.data.previous = ['3B_4event','one','int3B_3'];
    const audiourl = host + '139.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3D_1minipeli', (conv) => {
    conv.data.previous = ['3D_1event','ready','int3A_4'];
    var audiourl = host + '130.mp3';
    if (conv.data.minipeli !== -1) {
      audiourl = host + '180.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3D_2minipeli', (conv, {number}) => {
    conv.data.minipeli = 0;
    const answ = number;
    conv.data.peliansw[0] = answ;
    if (answ === '4') {
      conv.data.minipeli++;
    }
    conv.data.previous = ['3D_2event',answ,'int3D_1'];
    const audiourl = host + '131.mp3';
    const ssml = Utils.playSimple(audiourl);
    const txt = 'Alright. ' + number + ' hands you say? What about legs?';
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_3minipeli', (conv, {number}) => {
    conv.data.fallbackCount = 0;
    const answ = number;
    conv.data.peliansw[1] = answ;
    if (answ === '8') {
      conv.data.minipeli++;
    }
    conv.data.previous = ['3D_3event',answ,'int3D_2'];
    const audiourl = host + '132.mp3';
    const ssml = Utils.playSimple(audiourl);
    const txt = 'Alright. ' + number + ' legs you say? What about legs?';
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_4minipeli', (conv, {number}) => {
    conv.data.fallbackCount = 0;
    const answ = number;
    conv.data.peliansw[2] = answ;
    if (answ === '16') {
      conv.data.minipeli++;
    }
    conv.data.previous = ['3D_4event',answ,'int3D_3'];
    const audiourl = host + '133.mp3';
    const ssml = Utils.playSimple(audiourl);
    const txt = 'Alright. And ' + number + ' Fingers. Sounds tough. Wanna change numbers?';
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_5minipeli', (conv, {response,binarr}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3D_5event',answ,'int3D_3'];
    if (answ === 'one' || binarr === 'yes') {
      conv.contexts.set('int3A_4', 1, {});
      conv.data.minipeli = 0;
      return conv.followup('3D_1event', {
        response: "ready"
      });
    } else {
    if (!conv.data.points.includes('3D_5event')) {
      if (conv.data.minipeli > 0) {
        conv.data.bpoints += (conv.data.minipeli + 1) / 2;
      }
      conv.data.points.push('3D_5event')
    }
    const audiourl = host + '133B.mp3';
    conv.ask(Utils.playSimple(audiourl));
    }
  });

  app.intent('4_1ilta', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['4_1event','ready','int4_E'];
    const audiourl = host + '140.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('4_2router', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    if (answ === 'one') {
      return conv.followup('5A_1event', {
        response: "professor"
      });
    } else if (answ === 'two') {
      return conv.followup('5B_1event', {
        response: "fabritius"
      });
    } else {
      return conv.followup('5C_1event', {
        response: "police"
      });
    }
  });

  app.intent('5A_1magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_1event','professor','magnus'];
    conv.data.experts = Utils.appender(conv.data.experts,'A');
    const audiourl = host + '141.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5A_2magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_2event','adjunct professor','int5A_1'];
    const audiourl = host + '142.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5A_3magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_3event','ready','int5A_2'];
    var audiourl = host + '142.mp3';
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      audiourl = host + '202A.mp3';
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143.mp3';
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('hkipolice', 1, {});
    } else {
      conv.contexts.set('int6E', 1, {});
      audiourl = host + '190.mp3';
      return conv.ask(Utils.playSimple(audiourl));
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5B_1fabritius', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5B_1event','physician','fabritius'];
    conv.data.experts = Utils.appender(conv.data.experts,'B');
    const audiourl = host + '144.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5B_2fabritius', (conv, {response,binarr}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var audiourl = '';
    if (response === 'one' || binarr === 'yes') {
      audiourl = host + '145.mp3';
    } else {
      audiourl = host + '146.mp3';
      answ = 'two';
    }
    conv.data.previous = ['5B_2event',answ,'int5B_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5B_3fabritius', (conv, {response,binarr}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var audiourl = host + '144.mp3';
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '202BL.mp3';
      } else {
        answ = 'two';
        audiourl = host + '202B.mp3';
      }
    } else if (conv.data.experts.length === 1) {
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '148.mp3';
      } else {
        answ = 'two';
        audiourl = host + '150.mp3';
      }
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('hkipolice', 1, {});
    } else {
      conv.contexts.set('int6E', 1, {});
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '149.mp3';
      } else {
        audiourl = host + '151.mp3';
        answ = 'two';
      }
    }
    conv.data.previous = ['5B_3event',answ,'int5B_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5C_1police', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.experts = Utils.appender(conv.data.experts,'C');
    conv.data.previous = ['5C_1event','police','hkipolice'];
    const audiourl = host + '152.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5C_2police', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5_2Cevent','one','int5C_1'];
    var audiourl = host + '153.mp3';
    if (conv.data.day === 2) {
      audiourl = host + '202C.mp3';
      conv.contexts.set('int9E', 1, {});
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153.mp3';
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('magnus', 1, {});
    } else {
      conv.contexts.set('int6E', 1, {});
      audiourl = host + '154.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('6_1ilta', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['6_1event','ready','int6E'];
    var audiourl = host;
    if (conv.data.minipeli < 0) {
      audiourl += '157';
    } else if (conv.data.minipeli > 0) {
      audiourl += '155';
    } else {
      audiourl += '156';
    }
    if (conv.data.vpoints > 0) {
      audiourl += 'V';
    }
    audiourl += '.mp3'
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('7_1aamu', (conv, {response, ent7_1}) => {
    conv.data.day = 2;
    conv.data.fallbackCount = 0;
    var answ = 'four';
    var accuse = 0;

     if (!conv.data.checkpoint.includes('7_1event')) {
       conv.data.checkpoint.push('7_1event');
       // Wish this worked
       // conv.followup('save_silently', {
       //   response: 'save silently'
       // });
       conv.user.storage.sum = conv.data.sum;
       conv.user.storage.fallbackCount = conv.data.fallbackCount;
       conv.user.storage.day = conv.data.day;
       conv.user.storage.vpoints = conv.data.vpoints;
       conv.user.storage.bpoints = conv.data.bpoints;
       conv.user.storage.minipeli = conv.data.minipeli;
       conv.user.storage.checkpoint = conv.data.checkpoint;
       conv.user.storage.points = conv.data.points;
       conv.user.storage.experts = conv.data.experts;
       conv.user.storage.testi = conv.data.testi;
       conv.user.storage.visits = conv.data.visits;
       conv.user.storage.kyyhky = conv.data.kyyhky;
       conv.user.storage.rethink = conv.data.rethink;
       conv.user.storage.sreveal = conv.data.sreveal;
       conv.user.storage.previous = conv.data.previous;
       conv.user.storage.peliansw = conv.data.peliansw;
       conv.user.storage.kysurl = conv.data.kysurl;
       conv.user.storage.julkaise = conv.data.julkaise;
       conv.user.storage.nice = conv.data.nice;
     }
    //Himomurhaajaan Pomo +1
    //Anatomian laitoksen opiskelijoihin
    //Romaanien hautajaismenoihin Pomo +1
    //Älä syytä vielä ketään
    var audiourl = host + '201';
    if (response === 'one' || ent7_1 === 'murderer') {
      audiourl += 'C';
      accuse++;
      answ = 'one';
    } else if (response === 'two' || ent7_1 === 'anatomy') {
      audiourl += 'A';
      answ = 'two';
    } else if (response === 'three' || ent7_1 === 'romany') {
      audiourl += 'B';
      accuse++;
      answ = 'three';
    } else {
      audiourl += 'D';
    }
    conv.data.previous = ['7_1event',answ,'int6_1'];
    if (!conv.data.points.includes('7_1event')) {
      conv.data.bpoints += accuse;
      conv.data.points.push('7_1event')
    }
    if (conv.data.experts.indexOf('A') === -1) {
      audiourl += 'H.mp3';
      conv.contexts.set('magnus', 1, {});
    } else if (conv.data.experts.indexOf('B') === -1) {
      audiourl += 'F.mp3';
      conv.contexts.set('fabritius', 1, {});
    } else  {
      audiourl += 'P.mp3';
      conv.contexts.set('hkipolice', 1, {});
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('7_2router', (conv, {response}) => {
    const answ = response;
    if (answ === 'one') {
      var eve = '5C_1event';
      var resp = 'police';
      if (conv.data.experts.indexOf('A') === -1) {
        eve = '5A_1event';
        resp = 'professor';
      } else if (conv.data.experts.indexOf('B') === -1) {
        eve = '5B_1event';
        resp = 'physician';
      }
      return conv.followup(eve, {
        response: resp
      });
    } else {
      return conv.followup('9_1event', {
        response: "anatomy"
      });
    }
  });

  app.intent('9_1anatomy', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['9_1event','anatomy','int9E'];
    const audiourl = host + '203.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('9_2anatomy', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['9_2event','yes','int9_1'];
    const audiourl = host + '204.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('9_3anatomy', (conv, {binarr,response}) => {
    conv.data.fallbackCount = 0;
    var answ = 'no';
    var audiourl = host;
    if (binarr === 'yes' || response === 'one') {
      audiourl += '205.mp3';
      answ = 'yes';
    } else {
      audiourl += '206.mp3';
    }
    conv.data.previous = ['9_3event',answ,'int9_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('9_4anatomy', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['9_4event','ready','int9_3'];
    const audiourl = host + '207.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('10_1kuulustelu', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['10_1event','ready','int9_4'];
    const audiourl = host + '208.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('10_2kuulustelu', (conv, {response,ent10_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'one';
    if (response === 'three' || ent10_2 === 'dont') {
      answ = 'three';
      audiourl += '210';
    } else {
      audiourl += '209';
      if (!conv.data.points.includes('10_2event')) {
        conv.data.vpoints++;
        conv.data.points.push('10_2event')
      }
    }
    if (response === 'four') {
      conv.data.kyyhky = true;
    }
    if (conv.data.kyyhky) {
      audiourl += 'KY';
    }
    audiourl += '.mp3';
    conv.data.previous = ['10_2event',answ,'int10_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('10_3kuulustelu', (conv, {ent10_3,response}) => {
    conv.data.fallbackCount = 0;
    var answ = '';
    var audiourl = host;
    if (conv.data.kyyhky) {
      if (response === 'one' || ent10_3 === 'dove') {
        answ = 'one';
        audiourl += '211.mp3';
      } else if (response === 'two' || ent10_3 === 'panacea') {
        answ = 'two';
        audiourl += '212.mp3';
      } else {
        answ = 'three';
        audiourl += '213.mp3';
      }
    } else {
      if (response === 'one' || ent10_3 === 'panacea') {
        answ = 'one';
        audiourl += '212.mp3';
      } else {
        answ = 'two';
        audiourl += '213.mp3';
      }
    }
    conv.data.previous = ['10_3event',answ,'int10_2'];
    conv.ask(Utils.playSimple(audiourl));
  });
  //Helper intent for selecting where to go
  app.intent('11_1router', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    if (answ === 'one') {
      return conv.followup('11A_1event', {
        response: "article"
      });
    } else if (answ === 'two') {
      return conv.followup('11B_1event', {
        response: "wife"
      });
    } else {
      return conv.followup('11C_1event', {
        response: "cafe"
      });
    }
  });

  app.intent('11A_1sanoma', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'A');
    conv.data.previous = ['11A_1event','article','int11A_E'];
    var audiourl = '';
    if (conv.data.visits.length > 1) {
      audiourl = host + '214B.mp3';
    } else {
      audiourl = host + '214A.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11A_2sanoma', (conv, {binarr}) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11A_2event',binarr,'int11A_1'];
    var audiourl = '';
    if (conv.data.visits.length > 1) {
      if (binarr === 'yes') {
          audiourl = host + '217.mp3';
      } else {
          audiourl = host + '218.mp3';
      }
    } else {
      if (binarr === 'yes') {
          audiourl = host + '215.mp3';
      } else {
          audiourl = host + '216.mp3';
      }
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11A_3sanoma', (conv, {binarr}) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11A_3event',binarr,'int11A_2'];
    var audiourl = host + '219';
    if (binarr === 'yes') {
      if (!conv.data.points.includes('11A_3event')) {
        conv.data.bpoints++;
        conv.data.points.push('11A_3event')
      }
    }
    if (conv.data.visits.length > 1) {
      audiourl += 'B.mp3';
      conv.contexts.set('int12_E', 1, {})
    } else {
      conv.contexts.set('int11C_E', 1, {});
      conv.contexts.set('int11B_E', 1, {});
      audiourl += 'A.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11B_1wife', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'B');
    conv.data.previous = ['11B_1event','wife','int11B_E'];
    const audiourl = host + '220.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11B_2wife', (conv, {response,ent11B_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'three';
    //TODO AJANKOHTA MÄÄRÄÄ VAIKKA 225, vastaus plussat!
    //Jos ei ole käyty silminnäkijällä
    if (conv.data.visits.indexOf('C') === -1) {
      conv.contexts.set('int11C_E', 1, {});
      if (response === 'one' || ent11B_2 === 'morgue') {
        audiourl += '227.mp3';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '228.mp3';
        answ = 'two';
      } else {
        audiourl += '229.mp3';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //Jos on käyty silminnäkijällä, mutta sähkösanomaa ei olla tehty.
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'one' || ent11B_2 === 'morgue') {
        audiourl += '221.mp3';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '222.mp3';
        answ = 'two';
      } else {
        audiourl += '223.mp3';
      }
    } else  {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'one' || ent11B_2 === 'morgue') {
        audiourl += '224.mp3';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '225.mp3';
        answ = 'two';
      } else {
        audiourl += '226.mp3';
      }
    }
    conv.data.previous = ['11B_2event',answ,'int11B_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11C_1cafe', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11C_1event','cafe','int11C_E'];
    //oikeesti eri
    const audiourl = host + '299.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11C_2cafe', (conv,{response,ent11C_2}) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'C');
    var audiourl = host;
    var answ = 'one';
    if (response === 'three' || ent11C_2 === 'die') {
      answ = 'three';
      if (conv.data.sreveal) {
        audiourl += '231.mp3';
      } else {
        audiourl += '233.mp3';
      }
    } else {
      if (conv.data.sreveal) {
        audiourl += '230.mp3';
      } else {
        audiourl += '232.mp3';
      }
    }
    conv.data.previous = ['11C_2event',answ,'int11C_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11C_3cafe', (conv, {response,ent11C_3}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    //Vaimon luona ei olla käyty
    if (conv.data.visits.indexOf('B') === -1) {
      conv.contexts.set('int11B_E', 1, {});
      if (response === 'one' || ent11C_3 === 'ask') {
        answ = 'one';
        audiourl += '236.mp3';
      } else {
        audiourl += '239.mp3';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //sanomaa ei ole kirjoitettu
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'one' || ent11C_3 === 'ask') {
        answ = 'one';
        audiourl += '234.mp3';
      } else {
        audiourl += '237.mp3';
      }
    } else {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'one' || ent11C_3 === 'ask') {
        answ = 'one';
        audiourl += '235.mp3';
      } else {
        audiourl += '238.mp3';
      }
    }
    conv.data.previous = ['11C_3event',answ,'int11C_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_1cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_1event','ready','int12_E'];
    const audiourl = host + '240.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_2cemetery', (conv, {binarr,response}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var audiourl = '';
    if (binarr === 'yes' || response === 'one') {
      audiourl = host + '241.mp3';
    } else {
      audiourl = host + '242.mp3';
      answ = 'two';
    }
    conv.data.previous = ['12_2event',answ,'int12_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_3cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_3event','ready','int12_2'];
    const audiourl = host + '243.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_4cemetery', (conv) => {
    const audiourl = host + '244.mp3';
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_4event','ready','int12_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_5cemetery', (conv, {response,ent12_5}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'four';
    var ctx = 'int13_E';
    if (response === 'one' || ent12_5 === 'grave') {
      audiourl +=  '245.mp3';
      answ = 'one';
    } else if (response === 'two' || ent12_5 === 'chief') {
      //conv.contexts.set('diversion',1,{state: 'failed'})
      audiourl += '246.mp3';
      ctx = 'int12_5';
      answ = 'two';
    } else if (response === 'three' || ent12_5 === 'seizure') {
      audiourl += '248.mp3';
      answ = 'three';
    } else {
      audiourl += '249.mp3';
    }
    conv.data.previous = ['12_5event',answ,'int12_4'];
    conv.contexts.set(ctx, 1, {});
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_6cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_6event','ready','int12_5'];
    const audiourl = host + '247.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_7cemetery', (conv, {response,ent12_5}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'three';
    if (response === 'one'|| ent12_5 === 'grave') {
      audiourl += '245.mp3';
      answ = 'one';
    } else if (response === 'two'|| ent12_5 === 'seizure') {
      audiourl += '248.mp3';
      answ = 'two';
    } else {
      audiourl += '249.mp3';
    }
    conv.data.previous = ['12_7event',answ,'int12_6'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('13_1toimitus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['13_1event','ready','int13_E'];
    const audiourl = host + '250.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('13_2toimitus', (conv, {response, binarr}) => {
    var audiourl = host;
    var answ = 'no';
    if (response === 'one' || binarr === 'yes') {
      audiourl += '251.mp3';
      if (!conv.data.points.includes('13_2event')) {
        conv.data.vpoints++;
        conv.data.points.push('13_2event')
      }
      conv.data.julkaise = true;
      answ = 'yes';
    } else {
      conv.data.julkaise = false;
      audiourl += '252.mp3';
    }
    conv.data.previous = ['13_2event',answ,'int13_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('14_1aamu', (conv) => {
    if (!conv.data.checkpoint.includes('14_1event')) {
      conv.data.checkpoint.push('14_1event');
      conv.user.storage.sum = conv.data.sum;
      conv.user.storage.fallbackCount = conv.data.fallbackCount;
      conv.user.storage.day = conv.data.day;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.minipeli = conv.data.minipeli;
      conv.user.storage.checkpoint = conv.data.checkpoint;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.experts = conv.data.experts;
      conv.user.storage.testi = conv.data.testi;
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.kyyhky = conv.data.kyyhky;
      conv.user.storage.rethink = conv.data.rethink;
      conv.user.storage.sreveal = conv.data.sreveal;
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.kysurl = conv.data.kysurl;
      conv.user.storage.julkaise = conv.data.julkaise;
      conv.user.storage.nice = conv.data.nice;
    }
    var audiourl = host;
    conv.data.previous = ['14_1event','ready','int13_2'];
    if (!conv.data.checkpoint.includes('14_1event')) {
      conv.data.checkpoint.push('14_1event');
      conv.followup('save_silently', {
        response: 'save silently'
      });
    }
    if (conv.data.julkaise) {
      audiourl += '253.mp3';
      conv.contexts.set('int15_E',1,{})
    } else {
      audiourl += '254.mp3';
      conv.contexts.set('int14_1',1,{})
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('14_2aamu', (conv) => {
    var audiourl = host + '301.mp3';
    conv.data.previous = ['14_2event','ready','int14_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('15_1kirje', (conv) => {
    var audiourl = host + '302.mp3';
    conv.data.previous = ['15_1event','ready','int15_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('15_2kirje', (conv,{binarr}) => {
    var audiourl = host + '303.mp3';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_2event',binarr,'int15_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('15_3kirje', (conv,{binarr}) => {
    var audiourl = host + '304.mp3';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_3event',binarr,'int15_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('15_4kirje', (conv,{binarr}) => {
    var audiourl = host + '305.mp3';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_4event',binarr,'int15_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('15_5kirje', (conv,{binarr}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '306.mp3';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_5event',binarr,'int15_4'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('16_1poliisi', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '307.mp3';
    conv.data.previous = ['16_1event','ready','int16_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('16_2poliisi', (conv, {response,ent16_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    if (response === 'one' || ent16_2 === 'truth') {
      audiourl += '308.mp3';
      answ = 'one';
    } else {
      audiourl += '310.mp3';
    }
    conv.data.previous = ['16_2event',answ,'int16_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_1faktat', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '311.mp3';
    if (conv.data.kyyhky) {
      audiourl = host + '311KY.mp3';
    }
    conv.data.previous = ['17_1event','ready','int16_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_2kelo', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '312.mp3';
    conv.data.previous = ['17_2event','ready','int17_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_3kelo', (conv,{response, ent17_3}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    if (response === 'one' || ent17_3 === 'meeting') {
      answ = 'one';
      conv.contexts.set('int17_3A',1,{});
      audiourl += '313.mp3'
    } else {
      conv.contexts.set('int17_3B',1,{});
      audiourl += '314.mp3'
    }
    conv.data.previous = ['17_3event',answ,'int17_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_4A', (conv) => {
    var audiourl = host;
    conv.data.previous = ['17_4Aevent','ready','int17_3A'];
    if (conv.data.kyyhky) {
      audiourl += '315.mp3'
    } else {
      audiourl += '316.mp3'
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_4B', (conv) => {
    var audiourl = host;
    conv.data.previous = ['17_4Bevent','ready','int17_3B'];
    if (conv.data.kyyhky) {
      audiourl += '317.mp3'
    } else {
      audiourl += '318.mp3'
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_1ennustaja', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '319.mp3';
    conv.data.previous = ['18_1event','ready','int18_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_2ennustaja', (conv,{response, ent18_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    if (response === 'one' || ent18_2 === 'reporters') {
      answ = 'one';
      audiourl += '320.mp3'
    } else {
      audiourl += '321.mp3'
    }
    conv.data.previous = ['18_2event',answ,'int18_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_3ennustaja', (conv) => {
    //MUTTA trainingiin @response
    const audiourl = host + '322.mp3';
    conv.data.previous = ['18_3event','ready','int18_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_4ennustaja', (conv) => {
    const audiourl = host + '323.mp3';
    conv.data.previous = ['18_4event','ready','int18_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('19_1aamu', (conv) => {
    if (!conv.data.checkpoint.includes('19_1event')) {
      conv.data.checkpoint.push('19_1event');
      conv.user.storage.sum = conv.data.sum;
      conv.user.storage.fallbackCount = conv.data.fallbackCount;
      conv.user.storage.day = conv.data.day;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.minipeli = conv.data.minipeli;
      conv.user.storage.checkpoint = conv.data.checkpoint;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.experts = conv.data.experts;
      conv.user.storage.testi = conv.data.testi;
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.kyyhky = conv.data.kyyhky;
      conv.user.storage.rethink = conv.data.rethink;
      conv.user.storage.sreveal = conv.data.sreveal;
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.kysurl = conv.data.kysurl;
      conv.user.storage.julkaise = conv.data.julkaise;
      conv.user.storage.nice = conv.data.nice;
    }
    const audiourl = host + '401.mp3';
    conv.data.previous = ['19_1event','ready','int18_4'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('19_2aamu', (conv) => {
    var audiourl = host + '403.mp3';
    if (conv.data.kyyhky) {
      audiourl = host + '402.mp3';
    }
    conv.data.previous = ['19_2event','ready','int19_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('19_3aamu', (conv,{ent19_3,response}) => {
    var audiourl = host + '405.mp3';
    var answ = 'two';
    conv.data.testeri = response;
    if (response === 'one' || ent19_3 === 'information') {
      audiourl = host + '404.mp3';
      answ = 'one';
    }
    conv.data.previous = ['19_3event',answ,'int19_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_1call', (conv) => {
    const audiourl = host + '406.mp3';
    conv.data.previous = ['20_1event','ready','int19_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_2call', (conv,{ent20_2,response}) => {
    //HOX MITÄS JOS ent20_2 sisältää one,first,two jne..
    conv.data.nice = false;
    var audiourl = host + '408.mp3';
    var answ = 'two';
    if (ent20_2 ==='robbed' || response === 'one') {
      audiourl = host + '407.mp3';
      conv.data.nice = true;
      answ = 'one';
      //TODO
      if (!conv.data.points.includes('20_2event')) {
        conv.data.vpoints++;
        conv.data.points.push('20_2event')
      }
    }
    conv.data.previous = ['20_2event',answ,'int20_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_3call', (conv,{ent20_3,response}) => {
    var audiourl = host + '410.mp3';
    var answ = 'two';
    if (ent20_3 === 'cemetery' || response === 'one') {
      audiourl = host + '409.mp3';
      answ = 'one';
      //TODO
      if (!conv.data.points.includes('20_3event')) {
        conv.data.vpoints++;
        conv.data.points.push('20_3event')
        if (conv.data.nice) {
          conv.data.vpoints++;
        }
      }
    }
    conv.data.previous = ['20_3event',answ,'int20_2'];
    //conv.ask(`You said ${conv.input.raw}`); TÄLLÄÄ SAA INPUTIN, MUTTEI EVENT INVOKEE
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_1prep', (conv) => {
    const audiourl = host + '411.mp3';
    conv.data.previous = ['21_1event','ready','int20_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_2prep', (conv,{ent21_2,response}) => {
    var audiourl = host;
    var answ = 'three';
    if (ent21_2 === 'depends' || response === 'one') {
      audiourl += '412.mp3';
      answ = 'one';
    } else if (ent21_2 === 'course' || response === 'two') {
      audiourl += '413.mp3';
      answ = 'two';
    } else {
      audiourl += '414.mp3';
    }
    conv.data.previous = ['21_2event',answ,'int21_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_3prep', (conv,{ent21_3,response}) => {
    var audiourl = host;
    var answ = 'two';
    if (ent21_3 === 'grave' || response === 'one') {
      answ = 'one';
      audiourl += '415.mp3';
      conv.contexts.set('int22A_E',1,{});
    } else {
      conv.contexts.set('int21_3',1,{});
      audiourl += '416.mp3';
    }
    conv.data.previous = ['21_3event',answ,'int21_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_4prep', (conv,{ent21_4,response}) => {
    var audiourl = host;
    var answ = 'two';
    if (ent21_4 === 'she' || response === 'one') {
      answ = 'one';
      audiourl += '417.mp3';
      conv.contexts.set('int22D_E',1,{});
    } else {
      conv.contexts.set('int22A_E',1,{});
      audiourl += '415.mp3';
    }
    conv.data.previous = ['21_4event',answ,'int21_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22A_1grave', (conv) => {
    const audiourl = host + '418.mp3';
    conv.data.previous = ['22A_1event','ready','int22A_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22A_2grave', (conv,input) => {
    const audiourl = host + '419.mp3';
    conv.data.previous = ['22A_2event','ready','int22A_1'];
    const ssml = Utils.playSimple(audiourl);
    const txt = `${conv.input.raw}. Right, now we know that. Listen ${conv.input.raw}, or nevermind.`;
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22A_3grave', (conv) => {
    const audiourl = host + '420.mp3';
    conv.data.previous = ['22A_3event','ready','int22A_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22B_1action', (conv) => {
    const audiourl = host + '421.mp3';
    conv.data.previous = ['22B_1event','ready','int22A_3'];
    conv.ask(Utils.playSimple(audiourl));
  });
 //Sano rolf rivastolla tähän (eli oikeesti 22C),TÄSTÄ int23_E
  app.intent('22B_2action', (conv) => {
    const audiourl = host + '422.mp3';
    conv.data.previous = ['22B_2event','ready','int22B_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22D_1vanamo', (conv) => {
    const audiourl = host + '423.mp3';
    conv.data.previous = ['22D_1event','ready','int22D_E'];
    conv.ask(Utils.playSimple(audiourl));
  });
  //INVENT A NAME
  app.intent('22D_2vanamo', (conv) => {
    const audiourl = host + '424.mp3';
    conv.data.previous = ['22D_2event','ready','int22D_1'];
    const ssml = Utils.playSimple(audiourl);
    const txt = `${conv.input.raw}. Right, now we know that. Listen ${conv.input.raw}, or nevermind.`;
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22D_3vanamo', (conv) => {
    const audiourl = host + '426.mp3';
    conv.data.previous = ['22D_3event','ready','int22D_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  // app.intent('22D_4vanamo', (conv) => {
  //   const audiourl = host + '426.mp3';
  //   conv.data.previous = ['22D_4event','ready','int22D_3'];
  //   conv.ask(Utils.playSimple(audiourl));
  // });

  app.intent('23_1aftermath', (conv) => {
    if (!conv.data.checkpoint.includes('23_1event')) {
      conv.data.checkpoint.push('23_1event');
      conv.user.storage.sum = conv.data.sum;
      conv.user.storage.fallbackCount = conv.data.fallbackCount;
      conv.user.storage.day = conv.data.day;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.minipeli = conv.data.minipeli;
      conv.user.storage.checkpoint = conv.data.checkpoint;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.experts = conv.data.experts;
      conv.user.storage.testi = conv.data.testi;
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.kyyhky = conv.data.kyyhky;
      conv.user.storage.rethink = conv.data.rethink;
      conv.user.storage.sreveal = conv.data.sreveal;
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.kysurl = conv.data.kysurl;
      conv.user.storage.julkaise = conv.data.julkaise;
      conv.user.storage.nice = conv.data.nice;
    }
    const audiourl = host + '427.mp3';
    conv.data.previous = ['23_1event','ready','int23_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('23_2aftermath', (conv, {ent23_2}) => {
    var audiourl = host + '429.mp3';
    if (ent23_2 === 'first') {
      audiourl = host + '428.mp3';
    }
    conv.data.previous = ['23_2event',ent23_2,'int23_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('24_1car', (conv) => {
    var audiourl = host + '430.mp3';
    conv.data.previous = ['24_1event','ready','int23_2'];
    conv.ask(Utils.playSimple(audiourl));
  });
  //TÄSSÄ EHKÄ LOPUT KYSYMYKSET NEGATIIVISIKSI TRAINING FRAASEIKSI?
  app.intent('24_2car', (conv,{ent24,response}) => {
    var audiourl = host;
    var audiourl2 = host + 'PA';
    var answ = 'three';
    if (response === 'one' || ent24 === 'do') {
      answ = 'one';
      conv.data.pakys = 'A';
      audiourl2 += '234';
      audiourl += '431';
    } else if (response === 'two' || ent24 === 'part') {
      answ = 'two';
      conv.data.pakys = 'B';
      audiourl2 += '134';
      audiourl += '432';
    } else {
      conv.data.pakys = 'C';
      audiourl2 += '124';
      audiourl += '433';
    }
    if (!conv.data.kyyhky) {
      conv.data.pakys += 'E';
    }
    audiourl += '.mp3';
    audiourl2 += '.mp3';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_2event',answ,'int24_1'];
    const txt = `The question was ${answ}.`;
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_3car', (conv,{ent24,response}) => {
    var audiourl = host;
    //extract the possible answers and the upcoming url
    var pos = conv.data.pakys;
    const pushed = Utils.pusher(pos);
    var choices = pushed[1];
    var audiourl2 = 'PA' + pushed[0];
    var answ = Utils.selector(choices,response);
    //TODO response undefined??
    if (answ === 'notresponse') {
      answ = ent24;
    }
    if (answ === 'do') {
      conv.data.pakys += 'A';
      audiourl2 = audiourl2.replace('1','');
      audiourl += '431.mp3';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl2 = audiourl2.replace('2','');
      audiourl += '432.mp3';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl2 = audiourl2.replace('3','');
      audiourl += '433.mp3';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl2 = audiourl2.replace('4','');
      audiourl += '434.mp3';
    } else {
      //TOISTAISEKSI VAIN REPEAT, JOKU PAREMPI?
      return conv.followup('repeat', {
        response: "repeat"
      });
    }
    if (conv.data.kyyhky) {
      conv.contexts.set('int24_3',1,{});
    } else {
      conv.contexts.set('int24_4',1,{});
    }
    audiourl2 =  host + audiourl2 + '.mp3';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_3event',answ,'int24_2'];
    const txt = `The question was ${answ}.`;
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_4car', (conv,{ent24,response}) => {
    var audiourl = host;
    //extract the possible answers and the upcoming url
    const pushed = Utils.pusher(conv.data.pakys);
    var choices = pushed[1];
    var audiourl2 = 'PA' + pushed[0];
    var answ = Utils.selector(choices,response);
    //TODO response undefined??
    if (answ === 'notresponse') {
      answ = ent24;
    }
    if (answ === 'do') {
      conv.data.pakys += 'A';
      audiourl2 = audiourl2.replace('1','');
      audiourl += '431.mp3';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl2 = audiourl2.replace('2','');
      audiourl += '432.mp3';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl2 = audiourl2.replace('3','');
      audiourl += '433.mp3';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl2 = audiourl2.replace('4','');
      audiourl += '434.mp3';
    } else if (answ === 'pond' && conv.data.kyyhky) {
      conv.data.pakys += 'E';
      audiourl2 = audiourl2.replace('5','');
      audiourl += '435.mp3';
    } else {
      //TOISTAISEKSI VAIN REPEAT, JOKU PAREMPI?
      return conv.followup('repeat', {
        response: "repeat"
      });
    }
    audiourl2 = host + audiourl2 + '.mp3';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_4event',answ,'int24_3'];
    const txt = `The question was ${answ}.`;
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_5car', (conv,{ent24,response}) => {
    var audiourl = host;
    //extract the possible answers and the upcoming url
    const pushed = Utils.pusher(conv.data.pakys);
    var choices = pushed[1];
    var answ = Utils.selector(choices,response);
    //TODO response undefined??
    if (answ === 'notresponse') {
      answ = ent24;
    }
    if (answ === 'do') {
      conv.data.pakys += 'A';
      audiourl += '436.mp3';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl += '437.mp3';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl += '438.mp3';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl += '439.mp3';
    } else if (answ === 'pond' && conv.data.kyyhky) {
      conv.data.pakys += 'E';
      audiourl += '440.mp3';
    } else {
      //TOISTAISEKSI VAIN REPEAT, JOKU PAREMPI?
      return conv.followup('repeat', {
        response: "repeat"
      });
    }
    conv.data.previous = ['24_5event',answ,'int24_4'];
    const txt = `The question was ${answ}.`;
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25_1choice', (conv) => {
    const audiourl = host + '441.mp3';
    conv.data.previous = ['25_1event','ready','int24_5'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_2choice', (conv,{ent25_2,response}) => {
    var audiourl = host + '443.mp3';
    var answ = 'two';
    if (ent25_2 === 'dunno' || response === 'one') {
      answ = 'one';
      audiourl = host + '442.mp3';
    }
    conv.data.previous = ['25_2event',answ,'int25_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_3choice', (conv,{ent25_3,response}) => {
    var audiourl = host + '445.mp3';
    var answ = 'two';
    if (ent25_3 === 'why' || response === 'one') {
      answ = 'one';
      audiourl = host + '444.mp3';
    }
    conv.data.previous = ['25_3event',answ,'int25_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_4choice', (conv) => {
    var audiourl = host + '446';
    if (conv.data.rethink) {
      audiourl += 'B';
    }
    audiourl += '.mp3';
    conv.data.previous = ['25_4event','ready','int25_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_5choice', (conv,{binarr}) => {
    var audiourl = host + '447.mp3';
    if (binarr === 'yes') {
      if (conv.data.rethink.indexOf('A') !== -1) {
        audiourl = host + '449.mp3';
      } else {
        conv.data.rethink += 'A';
      }
      conv.contexts.set('int25A',1,{});
    } else {
      audiourl = host + '448.mp3';
      if (conv.data.rethink.indexOf('B') !== -1) {
        audiourl = host + '449.mp3';
      } else {
        conv.data.rethink += 'B';
      }
      conv.contexts.set('int25B',1,{});
    }
    conv.data.previous = ['25_5event',binarr,'int25_4'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25A_end', (conv,{binarr}) => {
    var audiourl = host;
    if (binarr === 'yes') {
      if (!conv.data.points.includes('25Aevent')) {
        conv.data.bpoints += 2;
        conv.data.points.push('25Aevent')
      }
      conv.contexts.set('int26A',1,{});
      if (conv.data.vpoints > 3) {
        audiourl += '450.mp3';
      } else {
        audiourl += '451.mp3';
      }
    } else {
      conv.contexts.set('int25_3',1,{});
      return conv.followup('25_4event', {
        response: 'ready'
      });
    }
    conv.data.previous = ['25Aevent',binarr,'int25A'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25B_end', (conv,{binarr}) => {
    var audiourl = host;
    if (binarr === 'yes') {
      conv.contexts.set('int26B',1,{});
      if (conv.data.vpoints > 3) {
        audiourl += '450.mp3';
      } else {
        audiourl += '451.mp3';
      }
    } else {
      conv.contexts.set('int25_3',1,{});
      return conv.followup('25_4event', {
        response: 'ready'
      });
    }
    conv.data.previous = ['25Bevent',binarr,'int25B'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('26AEpilogue', (conv) => {
    var audiourl = host;
    conv.data.previous = ['26Aevent','ready','int26A'];
    if (conv.data.vpoints > 3) {
      if (conv.data.bpoints > 3) {
        audiourl += 'END1.mp3';
      } else {
        audiourl += 'END3.mp3';
      }
    } else {
      if (conv.data.bpoints > 2) {
        audiourl += 'END2.mp3';
      } else {
        audiourl += 'END4.mp3';
      }
    }
    conv.ask(Utils.playSimple(audiourl));
    conv.close(Utils.playSimple(host+'CREDITS.mp3'));
  });

  app.intent('26BEpilogue', (conv) => {
    var audiourl = host;
    conv.data.previous = ['26Bevent','ready','int26B'];
    if (conv.data.vpoints > 3) {
      if (conv.data.bpoints > 3) {
        audiourl += 'END5.mp3';
      } else {
        audiourl += 'END7.mp3';
      }
    } else {
      if (conv.data.bpoints > 3) {
        audiourl += 'END6.mp3';
      } else {
        audiourl += 'END8.mp3';
      }
    }
    conv.ask(Utils.playSimple(audiourl));
    conv.close(Utils.playSimple(host+'CREDITS.mp3'));
  });
//FALLBACKS and NoInputs

app.intent('Default Welcome Intent - fallback', (conv) => {
  const audiourl = host + '101.mp3';
  conv.data.fallbackCount++;
  if (conv.data.fallbackCount < fbc) {
    return conv.ask(Utils.playAudio(audiourl,23,60));
  } else {
    return conv.followup('2_3event', {
      response: "two"
    });
  }
});

app.intent('1_1Start NoInput', (conv) => {
  var audiourl = host + '199K.mp3';
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
    return conv.ask(Utils.playSimple(audiourl));
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')){
    conv.close('The talking dead is now closing. Try this another time.');
  } else {
    audiourl = host + '198K.mp3';
    return conv.ask(Utils.playSimple(audiourl));
  }
});
  app.intent('2_1kuski - fallback', (conv) => {
    var audiourl = '';
    conv.data.fallbackCount++;
    const ctx = conv.contexts.get('kysykuski');
    const param = ctx.parameters['kys'];
    switch (param) {
      case 'A':
        audiourl = host + '111K1.mp3';
        break;
      case 'B':
        audiourl = host + '111K2.mp3';
        break;
      case 'C':
        audiourl = host + '111K3.mp3';
        break;
      case 'D':
        audiourl = host + '111K4.mp3';
        break;
    }
    if (conv.data.fallbackCount < 2) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('2_2event', {
        response: "one"
      });
    }
  });

  app.intent('2_2kuski2 - fallback', (conv) => {
    const audiourl = host + '117K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('2_3event', {
        response: "two"
      });
    }
  });

  app.intent('2_3handuja - fallback', (conv) => {
    const audiourl = host + '121K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('2_4event', {
        response: "one"
      });
    }
  });

  app.intent('2_4kelo - fallback', (conv) => {
    const audiourl = host + '123K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('2_5event', {
        response: "two"
      });
    }
  });

  app.intent('2_5choice - fallback', (conv) => {
    var audiourl = '';
    var nextevent = '';
    conv.data.fallbackCount++;
    if (conv.contexts.get('stay3A').parameters['c']) {
      conv.contexts.set('stay3A', 1, {c: true});
      audiourl = host + '124K.mp3';
      nextevent = '3A_1event';
    } else {
      conv.contexts.set('leave3B', 1, {});
      audiourl = host + '134K.mp3';
      nextevent = '3B_1event';
    }
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup(nextevent, {
        response: "one"
      });
    }
  });

  app.intent('3A_2r - fallback', (conv) => {
    const audiourl = host + '126K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc && repromptCount === 0) {
      return conv.ask(Utils.playSimple(audiourl));
    } else if (repromptCount > 0) {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    } else {
      return conv.followup('3A_3event', {
        binarr: 'no'
      });
    }
  });

  app.intent('3A_2w - fallback', (conv) => {
    const audiourl = host + valmis;
      return conv.followup('3A_4event', {
        response: 'ready'
      });
  });

  app.intent('3A_2w NoInput', (conv) => {
    const audiourl = host + valmis;
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount > 0) {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    } else {
      return conv.ask(Utils.playSimple(audiourl));
    }
  });

  app.intent('3D_1minipeli - fallback', (conv) => {
    const audiourl = host + '130K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('3D_2event', {
        response: 0
      });
    }
  });

  app.intent('3D_2minipeli - fallback', (conv) => {
    const audiourl = host + '131K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('3D_3event', {
        response: 0
      });
    }
  });

  app.intent('3D_3minipeli - fallback', (conv) => {
    const audiourl = host + '132K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('3D_4event', {
        response: 0
      });
    }
  });

  app.intent('3D_4minipeli - fallback', (conv) => {
    const audiourl = host + '133K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('3D_5event', {
        response: 'one'
      });
    }
  });

  app.intent('3D_5minipeli - fallback', (conv) => {
    return conv.followup('4_1event', {
      response: 'ready'
    });
  });

  app.intent('4_1ilta - fallback', (conv) => {
    const audiourl = host + '140K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('5A_1event', {
        response: 'magnus'
      });
    }
  });

  app.intent('4_1ilta NoInput', (conv) => {
    const audiourl = host + '140K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  //TÄSSÄ NAPATAAN conv, {response?/vai sys.any param?}
  app.intent('5A_2magnus - fallback', (conv,input) => {
      conv.data.testi = input;
      return conv.followup('5A_3event', {
        response: 'one'
      });
  });

  app.intent('5A_3magnus - fallback', (conv) => {
    var audiourl = host + '143K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      return conv.followup('9_1event', {
        response: 'anatomy'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143K.mp3';
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (conv.data.fallbackCount < fbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('5B_1event', {
          response: 'professor'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      return conv.followup('6_1event', {
        response: 'ready'
      });
    }
  });

  app.intent('5A_3magnus NoInput', (conv) => {
    var audiourl = host + valmis;
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143K.mp3';
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });
  //TODOO SIISTI JA YHDISTÄ NOINPUTIT
  app.intent('5B_3fabritius - fallback', (conv) => {
    var audiourl = '';
    conv.data.fallbackCount++;
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      return conv.followup('9_1event', {
        response: 'anatomy'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '148K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      if (conv.data.fallbackCount < fbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('5A_1event', {
          response: 'magnus'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      return conv.followup('6_1event', {
        response: 'ready'
      });
    }
  });

  app.intent('5B_3fabritius NoInput', (conv) => {
    var audiourl = host + valmis;
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '148K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('5C_2police - fallback', (conv) => {
    var audiourl = host + valmis;
    conv.data.fallbackCount++;
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      if (conv.data.fallbackCount < fbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('9_1event', {
          response: 'anatomy'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (conv.data.fallbackCount < fbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('5A_1event', {
          response: 'magnus'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (conv.data.fallbackCount < rfbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('6_1event', {
          response: 'ready'
        });
      }
    }
  });

  app.intent('5C_2police NoInput', (conv) => {
    var audiourl = host + '153K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      return conv.followup('repeat', {
        response: 'repeat'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      audiourl = host + valmis;
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        conv.contexts.set('int6E', 1, {});
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('7_1aamu - fallback', (conv) => {
    var audiourl = host + '201K';
    var eve = '';
    var resp = '';
    conv.data.fallbackCount++;
    if (conv.data.experts.indexOf('A') === -1) {
      audiourl += 'H.mp3';
      conv.contexts.set('magnus', 1, {});
      eve = '5A_1event';
      resp = 'professor';
    } else if (conv.data.experts.indexOf('B') === -1) {
      audiourl += 'F.mp3';
      conv.contexts.set('fabritius', 1, {});
      eve = '5B_1event';
      resp = 'fabritius';
    } else  {
      audiourl += 'P.mp3';
      conv.contexts.set('hkipolice', 1, {});
      eve = '5C_1event';
      resp = 'police';
    }
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup(eve, {
        response: resp
      });
    }
  });

  app.intent('7_1aamu NoInput', (conv) => {
    var audiourl = host + '201K';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.experts.indexOf('A') === -1) {
      audiourl += 'H.mp3';
      conv.contexts.set('magnus', 1, {});
    } else if (conv.data.experts.indexOf('B') === -1) {
      audiourl += 'F.mp3';
      conv.contexts.set('fabritius', 1, {});
    } else  {
      audiourl += 'P.mp3';
      conv.contexts.set('hkipolice', 1, {});
    }
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('10_1kuulustelu - fallback', (conv) => {
    const audiourl = host + '208K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < 2) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('10_2event', {
        response: 'three'
      });
    }
  });

  app.intent('10_1kuulustelu NoInput', (conv) => {
      return conv.followup('10_2event', {
        response: 'three'
      });
  });

  app.intent('10_2kuulustelu - fallback', (conv) => {
    var audiourl = host + '209K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.kyyhky) {
      audiourl = host + '209KYK.mp3';
    }
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('10_4event', {
        response: 'two'
      });
    }
  });

  app.intent('10_2kuulustelu NoInput', (conv) => {
    var audiourl = host + '209K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.kyyhky) {
      audiourl = host + '209KYK.mp3';
    }
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('10_4event', {
        response: 'two'
      });
    }
  });

  app.intent('10_3kuulustelu - fallback', (conv) => {
    var audiourl = host + '211K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_1event', {
        response: 'article'
      });
    }
  });

  app.intent('10_3kuulustelu NoInput', (conv) => {
    var audiourl = host + '211K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('11A_1sanoma - fallback', (conv) => {
    const audiourl = host + '214K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_2event', {
        response: 'yes'
      });
    }
  });

  app.intent('11A_2sanoma - fallback', (conv) => {
    const audiourl = host + '215K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_3event', {
        response: 'no'
      });
    }
  });

  app.intent('11A_3sanoma - fallback', (conv) => {
    const audiourl = host + '219K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.visits.length > 1) {
      conv.contexts.set('int12_E', 1, {});
      return conv.followup('12_1event', {
        response: 'ready'
      });
    }
    conv.contexts.set('int11C_E', 1, {});
    conv.contexts.set('int11B_E', 1, {});
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('11B_1event', {
        response: 'wife'
      });
    }
  });

  app.intent('11A_3sanoma NoInput', (conv) => {
    var audiourl = host + '219K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.visits.length > 1) {
      audiourl = host + valmis;
      conv.contexts.set('int12_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
    conv.contexts.set('int11C_E', 1, {});
    conv.contexts.set('int11B_E', 1, {});
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('11B_1wife - fallback', (conv) => {
    const audiourl = host + '220K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('11B_2event', {
        response: 'one'
      });
    }
  });

  app.intent('11B_2wife - fallback', (conv) => {
    if (conv.data.visits.indexOf('C') === -1) {
      const audiourl = host + valmis;
      conv.contexts.set('int11C_E', 1, {});
      conv.data.fallbackCount++;
      if (conv.data.fallbackCount < fbc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('11C_2event', {
          response: 'one'
        });
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      return conv.followup('11A_1event', {
        response: 'article'
      });
    } else {
      conv.contexts.set('int12_E', 1, {});
      return conv.followup('12_1event', {
        response: 'ready'
      });
    }
  });

  app.intent('11B_2wife NoInput', (conv) => {
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    var audiourl = host + valmis;
    if (conv.data.visits.indexOf('C') === -1) {
      audiourl = host + '227K.mp3';
      conv.contexts.set('int11C_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('11C_1cafe - fallback', (conv) => {
    const audiourl = host + '227K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('11C_2event', {
        response: 'one'
      });
    }
  });

  app.intent('11C_2cafe - fallback', (conv) => {
    const audiourl = host + '230K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('11C_3event', {
        response: 'one'
      });
    }
  });

  app.intent('11C_3cafe - fallback', (conv) => {
    if (conv.data.visits.indexOf('B') === -1) {
      conv.contexts.set('int11B_E', 1, {});
        return conv.followup('11B_1event', {
          response: 'wife'
        });
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      return conv.followup('11A_1event', {
        response: 'article'
      });
    } else {
      conv.contexts.set('int12_E', 1, {});
      return conv.followup('12_1event', {
        response: 'ready'
      });
    }
  });

  app.intent('11C_3cafe NoInput', (conv) => {
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    var audiourl = host + valmis;
    if (conv.data.visits.indexOf('B') === -1) {
      conv.contexts.set('int11B_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int12_E', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('12_4cemetery - fallback', (conv) => {
    const audiourl = host + '244K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('12_5event', {
        response: 'two'
      });
    }
  });

  app.intent('12_5cemetery - fallback', (conv) => {
    //TODO TOIMIIKO TÄMÄ
      if (conv.contexts.get('int13_E') !== undefined) {
        return conv.followup('13_1event', {
          response: 'ready'
        });
      } else {
        return conv.followup('12_6event', {
          response: 'ready'
        });
      }
  });

  app.intent('14_1aamu - fallback', (conv) => {
    var audiourl = host + valmis;
    conv.data.fallbackCount++;
    var ctx = 'int14_1';
    var eve = '14_2event';
    if (conv.data.julkaise) {
      ctx = 'int15_E';
      eve = '15_1event';
    }
      conv.contexts.set(ctx,1,{});
      conv.data.fallbackCount = 0;
      return conv.followup(eve, {
        response: 'ready'
      });
  });

  app.intent('14_1aamu NoInput', (conv) => {
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    var audiourl = host + valmis;
    var ctx = 'int14_1';
    if (conv.data.julkaise) {
      ctx = 'int15_E';
    }
    conv.contexts.set(ctx,1,{});
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('17_3A - fallback', (conv) => {
    //MUISTA SISÄKONTEKSTIIN ALLAOLEVA
    conv.contexts.set('int17_3A',1,{});
    conv.data.fallbackCount = 0;
    return conv.followup('17_4Aevent', {
      response: 'ready'
    });
  });

  app.intent('17_3B - fallback', (conv) => {
    //MUISTA SISÄKONTEKSTIIN ALLAOLEVA
    conv.contexts.set('int17_3B',1,{});
    conv.data.fallbackCount = 0;
    return conv.followup('17_4Bevent', {
      response: 'ready'
    });
  });

  app.intent('17_3 NoInput', (conv) => {
    const ctx = previous[1];
    var audiourl = host + '314K.mp3';
    if (ctx === 'one') {
      conv.contexts.set('int17_3A',1,{});
      audiourl = host + '313K.mp3';
    } else {
      conv.contexts.set('int17_3B',1,{});
    }
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  //Tämä samalla noInput
  app.intent('18_2ennustaja NoInput', (conv) => {
    return conv.followup('18_3event', {
      response: 'ready'
    });
  });

  app.intent('21_3prep - fallback', (conv) => {
    var eve = '21_4event';
    var resp = 'ready';
    var audio = host + valmis;
    if (conv.data.previous[1] === 'one') {
      conv.contexts.set('int22A_E',1,{});
      eve = '22A_1event';
    } else {
      conv.contexts.set('int21_3',1,{});
      resp = 'one';
      audio = host +'416.mp3';
    }
    return conv.followup(eve, {
      response: resp
    });
  });

  app.intent('21_4prep - fallback', (conv) => {
    var eve = '22D_1event';
    if (conv.data.previous[1] === 'one') {
      conv.contexts.set('int22A_E',1,{});
      eve = '22A_1event';
    } else {
      conv.contexts.set('int22D_E',1,{});
    }
    return conv.followup(eve, {
      response: 'ready'
    });
  });

  app.intent('24car - fallback', (conv) => {
    const audiourl = conv.data.kysurl;
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      const eve = conv.data.previous[0];
      var indx = eve.indexOf('e');
      var nmbr = (eve[indx-1].toInt+1).toString;
      next_eve = eve; //replace indx-1 character with nmbr
      conv.data.fallbackCount = 0;
      return conv.followup('24_3event', {
        response: 'one'
      });
    }
  });

  app.intent('24_2car - fallback', (conv) => {
    const audiourl = conv.data.kysurl;
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('24_3event', {
        response: 'one'
      });
    }
  });

  app.intent('24_3car - fallback', (conv) => {
    const audiourl = conv.data.kysurl;
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('24_3event', {
        response: 'one'
      });
    }
  });

//  OLD!! exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
//   const agent = new WebhookClient({ request, response });
//
//   function defInt (agent) {
//       agent.add(`This works! But does it work for you?`);
//   }
//   let intentMap = new Map();
//   intentMap.set('1_1Start', defInt);  // maps the intent to the function '
//   agent.handleRequest(intentMap);
// });


//SHORTCUTS
app.intent('shortcut1', (conv) => {
  //conv.contexts.set('kysykuski', 15, {kys: 'D'});
  conv.contexts.set('shortcut', 1, {});
  conv.ask('To which day do you want to cut short?');
});

app.intent('shortcut2', (conv, {response}) => {
  conv.data.shortcutday = response;
  conv.contexts.set('shortcut2', 1, {});
  conv.ask('And which shortcut for day ' + response + ' you want to take?');
});
app.intent('shortcut3', (conv, {response}) => {
  const answ = response;
  const cutter = Utils.shortcutter(conv.data.shortcutday,response);
  var eve = cutter[0];
  var resp = cutter[1];
  var ctx = cutter[2];
  if (eve === 'notgood') {
    return conv.ask('That shortcut does not exist for day ' + conv.data.shortcutday + ' try something else');
  }
  conv.contexts.set(ctx, 1, {});
  return conv.followup(eve, {
    response: resp
  });
});
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
