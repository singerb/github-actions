/**
 * Maps labels to assignees
 *
 * @param {array} labels Array
 */
function mapLabelsToAssignee( labels ) {
	const labelMap = {
		'dereksmart': ['bug', 'documentation'],
		'someone': ['bug', 'duplicate']
	}

	Object.keys( labelMap ).forEach( assignee => {
		let checkLabels = labelMap[ assignee ];
		let assigneeFound = ( arr, target ) => target.every( v => arr.includes( v ) );

		if ( assigneeFound( labels, checkLabels ) ) {
			return assignee;
		}
	} );
}

module.exports = mapLabelsToAssignee;