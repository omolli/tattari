const texts = {
  bubble(e){
    switch (e) {
      case 'Welcome':
      return 'Welcome to the Dead Are Speaking. This story contains violence and offensive language. Although a work of fiction, the story is based on actual events in Finland in the early 1930s.';
      case '1_1event':
      return 'Monday, September 19th, 1931.';
      case '1_2event':
      return 'Uusi Helsinki newsroom. “Half the bloody edition unsold!”';
      case '1_3event':
      return 'Uusi Helsinki newsroom “Miss Vanamo.”';
      case '1_4event':
      return 'Uusi Helsinki newsroom. “All it takes is a good story to get us off the hook!”';
      case '1_5event':
      return 'Uusi Helsinki newsroom. “Guess what I saw? Would you believe it!”';
      case '1_6event':
      return 'Uusi Helsinki newsroom. “So what can we afford?“';
      case '2_3event':
      return 'Tattarisuo swamp. “It’s not looking good, is it.”';
      case '2_4event':
      return 'Tattarisuo swamp. “Go or stay?”';
      case '3A_1event':
      return 'Tattarisuo swamp. “We could always use an extra hand or two.”';
      case '3A_3event':
      return 'Tattarisuo swamp. “What on earth happened here?”';
      case '3A_4event':
      return 'Tattarisuo swamp. “Civilians are requested to leave now.”';
      case '3B_Eevent':
      return 'Leaving Tattarisuo swamp. “Murder or something else?”';
      case '3B_1event':
      return 'In the cab. “The sight made me sick!”';
      case '3B_2event':
      return 'Uusi Helsinki newsroom. “Express edition!”';
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
      case '4_1event':
      return 'Uusi Helsinki newsroom. “Investigate the case.”';
      case '5A_1event':
      return 'University of Helsinki. “Hammarström.”';
      case '5A_2event':
      return 'University of Helsinki. “First, there’s the name: Tattarisuo!”';
      case '5A_3A':
      return 'University of Helsinki. “Where are we going next?”';
      case '5A_3B':
      return 'University of Helsinki. University of Helsinki. “Continue tomorrow.”'; //todo
      case '5B_1event':
      return 'Outside the Lapinlahti Hospital. “Fabritius.”';
      case '5B_2event':
      return 'Outside the Lapinlahti Hospital. “Abnormal person with deficient mental capacity.”';
      case '5B_3A':
      return 'Outside the Lapinlahti Hospital. “A lust murderer.”';
      case '5B_3B':
      return 'Outside the Lapinlahti Hospital. “The adjunct professor or the police?”'; //todo
      case '5B_3C':
      return 'Outside the Lapinlahti Hospital. “The Department of Anatomy.”'; //todo
      case '5C_1event':
      return 'Helsinki Police Department. “Could you spare us a moment?”';
      case '5C_2event':
      return 'Helsinki Police Department. “The Minister of the Interior?”';
      case '6_1A':
      return 'Uusi Helsinki newsroom. “You have to trust me and my skills.”';
      case '6_1B':
      return 'Uusi Helsinki newsroom. “We worked well together!”'; //todo
      case '7_1event':
      return 'Tuesday, September 20th, 1931.';
      case '9_1event':
      return 'The Department of Anatomy. “I hope I’m making myself clear!”';
      case '9_2event':
      return 'The Department of Anatomy. “Post mortem.”';
      case '9_3A':
      return 'The Department of Anatomy. “No marks of excess violence.”';
      case '9_3B':
      return 'The Department of Anatomy. “Thank you for the information.”'; //todo
      case '9_4event':
      return 'The Department of Anatomy hallway. “The mother-of-all-scoops!”';
      case '10_1event':
      return 'Helsinki Police Department interrogation room. “Start talking!”';
      case '10_2event':
      return 'Helsinki Police Department interrogation room. “Let the man say his piece!”';
      case '10_2eventB':
      return 'Helsinki Police Department Interrogation room. “It’s your word against ours.”'; //todo
      case '10_3eventB':
      return 'Helsinki Police Department interrogation room. “Pigeons?”';
      case '10_3event':
      return 'Helsinki Police Department interrogation room. “The Panacea Society.”';  //todo
      case '10_3eventC':
      return 'Helsinki Police Department interrogation room. “Red guard.”'; //todo
      case '11A_1event':
      return 'Uusi Helsinki newsroom “Did he do it?”';
      case '11A_2event':
      return 'Uusi Helsinki newsroom “I’m actually a little hesitant.”';
      case '11A_2eventB':
      return 'Uusi Helsinki newsroom “Somehow, he was so very... sincere.”';  //todo
      case '11A_3event':
      return '“The suspect - an express edition.”';
      case '11B_1event':
      return 'Hämeentie, Saarenheimo’s home. “He could never ever do anything like that.”';
      case '11B_2event':
      return 'Hämeentie, Saarenheimo’s home. “I can’t take this any longer!”';
      case '11C_1event':
      return 'Aleksis Kiven katu. “Statutum est hominibus mori.”';
      case '11C_2event':
      return 'Aleksis Kiven katu. “There’s the cafe – let\'s go in.”';
      case '11C_3event':
      return 'Sigu’s cafe. “I’m smarter than they think!”';
      case '11C_3eventB':
      return 'Sigu’s cafe. “We don\'t trust the white butchers\' police.”'; //todo
      default:
      return 'this is a default text'


    }
  },
  bubblef(e){
    switch (e) {
      case 'Welcome':
      return 'Say “ready” to continue'
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
