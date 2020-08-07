/**
 * External dependencies
 */
const jq = require( 'node-jq' );

/**
 * Internal dependencies
 */
const debug = require( '../../debug' );
const mapLabelsToAssignee = require( '../../map-labels-to-assignee' );

/**
 * Assigns issues based on labels applied.
 *
 * @param {WebhookPayloadPullRequest} payload Pull request event payload.
 * @param {GitHub}                    octokit Initialized Octokit REST client.
 */
async function assignIssues( payload, octokit ) {
	jq.run( '.issue.labels[].name', JSON.stringify( payload ), { input: 'string', output: 'string' } )
		.then( ( labels ) => {
			labels.toString().replace( /"/g, "" );
			labels.split( '\n' );
			debug( labels );
			debug( mapLabelsToAssignee( labels ) );
		} )
		.catch( ( err ) => {
			debug( err )
		} )

	// const regex = /(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved):? +(?:\#{1}|https?:\/\/github\.com\/automattic\/jetpack\/issues\/)(\d+)/gi;
	//
	// let match;
	// while ( ( match = regex.exec( payload.pull_request.body ) ) ) {
	// 	const [ , issue ] = match;
	//
	// 	debug( `assign-issues: Assigning issue #${ issue } to @${ payload.pull_request.user.login }` );
	//
	// 	await octokit.issues.addAssignees( {
	// 		owner: payload.repository.owner.login,
	// 		repo: payload.repository.name,
	// 		issue_number: +issue,
	// 		assignees: [ payload.pull_request.user.login ],
	// 	} );
	// }
}

module.exports = assignIssues;