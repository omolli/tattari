'use strict';
const {dialogflow, SimpleResponse, BasicCard, Button, Image} = require('actions-on-google');
const functions = require('firebase-functions');
const {google} = require('googleapis');
const Utils = require('./src/utils')
const Reprompts = require('./src/reprompts')
const Texts = require('./src/texts')
const app = dialogflow({debug: true});
const host = 'https://tattar-oudbew.web.app/';
const {WebhookClient} = require('dialogflow-fulfillment');
const fbc = 3;
const repc = 1;
const valmis = '100K.ogg';

//INTENTS
app.intent('Default Welcome Intent', (conv, {response}) => {
    //Muuttujia
    conv.data.fallbackCount = 0;
    conv.data.day = 1;
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
    conv.data.kuskikys = '';
    conv.data.kyyhky = false;
    conv.data.sreveal = false;
    conv.data.julkaise = false;
    conv.data.nice = false;
    conv.data.renewed = false;
    conv.data.previous = ['Welcome','start again','welcome'];
    conv.data.peliansw = [0,0,0];
    conv.data.kysurl = '';
    var audiourl = host + '101.ogg';
    var txt = Texts.bubble(conv.data.previous[0]);
    if (conv.surface.capabilities.has('actions.capability.WEB_BROWSER')) {
      audiourl = host + '101P.ogg';
    }
    if (conv.user.verification === 'VERIFIED' && conv.user.last.seen && conv.user.storage.day > 0 && conv.user.storage.day < 5) {
        txt = Texts.bubble('WelcomeB');
        conv.contexts.set('loadgame',5,{});
        audiourl = host + '101B.ogg';
      }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: ' '}));
    if (conv.screen) {
      conv.ask(new BasicCard({
      text: txt,
      title: 'The Dead Are Speaking',
      image: new Image({
        url: 'https://tattar-oudbew.web.app/LOGO.png',
        alt: 'Dead are Speaking',
      }),
      display: 'CROPPED',
    }));
  }
});

app.intent('NewGame', (conv) => {
  var audiourl = host + '101.ogg';
  conv.data.previous = ['newgame','new game','DefaultWelcomeIntent-followup'];
  const txt = Texts.bubble('Welcome');
  if (conv.surface.capabilities.has('actions.capability.WEB_BROWSER')) {
    audiourl = host + '101P.ogg';
  }
  const ssml = Utils.playSimple(audiourl);
  conv.ask(new SimpleResponse({speech: ssml, text: ' '}));
  if (conv.screen) {
    conv.ask(new BasicCard({
    text: txt,
    title: 'The Dead Are Speaking',
    image: new Image({
      url: 'https://tattar-oudbew.web.app/LOGO.png',
      alt: 'Nice',
    }),
    display: 'CROPPED',
  }));
}
});

