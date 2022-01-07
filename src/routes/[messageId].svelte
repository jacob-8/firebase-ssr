<script context="module" lang="ts">
	import { initializeApp, getApps, FirebaseApp } from 'firebase/app';

	const firebaseConfig = {
		apiKey: 'AIzaSyAd3dQdgetU1gzRbQhp5G_4Yv2p1yAu_A0',
		authDomain: 'sveltefirets.firebaseapp.com',
		databaseURL: 'https://sveltefirets.firebaseio.com',
		projectId: 'sveltefirets',
		storageBucket: 'sveltefirets.appspot.com',
		messagingSenderId: '952776151912',
		appId: '1:952776151912:web:d408872b1816a5eccafcdd',
		measurementId: 'G-Z3RPDMQCLL'
	};

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ params }) => {
		let firebaseApp: FirebaseApp = null;

		try {
			if (getApps().length) {
				firebaseApp = getApps()[0];
			} else {
				firebaseApp = initializeApp(firebaseConfig);
				console.log('firebase initialized on server');
			}

			console.log({ firebaseApp });
			// const message = await getDocument<IMessage>(`messages/${params.messageId}`, firebaseApp);
			const message = params.messageId;
			console.log('loaded: ', { message });
			if (message) {
				return { props: { message } };
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
