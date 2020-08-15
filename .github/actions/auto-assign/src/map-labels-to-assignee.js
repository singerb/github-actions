/**
 * Internal Dependencies
 */
const labelMap = require( './label-map.json' );

/**
 * Maps labels to assignees
 *
 * @param {array} labels Array
 * @return {array} array of assignees, or empty array if none
 */
function mapLabelsToAssignees( labels ) {
	let assigned = [];
	for ( const [team, values] of Object.entries( labelMap ) ) {
		const targetLabels = values.labels,
			assignees = values.assignees;

		console.log( `Seeing if we find a match for labels: ${targetLabels}` );

		let assigneeFound = ( arr, target ) => target.every( v => arr.includes( v ) );

		if ( assigneeFound( labels, targetLabels ) ) {
			assigned.push( assignees );
			console.log( `Assignees ${ assigned } found matching lables: ${ targetLabels }` );
			return assigned;
		}
	}

	return assigned;
}

module.exports = mapLabelsToAssignees;