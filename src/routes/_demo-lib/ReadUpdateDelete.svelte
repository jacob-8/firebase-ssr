<script lang="ts">
  import { limit, orderBy } from 'firebase/firestore';
  import { Collection, deleteDocument, update } from 'sveltefirets';
  import type { IMessage } from './message.interface';

  let refField: string;
  const preloadedMessages: IMessage[] = [{ text: 'preloadedMessage from the server' }];

  function changeGreeting(messageId: string) {
    const newName = prompt('Enter updated name:');
    if (newName) {
      update<IMessage>(`messages/${messageId}`, { text: `Actually the name is ${newName}` });
    }
  }
</script>

<div
  style="display: flex; align-items: center;
justify-content: space-between;">
  <h2>Read, Update, and Delete greetings</h2>
  <input type="text" bind:value={refField} maxlength="5" placeholder="Optional ref field" />
</div>

<Collection
  path="messages"
  queryConstraints={[limit(5), orderBy('updatedAt', 'desc')]}
  startWith={preloadedMessages}
  let:data={messages}
  {refField}
  log>
  <!-- where('createdBy', '==', $user.uid) -->
  <div>
    <a href={`/messages`} sveltekit:prefetch>Preload firestore data for all messages on client</a>
    <a href={`/messages`} target="_blank" style="text-decoration: line-through;"
      >Load firestore data for all messages server-side (will throw error as it doesn't work yet)</a>
      <a href={`/api/messages`} target="_blank">Messages API endpoint</a>
  </div>

  {#each messages as message}
    <b>{message.text}</b>, sent on {message.updatedAt && message.updatedAt.toDate()}
    <pre style="font-size: 70%;">{JSON.stringify(message, null, 2)}</pre>
    <button type="button" on:click={() => changeGreeting(message.id)}>Update</button>
    <button
      type="button"
      on:click={() => {
        if (messages.length > 2) {
          deleteDocument(`messages/${message.id}`);
        } else {
          alert(
            'I like to keep at least two messages around for demonstration. Try adding a few more and then you will be able to delete.'
          );
        }
      }}>Delete</button>
    <a href={`/${message.id}`} sveltekit:prefetch>Preload firestore data on client</a>
    <a href={`/${message.id}`} target="_blank" style="text-decoration: line-through;"
      >Load firestore data server-side (will throw error as it doesn't work yet)</a>
    <a href={`/api/${message.id}`} target="_blank">Message API endpoint</a>
    <hr />
  {/each}
</Collection>
