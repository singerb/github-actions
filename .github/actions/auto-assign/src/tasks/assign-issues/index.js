/**
 * Internal dependencies
 */
const debug = require( '../../debug' );
const mapLabelsToAssignees = require( '../../map-labels-to-assignee' );

/**
 * Assigns issues based on labels applied.
 *
 * @param {WebhookPayloadPullRequest} payload Pull request event payload.
 * @param {GitHub}                    octokit Initialized Octokit REST client.
 */
async function assignIssues( payload, octokit ) {
	const payloadLabels = payload.issue.labels,
		issueNumber = payload.issue.number;

	debug( JSON.stringify( payloadLabels ) );

	let labels = [];
	payloadLabels.forEach( ( labelKeys ) => {
		labels.push( labelKeys.name );
	} )

	debug( 'Found labels: ' + labels.toString() );
	debug( 'Current assignees: ' + JSON.stringify( payload.issue.assignees ) );

	debug( 'Looking for assignee that matches labels...' );

	const assignees = mapLabelsToAssignees( labels );
	if ( assignees === undefined || assignees.length === 0 ) {
		debug( 'No assignee found. Nothing to do here.' );
	} else if ( payload.issue.assignees && payload.issue.assignees.length > 0 ) {
		debug( 'Issue already assigned. Nothing to do here.' );
	} else {
		debug( `Assignee found! Assigning ${ assignees } to issue ${ issueNumber }...` );

		await octokit.issues.addAssignees( {
			owner: payload.repository.owner.login,
			repo: payload.repository.name,
			issue_number: issueNumber,
			assignees: assignees.toString().split( "," ),
		} );
	}
}

module.exports = assignIssues;
