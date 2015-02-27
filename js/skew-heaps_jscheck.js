Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}  

JSC.on_report(function(str){console.log(str)});

/*
JSC.on_result(function(obj){
    if(obj.ok){
        var ok = 'pased';
    } else {
        var ok = 'failed';
    }
    $(document).ready(function() {
        // paints the view as pure html
        var _render = function ($anchor, $template, data) {
        var template = $template.text() ? $template.text() : $template.html();
        $anchor.setTemplate(template);  // .text() won't work on IE!!!'
        $anchor.processTemplate(data);
        };
          
        _render($('#jTemplates'),$('#sampleTemplate'),
        {
            id: _.uniqueId('context_'),
            test_runs: [
            { id:'passed', value: obj.pass },
            { id:'fail', value: obj.fail },
            { id:'lost', value: obj.lost },
            { id:'test', value: ok },
            ]
        });
    });    
});


JSC.on_fail(function(obj){
    $(document).ready(function() {
        // paints the view as pure html
        var _render = function ($anchor, $template, data) {
        var template = $template.text() ? $template.text() : $template.html();
        $anchor.setTemplate(template);  // .text() won't work on IE!!!'
        $anchor.processTemplate(data);
        };
          
        _render($('#jTemplates'),$('#sampleTemplate'),
        {
            id: _.uniqueId('context_'),
            test: [
            {value: obj.pass },

            ]
        });
    });   
})
*/

function test_invariant(verdict, arr){
	return verdict(invariant(make(arr)));
}

function test_balanced(verdict, arr){
	return verdict(balanced(make(arr)));
}

JSC.claim('testing invariant', test_invariant, [JSC.array(JSC.integer(100), JSC.integer())]);
JSC.claim('testing balanced', test_balanced, [JSC.array(JSC.integer(100), JSC.integer())]);

function test_invariant_whit_deletion(verdict, elements, ops){
	return verdict(invariant(makeWhitPattern(elements, ops)));
}

function test_balanced_whit_deletion(verdict, elements, ops){
	return verdict(balanced(makeWhitPattern(elements, ops)));
}

JSC.claim('testing invariant whit deletion', test_invariant_whit_deletion, 
	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);
JSC.claim('testing balanced whit deletion', test_balanced_whit_deletion, 
	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);

function test_good_whit_deletion(verdict, elements, ops){
	return verdict(good(makeWhitPattern(elements, ops)));
}

//JSC.claim('testing good whit deletion', test_good_whit_deletion, 
//	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);

/* TO DO
function test_insert_tree_againts_priorityqueue(verdict, elements){
    
	return verdict(good(makeWhitPattern(elements, ops)));
}

//JSC.claim('testing good whit deletion', test_insert_tree_againts_priorityqueue, []);
*/

function test_model(verdict, arr){
    var res = make(arr);
    return verdict(model(res).equals(model(res)));
}

JSC.claim('test model', test_model, [JSC.array(JSC.integer(100), JSC.integer())]);


JSC.reps(1000);
JSC.check();