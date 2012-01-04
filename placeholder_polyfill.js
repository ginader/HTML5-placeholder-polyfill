/* unfertig */
(function(){
    var browserKnowsPlaceholder = 'placeholder' in document.createElement('input'),
        allInputs,
        allLabels,
        labelsIndex = {},
        i,
        l;
    var buildMarkup = function(input,label){
        console.log(input);
        console.log(label);
        var text = input.getAttribute('placeholder');
        if(!text){
            return;
        }
        var placeholder = document.createElement('span');
        placeholder.className = 'placeholder';
        var placeholderText = document.createTextNode(text);
        placeholder.appendChild(placeholderText);
        label.appendChild(placeholder);
        //console.log(html);
    };
    if(!browserKnowsPlaceholder){
        console.log('ok, wir brauchen einen polyfill für placeholder');
        allLabels = document.getElementsByTagName('label');
        if(!allLabels){
            return; // keine Label elemente vorhanden
        }
        for(i=0,l=allLabels.length;i<l;i++){
            var la = allLabels[i];
            var f = la.htmlFor;
            if(!f){
                continue;
            }
            labelsIndex[f] = la;
        }
        console.log(labelsIndex);
        allInputs = document.getElementsByTagName('input');
        if(!allInputs){
            return; // keine input elemente vorhanden
        }
        for(i=0,l=allInputs.length;i<l;i++){
            var input = allInputs[i];
            if(input.type == 'text'){
                if(!input.id){
                    console.log('input hat keine id');
                    continue;
                }
                var label = labelsIndex[input.id];
                if(!label){
                    console.log('input hat kein label');
                    continue;
                }
                buildMarkup(input,label);
            }
        }
    }
})();
