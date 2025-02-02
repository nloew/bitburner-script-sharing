import { findallminmax, minmaxsum } from "AlgorithmicStockTraderII.ns"
/** @param {NS} ns **/
export async function main(ns) {
	const filename = ns.args[0]
	const server = ns.args[1]
	const data = ns.codingcontract.getData(filename, server)
	const solution = stockTrade4(data[0], data[1])
	ns.tprint("Solution: " + solution)
	const result = ns.codingcontract.attempt(solution, filename, server)
	ns.tprint("Result: " + result)
	ns.writePort(1, "" + result)
}

function stockTrade4(k, data) {
	const [mins, maxs] = findallminmax(data)
	while (mins.length > k) {
		const [iMin, iMax] = findLowestRemovableTrade(mins, maxs)
		mins.splice(iMin, 1)
		maxs.splice(iMax, 1)
	}

	return minmaxsum(mins, maxs)
}

function findLowestRemovableTrade(mins, maxs) {
	let lowestIMin = 0
	let lowestIMax = 0
	let lowestVal = maxs[0] - mins[0]
	for (let iMin = 1; iMin < mins.length; iMin++) {
		for (let iMax = iMin - 1; iMax <= iMin; iMax++) {
			if (maxs[iMax] - mins[iMin] < lowestVal) {
				lowestIMin = iMin
				lowestIMax = iMax
				lowestVal = maxs[iMax] - mins[iMin]
			}
		}
	}
	return [lowestIMin, lowestIMax]
}