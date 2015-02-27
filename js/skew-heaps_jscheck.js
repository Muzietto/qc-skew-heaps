JSC.on_report(function(str){console.log(str);});

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
//JSC.claim('testing balanced whit deletion', test_balanced_whit_deletion, 
//	[JSC.array(100, JSC.integer()), JSC.array(100, JSC.one_of([JSC.literal(insert), JSC.literal(deleteMin)]))]);

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


JSC.reps(1000);
JSC.check(1000);