const utils = {

  playAudio(srcurl, startPoint, endPoint){
    return `<speak><par><media><audio src="${srcurl}" clipBegin="${startPoint}s" clipEnd="${endPoint}s"/></media></par><prosody volume ="silent">a</prosody></speak>`
  },
  playSimple(srcurl){
    return `<speak><par><media><audio src="${srcurl}" /></media></par><prosody volume ="silent">a</prosody></speak>`
  },
  speak(content){
    return `<speak>${content}</speak>`
},
  //do we need? instead of speak?
  playMulti(content){
    return `<speak><par>${content}</par><prosody volume ="silent">a</prosody></speak>`
  },

  appender(str,chr){
    if (str.indexOf(chr) === -1) {
      return str += chr;
    } else {
      return str;
    }
  },
  //A helper to determine to which question the player points to (based on the previous question)
  switcher(arg1,arg2){
    switch (arg1) {
      case 'one':
        if (arg2 === 'A'){
          return 'see';
        } else {
          return 'why';
        }
      case 'two':
        if (arg2 === 'B' || arg2 === 'A'){
          return  'when';
        } else {
          return 'see';
        }
      case 'three':
        if (arg2 === 'D') {
          return 'when';
        } else {
          return 'have'
        }
      case 'four':
      if (arg2 === 'B' || arg2 === 'A'){
        return  'have';
      } else {
        return 'why';
      }
        //etc.. if needed
      default:
        return 'kysy';
    }
  },
  selector(choices,response) {
    switch (response) {
      case 'one':
        return choices[0];
      case 'two':
        return choices[1];
      case 'three':
        if (choices.length > 2) {
          return choices[2];
        } else {
          return 'notresponse';
        }
      default:
        return 'notresponse';
    }
  },
  pusher(str) {
    var choices = [];
    var url = '';
    if (str.indexOf('A') === -1) {
      choices.push('do');
      url += '1';
    }
    if (str.indexOf('B') === -1) {
      choices.push('part');
      url += '2';
    }
    if (str.indexOf('C') === -1) {
      choices.push('long');
      url += '3';
    }
    if (str.indexOf('D') === -1) {
      choices.push('pigeon');
      url += '4'
      }
    if (str.indexOf('E') === -1) {
      choices.push('pond');
      url += '5';
      }
      return [url,choices];
    },

    shortcutter(day,cut){
      switch (day) {
        case 'one':
        switch (cut) {
          case 'one':
          return ['1_5event','one','int4'];
          case 'two':
          return ['2_4event','one','int2_3'];
          case 'three':
          return ['3D_1event','ready','int3A_4'];
          case 'four':
          return ['4_1event','ready','int4_E'];
          default:
          return ['notgood','ready','int4_E'];
        }
        case 'two':
        switch (cut) {
          case 'one':
          return ['9_4event','ready','int9_3'];
          case 'two':
          return ['12_1event','ready','int12_E'];
          case 'three':
          return ['13_1event','ready','int13_E'];
          default:
          return ['notgood','ready','int13_E'];
        }
        case 'three':
        switch (cut) {
          case 'one':
          return ['17_2event','ready','int17_1'];
          case 'two':
          return ['18_1event','ready','int18_E'];
          default:
          return ['notgood','ready','int13_E'];
        }
        default:
        switch (cut) {
          case 'one':
          return ['19_1event','ready','int18_4'];
          case 'two':
          return ['20_1event','ready','int19_3'];
          case 'three':
          return ['21_3event','two','int21_2'];
          case 'four':
          return ['24_1event','ready','int23_2'];
          case 'five':
          return ['25_4event','ready','int25_3'];
          default:
          return ['notgood','ready','int13_E'];
        }

      }
    }
}



module.exports = utils
