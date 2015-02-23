var pooja = JSON.stringify({
	"status":200,"offset":0,"limit":10,"count":2,"total":2,
	"url":"/v2/dictionaries/ldoce5/entries?headword=donkey",
	"results":[
	{
	"datasets":["ldoce5","dictionary"],
	"headword":"donkey","id":"cqAFAqCMW7","part_of_speech":"noun",
	"pronunciations":[
		{"audio":[{
			"lang":"British English","type":"pronunciation",
			"url":"/v2/dictionaries/assets/ldoce/gb_pron/donkey0205.mp3"
			}],
		"ipa":"ˈdɒŋki"
		},
	{
		"audio":[{
			"lang":"American English","type":"pronunciation",
			"url":"/v2/dictionaries/assets/ldoce/us_pron/donkey.mp3"
			}],
		"ipa":"ˈdɑːŋki","lang":"American English"
	}
	],
	"senses":[{
		"definition":["a grey or brown animal like a horse, but smaller and with long ears"],
		"gramatical_info":{"type":"countable"}
	}],
	"url":"/v2/dictionaries/entries/cqAFAqCMW7"
	},
{
"datasets":["ldoce5","dictionary"],
"headword":"donkey jacket","id":"cqAFAqFDBV","part_of_speech":"noun",
"senses":[{"definition":["a short thick coat, usually very dark blue, with a piece of leather or plastic across the shoulders"]}],
"url":"/v2/dictionaries/entries/cqAFAqFDBV"
}
]
}
);
//    https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=test&apikey=A8x5Zdl19xkxlgaUuErOQc9aufyv5WEH   
// Pooja

iv(id = "div_words")
form
 span
  if isEnabled
   input(type="text" id="input_word" disabled)
  else
   input(type="text" id="input_word")
  button(type="button" id="btn_send") Send

//  • 
// Now