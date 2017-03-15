function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'ms: multiple search  '
  });
}

resetDefaultSuggestion();

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  // Suggestion code will end up here.
});

chrome.omnibox.onInputCancelled.addListener(function() {
  resetDefaultSuggestion();
});

function navigate(text) {

	var url = findURL(text);
	
if( url != ''){	
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
}
else{

	var querying = browser.tabs.query({currentWindow: true});
	querying.then(function(tabs){

		for (let tab of tabs) {
	   	 // tab.url requires the `tabs` permission
  			  console.log(tab.url);
 			 }
		console.log("tab url is::::"+tabs.url);
		}, null);

}
}

chrome.omnibox.onInputEntered.addListener(function(text) {
  navigate(text);
});


function findURL(text){
	var parts = text.split(" ");
	var partOne = parts[0];
	var searchURL = findSearchEngin(partOne);


	console.log("Search URL"+searchURL);
	if(searchURL == ''){
		return '';
	}
	console.log(searchURL);
	var  queryParts = [];


  parts.forEach(part => {
    if (parts.indexOf(part) != 0) {
      queryParts.push(part);
    }
  });

	query = queryParts.join(' ');
		
	console.log(queryParts);

	
	return searchURL+query;
}

function findSearchEngin(searchEngText){
	
	if(searchEngText == 'w'){
		return 'https://wikipedia.org/wiki/Search?search=';
	}
	else if(searchEngText == 'g'){
		return 'https://www.google.co.in/search?q=';
	}
	else if(searchEngText == 'b'){
		return 'http://www.bing.com/search?q=';
	}
	else if(searchEngText == 'd'){
		return 'https://duckduckgo.com/?q=';
	}
	else if(searchEngText == 'y'){
		return 'https://www.youtube.com/results?search_query=';
	}
	else if(searchEngText == 't'){
                return 'https://twitter.com/search?q=';
        }
	else if(searchEngText == 'gh'){
                return 'https://github.com/search?q=';
        }
	else if(searchEngText == 'ya'){
                return 'https://www.yandex.com/search/?text=';
        }
	else if(searchEngText == 'wp'){
                return 'https://en.search.wordpress.com/?src=organic&q=';
        }
	else if(searchEngText == 'a'){
                return 'https://www.amazon.com/s/field-keywords=';
        }
	else if(searchEngText == 's'){
		return 'http://stackoverflow.com/search';
	}
	return '';
}
