let domainRex = /(?:[a-z0-9-]+\.)+[a-z0-9-]{2,}[.:/]?/ig
let IPRex = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/ig

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(!document.hasFocus()){
            return 0;
        }
        let selection = document.getSelection().toString()
        if (request.defangEvent == "copyDefang"){
            let isDomainPattern = domainRex.test(selection);
            let isIPPattern = IPRex.test(selection)
            if(isDomainPattern || isIPPattern){
                let patternMatch;
                if(isIPPattern){
                    patternMatch = selection.match(IPRex);
                } 
                else if (isDomainPattern) {
                    patternMatch = selection.match(domainRex);
                }
                
                patternMatch.forEach(match => {
                    let lastDot = match.lastIndexOf('.')
                    let sanitizedMatch = match.substring(0,lastDot) + `[.]` + match.substring(lastDot+1, match.length)
                    selection = selection.replaceAll(match, sanitizedMatch);
                    selection = selection.replaceAll('http','hxxp')
                });
            } 
        }
        else if (request.defangEvent =="copyRefang"){
            selection = selection.replaceAll('[.]','.')
            selection = selection.toLowerCase();
            selection = selection.replaceAll(/hxxp/ig, 'http')
        }

        navigator.clipboard.writeText(selection)
        sendResponse({message:'copied'})
        return true;
    }
);