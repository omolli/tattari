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
        return 'Uusi Helsinki newsroom “Miss Vanamo”';
      case '1_4event':
        return 'Taipale’s Office. “All it takes is a good story to get us off the hook!”';
      case '1_5event':
        return 'Taipale’s office. “Guess what I saw? Would you believe it!”';
      case '1_6event':
        return 'Taipale’s office. “What can we afford?“';
      default:
      return 'this is a default text'

    }
  },
  bubblef(e){
    switch (e) {
      case '1_2event':
        return 'How do you answer the editor in chief?';
      case '1_3event':
        return 'How do you reply to Ingrid Vanamo?';
      case '1_4event':
        return '“Hello? Are you there?”';
      case '1_5event':
        return 'How do you answer?';
      case '1_6event':
        return 'What can we afford. Cab, bus or carriage?';
      case '1_7event':
      return 'What do you ask Signe Toivonen?';
      default:
      //return 'Say “ready” to continue'
      return 'Text not yet implemented'

    }
  }
}
module.exports = texts
