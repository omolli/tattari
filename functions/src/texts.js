const texts = {
  bubble(e){
    switch (e) {
      case 'Welcome':
      return 'Welcome to the Dead Are Speaking. This story contains violence and offensive language. Although a work of fiction, the story is based on actual events in Finland in the early 1930s. The game is optimised for Google Home smart speakers. Other devices may have limited functionality. At any point, you can say “hey google, repeat” to go back and repeat the current scene. When the game is quiet, it waits for your answer.  Say “ready” to continue.';
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
      case '2_3event':
      return 'Tattarisuo swamp. “ It’s not looking good, is it.”';
      case '2_4event':
      return 'Tattarisuo swamp. “Go or stay?”';
      case '3A_1event':
      return 'Tattarisuo swamp. “We could always use an extra hand or two.”';
      case '3A_3event':
      return 'Tattarisuo swamp. “What on earth happened here?”';
      case '3A_4event':
      return 'Tattarisuo swamp. “Civilians are requested to leave now.”';
      case '3B_Eevent':
      return 'Tattarisuo swamp. “Murder or something else?”';
      case '3B_1event':
      return 'In the cab. “The sight made me sick!”';
      case '3B_2event':
      return 'Uusi Helsinki newsroom. “Express edition.”';
      case '3B_3event':
      return 'Uusi Helsinki newsroom. “Off the case!”';
      case '3B_4event':
      return 'Uusi Helsinki newsroom. “I don’t trust those suits!”';
      case '3D_2event':
      return 'Uusi Helsinki newsroom. “Feet?”';
      case '3D_3event':
      return 'Uusi Helsinki newsroom. “Fingers?”';
      case '3D_4event':
      return 'Uusi Helsinki newsroom. “Would you like to change the numbers?”';
      case '3D_5event':
      return 'Uusi Helsinki newsroom. “Get to it!”';
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
      case '2_1event':
      return 'What do you ask Signe Toivonen?';
      case '2_2event':
      return 'How do you reply?';
      case '2_3event':
      return 'How do you answer Anders Kelo?';
      case '2_4event':
      return 'Tattarisuo swamp. “Go or stay?”';
      case '3A_1event':
      return 'Are we going to comb the swamp or walk around it?';
      case '3A_3event':
      return 'Tattarisuo swamp. “What on earth happened here?”';
      case '3A_4event':
      return 'Tattarisuo swamp. “Civilians are requested to leave now.”';
      case '3B_Eevent':
      return 'Tattarisuo swamp. “Murder or something else?”';
      case '3B_1event':
      return 'In the cab. “The sight made me sick!”';
      case '3B_2event':
      return 'Uusi Helsinki newsroom. “Express edition.”';
      case '3B_3event':
      return '“Do you hear me?”';
      case '3B_4event':
      return 'Uusi Helsinki newsroom. “I don’t trust those suits!”';
      case '3D_1event':
      return 'Uusi Helsinki newsroom. “Hands?”';
      case '3D_2event':
      return 'Uusi Helsinki newsroom. “Feet?”';
      case '3D_3event':
      return 'Uusi Helsinki newsroom. “Fingers?”';
      case '3D_4event':
      return 'Uusi Helsinki newsroom. “Would you like to change the numbers?”';
      case '3D_5event':
      return 'Uusi Helsinki newsroom. “Get to it!”';
      default:
      return 'Text not yet implemented'

    }
  }
}
module.exports = texts