app.intent('Load', (conv) => {
    conv.data.testi = 'ladattu aluilleen';
    conv.data.previous = ['1_1event','ready','DefaultWelcomeIntent-followup'];
    if (conv.user.verification === 'VERIFIED') {
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
      conv.data.kuskikys = conv.user.storage.kuskikys;
      conv.data.pakys = conv.user.storage.pakys;
      conv.data.testi = 'ladattu loppuun';
      conv.followup('repeat', {
        response: 'repeat'
      });
  } else {
    conv.ask('Loading is possible only for verified users.');
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
  var audiourl = host + 'QUITNOTSAVED.ogg';
  var text = 'Goodbye for now!';
  if (conv.user.verification === 'VERIFIED') {
    audiourl = host + 'QUITSAVED.ogg';
    text = 'Your progress has been saved. ' + text;
  }
  conv.close(new SimpleResponse({speech: Utils.playSimple(audiourl), text: text}));
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
  conv.user.storage.testi = 'repeat';
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

app.intent('repeat2', (conv) =>{
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

app.intent('Pause', (conv) => {
  const audiourl = host + 'PAUSE.ogg';
  const ssml = Utils.playSimple(audiourl);
  if (!conv.surface.capabilities.has('actions.capability.WEB_BROWSER')) {
    conv.ask('The game is now paused. Say “Hey google, continue”, when you wish to resume.');
    conv.ask(new SimpleResponse({speech: ssml, text: ' '}));
  } else {
    conv.ask(new SimpleResponse({speech: ssml, text: 'The game is now paused. Say “Hey google, continue”, when you wish to resume.'}));
  }
});

app.intent('PauseRelease', (conv) => {
   conv.followup('repeat', {
     response: 'repeat'
   });
});

//Default NoInput intent
app.intent('NoInput', (conv) => {
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  const cevent = conv.data.previous[0];
  const prompt = Reprompts.getURL(cevent);
  const audiourl = host + prompt[0] + '.ogg';
  conv.contexts.set(prompt[1],1,{})
  if (repromptCount === 0 && prompt[0] !== 'repeater') {
    const txt = Texts.bubble(cevent);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
  const audiourl = host + prompt[0] + '.ogg';
  const ctx = prompt[1];
  var eve = prompt[2];
  var cparam = prompt[3];
  conv.contexts.set(ctx,1,{})
  if(cevent === '22B_1event') {
    conv.followup('22B_2action', {
      response: cparam
    });
  }
  if (prompt[0] === 'repeater') {
    eve = 'repeat';
    cparam = 'repeat';
    conv.data.fallbackCount = fbc;
  }
  if (conv.data.fallbackCount < fbc) {
  // if ((cevent === '1_2event' || cevent === '1_3event' || cevent === '1_5event' ||cevent === '1_6event' || cevent === '1_7event') && conv.data.fallbackCount > 1) {
    if (conv.data.fallbackCount > 1 && !(cevent === '3D_1event' || cevent === '3D_2event' || cevent === '3D_3event')) {
    conv.ask(new SimpleResponse({speech: Utils.playSimple(host+'99K.ogg'), text: 'When making a choice, you can also use numbers.'}));
  }
  const txt = Texts.bubblef(conv.data.previous[0]);
  const ssml = Utils.playSimple(audiourl);
  conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  } else if (eve === '3D_2event' || eve === '3D_3event' || eve === '3D_4event') {
    conv.data.fallbackCount = 0;
    conv.followup(eve, {
      number: cparam
    });
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
  conv.data.testi = 'anyfall';
  conv.data.fallbackCount = 0;
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
    conv.data.previous = ['1_1event','ready','DefaultWelcomeIntent-followup'];
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
    }
    const audiourl = host + '102.ogg';
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));

});

app.intent('1_2boss', (conv) => {
    conv.user.storage.day = 1;
    conv.data.fallbackCount = 0;
    conv.data.previous = ['1_2event','ready','int1_1'];
    const audiourl = host + '197.ogg';
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));

});

app.intent('1_3bossresponse', (conv, {response,ent1_3}) => {
  conv.data.fallbackCount = 0;
    var answ = '';
    var audiourl = host;
    if (response === 'one' || ent1_3 === 'better') {
        answ = 'one';
        audiourl += '104.ogg';
    } else if (response === 'two' || ent1_3 === 'work') {
        audiourl += '105.ogg';
        answ = 'two';
    } else if (response === 'three' || ent1_3 === 'sorry') {
      if (!conv.data.points.includes('1_3event')) {
        conv.data.bpoints++;
        conv.data.points.push('1_3event')
      }
        audiourl += '106.ogg';
        answ = 'three';
    } else {
      conv.data.testi = 'fallevent1_3';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['1_3event',answ,'int1_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.testi = 'This is a test';
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
});

  app.intent('1_4entervanamo', (conv, {response,ent1_4}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    var audiourl = host;
    if (response === 'one' || ent1_4 === 'pleased') {
        audiourl += '107.ogg';
        answ = 'one';
        if (!conv.data.points.includes('1_4event')) {
          conv.data.vpoints++;
          conv.data.points.push('1_4event')
        }
    } else if (response === 'two' || ent1_4 === 'father') {
        audiourl += '108.ogg';
    } else {
      conv.data.testi = 'fallevent1_4';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['1_4event',answ,'int1_3'];
    const txt = Texts.bubble(conv.data.previous[0]);
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.testi = 'vanamo my friend';
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.vpoints = conv.data.vpoints;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('1_5phone', (conv) => {
    conv.data.previous = ['1_5event','ready','int1_4'];
    const audiourl = host+ '109.ogg';
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

    app.intent('1_6koski', (conv, {response, ent1_6}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '110.ogg';
    var answ = 'one';
    if (response === 'one' || ent1_6 === 'fill') {
      conv.data.nice = true;
      if (!conv.data.points.includes('1_6event')) {
        conv.data.vpoints++;
        conv.data.points.push('1_6event')
      }
    } else if (response === 'two' || ent1_6 === 'know') {
      answ = 'two';
      audiourl = host + '110B.ogg';
    } else {
      conv.data.testi = 'fallevent1_6';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['1_6event',answ,'int1_5'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.nice = conv.data.nice;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('1_7matka', (conv, {response,ent1_7}) => {
    conv.data.fallbackCount = 0;
    var answ = 'three';
    var audiourl = host + '111T.ogg';
    var txt = 'Approaching Tattarisuo. “Just give me a chance!”';
    var urlc = '';
    if (conv.data.nice) {
      urlc = host + '111';
      txt = 'Approaching. “A hand you say?”'
    } else {
      urlc = host + '112';
    }
    if (response === 'one' || ent1_7 === 'cab') {
      audiourl = urlc + 'T.ogg';
      answ = 'one';
    } else if (response === 'two' || ent1_7 === 'bus') {
      audiourl = urlc + 'A.ogg';
      answ = 'two';
    } else if (response === 'three' || ent1_7 === 'carriage') {
      audiourl = urlc + 'V.ogg';
    } else {
      conv.data.testi = 'fallevent1_7';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['1_7event',answ,'int1_6'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('2_1kuski', (conv, {response, ent2_1}) => {
    conv.data.fallbackCount = 0;
    var txt = '';
    var audiourl = '';
    var answ = 'four';
    if (response === 'one' || ent2_1 === 'why') {
      audiourl = host + '113.ogg';
      conv.data.kuskikys = 'A';
      txt = 'Tattarisuo swamp. “I was driving along the Porvoo road.”';
      answ = 'one';
    } else if (response === 'two' || ent2_1 === 'see') {
      txt = 'Tattarisuo swamp. “A few dead pigeons.”';
      audiourl = host + '114.ogg';
      conv.data.kuskikys = 'B';
      answ = 'two';
    } else if (response === 'three' || ent2_1 === 'when') {
      txt = 'Tattarisuo swamp. “A bit before noon.”';
      audiourl = host + '115.ogg';
      conv.data.kuskikys = 'C';
      answ = 'three';
    } else if (response === 'four' || ent2_1 === 'have') {
      txt = 'Tattarisuo swamp. “What do ya take me for?”';
      audiourl = host + '116.ogg';
      conv.data.kuskikys = 'D';
    } else {
      conv.data.testi = 'fallevent2_1';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['2_1event',answ,'int1_7'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.kuskikys = conv.data.kuskikys;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('2_2kuski2', (conv, {response,ent2_1}) => {
    conv.data.fallbackCount = 0;
    var audiourl = '';
    var txt = '';
    var answ = response;
    var answ2 = Utils.switcher(answ,conv.data.kuskikys);
    if (answ2 === 'kysy') {
      answ2 = ent2_1;
    }
    if (answ2 === 'why') {
      txt = 'Tattarisuo swamp. “I was driving along the Porvoo road.”';
      audiourl = host + '117.ogg';
    } else if (answ2 === 'see') {
      txt = 'Tattarisuo swamp. “A few dead pigeons.”';
      audiourl = host + '118.ogg';
    } else if (answ2 === 'when') {
      txt = 'Tattarisuo swamp. “A bit before noon.”';
      audiourl = host + '119.ogg';
    } else if (answ2 === 'have'){
      txt = 'Tattarisuo swamp. “What do ya take me for?”'
      audiourl = host + '120.ogg';
    } else {
      conv.data.testi = 'fallevent2_2';
      conv.contexts.set('int2_1', 1, {});
      return conv.followup('2_1fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['2_2event',answ2,'int2_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('2_3handuja', (conv, {response, ent2_3}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    var audiourl = '';
    if (response === 'one' || ent2_3 === 'bootlegger') {
      answ = 'one';
      audiourl = host + '121.ogg';
      conv.data.sreveal = true;
    } else if (response === 'two' || ent2_3 === 'reveal') {
      audiourl = host + '122.ogg';
    } else {
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['2_3event',answ,'int2_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.sreveal = conv.data.sreveal;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('2_4kelo', (conv) => {
    conv.data.previous = ['2_4event','one','int2_3'];
    const audiourl = host + '123.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('2_5choice', (conv, {response, ent2_5}) => {
    var answ = 'two';
    if (response === 'one' || ent2_5 === 'go') {
      if (!conv.data.points.includes('2_5event')) {
        conv.data.bpoints++;
        conv.data.points.push('2_5event')
      }
      if (conv.user.verification === 'VERIFIED') {
        conv.user.storage.bpoints = conv.data.bpoints;
        conv.user.storage.points = conv.data.points;
      }
      conv.contexts.set('leave3B', 1, {});
      return conv.followup('3B_Eevent', {
        response: "ready"
      });
    } else if (response === 'two' || ent2_5 === 'stay') {
        conv.contexts.set('stay3A', 1, {});
        return conv.followup('3A_1event', {
          response: "ready"
        });
      } else {
        return conv.followup('fallevent', {
          response: 'fallback'
        });
      }
  });

  app.intent('3A_1stay', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3A_1event','ready','stay3A'];
    const audiourl = host + '124.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3A_2stay', (conv, {response,ent3A_2}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    var txt = '';
    var audiourl = '';
     if (response === 'one' || ent3A_2 === 'comb') {
        answ = 'one';
        conv.contexts.set('int3A_W', 2, {});
        audiourl = host+ '125.ogg';
        txt = 'Tattarisuo swamp. “Into the swamp with you.”';
    } else if (response === 'two' || ent3A_2 === 'walk') {
         audiourl = host + '126.ogg';
         conv.contexts.set('3Around', 2, {});
         txt = 'Tattarisuo swamp. “There, look!”';
    } else {
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['3A_2event',answ,'int3A_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3A_3round', (conv, {response,binarr}) => {
    conv.data.kyyhky = true;
    conv.data.fallbackCount = 0;
    var answ = 'no';
    conv.contexts.set('3Around', 0, {});
    var audiourl = '';
    if (response === 'one' || binarr === 'yes') {
        answ = 'yes';
        audiourl = host + '127.ogg';
    } else if (response === 'two' || binarr === 'no') {
        audiourl = host + '128.ogg';
    } else {
      conv.contexts.set('3Around', 1, {});
       return conv.followup('3A_2rfallevent', {
         response: 'fallback'
       });
      //audiourl = host + '128.ogg';
    }
    conv.data.previous = ['3A_3event',answ,'3Around'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.kyyhky = conv.data.kyyhky;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3A_4wrap', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3A_4event','ready','int3A_W'];
    conv.contexts.set('int3A_W', 0, {});
    const audiourl = host + '129.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3B_Eleave', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_Eevent','ready','leave3B'];
    const audiourl = host + '134.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3B_1leave', (conv, {response,ent3B_1}) => {
    conv.data.fallbackCount = 0;
    var answ = 'two';
    var audiourl = '';
     if (response === 'one' || ent3B_1 === 'murder') {
        audiourl = host+ '135.ogg';
        answ = 'one';
    } else {
        audiourl = host+ '136.ogg';
    }
    conv.data.previous = ['3B_1event',answ,'int3B_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3B_2sanoma', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_2event','ready','int3B_1'];
    const audiourl = host + '137.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3B_3call', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_3event','ready','int3B_2'];
    const audiourl = host + '138.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3B_4call', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_4event','one','int3B_3'];
    const audiourl = host + '139.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_1minipeli', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3D_1event','ready','int3A_4'];
    var audiourl = host + '130.ogg';
    var txt = 'Uusi Helsinki newsroom. “Where have you two been dawdling?”';
    if (conv.data.minipeli !== -1) {
      audiourl = host + '180.ogg';
      txt = 'Uusi Helsinki newsroom. “Hands?”';
    }
    const ssml = Utils.playSimple(audiourl);
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_2minipeli', (conv, {number}) => {
    conv.data.fallbackCount = 0;
    conv.data.minipeli = 0;
    const answ = number;
    if (answ === '') {
      conv.data.testi = 'testifall3D_2';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    conv.data.peliansw[0] = answ;
    if (answ === '4') {
      conv.data.minipeli++;
    }
    conv.data.previous = ['3D_2event',answ,'int3D_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.minipeli = conv.data.minipeli;
    }
    const audiourl = host + '131.ogg';
    const ssml = Utils.playSimple(audiourl);
    const txt = Texts.bubble(conv.data.previous[0]);
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
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.minipeli = conv.data.minipeli;
    }
    const audiourl = host + '132.ogg';
    const ssml = Utils.playSimple(audiourl);
    const txt = Texts.bubble(conv.data.previous[0]);
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
    var audiourl = host + '133.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.peliansw = conv.data.peliansw;
      conv.user.storage.minipeli = conv.data.minipeli;
    }
    if (conv.data.renewed) {
      return conv.followup('3D_5event', {
        binarr: "no"
      });
    }
    const ssml = Utils.playSimple(audiourl);
    const txt = Texts.bubble(conv.data.previous[0]);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('3D_5minipeli', (conv, {response,binarr,additionals}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3D_5event',answ,'int3D_3'];
    if (answ === 'one' || binarr === 'yes' || additionals === 'change') {
      conv.contexts.set('int3A_4', 1, {});
      conv.data.minipeli = 0;
      conv.data.renewed = true;
      if (conv.user.verification === 'VERIFIED') {
        conv.user.storage.renewed = conv.data.renewed;
        conv.user.storage.minipeli = conv.data.minipeli;
      }
      return conv.followup('3D_1event', {
        response: "ready"
      });
    } else if (answ === 'two' || binarr === 'no' || additionals === 'donot') {
    if (!conv.data.points.includes('3D_5event')) {
      if (conv.data.minipeli > 0) {
        conv.data.bpoints += (conv.data.minipeli + 1) / 2;
      }
      conv.data.points.push('3D_5event')
    }
    const audiourl = host + '133B.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.points = conv.data.points;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  } else {
    return conv.followup('fallevent', {
      response: 'fallback'
    });
  }
  });

  app.intent('4_1ilta', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['4_1event','ready','int4_E'];
    const audiourl = host + '140.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  //TODO: tähän elseblokki?
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
    const audiourl = host + '141.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.experts = conv.data.experts;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5A_2magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_2event','adjunct professor','int5A_1'];
    const audiourl = host + '142.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5A_3magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_3event','ready','int5A_2'];
    var eve = '5A_3A';
    var audiourl = host + '142.ogg';
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      eve = '5A_3C';
      audiourl = host + '202A.ogg';
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143.ogg';
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('route5', 1, {});
    } else {
      eve = '5A_3B';
      conv.contexts.set('int6E', 1, {});
      audiourl = host + '190.ogg';
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5B_1fabritius', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5B_1event','physician','fabritius'];
    conv.data.experts = Utils.appender(conv.data.experts,'B');
    const audiourl = host + '144.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.experts = conv.data.experts;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5B_2fabritius', (conv, {response,binarr}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var audiourl = '';
    if (response === 'one' || binarr === 'yes') {
      audiourl = host + '145.ogg';
    } else {
      audiourl = host + '146.ogg';
      answ = 'two';
    }
    conv.data.previous = ['5B_2event',answ,'int5B_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5B_3fabritius', (conv, {response,binarr}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var eve = '5B_3A';
    var audiourl = host + '144.ogg';
    if (conv.data.day === 2) {
      eve = '5B_3C';
      conv.contexts.set('int9E', 1, {});
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '202BL.ogg';
      } else {
        answ = 'two';
        audiourl = host + '202B.ogg';
      }
    } else if (conv.data.experts.length === 1) {
      eve = '5B_3B';
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '148.ogg';
      } else {
        answ = 'two';
        audiourl = host + '150.ogg';
      }
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('route5', 1, {});
    } else {
      conv.contexts.set('int6E', 1, {});
      if (response === 'one' || binarr === 'yes'){
        audiourl = host + '149.ogg';
      } else {
        audiourl = host + '151.ogg';
        answ = 'two';
      }
    }
    conv.data.previous = ['5B_3event',answ,'int5B_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5C_1police', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.experts = Utils.appender(conv.data.experts,'C');
    conv.data.previous = ['5C_1event','police','hkipolice'];
    const audiourl = host + '152.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.experts = conv.data.experts;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5C_2police', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5C_2event','one','int5C_1'];
    var audiourl = host + '153.ogg';
    if (conv.data.day === 2) {
      audiourl = host + '202C.ogg';
      conv.contexts.set('int9E', 1, {});
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153.ogg';
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('route5', 1, {});
    } else {
      conv.contexts.set('int6E', 1, {});
      audiourl = host + '154.ogg';
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('5router', (conv, {response}) => {
    const answ = response;
    var eves = [];
    var resps = [];
    if (conv.data.experts.indexOf('A') === -1) {
      eves.push('5A_1event');
      resps.push('professor');
    }
    if (conv.data.experts.indexOf('B') === -1) {
      eves.push('5B_1event');
      resps.push('physician');
    }
    if (conv.data.experts.indexOf('C') === -1) {
      eves.push('5B_1event');
      resps.push('police');
    }
    if (eves.length < 2) {
      conv.data.testi = 'FAILURE';
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
    else {
      if (answ === 'one') {
        return conv.followup(eves[0], {
          response: resps[0]
        });
        } else {
        return conv.followup(eves[1], {
          response: resps[1]
        });
      }
    }
  });

  app.intent('6_1ilta', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['6_1event','ready','int6E'];
    var eve = '6_1A';
    var audiourl = host;
    if (conv.data.minipeli < 0) {
      audiourl += '157';
    } else if (conv.data.minipeli > 2) {
      audiourl += '155';
    } else {
      audiourl += '156';
    }
    if (conv.data.vpoints > 0) {
      eve = '6_1B';
      audiourl += 'V';
    }
    audiourl += '.ogg'
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('7_1aamu', (conv, {response, ent7_1}) => {
    conv.data.day = 2;
    conv.data.fallbackCount = 0;
    var answ = 'four';
    var accuse = 0;
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
      audiourl += 'H.ogg';
      conv.contexts.set('magnus', 1, {});
    } else if (conv.data.experts.indexOf('B') === -1) {
      audiourl += 'F.ogg';
      conv.contexts.set('fabritius', 1, {});
    } else  {
      audiourl += 'P.ogg';
      conv.contexts.set('hkipolice', 1, {});
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.day = conv.data.day;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.points = conv.data.points;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    const audiourl = host + '203.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('9_2anatomy', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['9_2event','yes','int9_1'];
    const audiourl = host + '204.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('9_3anatomy', (conv, {binarr,response}) => {
    conv.data.fallbackCount = 0;
    var answ = 'no';
    var eve = '9_3A';
    var audiourl = host;
    if (binarr === 'yes' || response === 'one') {
      audiourl += '205.ogg';
      answ = 'yes';
    } else {
      eve = '9_3B';
      audiourl += '206.ogg';
    }
    conv.data.previous = ['9_3event',answ,'int9_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('9_4anatomy', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['9_4event','ready','int9_3'];
    const audiourl = host + '207.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('10_1kuulustelu', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['10_1event','ready','int9_4'];
    const audiourl = host + '208.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('10_2kuulustelu', (conv, {response,ent10_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'one';
    var eve = '10_2A';
    if (response === 'three' || ent10_2 === 'dont') {
      answ = 'three';
      audiourl += '210';
      eve = '10_2B';
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
    audiourl += '.ogg';
    conv.data.previous = ['10_2event',answ,'int10_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('10_3kuulustelu', (conv, {ent10_3,response}) => {
    conv.data.fallbackCount = 0;
    var answ = '';
    var audiourl = host;
    var eve = '10_3C';
    if (conv.data.kyyhky) {
      if (response === 'one' || ent10_3 === 'dove') {
        eve = '10_3A';
        answ = 'one';
        audiourl += '211.ogg';
      } else if (response === 'two' || ent10_3 === 'panacea') {
        eve = '10_3B';
        answ = 'two';
        audiourl += '212.ogg';
      } else {
        answ = 'three';
        audiourl += '213.ogg';
      }
    } else {
      if (response === 'one' || ent10_3 === 'panacea') {
        answ = 'one';
        audiourl += '212.ogg';
      } else {
        answ = 'two';
        audiourl += '213.ogg';
      }
    }
    conv.data.previous = ['10_3event',answ,'int10_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
      audiourl = host + '214B.ogg';
    } else {
      audiourl = host + '214A.ogg';
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('11A_2sanoma', (conv, {binarr,berhaps}) => {
    var audiourl = '';
    var answ = 'yes';
    var eve = '11A_2A';
    if (conv.data.visits.length > 1) {
      if (binarr === 'no' || berhaps === 'perhaps') {
          audiourl = host + '218.ogg';
          answ = 'no';
          eve = '11A_2B';
      } else {
          audiourl = host + '217.ogg';
      }
    } else {
      if (binarr === 'no' || berhaps === 'perhaps') {
          audiourl = host + '216.ogg';
          answ = 'no';
          eve = '11A_2B';
      } else {
          audiourl = host + '215.ogg';
      }
    }
    conv.data.previous = ['11A_2event',answ,'int11A_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
      audiourl += 'B.ogg';
      conv.contexts.set('int12_E', 1, {})
    } else {
      conv.contexts.set('int11C_E', 1, {});
      conv.contexts.set('int11B_E', 1, {});
      audiourl += 'A.ogg';
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.bpoints = conv.data.bpoints;
      conv.user.storage.points = conv.data.points;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('11B_1wife', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'B');
    conv.data.previous = ['11B_1event','wife','int11B_E'];
    const audiourl = host + '220.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
        audiourl += '227.ogg';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '228.ogg';
        answ = 'two';
      } else {
        audiourl += '229.ogg';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //Jos on käyty silminnäkijällä, mutta sähkösanomaa ei olla tehty.
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'one' || ent11B_2 === 'morgue') {
        audiourl += '221.ogg';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '222.ogg';
        answ = 'two';
      } else {
        audiourl += '223.ogg';
      }
    } else  {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'one' || ent11B_2 === 'morgue') {
        audiourl += '224.ogg';
        answ = 'one';
      } else if (response === 'two' || ent11B_2 === 'society') {
        audiourl += '225.ogg';
        answ = 'two';
      } else {
        audiourl += '226.ogg';
      }
    }
    conv.data.previous = ['11B_2event',answ,'int11B_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('11C_1cafe', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11C_1event','cafe','int11C_E'];
    //oikeesti eri
    const audiourl = host + '299.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('11C_2cafe', (conv,{response,ent11C_2}) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'C');
    var audiourl = host;
    var answ = 'one';
    if (response === 'three' || ent11C_2 === 'die') {
      answ = 'three';
      if (conv.data.sreveal) {
        audiourl += '231.ogg';
      } else {
        audiourl += '233.ogg';
      }
    } else {
      if (conv.data.sreveal) {
        audiourl += '230.ogg';
      } else {
        audiourl += '232.ogg';
      }
    }
    conv.data.previous = ['11C_2event',answ,'int11C_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.visits = conv.data.visits;
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('11C_3cafe', (conv, {response,ent11C_3}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'one';
    var eve = '11C_3A';
    //Vaimon luona ei olla käyty
    if (conv.data.visits.indexOf('B') === -1) {
      conv.contexts.set('int11B_E', 1, {});
      if (response === 'two' || ent11C_3 === 'ask') {
        answ = 'two';
        audiourl += '236.ogg';
        eve = '11C_3B';
      } else {
        audiourl += '239.ogg';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //sanomaa ei ole kirjoitettu
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'two' || ent11C_3 === 'ask') {
        answ = 'two';
        audiourl += '234.ogg';
        eve = '11C_3B';
      } else {
        audiourl += '237.ogg';
      }
    } else {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'two' || ent11C_3 === 'ask') {
        answ = 'two';
        audiourl += '235.ogg';
        eve = '11C_3B';
      } else {
        audiourl += '238.ogg';
      }
    }
    conv.data.previous = ['11C_3event',answ,'int11C_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_1cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_1event','ready','int12_E'];
    const audiourl = host + '240.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_2cemetery', (conv, {binarr,response}) => {
    conv.data.fallbackCount = 0;
    var answ = 'one';
    var audiourl = '';
    if (binarr === 'yes' || response === 'one') {
      audiourl = host + '241.ogg';
    } else {
      audiourl = host + '242.ogg';
      answ = 'two';
    }
    conv.data.previous = ['12_2event',answ,'int12_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_3cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_3event','ready','int12_2'];
    const audiourl = host + '243.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_4cemetery', (conv) => {
    const audiourl = host + '244.ogg';
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_4event','ready','int12_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_5cemetery', (conv, {response,ent12_5}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'four';
    var ctx = 'int13_E';
    var eve = '12_5A';
    if (response === 'one' || ent12_5 === 'grave') {
      audiourl +=  '245.ogg';
      answ = 'one';
    } else if (response === 'two' || ent12_5 === 'chief') {
      eve = '12_5B';
      audiourl += '246.ogg';
      ctx = 'int12_5';
      answ = 'two';
    } else if (response === 'three' || ent12_5 === 'seizure') {
      eve = '12_5C';
      audiourl += '248.ogg';
      answ = 'three';
    } else {
      eve = '12_5D';
      audiourl += '249.ogg';
    }
    conv.data.previous = ['12_5event',answ,'int12_4'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    conv.contexts.set(ctx, 1, {});
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_6cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_6event','ready','int12_5'];
    const audiourl = host + '247.ogg';
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('12_7cemetery', (conv, {response,ent12_5}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'three';
    var eve = '12_5A';
    if (response === 'one'|| ent12_5 === 'grave') {
      audiourl += '245.ogg';
      answ = 'one';
    } else if (response === 'two'|| ent12_5 === 'seizure') {
      audiourl += '248.ogg';
      answ = 'two';
      eve = '12_5C';
    } else {
      audiourl += '249.ogg';
      eve = '12_5D';
    }
    conv.data.previous = ['12_7event',answ,'int12_6'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('13_1toimitus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['13_1event','ready','int13_E'];
    const audiourl = host + '250.ogg';
    const txt = Texts.bubble(conv.data.previous[0]);
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('13_2toimitus', (conv, {response, binarr}) => {
    var audiourl = host;
    var answ = 'no';
    var eve = '13_2A';
    if (response === 'one' || binarr === 'yes') {
      audiourl += '251.ogg';
      if (!conv.data.points.includes('13_2event')) {
        conv.data.vpoints++;
        conv.data.points.push('13_2event')
      }
      conv.data.julkaise = true;
      answ = 'yes';
    } else {
      conv.data.julkaise = false;
      audiourl += '252.ogg';
      eve = '13_2B';
    }
    conv.data.previous = ['13_2event',answ,'int13_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.julkaise = conv.data.julkaise;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.points = conv.data.points;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('14_1aamu', (conv) => {
    var audiourl = host;
    conv.data.previous = ['14_1event','ready','int13_2'];
    if (conv.data.julkaise) {
      audiourl += '253.ogg';
      conv.contexts.set('int15_E',1,{})
    } else {
      audiourl += '254.ogg';
      conv.contexts.set('int14_1',1,{})
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('14_2aamu', (conv) => {
    var audiourl = host + '301.ogg';
    conv.data.previous = ['14_2event','ready','int14_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('15_1kirje', (conv) => {
    var audiourl = host + '302.ogg';
    conv.data.previous = ['15_1event','ready','int15_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('15_2kirje', (conv,{binarr}) => {
    var audiourl = host + '303.ogg';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_2event',binarr,'int15_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('15_3kirje', (conv,{binarr}) => {
    var audiourl = host + '304.ogg';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_3event',binarr,'int15_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('15_4kirje', (conv,{binarr}) => {
    var audiourl = host + '305.ogg';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_4event',binarr,'int15_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('15_5kirje', (conv,{binarr}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '306.ogg';
    if (binarr === 'no') {
      conv.contexts.set('int16_E',1,{})
      return conv.followup('16_1event', {
        response: "ready"
      });
    }
    conv.data.previous = ['15_5event',binarr,'int15_4'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('16_1poliisi', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '307.ogg';
    conv.data.previous = ['16_1event','ready','int16_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('16_2poliisi', (conv, {response,ent16_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    var eve = '16_2A';
    if (response === 'one' || ent16_2 === 'truth') {
      audiourl += '308.ogg';
      answ = 'one';
    } else {
      eve = '16_2B';
      audiourl += '310.ogg';
    }
    conv.data.previous = ['16_2event',answ,'int16_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('17_1faktat', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '311.ogg';
    if (conv.data.kyyhky) {
      audiourl = host + '311KY.ogg';
    }
    conv.data.previous = ['17_1event','ready','int16_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('17_2kelo', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '312.ogg';
    conv.data.previous = ['17_2event','ready','int17_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  // app.intent('17_3kelo', (conv,{response, ent17_3}) => {
  //   conv.data.fallbackCount = 0;
  //   var audiourl = host;
  //   var answ = 'two';
  //   if (response === 'one' || ent17_3 === 'meeting') {
  //     answ = 'one';
  //     conv.contexts.set('int17_3A',1,{});
  //     audiourl += '313.ogg'
  //   } else {
  //     conv.contexts.set('int17_3B',1,{});
  //     audiourl += '314.ogg'
  //   }
  //   conv.data.previous = ['17_3event',answ,'int17_2'];
  //   const txt = Texts.bubble(conv.data.previous[0]);
// const ssml = Utils.playSimple(audiourl);
// conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  // });

  // app.intent('17_4A', (conv) => {
  //   var audiourl = host;
  //   conv.data.previous = ['17_4Aevent','ready','int17_3A'];
  //   if (conv.data.kyyhky) {
  //     audiourl += '315.ogg'
  //   } else {
  //     audiourl += '316.ogg'
  //   }
  //   const txt = Texts.bubble(conv.data.previous[0]);
// const ssml = Utils.playSimple(audiourl);
// conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  // });

  app.intent('17_3kelo', (conv) => {
    var audiourl = host;
    conv.data.previous = ['17_3event','ready','int17_2'];
    if (conv.data.kyyhky) {
      audiourl += '317.ogg'
    } else {
      audiourl += '318.ogg'
    }
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('18_1ennustaja', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '319.ogg';
    conv.data.previous = ['18_1event','ready','int18_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('18_2ennustaja', (conv,{response, ent18_2}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    var answ = 'two';
    if (response === 'one' || ent18_2 === 'reporters') {
      answ = 'one';
      audiourl += '320.ogg'
    } else {
      audiourl += '321.ogg'
    }
    conv.data.previous = ['18_2event',answ,'int18_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('18_3ennustaja', (conv) => {
    //MUTTA trainingiin @response
    const audiourl = host + '322.ogg';
    conv.data.previous = ['18_3event','ready','int18_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('18_4ennustaja', (conv) => {
    const audiourl = host + '323.ogg';
    conv.data.previous = ['18_4event','ready','int18_3'];
    const txt = Texts.bubble(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('19_1aamu', (conv) => {
    const audiourl = host + '401.ogg';
    conv.data.previous = ['19_1event','ready','int18_4'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('19_2aamu', (conv) => {
    var audiourl = host + '403.ogg';
    if (conv.data.kyyhky) {
      audiourl = host + '402.ogg';
    }
    conv.data.previous = ['19_2event','ready','int19_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('19_3aamu', (conv,{ent19_3,response}) => {
    var audiourl = host + '405.ogg';
    var answ = 'two';
    var eve = '19_3B';
    if (response === 'one' || ent19_3 === 'information') {
      eve = '19_3A';
      audiourl = host + '404.ogg';
      answ = 'one';
    }
    conv.data.previous = ['19_3event',answ,'int19_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('20_1call', (conv) => {
    const audiourl = host + '406.ogg';
    conv.data.previous = ['20_1event','ready','int19_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('20_2call', (conv,{ent20_2,response}) => {
    //HOX MITÄS JOS ent20_2 sisältää one,first,two jne..
    conv.data.nice = false;
    var audiourl = host + '408.ogg';
    var answ = 'two';
    var eve = '20_2A';
    if (ent20_2 ==='robbed' || response === 'one') {
      audiourl = host + '407.ogg';
      conv.data.nice = true;
      answ = 'one';
      eve = '20_2B';
      //TODO
      if (!conv.data.points.includes('20_2event')) {
        conv.data.vpoints++;
        conv.data.points.push('20_2event')
      }
    }
    conv.data.previous = ['20_2event',answ,'int20_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.points = conv.data.points;
      conv.user.storage.nice = conv.data.nice;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('20_3call', (conv,{ent20_3,response}) => {
    var audiourl = host + '410.ogg';
    var answ = 'two';
    if (ent20_3 === 'cemetery' || response === 'one') {
      audiourl = host + '409.ogg';
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
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.vpoints = conv.data.vpoints;
      conv.user.storage.points = conv.data.points;
    }
    //conv.ask(`You said ${conv.input.raw}`); TÄLLÄÄ SAA INPUTIN, MUTTEI EVENT INVOKEE
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('21_1prep', (conv) => {
    const audiourl = host + '411.ogg';
    conv.data.previous = ['21_1event','ready','int20_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('21_2prep', (conv,{ent21_2,response}) => {
    var audiourl = host;
    var answ = 'three';
    if (ent21_2 === 'depends' || response === 'one') {
      audiourl += '412.ogg';
      answ = 'one';
    } else if (ent21_2 === 'course' || response === 'two') {
      audiourl += '413.ogg';
      answ = 'two';
    } else {
      audiourl += '414.ogg';
    }
    conv.data.previous = ['21_2event',answ,'int21_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('21_3prep', (conv,{ent21_3,response}) => {
    var audiourl = host;
    var answ = 'two';
    var eve = '21_3A';
    if (ent21_3 === 'grave' || response === 'one') {
      answ = 'one';
      audiourl += '415.ogg';
      conv.contexts.set('int22A_E',1,{});
    } else {
      eve = '21_3B';
      conv.contexts.set('int21_3',1,{});
      audiourl += '416.ogg';
    }
    conv.data.previous = ['21_3event',answ,'int21_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('21_4prep', (conv,{ent21_4,response}) => {
    var audiourl = host;
    var answ = 'two';
    var eve = '21_4A';
    if (ent21_4 === 'she' || response === 'one') {
      answ = 'one';
      audiourl += '417.ogg';
      conv.contexts.set('int22D_E',1,{});
    } else {
      eve = '21_4B';
      conv.contexts.set('int22A_E',1,{});
      audiourl += '415.ogg';
    }
    conv.data.previous = ['21_4event',answ,'int21_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22A_1grave', (conv) => {
    const audiourl = host + '418.ogg';
    conv.data.previous = ['22A_1event','ready','int22A_E'];
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22A_2grave', (conv,input) => {
    const audiourl = host + '419.ogg';
    conv.data.previous = ['22A_2event','ready','int22A_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    const txt = Texts.bubble(conv.data.previous[0])
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22A_3grave', (conv) => {
    const audiourl = host + '420.ogg';
    conv.data.previous = ['22A_3event','ready','int22A_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22B_1action', (conv) => {
    const audiourl = host + '421.ogg';
    conv.data.testi = 'notsoany'
    conv.data.previous = ['22B_1event','ready','int22A_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });
 //Sano rolf rivastolla tähän (eli oikeesti 22C),TÄSTÄ int23_E
  app.intent('22B_2action', (conv) => {
    const audiourl = host + '422.ogg';
    conv.data.previous = ['22B_2event','ready','int22B_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22D_1vanamo', (conv) => {
    const audiourl = host + '423.ogg';
    conv.data.previous = ['22D_1event','ready','int22D_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });
  //INVENT A NAME
  app.intent('22D_2vanamo', (conv) => {
    const audiourl = host + '424.ogg';
    conv.data.previous = ['22D_2event','ready','int22D_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const ssml = Utils.playSimple(audiourl);
    const txt = Texts.bubble(conv.data.previous[0]);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('22D_3vanamo', (conv) => {
    const audiourl = host + '426.ogg';
    conv.data.previous = ['22D_3event','ready','int22D_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  // app.intent('22D_4vanamo', (conv) => {
  //   const audiourl = host + '426.ogg';
  //   conv.data.previous = ['22D_4event','ready','int22D_3'];
  //   const txt = Texts.bubble(conv.data.previous[0]);
// const ssml = Utils.playSimple(audiourl);
// conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  // });

  app.intent('23_1aftermath', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '427.ogg';
    conv.data.previous = ['23_1event','ready','int23_E'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('23_2aftermath', (conv, {ent23_2}) => {
    var audiourl = host + '429.ogg';
    if (ent23_2 === 'first') {
      audiourl = host + '428.ogg';
    }
    conv.data.previous = ['23_2event',ent23_2,'int23_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_1car', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '430.ogg';
    conv.data.previous = ['24_1event','ready','int23_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });
  //TODO TÄSSÄ EHKÄ LOPUT KYSYMYKSET NEGATIIVISIKSI TRAINING FRAASEIKSI?
  app.intent('24_2car', (conv,{ent24,response}) => {
    conv.data.fallbackCount = 0;
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
    } else if (response === 'three' || ent24 === 'long') {
      conv.data.pakys = 'C';
      audiourl2 += '124';
      audiourl += '433';
    } else {
      conv.data.testi = 'fallevent24_2';
      return conv.followup('fallevent', {
        response: 'fallback'
      });
    }
    const eve = '24' + conv.data.pakys.charAt(conv.data.pakys.length - 1);
    if (!conv.data.kyyhky) {
      conv.data.pakys += 'E';
    }
    audiourl += '.ogg';
    audiourl2 += '.ogg';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_2event',answ,'int24_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.pakys = conv.data.pakys;
      conv.user.storage.kysurl = conv.data.kysurl;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_3car', (conv,{ent24,response}) => {
    conv.data.fallbackCount = 0;
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
      audiourl += '431.ogg';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl2 = audiourl2.replace('2','');
      audiourl += '432.ogg';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl2 = audiourl2.replace('3','');
      audiourl += '433.ogg';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl2 = audiourl2.replace('4','');
      audiourl += '434.ogg';
    } else {
      conv.data.testi = 'fallevent24_3';
      return conv.followup('fallevent24', {
        response: 'fallback'
      });
    }
    if (conv.data.kyyhky) {
      conv.contexts.set('int24_3',1,{});
    } else {
      conv.contexts.set('int24_4',1,{});
    }
    audiourl2 =  host + audiourl2 + '.ogg';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_3event',answ,'int24_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.pakys = conv.data.pakys;
      conv.user.storage.kysurl = conv.data.kysurl;
    }
    const eve = '24' + conv.data.pakys.charAt(conv.data.pakys.length - 1);
    const txt = Texts.bubble(eve);
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_4car', (conv,{ent24,response}) => {
    conv.data.fallbackCount = 0;
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
      audiourl += '431.ogg';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl2 = audiourl2.replace('2','');
      audiourl += '432.ogg';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl2 = audiourl2.replace('3','');
      audiourl += '433.ogg';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl2 = audiourl2.replace('4','');
      audiourl += '434.ogg';
    } else if (answ === 'pond' && conv.data.kyyhky) {
      conv.data.pakys += 'E';
      audiourl2 = audiourl2.replace('5','');
      audiourl += '435.ogg';
    } else {
      conv.data.testi = 'fallevent24_4';
      return conv.followup('fallevent24', {
        response: 'fallback'
      });
    }
    audiourl2 = host + audiourl2 + '.ogg';
    conv.data.kysurl = audiourl2;
    conv.data.previous = ['24_4event',answ,'int24_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.pakys = conv.data.pakys;
      conv.user.storage.kysurl = conv.data.kysurl;
    }
    const eve = '24' + conv.data.pakys.charAt(conv.data.pakys.length - 1);
    const txt = Texts.bubble(eve);
    const ssml = Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    );
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('24_5car', (conv,{ent24,response}) => {
    conv.data.fallbackCount = 0;
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
      audiourl += '436.ogg';
    } else if (answ === 'part') {
      conv.data.pakys += 'B';
      audiourl += '437.ogg';
    } else if (answ === 'long') {
      conv.data.pakys += 'C';
      audiourl += '438.ogg';
    } else if (answ === 'pigeon') {
      conv.data.pakys += 'D';
      audiourl += '439.ogg';
    } else if (answ === 'pond' && conv.data.kyyhky) {
      conv.data.pakys += 'E';
      audiourl += '440.ogg';
    } else {
      conv.contexts.set('24fall',1,{});
      return conv.followup('fallevent24', {
        response: 'fallback'
      });
    }
    conv.data.previous = ['24_5event',answ,'int24_4'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
      conv.user.storage.pakys = conv.data.pakys;
    }
    const eve = '24' + conv.data.pakys.charAt(conv.data.pakys.length - 1);
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25_1choice', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '441.ogg';
    conv.data.previous = ['25_1event','ready','int24_5'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      });

  app.intent('25_2choice', (conv,{ent25_2,response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '443.ogg';
    var answ = 'two';
    if (ent25_2 === 'dunno' || response === 'one') {
      answ = 'one';
      audiourl = host + '442.ogg';
    }
    conv.data.previous = ['25_2event',answ,'int25_1'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25_3choice', (conv,{ent25_3,response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '445.ogg';
    var answ = 'two';
    if (ent25_3 === 'why' || response === 'one') {
      answ = 'one';
      audiourl = host + '444.ogg';
    }
    conv.data.previous = ['25_3event',answ,'int25_2'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25_4choice', (conv) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '446';
    var eve = '25_4A';
    if (conv.data.rethink.length > 0) {
      eve = '25_4B';
      audiourl += 'B';
    }
    audiourl += '.ogg';
    conv.data.previous = ['25_4event','ready','int25_3'];
    if (conv.user.verification === 'VERIFIED') {
      conv.user.storage.previous = conv.data.previous;
    }
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25_5choice', (conv,{binarr, ent25_5}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host + '447.ogg';
    if (binarr === 'yes') {
      if (conv.data.rethink.indexOf('A') !== -1) {
        audiourl = host + '449.ogg';
      } else {
        conv.data.rethink += 'A';
      }
      conv.contexts.set('int25A',1,{});
    } else if (binarr === 'no'){
      audiourl = host + '448.ogg';
      if (conv.data.rethink.indexOf('B') !== -1) {
        audiourl = host + '449.ogg';
      } else {
        conv.data.rethink += 'B';
      }
      conv.contexts.set('int25B',1,{});
    } else {
      conv.data.rethink += 'C';
      conv.contexts.set('int25_3',1,{});
      return conv.followup('25_4event', {
        response: 'ready'
      });
    }
    conv.data.previous = ['25_5event',binarr,'int25_4'];
    const txt = Texts.bubble(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25A_end', (conv,{binarr}) => {
    var audiourl = host;
    var eve = '25';
    if (binarr === 'yes') {
      if (!conv.data.points.includes('25Aevent')) {
        conv.data.bpoints += 2;
        conv.data.points.push('25Aevent')
      }
      conv.contexts.set('int26A',1,{});
      if (conv.data.vpoints > 3) {
        eve += 'V';
        audiourl += '450.ogg';
      } else {
        audiourl += '451.ogg';
      }
    } else {
      conv.contexts.set('int25_3',1,{});
      return conv.followup('25_4event', {
        response: 'ready'
      });
    }
    conv.data.previous = ['25Aevent',binarr,'int25A'];
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('25B_end', (conv,{binarr}) => {
    var audiourl = host;
    var eve = '25';
    if (binarr === 'yes') {
      conv.contexts.set('int26B',1,{});
      if (conv.data.vpoints > 3) {
        eve += 'V';
        audiourl += '450.ogg';
      } else {
        audiourl += '451.ogg';
      }
    } else {
      conv.contexts.set('int25_3',1,{});
      return conv.followup('25_4event', {
        response: 'ready'
      });
    }
    conv.data.previous = ['25Bevent',binarr,'int25B'];
    const txt = Texts.bubble(eve);
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  });

  app.intent('26AEpilogue', (conv) => {
    var audiourl = host;
    conv.data.previous = ['26Aevent','ready','int26A'];
    if (conv.data.vpoints > 3) {
      if (conv.data.bpoints > 3) {
        audiourl += 'END1.ogg';
      } else {
        audiourl += 'END3.ogg';
      }
    } else {
      if (conv.data.bpoints > 3) {
        audiourl += 'END2.ogg';
      } else {
        audiourl += 'END4.ogg';
      }
    }
    var txt = Texts.bubble('END');
    var ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    ssml = Utils.playSimple(host+'CREDITS.ogg');
    conv.close(new SimpleResponse({speech: ssml, text: ' '}));
  });

  app.intent('26BEpilogue', (conv) => {
    var audiourl = host;
    conv.data.previous = ['26Bevent','ready','int26B'];
    if (conv.data.vpoints > 3) {
      if (conv.data.bpoints > 3) {
        audiourl += 'END5.ogg';
      } else {
        audiourl += 'END7.ogg';
      }
    } else {
      if (conv.data.bpoints > 3) {
        audiourl += 'END6.ogg';
      } else {
        audiourl += 'END8.ogg';
      }
    }
    var txt = Texts.bubble('END');
    var ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    ssml = Utils.playSimple(host+'CREDITS.ogg');
    conv.close(new SimpleResponse({speech: ssml, text: ' '}));
  });

  // app.intent('Credits', (conv) => {
  //   const txt = Texts.bubble('CREDITS');
  //   const ssml = Utils.playSimple(host+'CREDITS.ogg');
  //   conv.ask(new SimpleResponse({speech: ssml, text: ''}));
  //   if (conv.screen) {
  //     conv.ask(new BasicCard({
  //     text: txt,
  //     subtitle: 'Tsup tsap',
  //     title: 'Dead are thanking',
  //     buttons: new Button({
  //       title: 'Find out what really happened!',
  //       url: 'https://yle.fi/deadarespeaking',
  //     }),
  //     image: new Image({
  //       url: 'https://tattar-oudbew.web.app/LOGO.png',
  //       alt: 'Nice',
  //     }),
  //     display: 'CROPPED',
  //   }));
  // }
  // conv.close('Goodbye');
  // });
//FALLBACKS and NoInputs

app.intent('1_1Start NoInput', (conv) => {
  var audiourl = host + '199K.ogg';
  var txt = 'The Dead Are Speaking is now closing! Goodbye!';
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
    txt = 'Do you hear me or not?! Answer me!';
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')){
    return conv.close(Utils.playSimple(host + 'QUITNOTSAVED.ogg'));
  } else {
    audiourl = host + '198K.ogg';
  }
    var ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
});

app.intent('Pause NoInput', (conv) => {
  const audiourl = host + 'PAUSE.ogg';
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (conv.arguments.get('IS_FINAL_REPROMPT')){
    conv.close('Goodbye for now!');
  } else {
    const txt = 'The game is now paused.'
    const ssml = Utils.playSimple(audiourl);
    conv.ask(new SimpleResponse({speech: ssml, text: txt}));
  }
});

  app.intent('2_1kuski - fallback', (conv) => {
    var audiourl = '';
    conv.data.fallbackCount++;
    const ctx = conv.contexts.get('kysykuski');
    const param = ctx.parameters['kys'];
    switch (param) {
      case 'A':
        audiourl = host + '111K1.ogg';
        break;
      case 'B':
        audiourl = host + '111K2.ogg';
        break;
      case 'C':
        audiourl = host + '111K3.ogg';
        break;
      case 'D':
        audiourl = host + '111K4.ogg';
        break;
    }
    if (conv.data.fallbackCount < 2) {
      const ssml  = Utils.playSimple(audiourl);
      const txt = Texts.bubblef(conv.data.previous[0]);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('2_2event', {
        response: "one"
      });
    }
  });



  app.intent('3A_2r - fallback', (conv) => {
    const audiourl = host + '126K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc && (repromptCount < repc || isNaN(repromptCount))) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    }
  });

  app.intent('4_1ilta - fallback', (conv) => {
    const audiourl = host + '140K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('5A_1event', {
        response: 'magnus'
      });
    }
  });

  app.intent('4_1ilta NoInput', (conv) => {
    const audiourl = host + '140K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    var audiourl = host + '143K.ogg';
    conv.data.fallbackCount++;
    var eve = '5A_3A';
    if (conv.data.day === 2) {
      eve = '5A_3C';
      conv.contexts.set('int9E', 1, {});
      return conv.followup('9_1event', {
        response: 'anatomy'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143K.ogg';
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('route5', 1, {});
      if (conv.data.fallbackCount < fbc) {
        const txt = Texts.bubblef(eve);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('5B_1event', {
          response: 'professor'
        });
      }
    } else {
      eve = '5A_3B';
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
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '143K.ogg';
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('route5', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    var eve = '5B_3A';
    if (conv.data.day === 2) {
      eve = '5B_3C';
      conv.contexts.set('int9E', 1, {});
      return conv.followup('9_1event', {
        response: 'anatomy'
      });
    } else if (conv.data.experts.length === 1) {
      eve = '5B_3B';
      audiourl = host + '148K.ogg';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('route5', 1, {});
      if (conv.data.fallbackCount < fbc) {
        const txt = Texts.bubblef(eve);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '148K.ogg';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('hkipolice', 1, {});
      conv.contexts.set('route5', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('9_1event', {
          response: 'anatomy'
        });
      }
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153K.ogg';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('route5', 1, {});
      if (conv.data.fallbackCount < fbc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('5A_1event', {
          response: 'magnus'
        });
      }
    } else {
      conv.contexts.set('int6E', 1, {});
      if (conv.data.fallbackCount < rfbc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('6_1event', {
          response: 'ready'
        });
      }
    }
  });

  app.intent('5C_2police NoInput', (conv) => {
    var audiourl = host + '153K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      return conv.followup('repeat', {
        response: 'repeat'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153K.ogg';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      conv.contexts.set('route5', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      audiourl = host + valmis;
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    var txteve = '7_1A';
    var resp = '';
    conv.data.fallbackCount++;
    if (conv.data.experts.indexOf('A') === -1) {
      audiourl += 'H.ogg';
      conv.contexts.set('magnus', 1, {});
      eve = '5A_1event';
      resp = 'professor';
    } else if (conv.data.experts.indexOf('B') === -1) {
      txteve = '7_1B';
      audiourl += 'F.ogg';
      conv.contexts.set('fabritius', 1, {});
      eve = '5B_1event';
      resp = 'fabritius';
    } else  {
      txteve = '7_1C';
      audiourl += 'P.ogg';
      conv.contexts.set('hkipolice', 1, {});
      eve = '5C_1event';
      resp = 'police';
    }
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(txteve);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
      audiourl += 'H.ogg';
      conv.contexts.set('magnus', 1, {});
    } else if (conv.data.experts.indexOf('B') === -1) {
      audiourl += 'F.ogg';
      conv.contexts.set('fabritius', 1, {});
    } else  {
      audiourl += 'P.ogg';
      conv.contexts.set('hkipolice', 1, {});
    }
    if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('10_1kuulustelu - fallback', (conv) => {
    const audiourl = host + '208K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < 2) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    var audiourl = host + '209K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.kyyhky) {
      audiourl = host + '209KYK.ogg';
    }
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('10_4event', {
        response: 'two'
      });
    }
  });

  app.intent('10_2kuulustelu NoInput', (conv) => {
    var audiourl = host + '209K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.kyyhky) {
      audiourl = host + '209KYK.ogg';
    }
    if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('10_4event', {
        response: 'two'
      });
    }
  });

  app.intent('10_3kuulustelu - fallback', (conv) => {
    var audiourl = host + '211K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_1event', {
        response: 'article'
      });
    }
  });

  app.intent('10_3kuulustelu NoInput', (conv) => {
    var audiourl = host + '211K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      const txt = Texts.bubble(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('11A_1sanoma - fallback', (conv) => {
    const audiourl = host + '214K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_2event', {
        response: 'yes'
      });
    }
  });

  app.intent('11A_2sanoma - fallback', (conv) => {
    const audiourl = host + '215K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('11A_3event', {
        response: 'no'
      });
    }
  });

  app.intent('11A_3sanoma - fallback', (conv) => {
    const audiourl = host + '219K.ogg';
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
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('11B_1event', {
        response: 'wife'
      });
    }
  });

  app.intent('11A_3sanoma NoInput', (conv) => {
    var audiourl = host + '219K.ogg';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.visits.length > 1) {
      audiourl = host + valmis;
      conv.contexts.set('int12_E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
    conv.contexts.set('int11C_E', 1, {});
    conv.contexts.set('int11B_E', 1, {});
    if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('11B_1wife - fallback', (conv) => {
    const audiourl = host + '220K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
      audiourl = host + '227K.ogg';
      conv.contexts.set('int11C_E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('11C_1cafe - fallback', (conv) => {
    const audiourl = host + '227K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else {
      return conv.followup('11C_2event', {
        response: 'one'
      });
    }
  });

  app.intent('11C_2cafe - fallback', (conv) => {
    const audiourl = host + '230K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
      const ssml = Utils.playSimple(audiourl);
      return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
        const txt = Texts.bubble(conv.data.previous[0]);
        const ssml = Utils.playSimple(audiourl);
        return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      conv.contexts.set('int11A_E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    } else {
      conv.contexts.set('int12_E', 1, {});
      if (repromptCount < repc) {
        const txt = Texts.bubblef(conv.data.previous[0]);
const ssml = Utils.playSimple(audiourl);
return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
      } else {
        return conv.followup('repeat', {
          response: 'repeat'
        });
      }
    }
  });

  app.intent('12_4cemetery - fallback', (conv) => {
    const audiourl = host + '244K.ogg';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    if (!conv.data.julkaise) {
      return conv.followup('14_2event', {
        response: 'ready'
      });
    }
    else if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    const ctx = conv.data.previous[1];
    var audiourl = host + '314K.ogg';
    if (ctx === 'one') {
      conv.contexts.set('int17_3A',1,{});
      audiourl = host + '313K.ogg';
    } else {
      conv.contexts.set('int17_3B',1,{});
    }
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      const txt = Texts.bubblef(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
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
    var audiourl = host + valmis;
    if (conv.data.previous[1] === 'one') {
      conv.contexts.set('int22A_E',1,{});
      eve = '22A_1event';
    } else {
      conv.contexts.set('int21_3',1,{});
      resp = 'one';
      audiourl = host +'416K.ogg';
    }
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.fallbackCount < fbc && repromptCount < repc) {
    const txt = Texts.bubblef(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else if (repromptCount === 1) {
       return conv.followup('repeat', {
         response: 'repeat'
       });
     } else {
      conv.data.fallbackCount = 0;
      return conv.followup(eve, {
        response: resp
      });
    }
  });

  app.intent('21_4prep - fallback', (conv) => {
    const audiourl = host + valmis;
    var eve = '22D_1event';
    if (conv.data.previous[1] === 'two') {
      conv.contexts.set('int22A_E',1,{});
      eve = '22A_1event';
    } else {
      conv.contexts.set('int22D_E',1,{});
    }
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.fallbackCount < fbc && (repromptCount < repc || isNaN(repromptCount))) {
    const txt = Texts.bubblef(conv.data.previous[0]);
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else if (repromptCount === 1) {
       return conv.followup('repeat', {
         response: 'repeat'
       });
     } else {
      conv.data.fallbackCount = 0;
      return conv.followup(eve, {
        response: 'ready'
      });
    }
  });

  app.intent('24car - fallback', (conv) => {
    const audiourl = conv.data.kysurl;
    conv.data.fallbackCount++;
    const eve = conv.data.previous[0];
    var indx = eve.indexOf('e');
    var nmbr = parseInt(eve[indx-1],10)+1;
    if (nmbr === 4 && !conv.data.kyyhky) {
      nmbr += 1
    }
    var ctx = 'int24_' + (nmbr-1).toString();
    conv.data.testi2 = 'eve:' + eve + '-indx:' + indx + '-nmbr:' + nmbr + '-ctx:' + ctx;
    conv.contexts.set(ctx, 1, {});
    var tt = conv.arguments.get('REPROMPT_COUNT');
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    conv.data.testi = 'ctx:' + ctx + ' nmbr:' + nmbr;
    if (conv.data.fallbackCount < fbc && (repromptCount < repc || isNaN(repromptCount))) {
    conv.data.kuskikys = 'EFCDSA';
    const txt = Texts.bubblef('24f');
    const ssml = Utils.playSimple(audiourl);
    return conv.ask(new SimpleResponse({speech: ssml, text: txt}));
    } else if (repromptCount === 1) {
       return conv.followup('repeat', {
         response: 'repeat'
       });
     } else {
      const next_eve = '24_' + nmbr.toString() + 'event';
      conv.data.fallbackCount = 0;
      conv.ask('Why are we here? ' + next_eve)
      // return conv.followup(next_eve, {
      //   response: 'one'
      // });
    }
  });

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
