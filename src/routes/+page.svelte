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
<title>Todo App by Svelte</title>
<body class="flex justify-center items-center flex-col">
    <form on:submit|preventDefault={() => addTodo(input)}>
        <label class="flex-col flex">
            <p class="justify-center text-center font-bold">
                Enter new todo:
            </p>
            <input type="text" bind:value={input}
            on:keypress={(e) => {
                if (e.charCode === 13) 
                    addTodo(input)
            }}
            class="border border-gray-700 rounded-md m-3 p-3" />
        </label>
    
        <div class="flex flex-rw space-x-2 justify-center">
            <button value="Add Todo" type="submit"
            class="m-3 p-3 text-center border-blue-600 bg-blue-600 text-white">
                Add Todo
            </button>
            <button title="Clear all" on:click={() => clearAllTodo()}
            class="m-3 p-3 text-center border-red-600 bg-red-600 text-white"
            >
                Clear all todos
            </button>
        </div>
    </form>
    
    {#each showItemList as item}
        <Todo {...item} 
            {deleteTodo}
            {toggleCheck}/>
    {/each}
</body>


<style>
button {
    border-radius: 0.4rem;
    border-width: 2px;
}
button:hover {
    font-weight: 700;
    font-size: 1.5rem;
}
input {
    min-width: 300px;
}

input:hover {
    @apply bg-emerald-200;
}
</style>