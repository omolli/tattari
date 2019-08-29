'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');
const {google} = require('googleapis');
const Utils = require('./src/utils')
const Reprompts = require('./src/reprompts')
const app = dialogflow({debug: true});
const host = 'https://tattar-oudbew.web.app/';
const {WebhookClient} = require('dialogflow-fulfillment');
const fbc = 3;
const repc = 1;
const valmis = 'valmis.mp3';

//conv is undefined..
//function repeater(conv) {
//  return conv.followup('repeat', {
//    response: 'repeat'
//  });
//}
//function nuller(conv){
//  conv.data.fallbackCount = 0;
//  conv.arguments.set('REPROMPT_COUNT') = 0;
//}
//INTENTS
app.intent('Default Welcome Intent', (conv, {response}) => {
    //Muuttujia
    conv.data.fallbackCount = 0;
    conv.data.day = 1;
    conv.data.vpoints = 0;
    conv.data.bpoints = 0;
    conv.data.minipeli = -1;
    conv.data.addarr = [];
    conv.data.vanamo = [];
    conv.data.experts = '';
    conv.data.testi = '';
    conv.data.visits = '';
    conv.data.kyyhky = false;
    conv.data.rethink = false;
    conv.data.sreveal = false;
    conv.data.previous = ['Welcome','start again','welcome'];
    conv.data.peliansw = [0,0,0];
    const audiourl = host + '101.mp3';
    conv.data.kysurl = '';
    //conv.ask(Utils.playAudio(audiourl, 0, 120))
    conv.ask('Say ready. Or take a shortcut!')
});

app.intent('repeat', (conv) =>{
  //helper intent for replaying the current event (intent) with the current choice
  const cevent = conv.data.previous[0];
  const cparam = conv.data.previous[1];
  const ccontext = conv.data.previous[2];
  conv.contexts.set(ccontext,1,{})
  const arr = Array.from(conv.data.addarr);
  const param = Reprompts.getParam(cevent);
  //If additional contexts are used, they are iterated from the arddarr
  //array and set, the array is cleared afterwards
  if (arr.length !== 0) {
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i];
      conv.contexts.set(e,1,{})
    }
    conv.data.addarr = [];
  }
  conv.followup(cevent, {
    param: cparam
  });
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

app.intent('1_1Start', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['1_1event','ready','DefaultWelcomeIntent-followup'];
    const audiourl = host + '102.mp3';
    conv.ask(Utils.playSimple(audiourl));

});

app.intent('1_2boss', (conv) => {
    conv.data.previous = ['1_2event','ready','int1_1'];
    const audiourl = host + '197.mp3';
    conv.ask(Utils.playSimple(audiourl));
});

