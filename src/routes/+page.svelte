<script>
    import Todo from "../components/Todo.svelte";
    import { v4 as uuidv4 } from "uuid";
    import {store} from "../stores/store"

let input = ""
let itemList = $store
let showItemList;

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

const toggleCheck = (id) => {
    const i = itemList.findIndex((item) => item.id === id);
    const oldTodo = itemList[i];
    const newTodo = {...oldTodo, isDone: !oldTodo.isDone}
    itemList[i] = newTodo;
}

const clearAllTodo = () => {
    itemList = []
} 

$: {
    showItemList = itemList?.filter((item) => item.isFinished === false)
    localStorage.setItem('data', JSON.stringify(showItemList));
} 
</script>

<h1 class="text-3xl text-center font-bold m-5">Todo App</h1>
<body class="flex justify-center items-center flex-col">
    <input type="text" bind:value={input}
    on:keypress={(e) => {
        if (e.charCode === 13) 
            addTodo(input)
    }}
    class="border border-gray-700 rounded-md m-3 p-3" />

    <div class="flex flex-row space-x-2">
        <button title="Add todo" on:click={() => addTodo(input)}
        class="m-3 p-3 text-center text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
            Add Todo
        </button>
        <button title="Clear all" on:click={() => clearAllTodo()}
        class="m-3 p-3 text-center text-red-500 border-red-400 hover:bg-red-500 hover:text-white"
        >
            Clear all todos
        </button>
    </div>
    
    {#each showItemList as item}
        <Todo {...item} 
            deleteTodo={deleteTodo}
            toggleCheck={toggleCheck}/>
    {/each}
</body>


<style>
button {
    border-radius: 0.4rem;
    border-width: 2px;  
    background-color: white;
}
</style>