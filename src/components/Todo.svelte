<script>
    export let title = "";
    export let isDone = false;
    export let id;
    export let deleteTodo;
    export let toggleCheck;
    import * as Icon from 'svelte-heros-v2';
</script>

<div class={`border border-gray-500 rounded-md mt-5 m-1 p-2 space-x-3 flex flex-row todo-container items-center ${isDone? "bg-green-300": "bg-inherit"}`}>
    <label class="flex flex-row justify-center items-center space-x-3">
        <input type="checkbox" bind:checked={isDone} 
        class="w-4 h-4 ml-2" on:change={() => toggleCheck(id)}/>
        <p class="font-bold text-lg">{title}</p>
    </label>
    <p class="flex-1"></p>
    <button class={`rounded-md ${isDone? "": "hidden"}`}>
        <Icon.ArchiveBoxXMark size="20" color="red" 
        on:click={() => deleteTodo(id)}/>
    </button>
</div>

<style>
    .todo-container {
        min-width: 300px;
    }
    button:hover {
        background-color: red;
    }
    input[type="checkbox"] {
    /* ...existing styles */
        display: grid;
        place-content: center;
        appearance: none;
        font: inherit;
        color: currentColor;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid currentColor;
        border-radius: 0.15em;
        transform: translateY(-0.075em);
    }

    input[type="checkbox"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
    }

    input[type="checkbox"]:checked::before {
        transform: scale(1);
    }

    input[type="checkbox"]:checked {
        background-color: darkcyan;
    }
</style>
