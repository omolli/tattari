const texts = {
  bubble(e){
    switch (e) {
      case 'Welcome':
        return 'Welcome to the Dead Are Speaking. This story contains violence and offensive language.Although a work of fiction, the story is based on actual events in Finland in the early 1930s. The game is optimised for Google Home smart speakers. Other devices may have limited functionality. At any point, you can say “hey google, repeat” to go back and repeat the current scene. When the game is quiet, it waits for your answer.  Say “ready” to continue.';
      case '1_1event':
        return 'Intro';
      case '1_2event':
        return 'Uusi Helsinki newsroom. “Half the bloody edition unsold!”';
      case '1_3event':
        return ['104K','int1_3','1_4event','one'];
      case '1_4event':
        return ['107K','int1_4','1_5event','ready'];
      case '1_5event':
        return ['109K','int1_5','1_6event','two'];
      case '1_6event':
        return ['110K','int1_6','1_7event','one'];
      case '1_7event':
      return ['111K','int1_7','2_1event','one'];
      case '2_2event':
      default:
      return 'this is a default text'

    }
  },
  bubblef(e){
    switch (e) {
      case 'Welcome':
        return 'Welcome to the Dead Are Speaking. This story contains violence and offensive language.Although a work of fiction, the story is based on actual events in Finland in the early 1930s. The game is optimised for Google Home smart speakers. Other devices may have limited functionality. At any point, you can say “hey google, repeat” to go back and repeat the current scene. When the game is quiet, it waits for your answer.  Say “ready” to continue.';
      case '1_1event':
        return 'Intro';
      case '1_2event':
        return 'Uusi Helsinki newsroom. “Half the bloody edition unsold!”';
      case '1_3event':
        return ['104K','int1_3','1_4event','one'];
      case '1_4event':
        return ['107K','int1_4','1_5event','ready'];
      case '1_5event':
        return ['109K','int1_5','1_6event','two'];
      case '1_6event':
        return ['110K','int1_6','1_7event','one'];
      case '1_7event':
      return ['111K','int1_7','2_1event','one'];
      case '2_2event':
      default:
      return 'Say “ready” to continue'

    }
  }
}
module.exports = texts
