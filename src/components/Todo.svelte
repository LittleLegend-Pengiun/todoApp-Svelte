<script>
    export let title = "";
    export let isDone = false;
    export let id;
    export let deleteTodo;
    import * as Icon from 'svelte-heros-v2';
</script>

<div class={`border border-gray-500 rounded-md mt-5 m-1 p-2 space-x-3 flex flex-row todo-container items-center ${isDone? "bg-green-300": "bg-inherit"}`}>
    <input type="checkbox" bind:checked={isDone} 
    class="w-4 h-4 ml-2"/>
    <p class="font-bold text-lg flex-1">{title}</p>
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
</style>
