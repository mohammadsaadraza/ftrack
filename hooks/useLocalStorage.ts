
export default function useLocalStorage<T>(key: string ) : [T | null , (value: T) => void] {

    const item = window.localStorage.getItem(key);

    const setValue = (value: T) => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return [item as T, setValue]

}