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
	let assignees = [];
	for ( const [team, values] of Object.entries( labelMap ) ) {
		const issueLabels = values.labels,
			assignees = values.assignees;

		let assigneesFound = ( arr, target ) => target.every( v => arr.includes( v ) );

		if ( assigneesFound( labels, issueLabels ) ) {
			return assignees;
		}
	}

	return assignees;
}

module.exports = mapLabelsToAssignees;