# The Dead Are Speaking
The Dead Are Speaking is an interactive audio drama in a form of a detective story happening in 1930s Helsinki, based on on real events. The game has multiple branching paths and endings having more than 3 hours of content,
one playthrough taking about 80mins. The game supports saving the game state for verified users. This repo contains source code for the game, designed as an conversational action (app) for Google Home smart speakers 
and other Google Assistant devices. Alas, the turndown of Conversational Actions occurred on June 13, 2023, and thus, the audio drama went down with it.

## Technology 
The conversational action was created with Dialogflow, using Googles NLU (Natural Language Understanding) features for creating conversational applications which was integrated into an Actions Project,
in order to make it accessible for Google Assistant. Dialogflow was responsible for handling and matching of the intents, or the scenes of the drama, containing contexts and the expected phrases to match what the user was saying.
Dialogflow project is included as a .zip-file. The state, handling of the logic and providing the content such as retrieval of audiofiles was implemented with Google Cloud functions for Firebase webhooks, using Google's Node.js library,
residing in index.js file. The files were hosted in Firebase.
