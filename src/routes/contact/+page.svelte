<script lang="ts">
  import { enhance } from '$app/forms';

  let email = '';
  let subject = '';
  let message = '';
  let website = '';
  let success = false;
  let serverError = '';
  let loading = false;

  let emailError = '';
  let subjectError = '';
  let messageError = '';

  $: emailError = email && !email.includes('@') ? 'Invalid email' : '';
  $: subjectError = subject && subject.length < 3 ? 'Subject too short' : '';
  $: messageError = message && message.length < 10 ? 'Message too short' : '';

  $: valid =
    !emailError &&
    !subjectError &&
    !messageError &&
    email &&
    subject &&
    message;

  function formEnhance({ form, formData, cancel }: any) {
    if (!valid) {
      cancel(); 
      return;
    }

    loading = true;
    serverError = '';

    return async ({ result, update }: any) => {
      loading = false;

      if (result.type === 'success') {
        if (result.data?.success) {
          success = true;
          email = '';
          subject = '';
          message = '';
          website = '';

          setTimeout(() => {
            success = false;
          }, 5000);
        }

        await update();
      } else if (result.type === 'failure') {
        serverError = 'Validation failed on server';
      } else if (result.type === 'error') {
        serverError = result.error?.message || 'Server error';
      }
    };
  }
</script>

<h1>Contact</h1>

{#if success}
  <p class="success">Message sent successfully ✔</p>
{/if}

{#if serverError}
  <p class="error">{serverError}</p>
{/if}

<form method="POST" class="contact-form" use:enhance={formEnhance}>
  <input type="text" name="website" bind:value={website} class="hidden" />

  <label>
    Email
    <input type="email" name="email" bind:value={email} required />
    {#if emailError}<span class="field-error">{emailError}</span>{/if}
  </label>

  <label>
    Subject
    <input name="subject" bind:value={subject} required />
    {#if subjectError}<span class="field-error">{subjectError}</span>{/if}
  </label>

  <label>
    Message
    <textarea name="message" rows="6" bind:value={message} required></textarea>
    {#if messageError}<span class="field-error">{messageError}</span>{/if}
  </label>

  <button type="submit" disabled={!valid || loading}>
    {#if loading}Sending...{/if}
    {#if !loading}{valid ? 'Send Message' : 'Fill all fields correctly'}{/if}
  </button>
</form>

<style>
  .contact-form {
    max-width: 500px;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: #f5f5f5;
    padding: 25px;
    border-radius: 10px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    gap: 6px;
  }
  input, textarea {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  textarea { resize: vertical; }
  button {
    padding: 12px;
    border: none;
    border-radius: 6px;
    background: #0066ff;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  .success { text-align: center; color: green; font-weight: bold; }
  .error { text-align: center; color: red; font-weight: bold; }
  .field-error { color: red; font-size: 12px; }
  .hidden { display: none; }
  h1 { text-align: center; margin-bottom: 25px; }
</style>