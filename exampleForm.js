var apiKey = 'a95fbc5acef9972bc750be31b623720c8fb3c4fa';

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	
	document.getElementById('news_submit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		if (document.getElementById('newsCategory').value != "blank" && document.getElementById('keyword').value == '')
		{
			var category = document.getElementById('newsCategory').value;
			req.open('GET', 'http://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&dedup=true&rank=high&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=' + category + '&return=enriched.url.url,enriched.url.title&apikey=a95fbc5acef9972bc750be31b623720c8fb3c4fa', true);
		}

		else if (document.getElementById('keyword').value != '' && document.getElementById('newsCategory').value == "blank")
		{
			var keyword = document.getElementById('keyword').value;
			req.open('GET', 'http://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&dedup=true&rank=high&q.enriched.url.enrichedTitle.keywords.keyword.text=' + keyword + '&return=enriched.url.url,enriched.url.title&apikey=a95fbc5acef9972bc750be31b623720c8fb3c4fa', true);
		}

		else if (document.getElementById('keyword').value != '' && document.getElementById('newsCategory').value != "blank")
		{
			var category = document.getElementById('newsCategory').value;
			var keyword = document.getElementById('keyword').value;
			req.open('GET', 'http://gateway-a.watsonplatform.net/calls/data/GetNews?outputMode=json&start=now-1d&end=now&count=5&dedup=true&rank=high&q.enriched.url.enrichedTitle.taxonomy.taxonomy_.label=' + category + '&q.enriched.url.enrichedTitle.keywords.keyword.text=' + keyword + '&return=enriched.url.url,enriched.url.title&apikey=a95fbc5acef9972bc750be31b623720c8fb3c4fa', true);
		}

		
		/*
		--- Request Parameters ---
		outputMode = 'json'
		start = 'now-1d'
		end = 'now'
		count = 5
		dedup = 'true'
		rank = 'high'
		returnInfo = 'enriched.url.url,enriched.url.title'
		q.enriched.url.enrichedTitle.keywords.keyword.text = keyword
		URL = 'gateway-a.watsonplatform.net/calls/data/GetNews'
		*/

		
		req.addEventListener('load', function(){
			if (!(req.status >= 200 && req.status < 400))
				alert(req.statusText);
			else{
			var response = JSON.parse(req.responseText);
			var newsArray = [];
			newsArray = response.result.docs;
			
			document.getElementById('returnTitle1').textContent = newsArray[0].source.enriched.url.cleanedTitle;
			document.getElementById('returnURL1').textContent = newsArray[0].source.enriched.url.url;

			document.getElementById('returnTitle2').textContent = newsArray[1].source.enriched.url.cleanedTitle;
			document.getElementById('returnURL2').textContent = newsArray[1].source.enriched.url.url;

			document.getElementById('returnTitle3').textContent = newsArray[2].source.enriched.url.cleanedTitle;
			document.getElementById('returnURL3').textContent = newsArray[2].source.enriched.url.url;

			document.getElementById('returnTitle4').textContent = newsArray[3].source.enriched.url.cleanedTitle;
			document.getElementById('returnURL4').textContent = newsArray[3].source.enriched.url.url;

			document.getElementById('returnTitle5').textContent = newsArray[4].source.enriched.url.cleanedTitle;
			document.getElementById('returnURL5').textContent = newsArray[4].source.enriched.url.url;
			}
		})
	
		req.send(null);
		event.preventDefault();
	});
}


