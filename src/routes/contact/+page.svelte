<script lang="ts">
  let email = '';
  let subject = '';
  let message = '';
  let website = ''; // Honeypot anti-bot

  let emailError = '';
  let subjectError = '';
  let messageError = '';

  // Validaciones en tiempo real
  $: emailError = email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? 'Invalid email'
    : '';
  $: subjectError = subject && subject.length < 3 ? 'Subject too short' : '';
  $: messageError = message && message.length < 10 ? 'Message too short' : '';
  $: valid = !emailError && !subjectError && !messageError && email && subject && message;

  let success = false;
  let serverError = '';
  let loading = false;

  async function handleSubmit(event: Event) {
    event.preventDefault(); // evita recargar la página

    if (!valid) return;

    loading = true;
    serverError = '';
    success = false;

    const formData = new FormData();
    formData.append('_honey', website); // honeypot
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('_subject', `[Website] Nuevo mensaje`);

    try {
      const response = await fetch('https://formsubmit.co/ajax/beckgarreaud@gmail.com', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        success = true;
        email = '';
        subject = '';
        message = '';
        website = '';
      } else {
        serverError = data.message || 'Error sending message';
      }
    } catch (err: any) {
      serverError = err.message || 'Server error';
    } finally {
      loading = false;
      setTimeout(() => (success = false), 5000);
    }
  }
</script>

<h1>Contact</h1>

{#if success}
  <p class="success">Message sent successfully ✔</p>
{/if}

{#if serverError}
  <p class="error">{serverError}</p>
{/if}

<form class="contact-form" on:submit={handleSubmit}>
  <!-- Honeypot anti-bot -->
  <input
    type="text"
    name="_honey"
    bind:value={website}
    class="hidden"
    tabindex="-1"
    autocomplete="off"
  />

  <label>
    Email
    <input type="email" bind:value={email} required />
    {#if emailError}
      <span class="field-error">{emailError}</span>
    {/if}
  </label>

  <label>
    Subject
    <input type="text" bind:value={subject} required />
    {#if subjectError}
      <span class="field-error">{subjectError}</span>
    {/if}
  </label>

  <label>
    Message
    <textarea bind:value={message} rows="6" required></textarea>
    {#if messageError}
      <span class="field-error">{messageError}</span>
    {/if}
  </label>

  <button type="submit" disabled={!valid || loading}>
    {#if loading}
      Sending...
    {:else}
      {valid ? 'Send Message' : 'Fill all fields correctly'}
    {/if}
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

  input,
  textarea {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  textarea {
    resize: vertical;
  }

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

  .success {
    text-align: center;
    color: green;
    font-weight: bold;
  }

  .error {
    text-align: center;
    color: red;
    font-weight: bold;
  }

  .field-error {
    color: red;
    font-size: 12px;
  }

  .hidden {
    display: none;
  }

  h1 {
    text-align: center;
    margin-bottom: 25px;
  }
</style>