app.intent('1_3bossresponse', (conv, {response}) => {
    const answ = response;
    conv.data.previous = ['1_3event',answ,'int1_2'];
    var audiourl = host;
    if (answ === 'one') {
        audiourl += '104.mp3';
    } else if (answ === 'two') {
        audiourl += '105.mp3';
    } else {
        conv.data.bpoints++;
        audiourl += '106.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
});

  app.intent('1_4entervanamo', (conv, {response}) => {
    const answ = response;
    conv.data.previous = ['1_4event',answ,'int1_3'];
    var audiourl = host+ '108.mp3';
    if (answ === 'one') {
        audiourl = host+ '107.mp3';
        conv.data.vpoints++;
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_5phone', (conv) => {
    conv.data.previous = ['1_5event','ready','int1_4'];
    const audiourl = host+ '109.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_6koski', (conv, {response}) => {
    const audiourl = host+ '110.mp3';
    const answ = response;
    conv.data.previous = ['1_6event',answ,'int1_5'];
    if (answ === 'one') {
      conv.contexts.set('kerrov', 5, {nice:true});
      conv.data.vpoints++;
    } else {
      conv.contexts.set('kerrov', 5, {nice: false});
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('1_7matka', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['1_7event',answ, 'int1_6'];
    // Tähän failsafe?
    const param = conv.contexts.get('kerrov').parameters;
    var audiourl = host + '111T.mp3';
    var urlc = '';
    if (param['nice'] === true) {
      conv.contexts.set('kerrov', 5, {nice: true});
      urlc = host + '111';
    } else {
      urlc = host + '112';
      conv.contexts.set('kerrov', 5, {nice: false});
    }
    if (answ === 'one') {
      audiourl = urlc + 'T.mp3';
    } else if (answ ==='two') {
      audiourl = urlc + 'A.mp3';
    } else {
      audiourl = urlc + 'V.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_1kuski', (conv, {response, kuskikys}) => {
    conv.data.fallbackCount = 0;
    var audiourl = '';
    var audiourl2 = '';
    const answ = response;
    conv.data.previous = ['2_1event',answ,'int6'];
    if (answ === 'one' || kuskikys === 'why') {
      audiourl = host + '113.mp3';
      audiourl2 = host + '111K1.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'A'});
    } else if (answ === 'two' || kuskikys === 'see') {
      audiourl = host + '114.mp3';
      audiourl2 = host + '111K2.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'B'});
    } else if (answ === 'three' || kuskikys === 'when') {
      audiourl = host + '115.mp3';
      audiourl2 = host + '111K3.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'C'});
    } else {
      audiourl = host + '116.mp3';
      audiourl2 = host + '111K4.mp3';
      conv.contexts.set('kysykuski', 5, {kys: 'D'});
    }
    conv.ask(Utils.playSimple(audiourl));
    conv.ask(Utils.playSimple(audiourl2));
  });

  app.intent('2_2kuski2', (conv, {response,kuskikys}) => {
    conv.data.fallbackCount = 0;
    var audiourl = '';
    const answ = response;
    const ctx = conv.contexts.get('kysykuski').parameters['kys'];
    var answ2 = Utils.switcher(answ,ctx);
    if (answ2 === 'kysy') {
      answ2 = kuskikys;
    }
    conv.contexts.set('kysykuski', 5, {kys: ctx})
    conv.data.previous = ['2_2event',answ,'int2_1'];
    if (answ2 === 'why') {
      audiourl = host + '117.mp3';
    } else if (answ2 === 'see') {
      audiourl = host + '118.mp3';
    } else if (answ2 === 'when') {
      audiourl = host + '119.mp3';
    } else {
      audiourl = host + '120.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_3handuja', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['2_3event',answ,'int2_2'];
    var audiourl = '';
    if (answ === 'one') {
      audiourl = host + '121.mp3';
      conv.data.sreveal = true;
    } else {
      audiourl = host + '122.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_4kelo', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['2_4event',answ,'int2_3'];
    const audiourl = host + '123.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('2_5choice', (conv, {response}) => {
    const answ = response;
    if (answ === 'one') {
        conv.data.bpoints++;
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

  app.intent('3A_2stay', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3A_2event',answ,'int3A_1'];
    var audiourl = '';
     if (answ === 'one') {
         conv.contexts.set('int3A_W', 5, {});
         audiourl = host+ '125.mp3';
    } else {
         audiourl = host + '126.mp3';
         conv.contexts.set('3Around', 5, {});
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3A_2round', (conv, {response}) => {
    conv.data.kyyhky = true;
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3A_2revent',answ,'3Around'];
    conv.contexts.set('3Around', 0, {});
    var audiourl = '';
    if (answ === 'one') {
        audiourl = host + '127.mp3';
    } else {
        audiourl = host + '128.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3A_4wrap', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3A_4event','ready','int3A_W'];
    conv.contexts.set('int3A_W', 0, {});
    const audiourl = host + '129.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_Eleave', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_Eevent','ready','leave3B'];
    const audiourl = host + '134.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_1leave', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3B_1event',answ,'int3B_E'];
    var audiourl = '';
     if (answ === 'one') {
         audiourl = host+ '135.mp3';
    } else {
         audiourl = host+ '136.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_2sanoma', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_2event','ready','int3B_1'];
    const audiourl = host + '137.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_3call', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_3event','ready','int3B_2'];
    const audiourl = host + '138.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3B_4call', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3B_4event','one','int3B_3'];
    const audiourl = host + '139.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3D_1minipeli', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['3D_1event','ready','int3A_4'];
    conv.data.minipeli = 0;
    const audiourl = host + '130.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('3D_2minipeli', (conv, {number}) => {
    conv.data.fallbackCount = 0;
    const answ = number;
    conv.data.peliansw[0] = answ;
    if (answ === '4') {
      conv.data.minipeli++;
    }
    conv.data.previous = ['3D_2event',answ,'int3D_1'];
    const audiourl = host + '131.mp3';
    conv.ask(Utils.playSimple(audiourl));
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
    conv.ask(Utils.playSimple(audiourl));
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
    conv.ask(Utils.playSimple(audiourl));
    conv.ask(Utils.speak('Shall we go with these answers?'))
  });

  app.intent('3D_5minipeli', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['3D_5event',answ,'int3D_3'];
    if (answ === 'two') {
      conv.contexts.set('int3A_4', 1, {});
      conv.data.minipeli = 0;
      return conv.followup('3D_1event', {
        response: "ready"
      });
    } else {
      const audiourl = host + '133.mp3';
    }
    conv.ask(Utils.speak('And now go write that damn article and fast! Say ready.'));
  });

  app.intent('4_1ilta', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['4_1event','ready','int4_E'];
    const audiourl = host + '140.mp3';
    conv.ask(Utils.playSimple(audiourl));
    //conv.ask(Utils.speak('Hammarström, fabritius or police?'))
  });

  app.intent('4_2router', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    if (answ === 'one') {
      return conv.followup('5A_1event', {
        response: "docent"
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
    conv.data.previous = ['5A_1event','docent','magnus'];
    conv.data.experts = Utils.appender(conv.data.experts,'A');
    const audiourl = host + '141.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5A_2magnus', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5A_2event','docent','int5A_1'];
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
      audiourl = host + '143.mp3';
      return conv.ask(Utils.speak('It is too late already. Say ready when you want to continue.'));
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5B_1fabritius', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['5B_1event','professor','fabritius'];
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
    conv.data.previous = ['5_1Cevent','police','hkipolice'];
    const audiourl = host + '152.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('5C_2police', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['5_2Cevent',answ,'int5C_1'];
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
      audiourl += '157.mp3';
    } else if (conv.data.minipeli > 0) {
      audiourl += '155.mp3';
    } else {
      audiourl += '156.mp3';
    }
    if (conv.data.vpoints === 0) {
    conv.ask('Trust me, I am a capable reporter!');
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('7_1aamu', (conv, {response}) => {
    conv.data.day = 2;
    conv.data.fallbackCount = 0;
    const answ = response;
    conv.data.previous = ['7_1event',answ,'int6_1'];
    //Himomurhaajaan Pomo +1
    //Anatomian laitoksen opiskelijoihin
    //Romaanien hautajaismenoihin Pomo +1
    //Älä syytä vielä ketään
    var audiourl = host + '201';
    if (answ === 'one') {
      audiourl += 'C';
    } else if (answ === 'two') {
      audiourl += 'A';
    } else if (answ === 'three') {
      audiourl += 'B';
    } else {
      audiourl += 'C';
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

  app.intent('9_3anatomy', (conv, {binarr}) => {
    conv.data.fallbackCount = 0;
    const answ = binarr;
    conv.data.previous = ['9_3event',answ,'int9_2'];
    var audiourl = host;
    if (answ === 'yes') {
      audiourl += '205.mp3';
    } else {
      audiourl += '206.mp3';
    }
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

  app.intent('10_2kuulustelu', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['10_2event',response,'int10_1'];
    var audiourl = host;
    if (response === 'one' || response === 'two') {
      audiourl += '209';
      conv.data.vpoints++;
    } else {
      audiourl += '210';
    }
    //TODO muista ottaa tuo response pois
    if (response === 'four') {
      conv.data.kyyhky = true;
    }
    if (conv.data.kyyhky) {
      audiourl += 'KY';
    }
    audiourl += '.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('10_3kuulustelu', (conv, {interrogate,response}) => {
    conv.data.fallbackCount = 0;
    var answ = '';
    var audiourl = host;
    if (conv.data.kyyhky) {
      if (response === 'one' || interrogate === 'dove') {
        answ = 'one';
        audiourl += '211.mp3';
      } else if (response === 'two' || interrogate === 'panacea') {
        answ = 'two';
        audiourl += '212.mp3';
      } else {
        answ = 'three';
        audiourl += '213.mp3';
      }
    } else {
      if (response === 'one' || interrogate === 'panacea') {
        answ = 'one';
        audiourl += '212.mp3';
      } else {
        answ = 'two';
        audiourl += '213.mp3';
      }
    }
    conv.data.previous = ['10_3event',answ,'int10_1'];
    conv.ask(Utils.playSimple(audiourl));
  });
  //Helper intent for selecting where to go
  app.intent('11_1router', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    const answ = response;
    if (answ === 'one') {
      return conv.followup('11A_1event', {
        response: "telegram"
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
    conv.data.previous = ['11A_1event','telegram','int11A_E'];
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
      conv.data.bpoints++;
    } else {
      conv.data.vpoints++;
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

  app.intent('11B_2wife', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11B_2event',response,'int11B_1'];
    var audiourl = host;
    //Jos ei ole käyty silminnäkijällä
    if (conv.data.visits.indexOf('C') === -1) {
      conv.contexts.set('int11C_1', 1, {});
      if (response === 'one') {
        audiourl += '227.mp3';
      } else if (response === 'two') {
        audiourl += '228.mp3';
      } else {
        audiourl += '229.mp3';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //Jos on käyty silminnäkijällä, mutta sähkösanomaa ei olla tehty.
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'one') {
        audiourl += '221.mp3';
      } else if (response === 'two') {
        audiourl += '222.mp3';
      } else {
        audiourl += '223.mp3';
      }
    } else  {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'one') {
        audiourl += '224.mp3';
      } else if (response === 'two') {
        audiourl += '225.mp3';
      } else {
        audiourl += '226.mp3';
      }
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11C_1cafe', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11C_1event','cafe','int11C_E'];
    //oikeesti eri
    const audiourl = host + '227.mp3';
    conv.ask(Utils.playAudio(audiourl,33,120));
  });

  app.intent('11C_2cafe', (conv,{response}) => {
    conv.data.fallbackCount = 0;
    conv.data.visits = Utils.appender(conv.data.visits,'C');
    conv.data.previous = ['11C_2event',response,'int11C_1'];
    var audiourl = host;
    if (response === 'three') {
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
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('11C_3cafe', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['11C_3event',response,'int11C_2'];
    var audiourl = host;
    //Vaimon luona ei olla käyty
    if (conv.data.visits.indexOf('B') === -1) {
      conv.contexts.set('int11B_E', 1, {});
      if (response === 'one') {
        audiourl += '236.mp3';
      } else {
        audiourl += '239.mp3';
      }
    } else if (conv.data.visits.indexOf('A') === -1) {
      //sanomaa ei ole kirjoitettu
      conv.contexts.set('int11A_E', 1, {});
      if (response === 'one') {
        audiourl += '234.mp3';
      } else {
        audiourl += '237.mp3';
      }
    } else {
      conv.contexts.set('int12_E', 1, {});
      if (response === 'one') {
        audiourl += '235.mp3';
      } else {
        audiourl += '238.mp3';
      }
    }
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
      conv.data.vpoints++;
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

  app.intent('12_5cemetery', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    conv.data.previous = ['12_5event',response,'int12_4'];
    var ctx = 'int13_E';
    if (response === 'one') {
      audiourl +=  '245.mp3';
    } else if (response === 'two') {
      //conv.contexts.set('diversion',1,{state: 'failed'})
      audiourl += '246.mp3';
      ctx = 'int12_5';
    } else if (response === 'three') {
      audiourl += '248.mp3';
    } else {
      audiourl += '249.mp3';
    }
    conv.contexts.set(ctx, 1, {});
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_6cemetery', (conv) => {
    conv.data.fallbackCount = 0;
    conv.data.previous = ['12_6event','ready','int12_5'];
    const audiourl = host + '247.mp3';
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('12_7cemetery', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    conv.data.previous = ['12_7event',response,'int12_6'];
    if (response === 'one') {
      audiourl += '245.mp3';
    } else if (response === 'two') {
      audiourl += '248.mp3';
      ctx = 'int12_5';
    } else {
      audiourl += '249.mp3';
    }
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
    conv.data.previous = ['13_2event',response,'int13_1'];
    if (response === 'one' || binarr === 'yes') {
      audiourl += '251.mp3';
      conv.data.vpoints++;
      conv.contexts.set('julkaise',1,{d:true})
    } else {
      audiourl += '252.mp3';
      conv.contexts.set('julkaise',1,{d:false})
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('14_1aamu', (conv) => {
    var audiourl = host;
    conv.data.previous = ['14_1event','ready','int13_2'];
    const goodguy = conv.contexts.get('julkaise').parameters;
    if (goodguy['d']) {
      audiourl += '253.mp3';
      conv.contexts.set('julkaise',3,{d:true})
      conv.contexts.set('int15_E',1,{})
    } else {
      audiourl += '254.mp3';
      conv.contexts.set('julkaise',3,{d:false})
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

  app.intent('16_2poliisi', (conv, {response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    conv.data.previous = ['16_2event',response,'int16_1'];
    if (response === 'one') {
      audiourl += '308.mp3';
    } else if (response === 'two') {
      audiourl += '309.mp3';
    } else {
      audiourl += '310.mp3';
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_1faktat', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '311.mp3';
    conv.data.previous = ['17_1event','ready','int16_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_2kelo', (conv) => {
    conv.data.fallbackCount = 0;
    const audiourl = host + '312.mp3';
    conv.data.previous = ['17_2event','ready','int17_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('17_3kelo', (conv,{response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    conv.data.previous = ['17_3event',response,'int17_2'];
    if (response === 'one') {
      conv.contexts.set('int17_3A',1,{});
      audiourl += '313.mp3'
    } else {
      conv.contexts.set('int17_3B',1,{});
      audiourl += '314.mp3'
    }
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

  app.intent('18_2ennustaja', (conv,{response}) => {
    conv.data.fallbackCount = 0;
    var audiourl = host;
    conv.data.previous = ['18_2event',response,'int18_1'];
    if (response === 'one') {
      audiourl += '320.mp3'
    } else {
      audiourl += '321.mp3'
    }
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_3ennustaja', (conv) => {
    //MUTTA trainingiin @response
    const audiourl = host + '322.mp3';
    conv.data.previous = ['18_3event','ready','int18_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('18_4ennustaja', (conv) => {
    const audiourl = host + '322.mp3';
    conv.data.previous = ['18_4event','ready','int18_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('19_1aamu', (conv) => {
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
    var answ = 'else';
    conv.data.testeri = response;
    if (ent19_3 === 'information') {
      audiourl = host + '404.mp3';
      answ = 'information';
    }
    conv.data.previous = ['19_3event',answ,'int19_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_1call', (conv) => {
    const audiourl = host + '406.mp3';
    conv.data.previous = ['20_1event','ready','int19_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_2call', (conv,{ent20_2}) => {
    //HOX MITÄS JOS ent20_2 sisältää one,first,two jne..
    var audiourl = host + '408.mp3';
    if (ent20_2 === 'one') {
      audiourl = host + '407.mp3';
      //TODO
      if (!conv.data.vanamo.includes('20_2event')) {
        conv.data.vpoints++;
        conv.data.vanamo.push('20_2event')
      }
    }
    conv.data.previous = ['20_2event',ent20_2,'int20_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('20_3call', (conv,{ent20_3}) => {
    var audiourl = host + '410.mp3';
    if (ent20_3 === 'one') {
      audiourl = host + '409.mp3';
      //TODO
      if (!conv.data.vanamo.includes('20_3event')) {
        conv.data.vpoints++;
        conv.data.vanamo.push('20_3event')
      }
    }
    conv.data.previous = ['20_3event',ent20_3,'int20_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_1prep', (conv) => {
    const audiourl = host + '411.mp3';
    conv.data.previous = ['21_1event','ready','int20_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_2prep', (conv,{ent21_2}) => {
    var audiourl = host;
    if (ent21_2 === 'one') {
      audiourl += '412.mp3';
    } else if (ent21_2 === 'two') {
      audiourl += '413.mp3';
    } else {
      audiourl += '414.mp3';
    }
    conv.data.previous = ['21_2event',ent21_2,'int21_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_3prep', (conv,{ent21_3}) => {
    var audiourl = host;
    if (ent21_3 === 'one') {
      audiourl += '415.mp3';
      conv.contexts.set('int22A_E',1,{});
    } else {
      conv.contexts.set('int21_3',1,{});
      audiourl += '416.mp3';
    }
    conv.data.previous = ['21_3event',ent21_3,'int21_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('21_4prep', (conv,{ent21_4}) => {
    var audiourl = host;
    if (ent21_4 === 'one') {
      audiourl += '417.mp3';
      conv.contexts.set('int22D_E',1,{});
    } else {
      conv.contexts.set('int22A_E',1,{});
      audiourl += '415.mp3';
    }
    conv.data.previous = ['21_4event',ent21_4,'int21_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22A_1grave', (conv) => {
    const audiourl = host + '418.mp3';
    conv.data.previous = ['22A_1event','ready','int22A_E'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22A_2grave', (conv) => {
    const audiourl = host + '419.mp3';
    conv.data.previous = ['22A_2event','ready','int22A_1'];
    conv.ask(Utils.playSimple(audiourl));
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
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22D_3vanamo', (conv) => {
    const audiourl = host + '425.mp3';
    conv.data.previous = ['22D_3event','ready','int22D_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('22D_4vanamo', (conv) => {
    const audiourl = host + '426.mp3';
    conv.data.previous = ['22D_4event','ready','int22D_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('23_1aftermath', (conv) => {
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
    conv.ask(Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    ));
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
    conv.ask(Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    ));
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
    conv.ask(Utils.playMulti(`<media xml:id="audio1">
      <audio src="${audiourl}"/></media>
    <media xml:id="audio2" begin="audio1.end-0.0s">
      <audio src="${audiourl2}" clipBegin="0s" clipEnd="100s"/>
    </media>`
    ));
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
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_1choice', (conv) => {
    const audiourl = host + '441.mp3';
    conv.data.previous = ['25_1event','ready','int24_5'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_2choice', (conv,{ent25_2}) => {
    var audiourl = host + '442.mp3';
    if (ent25_2 === 'two') {
      audiourl = host + '443.mp3';
    }
    conv.data.previous = ['25_2event',ent25_2,'int25_1'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_3choice', (conv,{ent25_3}) => {
    var audiourl = host + '444.mp3';
    if (ent25_3 === 'two') {
      audiourl = host + '445.mp3';
    }
    conv.data
    conv.data.previous = ['25_3event',ent25_3,'int25_2'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_4choice', (conv) => {
    const audiourl = host + '446.mp3';
    conv.data.previous = ['25_4event','ready','int25_3'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25_5choice', (conv,{binarr}) => {
    var audiourl = host + '447.mp3';
    if (binarr === 'yes') {
      conv.contexts.set('int25A',1,{});
    } else {
      conv.contexts.set('int25B',1,{});
      audiourl = host + '448.mp3';
    }
    if (conv.data.rethink) {
      audiourl = host + '449.mp3';
    }
    conv.data.previous = ['25_5event',binarr,'int25_4'];
    conv.ask(Utils.playSimple(audiourl));
  });

  app.intent('25A_end', (conv,{binarr}) => {
    var audiourl = host;
    if (binarr === 'yes') {
      conv.contexts.set('int26A',1,{});
      if (conv.data.vpoints > 0) {
        audiourl += '450.mp3';
      } else {
        audiourl += '451.mp3';
      }
    } else {
      conv.data.rethink = true;
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
      if (conv.data.vpoints > 0) {
        audiourl += '450.mp3';
      } else {
        audiourl += '451.mp3';
      }
    } else {
      conv.data.rethink = true;
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
    if (conv.data.vpoints > 2) {
      if (conv.data.bpoints > 2) {
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
  });

  app.intent('26BEpilogue', (conv) => {
    var audiourl = host;
    conv.data.previous = ['26Bevent','ready','int26B'];
    if (conv.data.vpoints > 2) {
      if (conv.data.bpoints > 2) {
        audiourl += 'END5.mp3';
      } else {
        audiourl += 'END7.mp3';
      }
    } else {
      if (conv.data.bpoints > 2) {
        audiourl += 'END6.mp3';
      } else {
        audiourl += 'END8.mp3';
      }
    }
    conv.ask(Utils.playSimple(audiourl));
  });
//FALLBACKS
  app.intent('Start - fallback', (conv) => {
    conv.data.fallbackCount++;
    const audiourl = host + '102K.mp3';
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('1_2event', {
        response: "one"
      });
    }
  });

  app.intent('1_2bossresponse - fallback', (conv) => {
    const audiourl = host + '104K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('1_3event', {
        response: "one"
      });
    }
  });

  app.intent('1_3entervanamo - fallback', (conv) => {
    return conv.followup('1_4event', {
      response: "one"
    });
  });

  app.intent('1_4phone - fallback', (conv) => {
    const audiourl = host + '109K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.followup('1_5event', {
        response: "one"
      });
    }
  });

  app.intent('1_5koski - fallback', (conv) => {
    const audiourl = host + '110K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.followup('1_6event', {
        response: "one"
      });
    }
  });

  app.intent('1_6matka - fallback', (conv) => {
    const audiourl = host + '111K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.followup('2_1event', {
        response: "one"
      });
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

  app.intent('3A_1stay - fallback', (conv) => {
    const audiourl = host + '124K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('3A_2event', {
        response: "one"
      });
    }
  });

  app.intent('3A_2round - fallback', (conv) => {
      return conv.followup('3A_4event', {
        response: "one"
      });
  });

  app.intent('3A_3rake - fallback', (conv) => {
      return conv.followup('3A_4event', {
        response: "one"
      });
  });

  app.intent('3A_4wrap - fallback', (conv) => {
      return conv.followup('3D_1event', {
        response: "ready"
      });
  });

  app.intent('3B_1wrap - fallback', (conv) => {
      return conv.followup('3B_2event', {
        response: "ready"
      });
  });

  app.intent('3B_2wrap - fallback', (conv) => {
      return conv.followup('3B_3event', {
        response: "ready"
      });
  });

  app.intent('3B_3call - fallback', (conv) => {
    return conv.followup('3B_4event', {
      response: "one"
    });
  });

  app.intent('3B_4call - fallback', (conv) => {
      return conv.followup('4_1event', {
        response: "ready"
      });
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
    const audiourl = host + '132K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.speak('Yes or no, Taipale?'));
    } else {
      return conv.followup('3D_5event', {
        response: 'one'
      });
    }
  });

  app.intent('3D_5minipeli - fallback', (conv) => {
    const audiourl = host + '132K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.speak('Say ready!'));
    } else {
      return conv.followup('4_1event', {
        response: 'ready'
      });
    }
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

  app.intent('5A_1magnus - fallback', (conv) => {
    const audiourl = host + '141K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < 2) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('5A_2event', {
        response: 'docent'
      });
    }
  });
  //TÄSSÄ NAPATAAN conv, {response?/vai sys.any param?}
  app.intent('5A_2magnus - fallback', (conv) => {
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

  app.intent('5B_1fabritius - fallback', (conv) => {
    const audiourl = host + '144K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('5B_2event', {
        response: 'no'
      });
    }
  });

  app.intent('5B_2fabritius - fallback', (conv) => {
    const audiourl = host + '147K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('5B_3event', {
        response: 'no'
      });
    }
  });

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

  app.intent('5C_1police - fallback', (conv) => {
    const audiourl = host + '152K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('5C_2event', {
        response: 'one'
      });
    }
  });

  app.intent('5C_2police - fallback', (conv) => {
    var audiourl = host + valmis;
    conv.data.fallbackCount++;
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
      audiourl = host + '153K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (conv.data.fallbackCount < fbc) {
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

  app.intent('5C_2police NoInput', (conv) => {
    var audiourl = host + '153K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (conv.data.day === 2) {
      conv.contexts.set('int9E', 1, {});
      return conv.followup('9_1event', {
        response: 'anatomy'
      });
    } else if (conv.data.experts.length === 1) {
      audiourl = host + '153K.mp3';
      conv.contexts.set('magnus', 1, {});
      conv.contexts.set('fabritius', 1, {});
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        return conv.followup('5A_1event', {
          response: 'magnus'
        });
      }
    } else {
      audiourl = host + valmis;
      if (repromptCount < repc) {
        return conv.ask(Utils.playSimple(audiourl));
      } else {
        conv.contexts.set('int6E', 1, {});
        return conv.followup('6_1event', {
          response: 'ready'
        });
      }
    }
  });

  app.intent('6_1ilta - fallback', (conv) => {
    const audiourl = host + '157K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('7_1event', {
        response: 'two'
      });
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
      resp = 'docent';
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

  app.intent('9_1anatomy - fallback', (conv) => {
    return conv.followup('9_2event', {
      response: 'yes'
    });
  });

  app.intent('9_2anatomy - fallback', (conv) => {
    const audiourl = host + '204K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('9_3event', {
        response: 'yes'
      });
    }
  });

  app.intent('9_3anatomy - fallback', (conv) => {
    return conv.followup('9_4event', {
      response: 'ready'
    });
  });

  app.intent('9_4anatomy - fallback', (conv) => {
    return conv.followup('10_1event', {
      response: 'ready'
    });
  });

  app.intent('10_1kuulustelu - fallback', (conv) => {
    const audiourl = host + '208K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
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
      return conv.followup('11A_1event', {
        response: 'telegram'
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
      const audiourl = host + '227K.mp3';
      conv.contexts.set('int11C_1', 1, {});
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
        response: 'telegram'
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
      conv.contexts.set('int11C_1', 1, {});
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
        response: 'telegram'
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

  app.intent('12_1cemetery - fallback', (conv) => {
    const audiourl = host + '240K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('12_2event', {
        response: 'two'
      });
    }
  });

  app.intent('12_2cemetery - fallback', (conv) => {
    //const audiourl = host + '240K.mp3';
    //conv.data.fallbackCount++;
    return conv.followup('12_3event', {
      response: 'ready'
    });
  });

  app.intent('12_3cemetery - fallback', (conv) => {
    //const audiourl = host + '240K.mp3';
    //conv.data.fallbackCount++;
    return conv.followup('12_4event', {
      response: 'ready'
    });
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

  app.intent('12_6cemetery - fallback', (conv) => {
    const audiourl = host + '247K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('12_7event', {
        response: 'two'
      });
    }
  });

  app.intent('12_7cemetery - fallback', (conv) => {
    //const audiourl = host + '240K.mp3';
    //conv.data.fallbackCount++;
    return conv.followup('13_1event', {
      response: 'ready'
    });
  });

  app.intent('13_1toimitus - fallback', (conv) => {
    const audiourl = host + '250K.mp3';
    conv.data.fallbackCount++;
    if (conv.data.fallbackCount < fbc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      conv.data.fallbackCount = 0;
      return conv.followup('13_2event', {
        response: 'two'
      });
    }
  });

  app.intent('14_1aamu - fallback', (conv) => {
    var audiourl = host + valmis;
    conv.data.fallbackCount++;
    const goodguy = conv.contexts.get('julkaise').parameters;
    var contx = 'int14_1';
    if (goodguy['d']) {
      conv.contexts.set('julkaise',1,{d:true})
      contx = 'int15_E'
    } else {
      conv.contexts.set('julkaise',1,{d:false})
      //TODO REAL AUDIOURL
      audiourl = host + valmis;
    }
      conv.contexts.set(ctx,1,{});
      conv.data.fallbackCount = 0;
      return conv.followup('14_1event', {
        response: 'ready'
      });
  });

  app.intent('14_1aamu NoInput', (conv) => {
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    var audiourl = host + valmis;
    const goodguy = conv.contexts.get('julkaise').parameters;
    var contx = 'int14_1';
    if (goodguy['d']) {
      conv.contexts.set('julkaise',1,{d:true});
      contx = 'int15_E';
    } else {
      conv.contexts.set('julkaise',1,{d:false});
      //TODO REAL AUDIOURL
      audiourl = host + valmis;
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

  app.intent('17_3A - NoInput', (conv) => {
    //MUISTA SISÄKONTEKSTIIN ALLAOLEVA
    conv.contexts.set('int17_3A',1,{});
    const audiourl = host + '313K.mp3';
    const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
    if (repromptCount < repc) {
      return conv.ask(Utils.playSimple(audiourl));
    } else {
      return conv.followup('repeat', {
        response: 'repeat'
      });
    }
  });

  app.intent('17_3B - NoInput', (conv) => {
    //MUISTA SISÄKONTEKSTIIN ALLAOLEVA
    conv.contexts.set('int17_3B',1,{});
    const audiourl = host + '314K.mp3';
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
