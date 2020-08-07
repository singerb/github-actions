/**
 * External dependencies
 */
const jq = require( 'node-jq' );

/**
 * Internal dependencies
 */
const debug = require( '../../debug' );

/**
 * Assigns issues based on labels applied.
 *
 * @param {WebhookPayloadPullRequest} payload Pull request event payload.
 * @param {GitHub}                    octokit Initialized Octokit REST client.
 */
async function assignIssues( payload, octokit ) {
	let foundLabels;
	jq.run( '.issue.labels[].name', JSON.stringify( payload ), { input: 'string', output: 'json' } )
		.then( ( labels ) => {
			foundLabels = labels;
			debug( labels )
		} )
		.catch( ( err ) => {
			debug( err )
		} )

	debug( 'hi' );
	debug( foundLabels );
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