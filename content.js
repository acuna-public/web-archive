	function show (url) {
		chrome.tabs.create ({
			url: 'https://web.archive.org/web/*/' + url
		});
	}
	
	function save (info, tab) {
		
		var url = info.linkUrl || tab.url;
		
		chrome.tabs.create ({
			url: 'https://web.archive.org/save/' + url
		});
		
	}
	
	function showMenu (info, tab) {
		
		var url = info.linkUrl || tab.url;
		
		chrome.tabs.create ({
			url: 'https://web.archive.org/web/*/' + url
		});
		
	}
	
	chrome.browserAction.onClicked.addListener (function (tab) {
		show (tab.url);
	});
	
	chrome.contextMenus.create ({
		'title': 'Show this page on web.archive.org',
		'contexts': ['page'],
		'onclick': showMenu
	});
	
	var parentId = chrome.contextMenus.create (
		{
			'title': 'web.archive.org',
			'contexts': ['link']
		},
		
		function () {
			
			chrome.contextMenus.create ({
				
				'parentId': parentId,
				'title': 'Search link',
				'contexts': ['link'],
				'onclick': show
				
			});
			
			chrome.contextMenus.create ({
				
				'parentId': parentId,
				'title': 'Save page',
				'contexts': ['link'],
				'onclick': save
				
			});
			
		}
		
	);