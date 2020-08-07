/**
 * External dependencies
 */
const { setFailed, getInput } = require( '@actions/core' );
const { context, getOctokit } = require( '@actions/github' );

/**
 * Internal dependencies
 */
const assignIssues = require( './tasks/assign-issues' );
const debug = require( './debug' );

const automations = [
	{
		event: 'issues',
		action: [ 'opened', 'synchronize', 'edited', 'labeled', 'unlabeled' ],
		task: assignIssues,
	},
];

( async function main() {
	const token = getInput( 'github_token' );
	if ( ! token ) {
		setFailed( 'main: Input `github_token` is required' );
		return;
	}

	const octokit = new getOctokit( token );

	// Get info about the event.
	const eventPayload = context.payload;
	const eventAction = eventPayload.action;

	debug( `main: Received event = '${ context.eventName }', action = '${ eventPayload.action }'` );

	for ( const { event, action, task } of automations ) {
		if (
			event === context.eventName &&
			( action === undefined || action.includes( eventAction ) )
		) {
			try {
				debug( `main: Starting task ${ task.name }` );
				await task( eventPayload, octokit );
			} catch ( error ) {
				setFailed( `main: Task ${ task.name } failed with error: ${ error }` );
			}
		}
	}

	debug( 'main: All done!' );
} )();