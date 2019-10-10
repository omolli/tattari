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
      return 'Uusi Helsinki newsroom. “Miss Vanamo!”';
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
      return 'Helsinki Police Department interrogation room. “Pigeons?”'; //todo
      case '10_3event':
      return 'Helsinki Police Department interrogation room. “The Panacea Society.”';  //todo
      case '10_3eventC':
      return 'Helsinki Police Department interrogation room. “Red guard.”'; //todo
      case '11A_1event':
      return 'Uusi Helsinki newsroom. “Did he do it?”';
      case '11A_2event':
      return 'Uusi Helsinki newsroom. “I’m actually a little hesitant.”';
      case '11A_2eventB':
      return 'Uusi Helsinki newsroom. “Somehow, he was so very... sincere.”';  //todo
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
      return 'Sigu\'s cafe. “I’m smarter than they think!”';
      case '11C_3eventB':
      return 'Sigu\'s cafe. “We don\'t trust the white butchers\' police.”'; //todo
      case '12_1event':
      return 'Malmi Cemetery. “Malmi is my beat.”';
      case '12_2event':
      return 'Malmi Cemetery. “Down you go, into the grave.”';
      case '12_3event':
      return 'Malmi Cemetery. “We have to get hold of those papers!”';
      case '12_4event':
      return 'Malmi Cemetery. “What do you want?”';
      case '12_5event':
      return 'Malmi Cemetery. “They\'ve found something strange in a grave!”';
      case '12_5eventB':
      return 'Malmi Cemetery. “This investigation is no longer his business.”'; //todo
      case '12_5eventC':
      return 'Malmi Cemetery. “What a frightful state!”'; //todo
      case '12_5eventD':
      return 'Malmi Cemetery. “What a disgrace.”'; //todo
      case '12_6event':
      return 'Malmi Cemetery. “What is it this time?”';
      case '12_7event':
      return 'Malmi Cemetery. “They’ve found something strange in a grave!”';
      case '12_7eventB':
      return 'Malmi Cemetery. “What a frightful state!”'; //todo
      case '12_7eventC':
      return 'Malmi Cemetery. “What a disgrace.”'; //todo
      case '13_1event':
      return 'Uusi Helsinki newsroom. “These papers must be made public!”';
      case '13_2event':
      return 'Uusi Helsinki newsroom. “It\'s going to be a great article!”';
      case '13_2eventB':
      return 'Uusi Helsinki newsroom. “Oh well, it\'s your decision.”'; //todo
      case '14_1event':
      return 'Wednesday, September 21st, 1931.';
      case '14_2event':
      return 'Uusi Helsinki newsroom. “I published the papers after you\'d left.”';
      case '15_1event':
      return 'Uusi Helsinki newsroom. “There\'s quite a bunch of letters…”';
      case '15_2event':
      return 'Uusi Helsinki newsroom. “The moles of the Lapua Movement.”';
      case '15_3event':
      return 'Uusi Helsinki newsroom. “The dream.”';
      case '15_4event':
      return 'Uusi Helsinki newsroom. “A mental outpatient!”';
      case '15_5event':
      return 'Uusi Helsinki newsroom. “Damnation and grief! May explode!”';
      case '16_1event':
      return 'Uusi Helsinki newsroom. “Consider yourselves lucky.”';
      case '16_2event':
      return 'Uusi Helsinki newsroom. “Surely you have some common sense!”';
      case '16_2eventB':
      return 'Uusi Helsinki newsroom. “This is police business!”'; //todo
      case '17_1event':
      return 'Uusi Helsinki newsroom. “We\'re supposed to write something for tomorrow’s paper.”';
      case '17_2event':
      return 'Uusi Helsinki newsroom. “Good luck with the investigation.”';
      case '17_3event':
      return 'Uusi Helsinki newsroom. “An appointment with the fortune-teller Widen?”';
      case '18_1event':
      return 'Josafatinkatu, fortune teller\'s home. “What\'s your business then?”';
      case '18_2event':
      return 'Josafatinkatu, fortune teller\'s home. “We\'ll see if there\'s anything coming your way.”';
      case '18_3event':
      return 'Josafatinkatu, fortune teller\'s home. “I must concentrate!”';
      case '18_4event':
      return 'Josafatinkatu “Quite an extraordinary meeting.”';
      case '19_1event':
      return 'Thursday, September 22nd, 1931.';
      case '19_2event':
      return 'Uusi Helsinki newsroom. “Who would send us something like this?”';
      case '19_3event':
      return 'Uusi Helsinki newsroom. “Looks quite fresh to me.”';
      case '19_3eventB':
      return 'Uusi Helsinki newsroom. “Good idea.”'; //todo
      case '20_1event':
      return 'Uusi Helsinki newsroom. “I need your help.”';
      case '20_2event':
      return 'Uusi Helsinki newsroom. “You can\'t tell me?”';
      case '20_2eventB':
      return 'Uusi Helsinki newsroom. “Last night?”'; //todo
      case '20_3event':
      return 'Uusi Helsinki newsroom. “It was marked only with your name..”';
      case '21_1event':
      return 'Malmi Cemetery. “Would you say you\'re a brave person?”';
      case '21_2event':
      return 'Malmi Cemetery. “My plan\'s this…”';
      case '21_3event':
      return 'Malmi Cemetery. “I knew I could rely on you.”';
      case '21_3eventB':
      return 'Malmi Cemetery. “In that case, I will.”'; //todo
      case '21_4event':
      return 'Malmi Cemetery. “The decision has been made.”';
      case '21_4eventB':
      return 'Malmi Cemetery. “I knew I could rely on you.”'; //todo
      case '22A_1event':
      return 'Malmi Cemetery. “Not much padding in a pauper\'s coffin…”';
      case '22A_2event':
      return 'Malmi Cemetery. “Be careful.”';
      case '22A_3event':
      return 'Malmi Cemetery. “We may have a long night ahead of us…”';
      case '22B_1event':
      return 'Malmi Cemetery. “The dead are speaking.”';
      case '22B_2event':
      return 'Malmi Cemetery. “Brother of the Minister of the Interior!”';
      case '22D_1event':
      return 'Malmi Cemetery.  “It feels really bad to put you in there, Miss.”';
      case '22D_2event':
      return 'Malmi Cemetery. “All we can do is wait.”';
      case '22D_3event':
      return 'Malmi Cemetery. “Something\'s happening here!”';
      case '22D_4event':
      return 'Malmi Cemetery. “Something\'s happening here!”';
      case '23_1event':
      return 'Malmi Cemetery. “He\'s losing blood fast!”';
      case '23_2event':
      return 'Malmi Cemetery. “You can ride in the back of the car with the grave robbers.”';
      case '24_1event':
      return 'Police car. “The dead will arise for the great reckoning.”';
      case '25_1event':
      return 'Uusi Helsinki newsroom. “It\'s unbelievable that the third person was Minister Rivasto\'s brother!”';
      case '25_2event':
      return 'Uusi Helsinki newsroom. “Black sheep of the family."';
      case '25_3event':
      return 'Uusi Helsinki newsroom. “Good evening and good luck.”';
      case '25_4event':
      return 'Uusi Helsinki newsroom. “What are we going to do?”';
      case '25_5event':
      return 'Uusi Helsinki newsroom. “Are you sure?”';
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
      case '4_1event':
      return '“The professor, the physician or the police?”';
      case '5A_1event':
      return '“Adjunct Professor”';
      case '5A_2event':
      return '“What do you think?”';
      case '5A_3A':
      return 'University of Helsinki. “Where are we going next?”';
      case '5A_3B':
      return 'University of Helsinki. University of Helsinki. “Continue tomorrow.”'; //todo
      case '5B_1event':
      return '“Are you already familiar with the hospital?”';
      case '5B_2event':
      return '“Would you like to hear my precise opinion?”';
      case '5B_3A':
      return 'Outside the Lapinlahti Hospital. “A lust murderer.”';
      case '5B_3B':
      return 'Outside the Lapinlahti Hospital. “The adjunct professor or the police?”'; //todo
      case '5B_3C':
      return 'Outside the Lapinlahti Hospital. “The Department of Anatomy.”'; //todo
      case '5C_1event':
      return 'Helsinki Police Department. “How do you answer the clerk?”';
      case '5C_2event':
      return 'Helsinki Police Department. “The Minister of the Interior?”';
      case '6_1A':
      return 'Who do you blame in the article?';
      case '6_1B':
      return 'Who do you blame in the article?'; //todo
      case '7_1event':
      return 'Tuesday, September 20th, 1931.'; //todo tahan en osaa laittaa K-versioita t. rauli
      case '9_1event':
      return '“I hope I\'m making myself clear!”';
      case '9_2event':
      return '“Would you like to hear more?”';
      case '9_3A':
      return 'The Department of Anatomy. “No marks of excess violence.”';
      case '9_3B':
      return 'The Department of Anatomy. “Thank you for the information.”'; //todo
      case '9_4event':
      return 'The Department of Anatomy hallway. “The mother-of-all-scoops!”';
      case '10_1event':
      return 'What will you say?';
      case '10_2event':
      return 'Helsinki Police Department interrogation room. “Let the man say his piece!”';
      case '10_2eventB':
      return 'Helsinki Police Department Interrogation room. “It\'s your word against ours.”'; //todo
      case '10_3eventB':
      return '“Article, wife or café?”'; //todo
      case '10_3event':
      return '“Article, wife or café?”';  //todo
      case '10_3eventC':
      return '“Article, wife or café?”'; //todo
      case '11A_1event':
      return '“Did he do it?”';
      case '11A_2event':
      return 'Are you going to mention Saarenheimo\'s name in the express edition?';
      case '11A_2eventB':
      return 'Are you going to mention Saarenheimo\'s name in the express edition?';  //todo
      case '11A_3event':
      return '“The wife or the café owner?”';
      case '11B_1event':
      return '“What do you ask Alma Saarenheimo?”';
      case '11B_2event':
      return 'How do you reply?';
      case '11C_1event':
      return 'How do you reply?';
      case '11C_2event':
      return 'What do you ask Signe Toivonen?';
      case '11C_3event':
      return 'Sigu\'s cafe. “I\'m smarter than they think!”';
      case '11C_3eventB':
      return 'Sigu\'s cafe. “We don\'t trust the white butchers\' police.”'; //todo
      case '12_1event':
      return '“How about a drink, Taipale?”';
      case '12_2event':
      return 'Malmi Cemetery. “Down you go, into the grave.”';
      case '12_3event':
      return 'Malmi Cemetery. “We have to get hold of those papers!”';
      case '12_4event':
      return 'What will you say?';
      case '12_5event':
      return 'Malmi Cemetery. “They’ve found something strange in a grave!”';
      case '12_5eventB':
      return 'Malmi Cemetery. “This investigation is no longer his business.”'; //todo
      case '12_5eventC':
      return 'Malmi Cemetery. “What a frightful state!”'; //todo
      case '12_5eventD':
      return 'Malmi Cemetery. “What a disgrace.”'; //todo
      case '12_6event':
      return 'What will you say?';
      case '12_7event':
      return 'Malmi Cemetery. “They\'ve found something strange in a grave!”';
      case '12_7eventB':
      return 'Malmi Cemetery. “What a frightful state!”'; //todo
      case '12_7eventC':
      return 'Malmi Cemetery. “What a disgrace.”'; //todo
      case '13_1event':
      return 'Are you going to print the information?';
      case '13_2event':
      return 'Uusi Helsinki newsroom. “It’s going to be a great article!”';
      case '13_2eventB':
      return 'Uusi Helsinki newsroom. “Oh well, it’s your decision.”'; //todo
      case '14_1event':
      return 'Wednesday, September 21st, 1931.';
      case '14_2event':
      return 'Uusi Helsinki newsroom. “I published the papers after you\'d left.”';
      case '15_1event':
      return '“Shall I read the next one?”';
      case '15_2event':
      return '“Shall I read more?”';
      case '15_3event':
      return '“Shall I go on?”';
      case '15_4event':
      return '“Should I read the last one?”';
      case '15_5event':
      return 'How do you reply?';
      case '16_1event':
      return 'How do you reply?';
      case '16_2event':
      return 'Uusi Helsinki newsroom. “Surely you have some common sense!”';
      case '16_2eventB':
      return 'Uusi Helsinki newsroom. “This is police business!”'; //todo
      case '17_1event':
      return '“Is this reporter Taipale’s office?”';
      case '17_2event':
      return 'Uusi Helsinki newsroom. “Good luck with the investigation.”';
      case '17_3event':
      return 'Uusi Helsinki newsroom. “An appointment with the fortune-teller Widen?”';
      case '18_1event':
      return 'How do you answer Mrs Widen?';
      case '18_2event':
      return 'What do you say?';
      case '18_3event':
      return 'Josafatinkatu, fortune teller\'s home. “I must concentrate!”';
      case '18_4event':
      return 'Josafatinkatu “Quite an extraordinary meeting.”';
      case '19_1event':
      return '“Which of us will open it?”';
      case '19_2event':
      return '“What do you tell Vanamo?”';
      case '19_3event':
      return '“Taipale, is that you?”';
      case '19_3eventB':
      return '“Taipale, is that you?”'; //todo
      case '20_1event':
      return 'How do you answer Vanamo?';
      case '20_2event':
      return 'How do you answer Vanamo?';
      case '20_2eventB':
      return 'How do you answer Vanamo?'; //todo
      case '20_3event':
      return 'Uusi Helsinki newsroom. “It was marked only with your name..”';
      case '21_1event':
      return 'How do you reply?';
      case '21_2event':
      return 'Malmi Cemetery. “My plan\'s this…”';
      case '21_3event':
      return 'Malmi Cemetery. “I knew I could rely on you.”';
      case '21_3eventB':
      return 'Malmi Cemetery. “In that case, I will.”'; //todo
      case '21_4event':
      return 'Malmi Cemetery. “The decision has been made.”';
      case '21_4eventB':
      return 'Malmi Cemetery. “I knew I could rely on you.”'; //todo
      case '22A_1event':
      return 'Invent a first name for Taipale.';
      case '22A_2event':
      return '“Do you hear me?”';
      case '22A_3event':
      return 'Malmi Cemetery. “We may have a long night ahead of us…”';
      case '22B_1event':
      return 'Say “Rolf Rivasto” to continue.';
      case '22B_2event':
      return 'Malmi Cemetery. “Brother of the Minister of the Interior!”';
      case '22D_1event':
      return 'Invent a first name for Taipale.';
      case '22D_2event':
      return 'Malmi Cemetery. “All we can do is wait.”';
      case '22D_3event':
      return 'Malmi Cemetery. “Something\'s happening here!”';
      case '22D_4event':
      return 'Malmi Cemetery. “Something\'s happening here!”';
      case '23_1event':
      return 'How do you reply?';
      case '23_2event':
      return 'Malmi Cemetery. “You can ride in the back of the car with the grave robbers.”';
      case '24_1event':
      return 'Police car. “The dead will arise for the great reckoning.”';
      case '25_1event':
      return 'How do you answer Minister Rivasto?';
      case '25_2event':
      return 'How do you answer?';
      case '25_3event':
      return 'Uusi Helsinki newsroom. “Good evening and good luck.”';
      case '25_4event':
      return '“Are we going to expose the minister\'s brother or not?”';
      case '25_5event':
      return '“Are you absolutely sure?”';
      default:
      return 'Text not yet implemented';

    }
  }
}
module.exports = texts
