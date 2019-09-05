//noInput
app.intent('XXX NoInput', (conv) => {
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


//fallback

app.intent('XXX - fallback', (conv) => {
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
