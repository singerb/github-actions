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
		const issueLabels = values.labels,
			assignees = values.assignees;
		console.log( team );
		console.log( labels );
		console.log( issueLabels );
		console.log( assignees );

		let assigneeFound = ( arr, target ) => target.every( v => arr.includes( v ) );

		if ( assigneeFound( labels, issueLabels ) ) {
			assigned.push( assignees.toString() );
		}
	}

	console.log( assigned );

	return assigned;
}

module.exports = mapLabelsToAssignees;