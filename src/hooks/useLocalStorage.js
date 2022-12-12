import { useState } from "react";

//рапър на useState
export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const localStorageData = localStorage.getItem(key);

        return localStorageData ? JSON.parse(localStorageData) : defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }
    return [
        value,
        setLocalStorageValue
    ]
}