/*
This takes a function, f, and applies it to all pillars.
It returns an object with each pillar as the keys and f('pillar') as the value
*/
/*
Further notes on this function:
	- It maps by hand because it's easy to lose track of types when you use Object.assign()
	- Where the function parameter f returns type T, pillarMap will return an object with
	  a key for each pillar and values of type T.
 */

export {};
