
document.addEventListener('DOMContentLoaded', function() {
  var fb = document.getElementById('fb');
  fb.addEventListener('click',async function() {
      await startFb();
  });
  var ig = document.getElementById('ig');
  ig.addEventListener('click',async function() {
      await startIg();
  });
  var name = document.getElementById('name');
  name.addEventListener('click',function(){
    doInCurrentTab(function(tab){
    chrome.tabs.update(tab.id, {url: 'https://github.com/legendsayantan'});
    });
  });
  var web = document.getElementById('web');
  web.addEventListener('click',function(){
    doInCurrentTab(function(tab){
      chrome.tabs.update(tab.id, {url: 'https://legendsayantan.github.io/autoreact'});
    });
  });
  var git = document.getElementById('git');
  git.addEventListener('click',function(){
    doInCurrentTab(function(tab){
      chrome.tabs.update(tab.id, {url: 'https://github.com/legendsayantan/autoreact'});
    });
  });
});
async function doInCurrentTab(tabCallback) {
  await chrome.tabs.query(
      { currentWindow: true, active: true },
      async function (tabArray) { await tabCallback(tabArray[0]); }
  );
}
async function startFb(){
  var code = 'fbCode.js';
  await doInCurrentTab(async function(tab){
    if(tab.url.includes("m.facebook.com"))
    chrome.scripting.executeScript(
      {
      target: {tabId: tab.id, allFrames: true},
      files: [code],
      },
      () => {}
    );
    else {
      chrome.tabs.update(tab.id,{
        url: 'https://m.facebook.com'
      });
      await new Promise(r => setTimeout(r, 5000));
      chrome.tabs.onUpdated.addListener(function (tabId , info) {
        if (info.status == 'complete' && tabId==tab.id) {
          chrome.scripting.executeScript(
            {
            target: {tabId: tab.id, allFrames: true},
            files: [code],
            },
            () => {}
          );
        }
      });
    }
  });
}
async function startIg(){
  var code = 'InstaCode.js';
  await doInCurrentTab(async function(tab){
    if(tab.url.includes("nstagram.com"))
    chrome.scripting.executeScript(
      {
      target: {tabId: tab.id, allFrames: true},
      files: [code],
      },
      () => {}
    );
    else {
      chrome.tabs.update(tab.id,{
        url: 'https://instagram.com'
      });
      await new Promise(r => setTimeout(r, 5000));
      chrome.tabs.onUpdated.addListener(function (tabId , info) {
        if (info.status == 'complete' && tabId==tab.id) {
          chrome.scripting.executeScript(
            {
            target: {tabId: tab.id, allFrames: true},
            files: [code],
            },
            () => {}
          );
        }
      });
    }
  });
}
async function executeCode(data){
  
}
