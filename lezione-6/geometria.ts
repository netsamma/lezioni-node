namespace Geometria {
	const pigreco = 3.14;
	export function circonferenza(raggio:number){
	   return 2 * pigreco * raggio;
	}
	export function area(raggio:number) {
	   return pigreco * raggio * raggio;
	}
}
export {Geometria}