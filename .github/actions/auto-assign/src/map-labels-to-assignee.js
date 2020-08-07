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

		let assigneeFound = ( arr, target ) => target.every( v => arr.includes( v ) );

		if ( assigneeFound( labels, issueLabels ) ) {
			assigned.push( assignees.toString() );
		}
	}

	return assigned;
}

module.exports = mapLabelsToAssignees;