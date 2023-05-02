<script>
    import Todo from "../components/Todo.svelte";
    import { v4 as uuidv4 } from "uuid";

let input = ""
let itemList = []
const addTodo = (title) => {
    let item = {
        id: uuidv4(),
        title: `${title}`,
        isDone: false,
        isFinished: false,
    }
    if (title != "")
        itemList = [...itemList, item]
    
    input = ""
}
const deleteTodo = (id) => {
    const i = itemList.findIndex((item) => item.id === id);
    const oldTodo = itemList[i];
    const newTodo = {...oldTodo, isFinished: true}
    itemList[i] = newTodo;
}
$: showItemList = itemList.filter((item) => item.isFinished == false)
</script>

<h1 class="text-3xl text-center font-bold m-5">Todo App</h1>
<body class="flex justify-center items-center flex-col">
    <input type="text" bind:value={input}
    class="border border-gray-700 rounded-md m-3 p-3"/>
    <button title="Add todo" on:click={() => addTodo(input)}
    class="m-3 p-3 text-center rounded-md bg-blue-500 text-white">
        Add Todo
    </button>
    
    {#each showItemList as item}
        <Todo {...item} deleteTodo={deleteTodo}/>
    {/each}
</body>


<style>
button:hover {
    background-color: green;
}
</style>