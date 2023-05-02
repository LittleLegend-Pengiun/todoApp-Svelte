import { persistStore } from "./persistStore";
import { v4 as uuidv4 } from "uuid";

const defaultData = [
    {
        id: uuidv4(),
        title: "Test todo",
        isDone: false,
        isFinished: false,
    }
]

export const store = persistStore('data', defaultData);