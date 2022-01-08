<script context="module" lang="ts">
	import { initializeApp, getApps, FirebaseApp } from 'firebase/app';

	import type { Load } from '@sveltejs/kit';
	import { firebaseConfig } from '$lib/firebaseConfig';
	import { browser } from '$app/env';
	export const load: Load = async ({ params }) => {
		let firebaseApp: FirebaseApp = null;

		try {
			if (getApps().length) {
				firebaseApp = getApps()[0];
				console.log(`firebase app already found by message route`);
			} else {
				firebaseApp = initializeApp(firebaseConfig);
				console.log(`firebase initialized on browser in message route: ${browser}`);
			}
			const projectID = firebaseApp.options.projectId;

			// const message = await getDocument<IMessage>(`messages/${params.messageId}`, firebaseApp);
			console.log(`loaded ${projectID} with ${params.messageId}`);
			if (projectID) {
				return { props: { message: projectID } };
			} else {
				return { status: 301, redirect: '/' };
			}
		} catch (error) {
			return { status: 500, error };
		}
	};
</script>

<script lang="ts">
	export let message;
</script>

<a href="/">Home</a>
<pre>{JSON.stringify(message, null, 1)}</pre>
