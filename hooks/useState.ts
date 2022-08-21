import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useStateSelector = useSelector<RootState>;

export const useStateDispatch = useDispatch<AppDispatch>;